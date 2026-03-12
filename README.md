# Climbing

클라이밍짐 정보 웹앱 (데이터 크롤러 포함)

## 기술 스택

![Next.js](https://img.shields.io/badge/Next.js_15-000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?logo=react&logoColor=black)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)

## 주요 기능

- Supabase 기반 클라이밍짐 데이터 관리
- Puppeteer 기반 웹 크롤러로 짐 정보 수집
- OpenAI API 연동 (데이터 가공/분석)
- Firebase 푸시 알림 (FCM)
- React Three Fiber 3D 효과
- GSAP 애니메이션
- PWA 지원 (next-pwa)
- Swiper 슬라이드 UI

## 실행 방법

```bash
npm install
npm run dev
```

`.env` 파일에 Supabase, Firebase, OpenAI 인증 정보 설정 필요
