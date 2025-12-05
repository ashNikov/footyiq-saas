# 🏆 FootyIQ – AI-Powered Football Prediction Engine (DevSecOps SaaS Demo)

[![Live Demo](https://img.shields.io/badge/FootyIQ-Live%20on%20AWS%20CloudFront-success?style=for-the-badge&logo=amazonaws)](https://dze6j0so6waj5.cloudfront.net)
[![Built with AWS Lambda](https://img.shields.io/badge/Serverless-AWS%20Lambda-orange?style=for-the-badge&logo=awslambda)](https://aws.amazon.com/lambda/)
[![Infrastructure-as-Code](https://img.shields.io/badge/IaC-Terraform-blueviolet?style=for-the-badge&logo=terraform)](https://www.terraform.io/)

---

**FootyIQ** is a cloud-native football prediction SaaS built with a real-world DevSecOps architecture.  
It combines a production-ready frontend, a serverless backend, and fully automated AWS infrastructure.

---

## 🧠 Highlights

⚙️ Full-stack cloud architecture  
🛠️ Infrastructure-as-Code (Terraform)  
☁️ AWS Lambda + API Gateway  
🎨 React + Vite + Tailwind Frontend  
🔐 Secure IAM roles & environment management  
🚀 Production deployment via S3 + CloudFront  

---

## 🚀 Live Demo

🌍 **Production (CloudFront)** → [https://dze6j0so6waj5.cloudfront.net](https://dze6j0so6waj5.cloudfront.net)  
🧠 **Backend API (Prod)** →  
`https://kb2d3ll3mg.execute-api.eu-west-1.amazonaws.com/prod/prediction?matchId=rm-barca&risk=balanced`

---

## 🎨 Frontend Features (Implemented)

- ⚽ Clean and fast UI  
- ⚫ Rolling football animation (FootyIQ intro)  
- 💬 AI Prediction Console  
- 🌙 Dark mode layout  
- 🔀 Environment-aware API switching (mock ↔ real)  
- ❗ Error and timeout handling  
- ⚡ Optimized Vite production build  

---

## 🤖 Backend Features (Implemented)

- AWS Lambda (Node.js + TypeScript)  
- Query-based prediction engine (`matchId`, `risk`)  
- Edge %, confidence level, and summary return  
- Structured JSON response contract  
- API Gateway public endpoint  
- CORS enabled for frontend  

---

## ☁️ Infrastructure (Implemented)

- AWS S3 (static hosting)  
- AWS CloudFront (global CDN)  
- AWS Lambda (serverless function)  
- AWS API Gateway (public API route)  
- IAM Role with least privilege  
- Terraform for:
  - Lambda role creation  
  - API Gateway config  
  - Future IaC expansion  

---

## 🏗️ Architecture Diagram (Mermaid)

```mermaid
graph TD
    A[User / Browser] -->|HTTPS| B[CloudFront CDN]
    B --> C[S3 Static Website (Frontend)]
    B -->|API Request| D[API Gateway]
    D --> E[AWS Lambda Function]
    E --> F[(Prediction Engine Logic)]
    F -->|JSON Response| A
📡 API Contract
Example Request

bash
Copy code
GET /prediction?matchId=rm-barca&risk=balanced
Example Response

json
Copy code
{
  "matchId": "rm-barca",
  "risk": "balanced",
  "edge": {
    "edgePercent": 58,
    "confidence": "medium",
    "market": "Over 2.5 goals"
  },
  "explanation": {
    "summary": "La Liga: Over 2.5 goals shows a 58% modelled edge.",
    "bullets": [
      "Match: rm-barca in La Liga.",
      "Balanced risk profile.",
      "Future engine will integrate xG, form, injuries, odds analytics."
    ]
  }
}
🧰 Tech Stack
Frontend

React

Vite

TypeScript

TailwindCSS

Backend

Node.js

TypeScript

AWS Lambda

API Gateway

Infrastructure

AWS S3

AWS CloudFront

AWS IAM

Terraform

📦 Folder Structure
bash
Copy code
footyiq-saas/
│
├── frontend/      # React UI
├── backend/       # Lambda code (TypeScript)
└── infra/
    └── api/       # Terraform IaC
🛣️ Roadmap (Planned Features)
(future work – NOT implemented today)

🔮 AI & Data
ML model for live match prediction

Player-level statistics engine

Real-time odds ingestion

🎯 Frontend
Team analytics dashboard

Match center with live probability updates

⚙️ DevOps
GitHub Actions CI/CD

CloudFront auto-invalidation

Multi-environment infrastructure

Monitoring dashboards (CloudWatch/Grafana)

👤 Author
Uwem Udo (ashNikov)
DevSecOps Engineer • Cloud Engineer • AI-Driven SaaS Builder
