---
title: AWS Integraion & Messaging
date: 2023-12-21 14:24:00 +0900
categories: [자격증]
tags: [AWS, SAA, Solution Architect Associate, 자기개발]     # TAG names should always be lowercase
pin: false
#math: true
#mermaid: true
image:
  path: https://img-b.udemycdn.com/course/750x422/4389576_a7d6_9.jpg
  lqip: https://img-b.udemycdn.com/course/240x135/4389576_a7d6_9.jpg # or base64 URI
---

# AWS Intgration & Messaging (SQS, SNS & Kinesis)

## Section Introduction

<details>
<summary>모르는 단어</summary>

<blockquote class="prompt-tip"><p>inevitabley: [인'에비더블리] 필연적이다시피, 아니나 다를까</p></blockquote>
<blockquote class="prompt-tip"><p>Queue: [큐] 대기열</p></blockquote>
</details>

- When we start deploying multiple applications, they will inevitabley need to communicate with one another
- There are two patterns of application communication
![image-001](/assets/img/post/20231221/001.PNG)
- Synchronous between applications can be problematic if there are sudden spikes of trafiic
- What if you need to suddenly encode 1000 videos but usually it's 10?

- In that case, it's better to decouple your applications,
  - using SQS: Queue model
  - using SNS: pub/sub model
  - using Kinesis: real-time streaming model
- These services can scale independently from our application!