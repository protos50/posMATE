# Express - TS - Ms SQL Server

This is a sample application built with Express.js, TypeScript, and SQL Server. It demonstrates how to create a basic web application using these technologies. You can use this repository as a starting point for your own projects or as a reference for learning.

## Features

- **Express.js**: A fast, minimalist web framework for Node.js.
- **TypeScript**: A statically typed superset of JavaScript that helps you build robust and maintainable code.
- **SQL Server**: A relational database management system developed by Microsoft.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your development machine.
- SQL Server installed and running with the required database configured.

## Getting Started

Clone the repository:

```sh
git clone https://github.com/faidfadjri/sample-express-ts-mssql
```

Install dependencies:

```sh
   npm install
```

## Configuration

Duplicate `.env-example` & change to .env:

```sh
cp .env-example .env
PORT=3000  # Your app's port number (e.g., 3000)
DB_HOST=localhost  # Your database host (e.g., localhost)
DB_USER=your_db_user  # Your database user (e.g., your_db_user)
DB_PASS=your_db_password  # Your database password (e.g., your_db_password)
DB_PORT=1433  # Your database port (e.g., 1433)
DB_NAME=your_default_database  # Your default database name (e.g., your_default_database)
```

Run

```sh
   npm run start
```
