---
order: 1
title: "AJC - 적응형 문서 통합 솔루션"
date: "2025-12-16"
description: "sLLM 기반 전역 문서 실시간 동기화 및 보안 관리 솔루션"
period: "2025.12.16 ~ 2026.02.11 (8주)"
slogan: "Update Once. Sync Everywhere."
badges: ["AI 생산성", "자동 동기화", "보안 거버넌스", "sLLM 최적화"]
github: "https://github.com/SKNETWORKS-FAMILY-AICAMP/SKN19-FINAL-3Team"
image: "/images/projects/ajc/ajc.png"
gallery:
  - "/images/projects/ajc/ajc_1.png"
  - "/images/projects/ajc/ajc_2.png"
  - "/images/projects/ajc/ajc_3.png"
content_type: "portfolio"
public: true
---

## 0. 프로젝트 개요

### 프로젝트 기본 정보
- 프로젝트 명: AJC (Adaptive Joint Document Creator)
- 수행 역할: 리드 아키텍트(Lead Architect) 및 시스템 설계 총괄
- 핵심 기여: AWS 기반 고가용성 인프라 설계, sLLM 및 임베딩 모델 기반 문서 동기화 파이프라인 구축, 정규식 기반 보안 거버넌스 수립

### 기술 스택 (Tech Stack)
- Frontend: Next.js, React, Tailwind CSS, Radix UI
- Backend: FastAPI, Docker, Redis MQ
- AI & Intelligence: Gemma-2b (Summary), PBM/JYP-Embedding, Gemini API, Hugging Face
- Data Management: PostgreSQL, pgvector (Vector Search)
- Cloud Infrastructure: AWS (VPC, Route 53, CloudFront, S3, ALB, ASG, NAT Gateway)

## 1. 기획의도

### 문제정의
- 문서 파편화에 따른 리소스 낭비: 다수 문서의 개별 수정에서 발생하는 업무 비효율 극복 필요
- 보안 거버넌스 공백: 통제되지 않은 외부 생성형 AI 사용에 따른 사내 데이터 유출 및 정보 오염(Hallucination) 방지

### 해결 아이디어
- 단 한 번의 원천 정보 업데이트로 연관 문서 전체의 의미론적 일관성을 실시간 유지하는 "Update Once. Sync Everywhere." 체계를 적응형 동기화 엔진 고안
- 범용 LLM 대비 특정 도메인의 규칙성 준수 및 문체 표현력 극대화를 위한 sLLM(Small LLM) 최적화 모델 활용 및 이를 통한 세밀한 모델 제어 환경 구축
- 정규식 기반의 민감 정보 탐지 및 토큰화(Tokenization) 처리를 통한 원천적인 데이터 유출 방지 및 기업 보안 가이드라인 준수





## 2. 서비스 소개

### 핵심 솔루션
- 사용자 업로드 문서를 맥락에 따라 자체 관리 단위인 **섹션(Section)** 으로 분할 및 데이터베이스 내 독립 객체 전처리
- 섹션별 문체 제외 핵심 내용인 **에센스(Essence)** 생성 및 이를 통한 문서 간 데이터 비교와 실시간 전역 동기화
- 문서 고유 구성 체계인 **레시피(Recipe)** 에 의거한 섹션 재조립 및 원본 형태 완성형 결과물 출력
- 원천 정보 수정 시 연관 문서의 연쇄적 갱신을 통한 "Update Once. Sync Everywhere." 워크플로우 구현

<div style="page-break-before: always;"></div>

### 데이터 동기화 프로세스 시각화

#### 1. 시스템 초기 상태
![시각화_자료_1](/images/projects/ajc/ajc_visual_1.png)

#### 2. 데이터 변동
![시각화_자료_2](/images/projects/ajc/ajc_visual_2.png)

#### 3. 핵심 정보 갱신 및 검증
![시각화_자료_3](/images/projects/ajc/ajc_visual_3.png)

#### 4. 전역 동기화
![시각화_자료_4](/images/projects/ajc/ajc_visual_4.png)


<div style="page-break-before: always;"></div>

## 3. 아이디어 및 해결전략

### 논리적 섹션 분할
- 문장 단위 분해 및 임베딩 유사도 측정 기반의 구조 분석
- 인접 문장 간 컨텍스트 연결 및 재사용 가능 경계 식별

### 정보 추상화 및 에센스 추출
- 섹션 내 문체적 특성 소거 및 핵심 정보 중심의 요약
- 검색 효율 및 정밀도 향상을 위한 벡터 변환과 속성 태그 할당

### 데이터 상태 분류 및 행위 판별
- 유사도 및 맥락 정보를 활용한 4개 범주 분류 로직
- 4개 범주
  - SKIP: 기반의 원천 데이터 유지
  - LINK: 적용을 통한 현재 작업 문서 국소 업데이트
  - MERGE: 가동 기반의 공유 섹션 및 연관 문서 전역 동기화
  - CREATE: 기반의 독립 섹션 신규 등록 및 관리 체계 편입

### 사용자 승인 기반 동기화
- 분류 결과 시각화 및 문서별 적용 여부 검증
- 사용자 확인 절차를 통한 최종 정합성 확보 및 전역 반영

## 4. 기능 소개

### 엔터프라이즈 보안 및 데이터 거버넌스
- 민감 정보 탐지 정책 제어: 정규식(Regex) 기반 민감 데이터 탐지 패턴 설정 및 실시간 정책 업데이트 기능
- 보안 토큰화 및 마스킹: 정규식 매칭을 통한 민감 정보의 고유 식별자 치환 및 외부 AI 모델 전송 시 데이터 유출 원천 차단
- 하이브리드 암호화 아키텍처 적용:
  - 양방향 암호화: 비즈니스 필요에 따른 데이터 복구 및 원본 활용성 확보
  - 단방향 암호화: 고속 검색 및 정합성 검증을 위한 암호화 기반 설계
- 단방향 암호화 기반의 토큰 재사용성 극대화: 동일 데이터에 대한 일관된 단방향 암호화 결과값 활용 및 사전 저장된 암호 토큰의 고속 재사용을 통한 시스템 효율성 증대

### 지능형 문서 검색 및 접근 제어
- 맥락 중심의 하이브리드 검색 엔진: 단순 키워드 매칭과 벡터 유사도 분석을 결합한 하이브리드 검색 기능 지원
- 사용자 권한 기반의 문서 접근 통제: 조직 구조 및 사용자 역할에 따른 문서 열람·수정 권한 관리 및 보안 가이드라인 준수
- 동기화 상태 모니터링: 동기화 프로세스의 진행 상황 및 문서별 데이터 정합성 지표 시각화 대시보드 제공

<div style="page-break-before: always;"></div>

## 5. 시스템 설계

![시스템 설계 아키텍처](/images/projects/ajc/ajc_3.png)

### 전체 아키텍처 및 서비스 인프라 구성
- AWS 기반 계층화 네트워크 설계: VPC 내 Public/Private Subnet 분리를 통한 보안 구역 획정
- Edge Location 기반 정적 리소스 배포: S3, CloudFront, Route 53 연동을 통한 전역 저지연 콘텐츠 전송 인프라 구축
- 트래픽 대응형 리소스 관리: ALB 및 Auto Scaling Group(ASG) 구성을 통한 서비스 가용성 확보

### 기술 스택 및 프레임워크 명세
- API Server (Backend): FastAPI 비동기 프레임워크 및 Controller-Service-Repository 3계층 구조 기반 비즈니스 로직 격리
- Independent AI Server: API 서버와의 물리적 분리를 통한 모델 추론 부하 차단 및 Gemma-2b, PBM 모델 전용 연산 환경 구축
- Async Pipeline: Redis MQ 및 LLM Worker 구조를 통한 서버 간 연산 부하 디커플링
- Role-based Scalability: 서버군별 독립 ASG 배치를 통한 트래픽 및 추론량 기반의 개별 확장 체계

### 데이터 매니지먼트 및 비동기 파이프라인
- 하이브리드 데이터 저장 체계: PostgreSQL과 pgvector 플러그인 통합을 통한 관계형 데이터와 고차원 벡터 데이터의 단일 저장소 관리 및 검색 정밀도 향상
- Redis MQ 기반의 메시지 큐 시스템: 백엔드와 AI 서버 간의 비동기 작업 스케줄링 및 데이터 처리 병목 현상 방지를 위한 Redis 기반 메시지 브로커 도입
- 외부 AI 모델 연동 및 확장성: IGW(Internet Gateway)를 경유한 Gemini API 및 Hugging Face 모델 허브와의 유기적 연동을 통한 최신 사전 학습 모델 활용 환경 구축

<div style="page-break-before: always;"></div>

## 6. 트러블슈팅 및 기술적 난제 해결 (Troubleshooting)

### [Issue 1] 문서 동기화 로직의 개념적 모호성 및 표준 정의 부재
- 현상: '모든 문서의 실시간 업데이트'라는 추상적 목표를 시스템화하기 위한 구체적 아키텍처 및 설계 기준 부재
- 해결: 문서를 논리적으로 분해하고 조립하는 3대 핵심 개념(Section, Essence, Recipe) 독자 고안 및 섹션 간 유사도에 따른 4대 행동 패턴(Skip, Link, Merge, Create) 파이프라인 설계
- 전략: Top-Down 방식의 프로토타입 조기 검증 및 Markdown(MD) 표준 데이터 포맷 채택을 통한 정합성 확보

### [Issue 2] 대규모 언어 모델(LLM) 추론 속도 저하 및 요약 거부 현상
- 현상: 외부 API 의존 시 10초 이상의 지연 발생 및 특정 컨텍스트 하에서의 요약 거부 현상
- 해결: Gemma-2b 기반 자체 파인튜닝 모델 도입 및 규칙 기반 보정 레이어 추가
- 결과: 추론 속도 78% 개선(12.5s → 2.7s) 및 안정적 정보 추출 환경 구현
- 요약 모델 성능 비교 검증 데이터
| 모델 구분 | ROUGE-L (sum) | 응답 시간 | 비고 |
| :--- | :---: | :---: | :--- |
| GPT-4o-mini | 0.38 | 1.7초 | 외부 API 의존성 및 낮은 정확도 |
| Gemma-2-9b-it | 0.47 | 5.6초 | 높은 정확도 대비 높은 리소스 점유 |
| 자체 파인튜닝 모델 (2B) | 0.47 | 5.6초 | 9B 급 성능 유지 및 모델 경량화 달성 |

### [Issue 3] 비동기 메시징 라우팅 결함 및 확장성 제약
- 현상: AI 서버 확장 시 API 서버의 MQ 엔드포인트 식별 불가 및 요청 라우팅 혼선
- 원인: API 서버와 AI 서버가 분리된 아키텍처 환경에서, 초기 확장을 고려하지 않고 MQ를 AI 서버 내부에 종속시킨 설계적 한계 노출
- 해결: AI 서버 Scale-out 시 API 서버가 MQ 엔드포인트를 특정하지 못하는 라우팅 결함 발생. 이에 MQ를 단일 인스턴스(Single Instance) 기반의 독립 허브로 분리하여 Stateless AI 서버 확장성 완전 확보
- 결과: 무상태성(Stateless) 기반 AI 서버 확장성 확보 및 메시지 처리 신뢰성 증대

### [Issue 4] 프로젝트 가속화에 따른 팀 내 커뮤니케이션 병목 및 멘탈리티 저하
- 현상: 신규 개념 구현 과정에서의 구성원 업무 과부하 및 기술적 불확실성 증대로 인한 팀 생산성 저하 우려
- 해결책: 감정적 지적을 배제한 객관적 상황 브리핑 중심의 피드백 루프 가동 및 정기적 태스크 리마인드와 기술적 병목 지점의 직접적 지원(Hands-on Support) 이행
- 결과: 상호 신뢰 기반의 협업 환경 조성 및 안정적인 개발 모멘텀 유지

## 7. 기대효과 및 향후 계획

### 기대효과
- 중복 업무 제거: "Update Once. Sync Everywhere." 구현을 통한 문서 관리 리소스 절감
- 데이터 정합성 보장: 원천 정보(SSOT) 중심 동기화를 통한 전사 자산의 무결성 확보
- 보안 거버넌스 준수: 정규식 기반 토큰화 및 폐쇄형 sLLM 운영을 통한 데이터 유출 차단

### 향후 계획
- 멀티모달 객체 분석: 이미지, 도표 등 비정형 객체 처리를 위한 시각 언어 모델 도입
- 문서 포맷 호환성 확장: PDF, Docx 등 범용 문서 포맷 대상 입출력 변환 모듈 고도화
- 협업 생태계 연동: 실시간 공동 편집 및 타 엔터프라이즈 솔루션(Slack, Confluence) 연동