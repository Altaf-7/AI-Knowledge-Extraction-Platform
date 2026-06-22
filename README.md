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
                 User
                   │
                   ▼
          HTML/CSS/JavaScript UI
                   │
             HTTP POST Request
                   │
                   ▼
            Express Backend API
                   │
     ┌─────────────┴──────────────┐
     │                            │
Input Validation             Cache Lookup
     │                            │
     └─────────────┬──────────────┘
                   │
          Cache Miss? Continue
                   │
                   ▼
         Python Scraper Service
                   │
        BeautifulSoup Extraction
                   │
          HTML Cleaning Pipeline
                   │
          Text Processing Layer
                   │
                   ▼
             Gemini AI Service
                   │
      Summary + Keywords + FAQ
                   │
                   ▼
          Database + Cache Store
                   │
                   ▼
          JSON Response to Client
```

---

# Software Architecture

The application follows a layered architecture.

```
Presentation Layer

↓

API Layer

↓

Business Logic Layer

↓

Python Scraper Service

↓

AI Processing Layer

↓

Persistence Layer
```

---

# Folder Structure

```
AI-Knowledge-Extractor/

│
├── public/
│   ├── css/
│   │      style.css
│   │
│   ├── js/
│   │      app.js
│   │
│   ├── images/
│   └── index.html
│
├── src/
│
│   ├── routes/
│   │      scraper.routes.js
│   │
│   ├── controllers/
│   │      scraper.controller.js
│   │
│   ├── services/
│   │      scraper.service.js
│   │      ai.service.js
│   │      cache.service.js
│   │
│   ├── workers/
│   │      python.worker.js
│   │
│   ├── middleware/
│   │      errorHandler.js
│   │      validator.js
│   │
│   ├── utils/
│   │      logger.js
│   │      cleaner.js
│   │
│   ├── database/
│   │      sqlite.js
│   │
│   └── config/
│          gemini.js
│
├── python/
│      scraper.py
│      cleaner.py
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
├── .env
├── server.js
├── package.json
├── README.md
└── requirements.txt
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
/api/extract
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