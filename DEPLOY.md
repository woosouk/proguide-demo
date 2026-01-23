# 🚀 초간단 배포 가이드

## Vercel CLI로 배포 (3분!)

```bash
# 1. 설치 (한 번만)
npm i -g vercel

# 2. 압축 풀기
tar -xzf proguide-final.tar.gz
cd proguide-final

# 3. 배포
vercel

# 질문에 답변:
# - Set up and deploy? Y
# - Which scope? (당신 계정 선택)
# - Link to existing project? N
# - Project name? proguide-demo
# - Directory? ./
# - Override settings? N

# 4. 환경변수 추가
vercel env add GEMINI_API_KEY

# 입력:
# - Value: YOUR_GEMINI_API_KEY
# - Add to: Production
# - Add another: N

# 5. 프로덕션 배포
vercel --prod

# 완료! URL이 표시됩니다
```

---

## ✅ 테스트

```
1. URL 접속
2. F12 > Console 열기
3. 예시 1 클릭
4. AI 분석 시작하기
5. Console 로그 확인:
   [1] Request received
   [2] Method: POST
   ...
   [14] Success! Returning result

6. 결과 표시 ✅
```

---

## 🔧 여전히 500 에러 나면?

### Vercel 로그 확인:

```
1. https://vercel.com/dashboard
2. 프로젝트 클릭
3. Functions 탭
4. /api/analyze 클릭
5. Logs 탭

여기서 정확한 에러 확인!
```

### 가능한 원인:

1. **환경변수 안 됨**
   ```
   vercel env ls
   # GEMINI_API_KEY 있는지 확인
   # 없으면:
   vercel env add GEMINI_API_KEY
   ```

2. **node-fetch 설치 안 됨**
   ```
   # package.json 확인
   # dependencies에 node-fetch 있어야 함
   ```

3. **API 키 잘못됨**
   ```
   # Google AI Studio에서 새 키 생성
   # https://makersuite.google.com/app/apikey
   ```

---

## 📋 체크리스트

```
배포 전:
□ proguide-final 폴더
□ api/analyze.js 있음
□ package.json 있음
□ index.html 있음
□ vercel.json 있음

배포 후:
□ vercel env ls 로 GEMINI_API_KEY 확인
□ URL 접속 가능
□ Console에서 [1]~[14] 로그 확인
□ 결과 표시

에러 시:
□ Vercel Functions 로그 확인
□ 환경변수 재설정
□ Redeploy
```

---

## 💡 로그 해석

```
정상:
[1] Request received
[2] Method: POST
[3] Body: { input: '...' }
[4] Input length: 50
[5] API Key exists: true
[6] API Key length: 39
[7] Preparing Gemini API call...
[8] Calling Gemini API...
[9] Gemini response status: 200  ← 중요!
[10] Response length: 500
[11] JSON parsed
[12] AI response length: 300
[13] Result parsed successfully
[14] Success! Returning result

에러:
[5] API Key exists: false  ← 환경변수 문제!
또는
[9] Gemini response status: 400  ← API 키 문제!
```

---

이제 배포하고 Console 로그 복사해서 보내주세요! 🚀
