const fetch = require('node-fetch');

module.exports = async (req, res) => {
  // CORS 헤더
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // OPTIONS 요청 처리
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // POST만 허용
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('[1] Request received');
    console.log('[2] Method:', req.method);
    console.log('[3] Body:', req.body);

    const { input } = req.body || {};

    if (!input) {
      console.log('[ERROR] No input provided');
      return res.status(400).json({ error: '입력값이 필요합니다.' });
    }

    console.log('[4] Input length:', input.length);

    // 환경변수 확인
    const apiKey = process.env.GEMINI_API_KEY;
    console.log('[5] API Key exists:', !!apiKey);
    console.log('[6] API Key length:', apiKey ? apiKey.length : 0);

    if (!apiKey) {
      console.log('[ERROR] GEMINI_API_KEY not set');
      return res.status(500).json({ 
        error: 'API 키가 설정되지 않았습니다.',
        hint: 'Vercel 환경변수에서 GEMINI_API_KEY를 설정해주세요.'
      });
    }

    console.log('[7] Preparing Gemini API call...');

    const prompt = `당신은 한국의 전문자격사 추천 전문가입니다.

다음 JSON 형식으로만 답변하세요:

{
  "전문가": "필요한 전문가",
  "이유": "이유 설명",
  "예상비용": "비용 범위",
  "예상기간": "소요 기간",
  "절차": ["절차1", "절차2", "절차3"],
  "추천강의": ["강의1", "강의2", "강의3"]
}

사용자 상황: ${input}`;

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    console.log('[8] Calling Gemini API...');

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    console.log('[9] Gemini response status:', response.status);

    const text = await response.text();
    console.log('[10] Response length:', text.length);

    if (!response.ok) {
      console.log('[ERROR] Gemini API error:', text.substring(0, 500));
      return res.status(response.status).json({ 
        error: 'Gemini API 오류',
        status: response.status,
        details: text.substring(0, 200)
      });
    }

    const data = JSON.parse(text);
    console.log('[11] JSON parsed');

    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.log('[ERROR] Invalid response structure');
      return res.status(500).json({ 
        error: '응답 형식 오류',
        data: data
      });
    }

    const aiText = data.candidates[0].content.parts[0].text;
    console.log('[12] AI response length:', aiText.length);

    // JSON 파싱
    let result;
    try {
      const cleaned = aiText.replace(/```json\n?/g, '').replace(/```/g, '').trim();
      result = JSON.parse(cleaned);
      console.log('[13] Result parsed successfully');
    } catch (e) {
      console.log('[ERROR] JSON parse failed:', e.message);
      return res.status(500).json({ 
        error: 'JSON 파싱 실패',
        raw: aiText.substring(0, 200)
      });
    }

    console.log('[14] Success! Returning result');

    return res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    console.log('[FATAL ERROR]', error.message);
    console.log('[STACK]', error.stack);
    
    return res.status(500).json({ 
      error: '서버 오류',
      message: error.message,
      stack: error.stack
    });
  }
};
