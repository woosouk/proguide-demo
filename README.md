# Vercel 백엔드 배포 가이드 - 완벽판

## 📂 파일 구조

```
proguide-backend/
├── index.html          # 프론트엔드
├── api/
│   └── analyze.js      # 백엔드 (Serverless Function)
├── package.json        # Node.js 설정
└── vercel.json         # Vercel 설정
```

---

## 🚀 배포 방법

### **방법 1: Vercel CLI (가장 빠름!)**

```bash
# Vercel CLI 설치 (한 번만)
npm i -g vercel

# 프로젝트 폴더로 이동
cd proguide-backend

# 배포!
vercel

# 환경변수 설정
vercel env add GEMINI_API_KEY

# 키 입력: AIzaSy...
# Environment: Production
# Add to branch: main

# 재배포 (환경변수 적용)
vercel --prod
```

---

### **방법 2: GitHub + Vercel 연동 (추천!)**

```bash
# 1. GitHub 레포 생성
# GitHub에서 New repository: "proguide-demo"

# 2. 로컬에서 Git 설정
cd proguide-backend
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/proguide-demo.git
git push -u origin main

# 3. Vercel 연동
# https://vercel.com/dashboard
# "Add New" > "Project"
# GitHub repo 선택: proguide-demo
# "Import" 클릭

# 4. 환경변수 설정 (중요!)
# Vercel 프로젝트 페이지에서:
# Settings > Environment Variables
# 
# Name: GEMINI_API_KEY
# Value: AIzaSy... (당신의 Gemini API 키)
# Environment: Production (체크)
# 
# "Save" 클릭

# 5. Redeploy
# Deployments 탭 > 최신 배포 > ... > Redeploy
```

---

### **방법 3: Vercel 웹사이트 (수동)**

```
1. https://vercel.com 접속
2. 로그인 (GitHub)
3. "Add New..." > "Project"
4. "Browse" 탭
5. 전체 폴더 드래그 앤 드롭
   (index.html, api/, package.json, vercel.json 모두!)
6. 환경변수 설정:
   - Name: GEMINI_API_KEY
   - Value: YOUR_GEMINI_API_KEY
7. "Deploy" 클릭!
```

---

## 🔑 Gemini API 키 발급

```
1. https://makersuite.google.com/app/apikey
2. Google 계정으로 로그인
3. "Create API key" 클릭
4. 복사: AIzaSy...
5. Vercel 환경변수에 붙여넣기
```

---

## ✅ 배포 후 테스트

```
1. 배포된 URL 접속
   예: https://proguide-demo.vercel.app

2. F12 눌러서 Console 열기

3. "예시 1" 클릭

4. "AI 분석 시작하기" 클릭

5. Console에서 로그 확인:
   [DEBUG] Calling backend API...
   [DEBUG] Response status: 200  ← 중요!
   [DEBUG] Response text: {"success":true...
   [DEBUG] Analysis complete!

6. 결과 화면 확인! ✅
```

---

## 🔧 에러 해결

### 에러 1: 500 Internal Server Error

```
원인: 환경변수 설정 안 됨

해결:
1. Vercel 프로젝트 > Settings > Environment Variables
2. GEMINI_API_KEY 있는지 확인
3. 없으면 추가:
   - Name: GEMINI_API_KEY
   - Value: YOUR_API_KEY
   - Environment: Production
4. Save
5. Deployments 탭 > Redeploy
```

---

### 에러 2: API 키가 설정되지 않았습니다

```
증상: "API 키가 설정되지 않았습니다"

원인: 환경변수 이름 틀림

해결:
- 정확한 이름: GEMINI_API_KEY (대문자!)
- 오타 확인
- 공백 없이
```

---

### 에러 3: CORS Error

```
증상: "blocked by CORS policy"

해결:
→ api/analyze.js에 CORS 설정 이미 되어 있음
→ Redeploy 하면 해결
```

---

## 📊 Vercel 로그 확인

```
문제 발생 시:

1. Vercel 프로젝트 페이지
2. Deployments 탭
3. 최신 배포 클릭
4. "Functions" 탭
5. "api/analyze" 클릭
6. "Logs" 확인

여기서 백엔드 에러 메시지 확인 가능!
```

---

## 🎯 중요 체크리스트

```
배포 전:
□ api/analyze.js 파일 있음
□ index.html 파일 있음
□ package.json 파일 있음
□ vercel.json 파일 있음
□ 폴더 구조 정확함

배포 후:
□ Vercel URL 접속 가능
□ 페이지 정상 표시
□ 환경변수 GEMINI_API_KEY 설정됨
□ AI 분석 버튼 클릭 시 작동
□ Console에서 200 응답 확인
□ 결과 정상 표시
```

---

## 💡 장점

```
✅ API 키 완전히 숨김 (환경변수)
✅ 백엔드에서 처리 (안전)
✅ 프로덕션 레디
✅ 무료 (Vercel)
✅ 자동 HTTPS
✅ 글로벌 CDN
```

---

## 📱 최종 확인

```
✅ https://your-url.vercel.app 접속
✅ AI 분석 작동
✅ 결과 표시
✅ 모바일 작동
✅ Console 에러 없음

완성! 🎉
```

---

이제 배포하세요! 🚀
