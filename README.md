### ADMINSPOT

# Contact Management API

This Contact Management API is a full-featured RESTful API built with Node.js, Express, and SQLite. It supports user authentication, advanced contact management features, file handling, and timezone handling.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Setup and Installation](#setup-and-installation)
4. [Running the Application](#running-the-application)
5. [Environment Variables](#environment-variables)
6. [API Documentation](#api-documentation)
7. [Database Schema](#database-schema)
8. [Deployment](#deployment)

---

### Project Overview

The Contact Management API provides functionality for user authentication and managing contacts with fields for name, email, phone, address, and timezone. Additional features include file upload support for bulk contact creation from CSV and Excel files.

---

### Features

- **User Authentication** with JWT, including registration, login, and secure access.
- **Contact Management**: Create, retrieve, update, delete, and batch process contacts.
- **Data Validation** using Joi.
- **Date-Time Handling**: Stores timestamps in UTC and retrieves them in the user's timezone.
- **File Handling**: Supports CSV and Excel file uploads for bulk contact creation.
- **Database**: Uses SQLite (or your choice of SQL DB) with a normalized schema.
- **Security**: Implements rate limiting and secure password storage with bcrypt.

---

## Setup and Installation

1. **Clone the repository**
   git clone https://github.com/PITTAJAGADEESH/AdmitSpot.git
   cd contact-management-api

2. **Install dependencies**
   npm install

3. **Configure environment variables**
   - Create a `.env` file in the project root and set the environment variables as described below.

## Running the Application

1. **Start the server**
   npm start

2. **API Endpoints**
   - The API will be available at `http://localhost:3000/api` (or the specified port in the `.env` file).

---

## API Documentation

### 1. **Authentication**

#### Register User

- **Endpoint**: `/api/register`
- **Method**: `POST`
- **Payload**:
  {
  "name": "Ravi Teja",
  "email": "ravi.teja@example.com",
  "password": "password123"
  }
- **Response**: `201 Created` with confirmation message.

#### Login User

- **Endpoint**: `/api/login`
- **Method**: `POST`
- **Payload**:
  {
  "email": "ravi.teja@example.com",
  "password": "password123"
  }
- **Response**: `200 OK` with JWT token.

---

### 2. **Contact Management**

#### Add New Contact

- **Endpoint**: `/api/contacts`
- **Method**: `POST`
- **Payload**:
  {
  "name": "Venkatesh",
  "email": "venkatesh@example.com",
  "phone": "9876543210",
  "address": "1234 Krishna Nagar, Vijayawada",
  "timezone": "IST"
  }
- **Response**: `201 Created` with confirmation message.

#### Retrieve Contacts

- **Endpoint**: `/api/contacts`
- **Method**: `GET`
- **Response**: `200 OK` with a list of contacts.

#### Update Contact

- **Endpoint**: `/api/contacts/:id`
- **Method**: `PUT`
- **Payload**: Any contact fields to update.
- **Response**: `200 OK` with confirmation message.

#### Delete Contact

- **Endpoint**: `/api/contacts/:id`
- **Method**: `DELETE`
- **Response**: `200 OK` with confirmation message.

#### Bulk Import Contacts

- **Endpoint**: `/api/import`
- **Method**: `POST`
- **Payload**: `CSV` or `Excel` file with contact details.
- **Response**: `200 OK` with import confirmation message.

---

## Database Schema

### Users Table

| Field          | Type        | Description                 |
| -------------- | ----------- | --------------------------- |
| id             | INTEGER     | Primary key, unique user ID |
| name           | TEXT        | User's full name            |
| email          | TEXT UNIQUE | User's email address        |
| password       | TEXT        | Hashed password             |
| email_verified | INTEGER     | Email verification status   |

### Contacts Table

| Field      | Type        | Description                      |
| ---------- | ----------- | -------------------------------- |
| id         | INTEGER     | Primary key, unique contact ID   |
| name       | TEXT        | Contact's full name              |
| email      | TEXT UNIQUE | Contact's email address          |
| phone      | TEXT        | Contact's phone number           |
| address    | TEXT        | Contact's address                |
| timezone   | TEXT        | Contact's timezone               |
| user_id    | INTEGER     | Foreign key, references user ID  |
| created_at | DATETIME    | Contact creation timestamp (UTC) |
| updated_at | DATETIME    | Last update timestamp (UTC)      |

---

## Deployment

This project is live on Render at [https://admitspot-jpf4.onrender.com](https://admitspot-jpf4.onrender.com).
