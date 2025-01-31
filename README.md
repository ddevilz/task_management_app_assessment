﻿# Task Manager App

## Overview

The Task Manager App is a simple yet efficient application for managing your daily tasks. With this app, you can:

- **Add** new tasks with a title, description, priority, and due date.
- **Edit** existing tasks.
- **Delete** tasks.
- **Mark** tasks as complete or incomplete.
- **Sort** tasks by priority or due date.
- **Receive** visual feedback through notifications.

## Features

- Add new tasks with a title, description, priority, and due date.
- Edit existing tasks.
- Delete tasks.
- Mark tasks as complete/incomplete.
- Sort tasks by priority or due date.
- Visual feedback through notifications.

## Tech Stack

- **React**: Frontend framework for building the user interface.
- **Redux**: State management library for managing the application's state.
- **React-Redux**: Official React bindings for Redux.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React-Icons**: Icon library for including icons in the app.
- **React-Toastify**: Library for showing notifications.
- **Vitest**: Unit testing framework for React components.

## Getting Started

### Prerequisites

- Node.js (v14 or above)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/ddevilz/task_management_app_assessment.git
    ```

2.  **Navigate to the client and server directories:**

    ```bash
    cd client  # for frontend
    cd server  # for backend env: PORT , MONGODB_URL
    ```

3.  **Install the dependencies:**

    ```bash
    npm install
    ```

### Running the App

- **Start the client (frontend):**

  ```bash
   npm run dev
  ```

- **Start the server (backend):**

  ```bash
   npm start
  ```

### Running Tests

- **Run tests:**

  ```bash
   npm test
  ```

### API Documentation

The API documentation is available via Swagger UI. You can access it at:

- **Swagger Documentation:** http://localhost:3000/api-docs

This page provides interactive documentation for all the API endpoints, including the ability to test them directly from the browser.

## APIs

The app interacts with the following APIs:

- **POST /api/v1/tasks/create**: Create a new task.
- **PUT /api/v1/tasks/update/**: Update an existing task by ID.
- **DELETE /api/v1/tasks/delete/**: Delete a task by ID.
- **GET /api/v1/tasks**: Get tasks with pagination.

## Acknowledgements

- **React**: For building the user interface.
- **Redux**: For state management.
- **Tailwind CSS**: For utility-first CSS styling.
- **React-Icons**: For adding icons.
- **React-Toastify**: For notifications.
- **Vitest**: For testing React components.
