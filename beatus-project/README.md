# 📸 AI 일기장

Gemini AI를 활용한 사진 기반 일기 자동 생성 웹 애플리케이션

## ✨ 주요 기능

1. **사진 업로드**: 3장 이상의 사진 선택
2. **감정 선택**: 8가지 감정 중 1개 선택 (label별로 명언 자동 분류)
3. **필기체 선택**: 5가지 한글 필기체 중 선택
   - 개구쟁이 (Gaegu)
   - 하믈렛 (Hahmlet)
   - 연성 (Yeon Sung)
   - 싱글데이 (Single Day)
   - 흑백사진 (Black And White Picture)
4. **AI 일기 생성**: Gemini API가 사진을 분석하여 200~300자 일기 작성
5. **명언 자동 추천**: 선택한 감정(label)에 맞는 명언 표시
6. **이미지 저장**: 일기와 명언이 포함된 이미지로 다운로드

## 🚀 빠른 시작

### 1. API 키 발급
[Google AI Studio](https://makersuite.google.com/app/apikey)에서 Gemini API 키를 발급받으세요.

### 2. 설치
```bash
npm install
```

### 3. API 키 설정
`.env` 파일을 생성하고 API 키를 입력하세요:
```
REACT_APP_API_KEY=여기에_발급받은_API_키_입력
```

### 4. 실행
```bash
npm start
```

## 📋 파일 구조

```
📦 ai-diary
 ┣ 📂 public
 ┃ ┗ 📜 index.html       # 폰트 링크 포함
 ┣ 📂 src
 ┃ ┣ 📜 App.js          # 메인 로직
 ┃ ┗ 📜 App.css         # 스타일
 ┣ 📜 .env              # API 키 (직접 생성)
 ┗ 📜 README.md         # 문서
```

## 🎯 사용 방법

1. **사진 선택** (3장 이상)
2. **기분 선택** (1개)
3. **필기체 선택** (1개)
4. **일기 생성 버튼 클릭**
5. **이미지로 저장**

## 🔧 기술 스택

- **Frontend**: React 18+
- **AI**: Google Gemini 1.5 Flash (v1beta API)
- **Styling**: CSS3 (Glassmorphism, Gradients)
- **Canvas**: HTML5 Canvas API
- **Fonts**: Google Fonts (5가지 한글 필기체)