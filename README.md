# LongevAI

LongevAI is an AI-powered prevention coach that helps users understand how their daily lifestyle habits influence their long-term health trajectory.

Instead of predicting medical outcomes, LongevAI analyzes lifestyle behaviors through conversation, identifies potential risk drivers, and visualizes how habit changes may improve a user's health outlook over time.

This project was developed during the **GenAI Genesis Hackathon 2026**.

---

# Team

- **Emma Hong** — Frontend Developer  
- **Samira Sarabi** — UI/UX Designer  
- **Muntaha Chowdhury** — Backend Architect  
- **Yiming Xu** — Prompt Engineer 

---

# Project Overview

Many long-term health risks develop gradually through everyday lifestyle habits such as poor sleep, smoking, inactivity, and unhealthy routines.

However, most people do not clearly understand how their daily behaviors affect their long-term health.

LongevAI introduces an AI-driven system that:

- analyzes lifestyle habits through conversation  
- identifies key risk drivers  
- estimates a user's **health age vs actual age**  
- visualizes the user's **health trajectory**

The platform helps users recognize early warning signals and make healthier lifestyle decisions.

---

# Key Features

## Baseline Intake
Users enter basic demographic and health information including:

- Name  
- Age  
- Height  
- Weight  
- Sex  

---

## Conversational Habit Analysis
LongevAI asks follow-up questions about lifestyle habits such as:

- Sleep patterns  
- Exercise and activity levels  
- Smoking or vaping  
- Alcohol consumption  
- Screen time  

The AI analyzes responses to understand the user's behavior patterns.

---

## Health Age Estimation
The system estimates how lifestyle habits may affect health trajectory.

Example heuristic signals:

- Poor sleep → +4 years  
- Smoking → +6 years  
- Inactivity → +3 years  
- Dental neglect → +1 year  

These values are **illustrative lifestyle indicators**, not medical diagnoses.

---

## Risk Driver Detection
LongevAI identifies the **Top 3 lifestyle factors** contributing most to health risk.

Example:

- Smoking
- Poor sleep consistency
- Low physical activity

---

## Health Dashboard

The dashboard visualizes the user’s health state using a body map and charts.

Different body parts are represented using different colors to indicate their state/”aging” based on the user’s health trajectory.

This helps users quickly identify which habits may be affecting their overall health.


---

## Scenario Simulation
LongevAI suggests how lifestyle improvements may change a user's health trajectory.

Examples:

- Sleeping one hour more per night  
- Reducing smoking frequency  
- Increasing daily walking

---

## Weekly Check-In
Users return after one week to report habit updates.

The system:

- compares new responses with previous data  
- detects improvement or worsening trends  
- updates the health trajectory visualization

---

# Technology Stack

## Frontend
- Next.js  
- Tailwind CSS  

## Backend
- Node.js  

## Database
- Supabase  

## AI
- Google Gemini (Google AI Studio)

## Deployment
- Vercel  
- GitHub  

---

# System Architecture

User Input  
→ Frontend Interface (Next.js + Tailwind)  
→ API Routes  
→ Backend Processing (Next.js + Supabase)  
→ AI Analysis (Google Gemini)  
→ Risk Detection & Health Age Calculation  
→ Visualization Dashboard (Recharts)

---

# AI Design Principles

LongevAI follows several guidelines to ensure responsible AI responses:

- Use **user-reported data only**
- Analyze **patterns over time rather than isolated answers**
- Provide **clear and explainable insights**
- Avoid medical diagnosis or certainty
- Focus on **prevention and lifestyle awareness**

---

# Future Improvements

Potential future enhancements include:

- Wearable device integration  
- More advanced health modeling  
- Personalized lifestyle coaching  
- Long-term health trajectory tracking  

---

# Disclaimer

LongevAI is designed for **educational and lifestyle awareness purposes only**.

The platform does **not provide medical diagnoses or replace professional healthcare advice**

---

# Hackathon Project

This project was developed as part of the **GenAI Genesis Hackathon** to explore how AI can support **preventive health awareness and behavior change**


