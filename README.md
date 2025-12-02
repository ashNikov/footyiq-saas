🏆 FootyIQ – AI-Powered Football Prediction Engine (DevSecOps SaaS Demo)

FootyIQ is a cloud-native football prediction SaaS built with a real-world DevSecOps architecture.
It combines a production-ready frontend, a serverless backend, and fully automated AWS infrastructure.

This project demonstrates hands-on skills across:

⚙️ Full-stack cloud architecture

🛠️ Infrastructure-as-Code (Terraform)

☁️ AWS Lambda + API Gateway

🎨 React/Vite/Tailwind Frontend

🔐 Secure IAM roles & environment management

🚀 Production deployment on S3 + CloudFront

🚀 Live Demo

- 🌍 **Production (CloudFront)**: https://dze6j0so6waj5.cloudfront.net

[![Live - CloudFront](https://img.shields.io/badge/FootyIQ-Live%20Demo-success)](https://dze6j0so6waj5.cloudfront.net)


https://d2vtfxd9w08enj.cloudfront.net

Backend API
https://4wq975jxo0.execute-api.eu-west-1.amazonaws.com/prediction?matchId=rm-barca&risk=balanced

🎨 Frontend Features (Implemented)

⚽ Clean and fast UI

⚫ Rolling football animation (FootyIQ intro)

💬 AI Prediction Console

🌙 Dark mode layout

🔀 Environment-aware API switching (mock ↔ real)

❗ Error and timeout handling

⚡ Production build (Vite)

🤖 Backend Features (Implemented)

AWS Lambda (Node.js + TypeScript)

Query-based prediction engine (matchId, risk)

Edge %, confidence level, and summary return

Structured JSON response contract

API Gateway public endpoint

CORS enabled for frontend

☁️ Infrastructure (Implemented)

AWS S3 (static hosting)

AWS CloudFront (global CDN)

AWS Lambda (serverless function)

AWS API Gateway (public API route)

IAM Role with least privilege

Terraform for:

Lambda role creation

API Gateway config

Future IaC expansion

🏗️ Architecture Diagram
User → CloudFront → S3 (Frontend)
                  ↓
           API Gateway → Lambda → Prediction Engine

📡 API Contract
Example Request
GET /prediction?matchId=rm-barca&risk=balanced

Example Response
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
footyiq-saas/
│
├── frontend/      # React UI
├── backend/       # Lambda code (TypeScript)
└── infra/
    └── api/       # Terraform IaC

🛣️ Roadmap (Planned Features)

(future work – NOT implemented today)

AI & Data

ML model for live match prediction

Player-level statistics engine

Real-time odds ingestion

Frontend

Team analytics dashboard

Match center with live probability updates

DevOps

GitHub Actions CI/CD

CloudFront auto-invalidation

Multi-environment infrastructure

Monitoring dashboards (CloudWatch/Grafana)

👤 Author

Uwem Udo (ashNikov)
DevSecOps • Cloud Engineer • AI-Driven SaaS Builder
