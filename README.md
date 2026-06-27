# AI Knowledge Extraction Platform

> **An AI-powered, service-oriented web application that extracts, processes, analyzes, and summarizes web content using a distributed multi-service architecture.**

---

## Project Overview

AI Knowledge Extraction Platform is a software engineering project designed to demonstrate backend architecture, asynchronous programming, API integration, AI-assisted processing, caching strategies, error handling, and system design principles.

Unlike a traditional web scraper, this application transforms raw webpages into structured easily understandable knowledge using an AI processing pipeline.

The project is intentionally designed using multiple services communicating together, similar to production software systems.

---

# Demo Workflow

```
                    Browser
                       │
                       ▼
                Express API Gateway
                       │
                Validate Request
                       │
                       ▼
                 SQLite Cache
              ┌────────┴────────┐
              │                 │
           Cache Hit        Cache Miss
              │                 │
              │                 ▼
              │          FastAPI Service
              │                 │
              │        Analysis Orchestrator
              │                 │
              │     ┌───────────┼────────────┐
              │     │           │            │
              │  Scraper      Prompt      Gemini
              │     │           │            │
              │     └───────────┼────────────┘
              │                 │
              │          Response Formatter
              │                 │
              │            Save to SQLite
              │                 │
              └──────────◄──────┘
                       │
                       ▼
                    Browser
```
---

# Folder Structure

```
AI-Knowledge-Extractor/
│
├── frontend/
│   │
│   ├── css/
│   │      style.css
│   │
│   ├── js/
│   │      app.js
│   │      validator.js
│   │
│   ├── images/
│   │
│   └── index.html
│
├── backend/
│   │
│   ├── src/
│   │   │
│   │   ├── routes/
│   │   │      analysis.routes.js
│   │   │
│   │   ├── controllers/
│   │   │      analysis.controller.js
│   │   │
│   │   ├── services/
│   │   │      analysis.service.js
│   │   │      cache.service.js
│   │   │
│   │   ├── middleware/
│   │   │      validator.js
│   │   │      errorHandler.js
│   │   │
│   │   ├── db/
│   │   │      connection.js
│   │   │      schema.js
│   │   │
│   │   ├── jobs/
│   │   │      cacheCleanup.jobs.js
│   │   │
│   │   └── config/
│   │          config.js
│   │
│   ├── storage/
│   │      extractor.db
│   │
│   ├── package-lock.json
│   ├── package.json
│   ├── server.js
│   └── .env
│
├── ai-service/
│   │
│   ├── app/
│   │   │
│   │   ├── main.py
│   │   │
│   │   ├── routers/
│   │   │      analysis.py
│   │   │
│   │   ├── services/
│   │   │      analysis_service.py
│   │   │      scraper_service.py
│   │   │      prompt_service.py
│   │   │      gemini_service.py
│   │   │      format_service.py
│   │   │
│   │   ├── schemas/
│   │   │      request.py
│   │   │      response.py
│   │   │
│   │   └── config.py
│   │
│   ├── requirements.txt
│   └── .env
│
├── docs/
│   ├── example_responses/
│   │      bbc_news.json
│   │      railway_fastAPi.json
│   │
│   └── images/
│          system-architecture.png
│          sequence-diagram.png
│          api-flow.png
│
├── .gitignore
└── README.md
```
---

# Features

## Web Scraping

* Extract webpage content
* Remove advertisements
* Remove scripts
* Remove navigation bars
* Extract headings
* Extract paragraphs


## AI Processing

* AI-generated summary
* Key insights
* Frequently Asked Questions
* Keyword extraction
* Main Topic extraction
* Reading time estimation
* Sentiment analysis


## Backend

* REST API
* Modular architecture
* Input validation
* Centralized error handling
* Async request handling


## Database

Stores

* URL
* Title
* Timestamp
* AI Response


## Performance

* Response caching
* Duplicate request detection
* Efficient HTML cleaning
* Optimized AI prompt


## Reliability

* Invalid URL handling
* Network timeout handling
* Retry mechanism
* AI failure recovery
* Graceful error messages

---

# API

## POST

```
Express: /api/analyze
```

Input

```json
{
    "url":"https://example.com"
}
```

Response

```json
{
    "success": true,
    "data": {
        "title": "Example Website",

        "summary": "...",

        "keywords": [
            "...",
            "...",
            "..."
        ],

        "mainTopics": [
            "...",
            "...",
            "..."
        ],

        "faq": [
            {
                "question": "...",
                "answer": "..."
            }
        ],

        "sentiment": "Positive",

        "readingTime": "5 min",

        "cached": false
    },
    "message": "Express to FastAPI Response",

    "errorCode": null
}
```

---

# Technologies Used

Frontend

* HTML
* CSS
* JavaScript

Backend

* Node.js
* Express.js

Python

* BeautifulSoup
* Requests

Artificial Intelligence

* Gemini API

Database

* better-SQLite

Tools

* Git
* GitHub
* VS Code
* Postman

---

# Deployment
Project deployed using `Vercel`
```bash
https://ai-knowledge-extraction-platform.vercel.app/
```

---