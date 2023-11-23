---
title: DevOps Engineer 성장기 1
date: 2023-11-13 09:00:00 +0900
categories: [DevOps, Self-development]
tags: [DevOps, 데브옵스, Self-development, 자기개발]     # TAG names should always be lowercase
pin: true
#math: true
#mermaid: true
image:
  path: https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Devops-toolchain.svg/220px-Devops-toolchain.svg.png
  lqip: https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Devops-toolchain.svg/220px-Devops-toolchain.svg.png # or base64 URI
---

# 애매한 구식 개발자의 개발인생 2막 - 1

## 나는 애매한 구식 개발자다

나는 C#, ASP.NET, EAI(Biztalk) 개발자다. 2010-2016까지는 SI 개발을 2017-2022년 SM 개발자로 일했다. 닷넷 개발자 입장에서 JAVA 천국인 한국에서는 개발중에 신기술을 겪어볼일도 별로 없었다. git, docker, ci/cd 이것들도 최근 2년간 알게 되었고 심지어 개발중에 배포도 직접 개발/운영서버에 FTP로 올렸다.

더 이상 개발자로써 도태되는 자신을 참을 수도 없고 가지고 있는 기술로는 더 이상 벌어먹고 살 수 없을것 같아서 새로운 길을 알아보던 중 지인을 통해 `DevOps`라는 길이 있다는 것을 알게 되었다.

개념적으로 잘 모르겠는 분야라 무작정 추천 받은 `AWS SAA` (Solution Architect Associate) 자격증을 공부하기 시작했는데 모르는 단어가 너무 많아 개념부터 잡아가본다.

## 그래서 DevOps가 뭘까?

[**위키피티아: 데브옵스**](https://ko.wikipedia.org/wiki/%EB%8D%B0%EB%B8%8C%EC%98%B5%EC%8A%A4)
> 데브옵스(DevOps)는 소프트웨어의 개발(Development)과 운영(Operations)의 합성어로서, 소프트웨어 개발자와 정보기술 전문가 간의 소통, 협업 및 통합을 강조하는 개발 환경이나 문화를 말한다. 데브옵스는 소프트웨어 개발조직과 운영조직간의 상호 의존적 대응이며 조직이 소프트웨어 제품과 서비스를 빠른 시간에 개발 및 배포하는 것을 목적으로 한다.

![Desktop View](/assets/img/jjal/Thinking_Face_Emoji.webp){: width="150" height="150" .normal}

아직 판단이 잘 안되서 연관으로 등장한 문서들을 읽어봤다. [**애자일**](https://ko.wikipedia.org/wiki/%EC%95%A0%EC%9E%90%EC%9D%BC_%EC%86%8C%ED%94%84%ED%8A%B8%EC%9B%A8%EC%96%B4_%EA%B0%9C%EB%B0%9C), [**폭포수모델**](https://ko.wikipedia.org/wiki/%ED%8F%AD%ED%8F%AC%EC%88%98_%EB%AA%A8%EB%8D%B8)...

내가 일해오던 방식이 폭포수 모델 방식이라는 것을 알았다. 그리고 애자일을 문서를 읽고 좀 전의 데이옵스 문서까지 읽고 애자일 방식은 나에겐 이렇게 느껴졌다.

나눠진 과정을 통폐합 하자는 거네?
{: .monologue}

대략 통폐합 하자는건 알겠다. 근데 왜 개발 방법론으로 애자일 방식으로 변화해 가는가 스스로 생각해 보았다.

1. 객체지향 언어
2. 오픈소스
3. 온라인화
4. 클라우드
5. 가상화

객체지향 언어를 통해 여러 기능들을 모듈화 할 수 있으니 한 사람이 모든 내용을 통째로 이해할 필요가 없어졌다. 또한 오픈소스이기 때문에 항상 취약점이나 개선사항을 쉽게 습득 할 수 있다. 온라인화는 사용자 서비스 제공자 개발자 모두에게 편리성을 제공해 주었다. 클라우드는 서비스 제공자와 개발자가 서버를 소유하지 않아도 서비스를 제공할 수 있게 되었다는 것이다. 마지막으로 가상화는 물리적 장치가 아닌 물리적 장치위에 여러 논리적 장치를 만들어놓는 것이라 말할 수 있겠다. 아날로그에서 디지털로, 오프라인에서 온라인으로, 서비스의 시간과 공간의 제약을 없앴다는 것이다.