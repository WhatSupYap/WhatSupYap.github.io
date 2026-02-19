# 이력서 & 포트폴리오 웹사이트 (Resume Site)

Next.js로 제작된 개인 이력서 및 포트폴리오 웹사이트입니다. GitHub Actions를 통해 GitHub Pages로 자동 배포되도록 구성되어 있습니다.

## 🚀 배포 방법 (Deployment)

이 프로젝트는 **GitHub Actions**를 사용하여 자동 배포됩니다.
별도의 빌드 명령어를 실행해서 결과물을 올릴 필요가 **없습니다**.

1. 작업한 소스 코드를 `main` 브랜치에 **Push** 합니다.
2. GitHub Actions가 자동으로 빌드(`npm run build`)를 수행합니다.
3. 빌드된 결과물이 `gh-pages` 환경에 배포됩니다.
4. 배포 주소: [https://whatsupyap.github.io](https://whatsupyap.github.io)

### 주의사항
- `resume-site/out` 폴더는 깃에 올리지 않습니다. (`.gitignore`에 포함됨)
- `source` 폴더(참고용 원본 자료)는 깃에 올리지 않습니다.

---

## 💻 로컬 실행 방법 (Local Development)

내 컴퓨터에서 미리보기를 하려면 다음 절차를 따르세요.

### 1. 필수 프로그램
- [Node.js](https://nodejs.org/) (v20 이상 권장)

### 2. 실행 명령어

터미널(PowerShell 등)을 열고 다음 명령어를 순서대로 실행하세요.

```bash
# 1. 프로젝트 폴더로 이동
cd resume-site

# 2. 패키지 설치 (최초 1회만 실행)
npm install

# 3. 개발 서버 실행
npm run dev
```

서버가 실행되면 브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하여 확인할 수 있습니다.

---

## 📂 프로젝트 구조

```
career/
├── .github/workflows/deploy.yml  # GitHub Actions 배포 설정
├── resume-site/                  # 웹사이트 소스 코드
│   ├── app/                      # 페이지 및 라우팅
│   ├── components/               # UI 컴포넌트
│   ├── content/                  # 이력서 마크다운 파일들
│   └── public/                   # 이미지 등 정적 파일
├── source/                       # (Git 제외) 원본 참고 자료
└── README.md                     # 설명서
```
