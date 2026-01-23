// Vercel Serverless Function for Gemini API

module.exports = async (req, res) => {
  // CORS 설정
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // OPTIONS 요청 처리 (CORS preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // POST 요청만 허용
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { input } = req.body;

    console.log('[DEBUG] Request received:', { hasInput: !!input });

    if (!input || input.trim().length === 0) {
      return res.status(400).json({ error: '입력값이 필요합니다.' });
    }

    // 환경변수에서 API 키 가져오기
    const apiKey = process.env.GEMINI_API_KEY;

    console.log('[DEBUG] API Key exists:', !!apiKey);

    if (!apiKey) {
      console.error('[ERROR] GEMINI_API_KEY not set');
      return res.status(500).json({ 
        error: 'API 키가 설정되지 않았습니다.',
        message: 'Vercel 환경변수에서 GEMINI_API_KEY를 설정해주세요.'
      });
    }

    // 시스템 프롬프트
    const systemPrompt = `당신은 한국의 전문자격사(법무사, 세무사, 회계사, 노무사, 변리사, 관세사, 감정평가사) 추천 전문가입니다.

사용자의 상황을 분석하여 다음을 JSON 형식으로 반환하세요:

{
  "전문가": "필요한 전문가 (예: 법무사, 세무사 등)",
  "이유": "왜 이 전문가가 필요한지 2-3문장 설명",
  "예상비용": "예상 비용 범위 (예: 50만원 ~ 100만원)",
  "예상기간": "예상 소요 기간 (예: 2주 ~ 3주)",
  "절차": ["절차1", "절차2", "절차3", "절차4", "절차5"],
  "추천강의": ["강의1 제목 (10분)", "강의2 제목 (15분)", "강의3 제목 (12분)"]
}

**전문가별 업무 범위:**
- 법무사: 등기(법인설립, 부동산), 경매, 상속, 공증
- 세무사: 세무신고(법인세, 소득세, 부가세), 절세 전략
- 회계사: 재무제표 작성, 회계감사, 내부회계관리
- 노무사: 4대보험, 근로계약, 취업규칙, 임금체계
- 변리사: 특허, 상표, 디자인 출원 및 등록
- 관세사: 수출입 신고, FTA, 관세 환급
- 감정평가사: 부동산 가격 감정, 담보평가

반드시 JSON 형식으로만 답변하고, 마크다운 코드 블록(백틱)은 사용하지 마세요.

사용자 상황: `;

    console.log('[DEBUG] Calling Gemini API...');

    // Gemini API 호출
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
    
    const geminiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: systemPrompt + input,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
        },
      }),
    });

    console.log('[DEBUG] Gemini API status:', geminiResponse.status);

    const responseText = await geminiResponse.text();
    console.log('[DEBUG] Response length:', responseText.length);

    if (!geminiResponse.ok) {
      let errorData;
      try {
        errorData = JSON.parse(responseText);
      } catch (e) {
        errorData = { message: responseText };
      }
      
      console.error('[ERROR] Gemini API Error:', errorData);
      
      return res.status(geminiResponse.status).json({ 
        error: 'AI 분석 중 오류가 발생했습니다.',
        details: errorData,
        status: geminiResponse.status
      });
    }

    // JSON 파싱
    const data = JSON.parse(responseText);

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      console.error('[ERROR] Invalid response structure:', data);
      return res.status(500).json({ 
        error: 'AI 응답 형식이 올바르지 않습니다.',
        data: data
      });
    }

    const aiResponse = data.candidates[0].content.parts[0].text;
    console.log('[DEBUG] AI Response received');

    // JSON 파싱
    let parsed;
    try {
      const cleaned = aiResponse
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      parsed = JSON.parse(cleaned);
    } catch (e) {
      try {
        parsed = JSON.parse(aiResponse);
      } catch (e2) {
        console.error('[ERROR] JSON Parse Error:', aiResponse.substring(0, 200));
        return res.status(500).json({ 
          error: 'AI 응답을 JSON으로 변환할 수 없습니다.',
          rawResponse: aiResponse.substring(0, 500)
        });
      }
    }

    console.log('[DEBUG] Success!');

    // 성공 응답
    return res.status(200).json({
      success: true,
      data: parsed,
    });

  } catch (error) {
    console.error('[ERROR] Handler Error:', error);
    return res.status(500).json({ 
      error: '서버 오류가 발생했습니다.',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};
