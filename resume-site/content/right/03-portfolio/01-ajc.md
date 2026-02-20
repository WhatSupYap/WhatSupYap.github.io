---
order: 1
title: "AJC - AI 기반 적응형 문서 생성 시스템"
date: "2025-12-16"
description: "sLLM과 RAG 기술을 활용하여 흩어진 문서를 자동으로 동기화하고 최신 상태로 유지하는 AI 시스템."
period: "2025.12.16 ~ 2026.02.11 (8주)"
slogan: "Update Once. Sync Everywhere."
badges: ["sLLM", "지식증류", "RAG", "Semantic Chunking"]
github: "https://github.com/SKNETWORKS-FAMILY-AICAMP/SKN19-FINAL-3Team"
image: "/images/projects/ajc/ajc.png"
gallery:
  - "/images/projects/ajc/ajc_1.png"
  - "/images/projects/ajc/ajc_2.png"
  - "/images/projects/ajc/ajc_3.png"
content_type: "portfolio"
public: true
---

# AJC - AI 기반 적응형 문서 생성 시스템

> **"Update Once. Sync Everywhere."**  
> 지식의 파편화 문제와 수동 동기화의 번거로움을 해결하기 위해, 문서 간 연관성을 분석하고 자동으로 병합/업데이트 제안을 하는 시스템입니다.

## 핵심 기능
1.  **자동 병합 (Auto-Merge)**: 문서 수정 시, 의미적으로 연결된 다른 문서들을 찾아 자동으로 수정 사항 반영을 제안합니다.
2.  **지식 자동화**: **Semantic Chunking**과 **RAG**를 활용하여 방대한 문서에서 필요한 정보를 정확하게 검색합니다.
3.  **보안 강화**: **온프레미스 sLLM**을 구축하여 기업 내부 데이터의 외부 유출을 원천 차단합니다.
4.  **풀스택**: Next.js 프론트엔드 + FastAPI 백엔드 + Python AI 마이크로서비스 구조.

## 나의 역할
- **백엔드 & AI 아키텍처**: **FastAPI**를 활용해 일반 API 서버와 AI 추론 전용 서버를 완벽히 분리(Decoupling)하여, 무거운 sLLM 추론 부하가 메인 서버에 영향을 주지 않는 안정적인 서빙 환경 구축
- **데이터 엔지니어링**: GitHub 오픈소스 등에서 123MB의 IT 문서를 수집하고 민감정보를 마스킹한 후, 학습용 문장 쌍 6,000개를 생성했습니다.
- **모델 최적화 (Fine-tuning)**: **Gemma-2-9B** 모델을 파인튜닝하고, 이를 **2B 모델로 지식 증류(Knowledge Distillation)**하여 운영 비용을 절감했습니다.
- **RAG 파이프라인**: Semantic Chunking을 적용하여 검색 정확도를 높였습니다.

## 기술 스택
- **AI/ML**: Google Gemma-2-9B/2B, Knowledge Distillation, RAG, Fine-tuning
- **Backend**: FastAPI, Python, PostgreSQL
- **Frontend**: Next.js (TypeScript)
- **Infra**: AWS (Cloud Deployment)
