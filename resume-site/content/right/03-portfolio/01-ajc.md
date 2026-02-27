---
order: 1
title: "AJC - 적응형 문서 통합 솔루션"
date: "2025-12-16"
description: "sLLM 기반 전역 문서 실시간 동기화 및 관리 솔루션"
period: "2025.12.16 ~ 2026.02.11 (8주)"
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

## 1. 프로젝트 개요

### 기본 정보
- **프로젝트 명**: AJC (Adaptive Joint Document Creator)
- **수행 역할**: 리드 아키텍트(Lead Architect) 및 시스템 설계 총괄
- **핵심 기여**: AWS 고가용성 인프라 설계, sLLM/임베딩 모델 기반 문서 동기화 파이프라인 구축, 정규식 기반 보안 정책 수립

### 기술 스택
- **Frontend**: Next.js, React, Tailwind CSS, Radix UI
- **Backend**: FastAPI, Docker, Redis MQ
- **AI / Data**: Gemma-2b, PBM/JYP-Embedding, PostgreSQL, pgvector
- **Infrastructure**: AWS (VPC, Route 53, CloudFront, S3, ALB, ASG, NAT Gateway)

<!-- --- -->

## 2. 문제 정의 및 해결 전략

### 문제 정의
- **데이터 파편화**: 다수 연관 문서의 수동 업데이트로 인한 리소스 낭비 및 정합성 오류 발생
- **보안 리스크**: 외부 생성형 AI 사용에 따른 기업 민감 데이터 유출 및 할루시네이션(Hallucination) 우려

### 해결 전략
- **전역 동기화 파이프라인**: 단일 원천 데이터(SSOT) 갱신 시 연관 문서 전체를 동기화하는 자동화 엔진 구축
- **폐쇄형 sLLM 최적화**: 특정 도메인에 최적화된 소형 언어 모델(sLLM) 도입으로 데이터 외부 유출 차단 및 모델 제어력 확보
- **토큰화 기반 데이터 마스킹**: 정규식 패턴을 활용한 민감 정보 식별 및 토큰화 처리로 원천적 보안성 강화

### 핵심 서비스 워크플로우 (Workflow)

1. **시스템 초기 상태**: 원본 정책 문서와 타겟 문서 간의 링크 및 에센스 형성
![시각화_자료_1](/images/projects/ajc/ajc_visual_1.png)

2. **원천 데이터 변동**: 정책 문서 내 특정 섹션의 내용 업데이트 발생 (7월 → 8월)
![시각화_자료_2](/images/projects/ajc/ajc_visual_2.png)

3. **핵심 정보 갱신 및 검증**: sLLM을 통한 변경된 섹션의 에센스 재추출 및 맥락 검증
![시각화_자료_3](/images/projects/ajc/ajc_visual_3.png)

4. **전역 동기화 완료**: 변경된 에센스를 바탕으로 구독 중인 모든 타겟 문서의 섹션 자동 동기화 적용
![시각화_자료_4](/images/projects/ajc/ajc_visual_4.png)

<!-- --- -->

## 3. 기술적 의사결정 (Architecture Decision)

### 비즈니스 검증 및 전체 흐름 설계를 위한 TOP-DOWN 설계
- **의사결정 배경**: sLLM 학습 완료 시점까지의 개발 병목(Bottleneck) 제거 및 병렬 개발 환경 확보.
- **적용 결과**: 상용 LLM을 우선 연동하여 전역 문서 동기화 비즈니스 파이프라인의 동작 환경 선행 구축. 이후 선행 모델이 수행한 문서 분할 및 요약 결과물을 자체 sLLM 파인튜닝을 위한 고품질 학습 데이터셋으로 재활용. 비즈니스 로직 검증과 모델 파인튜닝을 병렬 수행한 뒤, 자체 sLLM으로 핵심 컴포넌트를 점진적 교체하여 개발 리드 타임 단축 및 도메인 최적화 동시 완수.

### 마크다운(Markdown) 기반 내부 표준 포맷(Canonical Data Model) 도입
- **의사결정 배경**: 이기종 문서 포맷(Word, PDF 등)을 sLLM이 처리하도록 학습시킬 경우, 포맷별 구문 분석(Parsing)을 위한 막대한 학습 데이터 및 모델 복잡도 상승 문제 대두.
- **적용 결과**: LLM의 구조적 이해도가 가장 높은 마크다운(Markdown)을 시스템 내부 코어 로직의 단일 표준 데이터 포맷으로 채택. sLLM의 학습 범위를 단일 포맷으로 한정하여 필요 학습량 최소화. 외부 이기종 포맷은 시스템 양 끝단의 변환 레이어(Convert-in / Convert-out)에서만 전담하고, 내부 핵심 동기화 엔진은 순수 마크다운 처리에만 집중.

## 4. 핵심 아키텍처 및 파이프라인

### 데이터 추상화 및 처리 구조
내부적으로 정의된 논리적 단위(Section, Essence, Recipe)를 범용 구조로 매핑하여 파이프라인 구성.
- **Section (Document Chunk)**: 사용자 업로드 문서의 맥락 기반 분할 및 독립 객체화
- **Essence (Vector Embedding & Summary)**: 청크 내 핵심 정보 요약 및 벡터 변환. 문서 간 동기화 및 비교를 위한 기준 데이터 역할 수행
- **Recipe (Document Schema)**: 단위 청크 재조립을 위한 문서 고유의 템플릿 구조 체계

### 데이터 상태 판별 및 전역 동기화
유사도 측정을 통해 4가지 상태로 분류 후 비동기 처리.
- **SKIP**: 기존 원천 데이터 유지
- **LINK**: 현재 작업 중인 문서의 국소 업데이트 적용
- **MERGE**: 공유 데이터 변경에 따른 연관 문서 전체의 전역 동기화 트리거
- **CREATE**: 신규 독립 청크 생성 및 데이터베이스 편입

### 주요 기능 사양
- **보안 및 접근 제어**: 양방향/단방향 하이브리드 암호화 아키텍처 적용, 암호화 토큰 재사용을 통한 시스템 부하 최소화, 사용자 권한(RBAC) 기반 문서 접근 통제
- **하이브리드 검색 엔진**: 단순 키워드 및 고차원 벡터 유사도를 결합한 문서 검색 정밀도 향상

<!-- --- -->

## 5. 시스템 인프라 및 설계

![시스템 설계 아키텍처](/images/projects/ajc/ajc_3.png)

### AWS 클라우드 인프라
- **네트워크 분리**: VPC 내 Public/Private Subnet 격리를 통한 데이터베이스 및 내부 로직 보안 구역 획정
- **가용성 및 분산**: ALB 및 Auto Scaling Group(ASG) 구성을 통한 트래픽 대응, S3/CloudFront 연동으로 프론트엔드 정적 리소스 배포 최적화

### 애플리케이션 및 데이터 레이어
- **서버 디커플링 (Decoupling)**: FastAPI 기반 API 서버와 AI 모델 추론 서버의 물리적 분리 구조 채택
- **비동기 큐 (Message Queue)**: Redis MQ 도입을 통한 백엔드-AI 서버 간 연산 부하 분산 및 병목 방지
- **하이브리드 DB**: PostgreSQL + pgvector 플러그인을 통합하여 관계형 메타데이터와 벡터 데이터의 단일 저장소 운용

<!-- --- -->

## 6. 트러블슈팅 (Troubleshooting)

### [Issue 1] 비정형 문서 동기화 로직의 아키텍처 추상화 한계
- **현상**: '문서 실시간 동기화'라는 추상적 요구사항을 시스템 콤포넌트로 구현하기 위한 논리적 기준 부재
- **해결**: 데이터를 청크(Section), 임베딩 요약본(Essence), 조립 스키마(Recipe) 3단계로 구조화. 상태 유사도에 따른 4대 분기(Skip, Link, Merge, Create) 파이프라인 설계
- **결과**: Markdown 포맷 기반의 일관성 있는 문서 분해/조립 정합성 확보

### [Issue 2] 외부 LLM 의존에 따른 추론 지연 및 품질 저하
- **현상**: 외부 API(GPT-4o-mini 등) 연동 시 평균 10초 이상의 지연 발생 및 특정 맥락 요약 거부 현상 확인
- **해결**: 자체 파인튜닝된 경량 모델(Gemma-2b) 및 전용 AI 서버 도입
- **결과**: 추론 속도 78% 개선(12.5s → 2.7s), 9B 모델(Gemma-2-9b-it)과 동일 수준의 정확도(ROUGE-L 0.47) 달성

### [Issue 3] AI 서버 확장 시 비동기 메시지 라우팅 결함
- **현상**: AI 서버 인스턴스 Scale-out 시, API 서버가 대상 MQ 엔드포인트를 식별하지 못해 작업 요청 유실
- **해결**: AI 서버 내부에 종속되어 있던 MQ 구조를 단일 인스턴스 기반의 독립 메시지 브로커(Hub)로 분리 아키텍처 변경
- **결과**: AI 서버의 무상태성(Stateless) 확보를 통한 완전한 수평적 확장성(Scale-out) 구현 및 메시지 유실률 0% 달성

<!-- --- -->

## 7. 기대효과

- **SSOT 기반 정합성 보장**: 원천 정보 갱신에 따른 연관 문서 전역 동기화로 엔터프라이즈 자산의 무결성 확보
- **데이터 보안 거버넌스 확립**: 폐쇄형 sLLM 아키텍처 및 정규식 마스킹을 통한 사내 데이터의 외부 유출 원천 차단