# Expense Tracker – Full Stack Assignment

## Overview

This project is a minimal full-stack **Expense Tracker** built as a production-oriented exercise.  
It allows users to record, view, filter, and sort personal expenses while handling real-world conditions like retries, page refreshes, and unreliable networks.

The focus is on **correctness, data consistency, and clean structure**, not visual complexity.

---

## User Story

As a user, I can record and review my personal expenses so I can understand where my money is going.

---

## Features Implemented

### Backend
- Create a new expense
- Retry-safe expense creation using idempotency
- Fetch expenses
- Filter expenses by category
- Sort expenses by date (newest first)

### Frontend
- Form to add a new expense
- Expense list/table
- Filter by category
- Sort by newest first
- Display total of currently visible expenses
- Loading and basic error handling

---

## Acceptance Criteria Mapping

| Requirement | Status |
|------------|--------|
| Create expense (amount, category, description, date) 
| View list of expenses 
| Filter by category 
| Sort by date (newest first) 
| Show total of visible expenses 
| Retry-safe behavior 

---

## Tech Stack

### Backend
- **Node.js**
- **Express**
- **MongoDB**
- **Mongoose**

### Frontend
- **React (Create React App)**
- **Axios**
- **Basic CSS**

---

## Backend Design Decisions

### Persistence Choice
MongoDB was chosen because:
- Flexible schema for evolving requirements
- Easy handling of timestamps
- Simple querying for filters and sorting
- Suitable for real-world, production-style APIs

### Retry-Safe / Idempotent API
To handle retries caused by:
- Network failures
- Page refreshes
- Multiple submit clicks

An **idempotency key (`clientRequestId`)** is required for creating expenses.

**Behavior:**
- Same request (same `clientRequestId`) → same response
- No duplicate database records are created
- API safely returns the existing record if retried

---

## API Endpoints

### POST `/expenses`
Create a new expense.

**Request Body**
```json
{
  "amount": 250,
  "category": "Food",
  "description": "Lunch",
  "date": "2026-02-04",
  "clientRequestId": "unique-client-id-123"
}
