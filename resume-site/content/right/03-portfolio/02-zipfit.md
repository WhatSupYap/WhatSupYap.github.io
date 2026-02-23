---
order: 2
title: "ZIPFIT - 공공주택 AI 에이전트"
period: "2025.11.26 ~ 2025.12.17 (3주)"
description: "복잡한 공공주택 공고문을 LLM과 RAG로 분석하여, 사용자 조건에 맞는 맞춤형 주거 정보를 대화형으로 제공하는 AI 서비스."
content_type: "portfolio"
public: true
badges: ["LangGraph", "State Management", "Chatbot"]
slogan: "공공주택 정보의 원스톱 서비스"
github: "https://github.com/SKNETWORKS-FAMILY-AICAMP/SKN19-4th-4Team"
image: "/images/projects/zipfit/zipfit.png"
# thumbnail: "/images/projects/zipfit/zipfit.png"
gallery:
  - "/images/projects/zipfit/zipfit_1.jpg"
  - "/images/projects/zipfit/zipfit_2.jpg"
  - "/images/projects/zipfit/zipfit_3.png"
---

# ZIPFIT(집핏) - 나에게 딱 맞는 공공주택 찾기

> **공공주택 정보의 원스톱 서비스**  
> 복잡하고 찾기 어려운 공공주택 공고를 AI 상담사가 쉽고 정확하게 안내해줍니다.

## 핵심 기능
- **AI 상담**: 자연어 대화를 통해 사용자의 상황에 맞는 공고를 찾아줍니다.
- **맥락 유지 (Context Awareness)**: **LangGraph**를 활용하여 대화의 흐름(검색 -> 선택 -> 상세 -> 비교)을 끊김 없이 유지합니다.
- **RAG 검색**: 비정형 데이터인 공고문 파일(PDF 등)을 이해하고 정확한 답변을 제공합니다.

## 나의 역할
- **백엔드 개발**: Django REST API 서버를 구축하고 PostgreSQL 데이터베이스를 설계했습니다.
- **AI 로직 설계**: **LangGraph**를 사용하여 5가지 사용자 의도(검색, 선택, 상세, 비교, 잡담)를 분류하고 처리하는 상태 머신을 구현했습니다.
- **최적화**: **LangGraph 상태 관리(State Management)**를 도입하여 기존 4~5회 낭비되던 LLM API 호출을 1회로 압축, API 호출 비용(Cost) 절감 및 응답 지연 시간(Latency) 대폭 최적화

## 기술 스택
- **Core**: Python, OpenAI API
- **AI**: LangGraph, RAG, Rerank
- **Backend**: Django, Nginx, Gunicorn
- **DB**: PostgreSQL
