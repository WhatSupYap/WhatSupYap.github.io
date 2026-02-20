# Portfolio Revamp Implementation Plan

This plan details the steps required to transition the portfolio site from a "13-year Enterprise C# Backend Developer" focus to an "AI Backend Developer & MLOps Engineer" focus, as requested.

## Proposed Changes

### Content Updates (Markdown)

#### [MODIFY] [01-profile.md](file:///c:/DEV/career/resume-site/content/left/01-profile.md)
- Update main summary title and description to reflect an MLOps and AI Backend focus.
- Change text to: "13년의 대규모 엔터프라이즈 서버 구축(C#) 노하우를 바탕으로, 병목 없는 Python AI 모델 서빙 아키텍처와 최적화된 데이터 파이프라인을 설계합니다."

#### [MODIFY] [01-about-me.md](file:///c:/DEV/career/resume-site/content/right/01-intro/01-about-me.md)
- Ensure the intro text aligns with the AI Backend & MLOps focus.

#### [MODIFY] [02-skills.md](file:///c:/DEV/career/resume-site/content/left/02-skills.md)
- Reorder technical skills: move AI/MLOps & Python to the top.
- Refactor the C#/ASP.NET section to the bottom under **'Enterprise Foundation'**.
- Add specified AI/MLOps keywords (FastAPI, LangGraph, RAG, AWS, PostgreSQL, sLLM, etc.).

#### [MODIFY] [01-ajc.md](file:///c:/DEV/career/resume-site/content/right/03-portfolio/01-ajc.md)
- Emphasize Microservices (MSA) and Serving.
- Add text: "FastAPI를 활용해 일반 API 서버와 AI 추론 전용 서버를 완벽히 분리(Decoupling)하여, 무거운 sLLM 추론 부하가 메인 서버에 영향을 주지 않는 안정적인 서빙 환경 구축"

#### [MODIFY] [02-zipfit.md](file:///c:/DEV/career/resume-site/content/right/03-portfolio/02-zipfit.md)
- Emphasize cost/speed optimization.
- Add/update text: "LangGraph 상태 관리(State Management)를 도입하여 기존 4~5회 낭비되던 LLM API 호출을 1회로 압축, API 호출 비용(Cost) 절감 및 응답 지연 시간(Latency) 대폭 최적화"

#### [MODIFY] [03-churn.md](file:///c:/DEV/career/resume-site/content/right/03-portfolio/03-churn.md)
- Change text focus from simple analysis to building a data pipeline.
- Change text to: "ML 모델(LightGBM) 학습을 위한 안정적인 데이터 파이프라인 구축 및 대용량 피처(Feature) 엔지니어링 수행"

---

### UI / UX / Styling

#### [MODIFY] Sidebar component ([Sidebar.tsx](file:///c:/DEV/career/resume-site/components/Sidebar.tsx))
- Apply an Accordion (folding) UI for the left sidebar profile section on mobile (`md` breakpoint or below).
- Add a "프로필 더 보기 ▼" (View more profile) button to toggle visibility for excessive content on small screens.

#### [MODIFY] Badge Rendering Logic
- Implement conditional styling for `badges`.
- **CRITICAL**: When checking badge names, always convert both the data and the target keyword to lowercase (e.g., using `.toLowerCase()`) to prevent matching bugs caused by mixed case (e.g., "Python" vs "python").
- AI/Infra stack (Python, FastAPI, AWS, Docker, LangGraph, RAG, LLM): Apply a highly visible color (e.g., dark blue/purple background).
- Legacy stack (C#, ASP.NET, Windows Server): Apply a calm, slate/gray background so as not to draw too much attention.

#### [MODIFY] [globals.css](file:///c:/DEV/career/resume-site/app/globals.css)
- Optimize `@media print` section.
- Add a rule to disable text-decoration for all `<a>` tags (`a { text-decoration: none !important; }`).

---

### Configuration & Bug Fixes

#### [MODIFY] [package.json](file:///c:/DEV/career/resume-site/package.json)
- Update build script to safely generate the `.nojekyll` file in the `out` directory to fix GitHub pages 404 errors and missing images.
- Existing `next.config.ts` already contains `images: { unoptimized: true }`, so only the `.nojekyll` pipeline fix is necessary.

## Verification Plan

### Automated / Manual Verification
1. **Content Verification:** Review the running localhost (`npm run dev`) to ensure Markdown content correctly renders the new MLOps-focused text.
2. **Badge Styling:** View a project detail page (e.g., AJC or ZIPFIT) and verify identical AI badges are dark blue/purple, while C#/Enterprise Foundation tags are slate/gray.
3. **Responsive Design (Mobile LNB):** Resize the browser window to mobile width (`< 768px`) and ensure the sidebar profile content is hidden behind the accordion until clicked.
4. **Print Output:** Use browser print preview (`Ctrl+P`) to verify that hyperlinks do not show underlines and the layout fits standard A4 without tearing elements.
5. **Build Process:** Run `npm run build` locally and verify that the `out/.nojekyll` file is generated without errors.
