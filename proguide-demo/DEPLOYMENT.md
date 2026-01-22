# 프로가이드 데모 배포 가이드

## 🚀 Vercel 배포 방법 (5분 완성!)

### 1단계: Vercel 계정 생성
1. https://vercel.com 접속
2. GitHub 계정으로 로그인
3. "Continue with GitHub" 클릭

### 2단계: GitHub 레포지토리 생성
1. GitHub에 로그인
2. New Repository 클릭
3. 이름: `proguide-demo`
4. Public 선택
5. Create repository

### 3단계: 파일 업로드
다음 파일들을 GitHub 레포지토리에 업로드:
```
proguide-demo/
├── index.html
├── vercel.json
└── api/
    └── analyze.js
```

방법 1: GitHub 웹사이트에서 직접 업로드
- Add file > Upload files
- 파일 드래그 앤 드롭
- Commit changes

방법 2: Git CLI (터미널)
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/proguide-demo.git
git push -u origin main
```

### 4단계: Vercel에 배포
1. Vercel 대시보드 (https://vercel.com/dashboard)
2. "Add New..." > "Project" 클릭
3. GitHub 레포지토리 선택: `proguide-demo`
4. Import 클릭
5. **Environment Variables 설정 (중요!)**
   - Key: `GEMINI_API_KEY`
   - Value: `YOUR_GEMINI_API_KEY_HERE`
   - (Gemini API 키를 여기에 입력)
6. Deploy 클릭!

### 5단계: 완료!
- 배포 완료 후 URL 생성: `https://proguide-demo.vercel.app`
- 이 URL을 사업계획서에 첨부!

---

## 🔑 Gemini API 키 발급

1. https://makersuite.google.com/app/apikey 접속
2. Google 계정으로 로그인
3. "Create API key" 클릭
4. API 키 복사
5. Vercel Environment Variables에 붙여넣기

---

## ✅ 배포 확인

1. `https://proguide-demo.vercel.app` 접속
2. 예시 버튼 클릭
3. "AI 분석 시작하기" 클릭
4. 결과 확인!

---

## 🎨 커스텀 도메인 (선택사항)

무료 도메인:
- Vercel 제공: `proguide-demo.vercel.app`

유료 도메인 연결:
1. Vercel 프로젝트 설정
2. Domains 탭
3. Add Domain
4. DNS 설정 (가이드 제공됨)

추천 도메인:
- proguide.site (저렴)
- proguide-demo.com

---

## 🔧 트러블슈팅

### API 키 오류
```
Error: API 키가 설정되지 않았습니다.
```
해결: Vercel 프로젝트 설정 > Environment Variables에서 `GEMINI_API_KEY` 확인

### CORS 오류
```
Access to fetch has been blocked by CORS policy
```
해결: 이미 api/analyze.js에 CORS 설정되어 있음. 재배포 시도.

### 빌드 실패
```
Build failed
```
해결: vercel.json 파일 확인. 파일 구조가 정확한지 확인.

---

## 📊 비용

- Vercel 배포: **무료**
- Gemini API: **무료** (분당 60회 요청)
- 총 비용: **$0**

---

## 🎯 사업계획서 첨부 방법

### 방법 1: URL 직접 명시
```
Part 2: 해결 방안

3. AI 분석 데모
실제 작동하는 데모 페이지: 
https://proguide-demo.vercel.app

위 링크에서 직접 테스트 가능합니다.
```

### 방법 2: QR 코드 생성
1. https://www.qr-code-generator.com/ 접속
2. URL 입력: `https://proguide-demo.vercel.app`
3. QR 코드 다운로드
4. 사업계획서에 첨부

### 방법 3: 스크린샷 + URL
- 결과 화면 스크린샷
- 하단에 URL 표시
- 캡션: "실제 작동 중인 데모 (위 URL 참고)"

---

## 📱 모바일 최적화

현재 페이지는 모바일 반응형입니다:
- 스마트폰에서 정상 작동
- 태블릿에서 정상 작동
- PC에서 정상 작동

심사 시 모바일로도 시연 가능!

---

## 🎉 완료!

이제 URL이 있는 전문적인 데모 페이지가 완성되었습니다!

`https://proguide-demo.vercel.app`

이 URL을 사업계획서에 넣으면 심사위원이 직접 체험 가능합니다! 🚀
