---
order: 3
title: "넷플릭스 구독 이탈 예측"
period: "2025.10.01 ~ 2025.10.15 (2주)"
description: "ML 모델(LightGBM) 학습을 위한 안정적인 데이터 파이프라인 구축 및 대용량 피처(Feature) 엔지니어링 수행"
content_type: "portfolio"
public: true
badges: ["Precision 96%", "XGBoost", "Data Analysis"]
github: "https://github.com/SKNETWORKS-FAMILY-AICAMP/SKN19-2nd-3Team"
image: "/images/projects/netflix_churn/main.png"
thumbnail: "/images/projects/netflix_churn/thumbnail.png"
gallery:
  - "/images/projects/netflix_churn/1.png"
  - "/images/projects/netflix_churn/2.png"
  - "/images/projects/netflix_churn/3.png"
---

# 넷플릭스 구독 이탈 예측 프로젝트

> **구독 경제의 핵심, 이탈률 방어**  
> 데이터 기반으로 고객 이탈 징후를 사전에 포착하고 방어 전략을 수립합니다.

## 핵심 성과
- **높은 정밀도**: LightGBM 모델을 사용하여 **정밀도(Precision) 96%**를 달성했습니다.
- **인사이트 도출**: 요금 부담률, 고객 문의 수, 특정 연령대 등 이탈에 영향을 미치는 핵심 요인을 규명했습니다.
- **시각화**: Streamlit 대시보드를 통해 이탈 확률을 시각적으로 제공합니다.

## 나의 역할
- **EDA 및 전처리**: 결측치와 이상치를 처리하고 데이터를 정제했습니다.
- **피처 엔지니어링**: 소득 대비 요금 부담률(Price_Burden_Ratio), 가성비 만족도(Satisfaction_per_Dollar) 등 파생 변수를 생성하여 모델 성능을 높였습니다.
- **모델링**: **LightGBM**의 하이퍼파라미터를 튜닝하여 최적의 예측 모델을 만들었습니다.

## 기술 스택
- **Data**: Pandas, NumPy
- **ML**: Scikit-learn, LightGBM
- **Viz**: Matplotlib, Seaborn, Streamlit
