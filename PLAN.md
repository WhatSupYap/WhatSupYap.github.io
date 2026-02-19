# 🚀 Next.js 기반 정적 이력서 (Git Blog) 구축 계획서

## 1. 프로젝트 개요

* **목표:** Markdown 기반의 고정 레이아웃 이력서 및 포트폴리오 사이트 구축
* **배포:** **GitHub Pages (Git Blog)**를 통한 정적 호스팅
* **핵심 구조:** - 좌측(300px 고정) : 우측(1fr) 비율의 2컬럼 레이아웃
* 파일 시스템 기반 동적 렌더링 (`content/left`, `content/right`)
* Frontmatter의 `order` 필드를 기준으로 정렬



## 2. 기술 스택 및 배포 환경

* **Framework:** Next.js (App Router, Static Export 모드)
* **Styling:** Tailwind CSS, `@tailwindcss/typography`
* **Content:** `gray-matter`, `remark`/`rehype`
* **Deployment:** GitHub Actions를 활용한 **GitHub Pages** 배포

## 3. 마크다운 표준 규칙 (Frontmatter Spec)

모든 `.md` 파일은 상단에 아래 규칙을 정의함.

```markdown
---
title: "AJC: AI 기반 적응형 문서 관리 솔루션"
order: 1              # 정렬 순서 (낮을수록 상단)
date: "2025-12-16"
period: "2025.12.16 ~ 2026.02.11 (8주)"
GitHub: "[Link](https://github.com/...)"
Image: "/images/projects/ajc.png"
Gallery: 
  - "/images/projects/ajc_1.png"
  - "/images/projects/ajc_2.png"
public: true          # true인 경우만 렌더링
---

```

## 4. 폴더 및 파일 로드 로직

* **위치 기반:** `content/left` 파일은 좌측 LNB, `content/right` 파일은 우측 메인에 배치.
* **렌더링 분기:**
* **파일(.md):** 마크다운 내용을 HTML로 변환하여 즉시 렌더링.
* **폴더:** 폴더 내부에 `public: true`인 파일이 있을 때만 섹션 타이틀로 표시하고 내부 파일들을 카드 리스트로 렌더링 (빈 폴더는 무시).


* **정렬:** 모든 요소는 Frontmatter의 `order` 값을 기준으로 오름차순 정렬.

## 5. GitHub Pages 배포 설정

* **Static Export:** `next.config.js`에서 `output: 'export'` 설정.
* **Image Optimization:** GitHub Pages는 Next.js 기본 이미지 최적화를 지원하지 않으므로 `unoptimized: true` 설정 필요.
* **Base Path:** `username.github.io/repo-name/` 형태일 경우 경로 매핑 필요.

## 6. 바이브 코딩 단계별 프롬프트

### Step 1: 프로젝트 및 파서 세팅

> "Next.js 프로젝트를 생성하고 `content/left`, `content/right` 폴더를 만들어줘. `lib/markdown.ts`에서 `fs`와 `gray-matter`를 사용해 파일을 읽어오되, Frontmatter의 `order` 필드로 정렬하고 `public: true`인 것만 필터링하는 함수를 작성해줘. 폴더가 비어있으면 무시해야 해."

### Step 2: 3:7 레이아웃 및 메인 페이지

> "`app/page.tsx`에 3:7 비율(좌측 300px 고정) 레이아웃을 구성해줘. `left` 데이터는 좌측에, `right` 데이터는 우측에 정렬 순서대로 렌더링해줘. 파일은 본문을 보여주고 폴더는 리스트 형태로 보여줘."

### Step 3: 상세 페이지 및 이미지 처리

> "`app/portfolio/[slug]/page.tsx` 상세 페이지를 만들고 마크다운의 `Image`와 `Gallery` 필드를 활용해 상단 이미지 영역을 구성해줘. `@media print` 시 레이아웃 최적화 스타일도 추가해줘."

### Step 4: GitHub Pages 배포 설정

> "GitHub Pages에 배포할 수 있도록 `next.config.js`를 `output: 'export'` 모드로 설정하고, 이미지 최적화를 비활성화해줘. 그리고 배포를 위한 GitHub Actions 워크플로우(`deploy.yml`) 파일도 작성해줘."
