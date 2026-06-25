# AI Knowledge Extraction Platform

> **An AI-powered, service-oriented web application that extracts, processes, analyzes, and summarizes web content using a distributed multi-service architecture.**

---

## Project Overview

AI Knowledge Extraction Platform is a software engineering project designed to demonstrate backend architecture, asynchronous programming, API integration, AI-assisted processing, caching strategies, error handling, and system design principles.

Unlike a traditional web scraper, this application transforms raw webpages into structured knowledge using an AI processing pipeline.

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
              │            Response Parser
              │                 │
              └──────────◄──────┘
                       │
                Save to SQLite
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
│   │   ├── utils/
│   │   │      logger.js
│   │   │
│   │   └── config/
│   │          database.js
│   │
│   ├── storage/
│   │      extractor.db
│   │
│   ├── package.json
│   └── server.js
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
│   │   │      parser_service.py
│   │   │
│   │   ├── schemas/
│   │   │      request.py
│   │   │      response.py
│   │   │
│   │   ├── utils/
│   │   │      cleaner.py
│   │   │      logger.py
│   │   │
│   │   └── config.py
│   │
│   ├── requirements.txt
│   └── .env
│
├── cache/
│
├── exports/
│
├── logs/
│
├── docs/
│      architecture.png
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
* Summary
* Keywords
* Timestamp
* Reading Time
* Cached AI Response


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
/api/analyze
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
  "title":"Example Website",

  "summary":"...",

  "keywords":[
      "...",
      "...",
      "..."
  ],

  "readingTime":"5 min",

  "sentiment":"Positive",

  "cached":false
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

* SQLite

Tools

* Git
* GitHub

---

# Deployment
Project deployed using `Vercel`
```bash
https://ai-knowledge-extraction-platform.vercel.app/
```

---