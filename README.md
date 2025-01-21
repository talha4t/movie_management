# Movie Management System

It's a Movie Management Backend Application with RESTful APIs in MVC pattern

## Notes

- This application currently has only one environment
    - local

## External Services

- PostgreSQL

## Local Environment

### Prerequisites

- [Node JS](https://nodejs.org/en)
- [PNPM](https://pnpm.io)
- [Git](https://git-scm.com)
- [PostgreSQL](https://www.postgresql.org)
- [NestJs](https://nestjs.com)

Verify the installation with:

```bash
node -v
pnpm -v
```

### Installation

1. **Clone the Repository**

    ```bash
    git clone https://github.com/talha4t/movie_management.git
    cd movie_management
    ```

2. **Install Dependencies**

    ```bash
    pnpm install
    ```

3. **Configure Environment**

    ```bash
    cp .env.example .env
    ```

    Edit `.env` to configure your database and other settings.

### Development

1. **Start Local Development Server**

    ```bash
    pnpm run start:dev
    ```

    And visit [http://localhost:3000/](http://localhost:3000/) in your browser.

## --

# API Documentation

## Authentication Endpoints

### Register a New User

**POST** `/api/v1/auth/register`

- **Request Body**:
    ```json
    {
        "username": "string",
        "email": "string",
        "password": "string"
    }
    ```
- **Response**:
    ```json
    {
        "user": {
            "id": "string",
            "email": "string",
            "username": "string",
            "role": "USER"
        },
        "tokens": {
            "accessToken": "string",
            "refreshToken": "string"
        }
    }
    ```

### Login

**POST** `/api/v1/auth/login`

- **Request Body**:
    ```json
    {
        "email": "string",
        "password": "string"
    } 
    or 
    {   "email": "talha4tofficial@gmail.com",
        "password": "password"
    }
    it will give you the ADMIN access
    ```
- **Response**:
    ```json
    {
        "user": {
            "id": "string",
            "email": "string",
            "username": "string",
            "role": "USER | ADMIN"
        },
        "tokens": {
            "accessToken": "string",
            "refreshToken": "string"
        }
    }
    ```

### Logout

**POST** `/api/v1/auth/logout`

- **Headers**: Authorization: Bearer `<accessToken>`
- **Response**:
    ```json
    {
        "message": "Successfully logged out"
    }
    ```

### Refresh Tokens

**POST** `/api/v1/auth/refresh`

- **Request Body**:
    ```json
    {
        "refreshToken": "string"
    }
    ```
- **Response**:
    ```json
    {
        "accessToken": "string",
        "refreshToken": "string"
    }
    ```

## User Endpoints

### Create a Movie

**POST** `/api/v1/movies/create`

- **Headers**: Authorization: Bearer `<accessToken>`
- **Request Body**:
    ```json
    {
        "title": "string",
        "description": "string",
        "releasedAt": "string (date-time)",
        "duration": "integer",
        "genre": "string",
        "language": "string"
    }
    ```
- **Response**:
    ```json
    {
        "id": "string",
        "title": "string",
        "description": "string",
        "releasedAt": "string",
        "duration": "integer",
        "genre": "string",
        "language": "string"
    }
    ```

### Update a Movie

**PUT** `/api/v1/movies/:id`

- **Headers**: Authorization: Bearer `<accessToken>`
- **Request Body**:
    ```json
    {
        "title": "string",
        "description": "string",
        "releasedAt": "string (date-time)",
        "duration": "integer",
        "genre": "string",
        "language": "string"
    }
    ```
- **Response**:
    ```json
    {
        "id": "string",
        "title": "string",
        "description": "string",
        "releasedAt": "string",
        "duration": "integer",
        "genre": "string",
        "language": "string"
    }
    ```

### Get a Movie by ID

**GET** `/api/v1/movies/:id`

- **Response**:
    ```json
    {
        "id": "string",
        "title": "string",
        "description": "string",
        "releasedAt": "string",
        "duration": "integer",
        "genre": "string",
        "language": "string"
    }
    ```

### Get All Movies

**GET** `/api/v1/movies`

- **Response**:
    ```json
    [
        {
            "id": "string",
            "title": "string",
            "description": "string",
            "releasedAt": "string",
            "duration": "integer",
            "genre": "string",
            "language": "string"
        }
    ]
    ```

### Rate a Movie

**POST** `/api/v1/movies/rating/:movieId`

- **Headers**: Authorization: Bearer `<accessToken>`
- **Request Body**:
    ```json
    {
        "value": 1-5
    }
    ```
- **Response**:
    ```json
    {
        "id": "string",
        "value": 1-5
    }
    ```

### Update a Rating

**PUT** `/api/v1/movies/rating/:movieId`

- **Headers**: Authorization: Bearer `<accessToken>`
- **Request Body**:
    ```json
    {
        "value": 1-5
    }
    ```
- **Response**:
    ```json
    {
        "id": "string",
        "value": 1-5
    }
    ```

### Report a Movie

**POST** `/api/v1/movies/report/:movieId`

- **Headers**: Authorization: Bearer `<accessToken>`
- **Request Body**:
    ```json
    {
        "reason": "string"
    }
    ```
- **Response**:
    ```json
    {
        "id": "string",
        "reason": "string",
        "status": "PENDING | APPROVED | REJECTED"
    }
    ```

## Admin Endpoints

### Get All Reported Movies

**GET** `/api/v1/admin/reports`

- **Response**:
    ```json
    [
        {
            "id": "string",
            "reason": "string",
            "status": "PENDING | APPROVED | REJECTED",
            "createdAt": "string (date-time)",
            "movie": {
                "id": "string",
                "title": "string",
                "avgRating": "number",
                "totalRating": "integer"
            },
            "user": {
                "id": "string",
                "username": "string"
            }
        }
    ]
    ```

### Get Reported Movie by ID

**GET** `/api/v1/admin/reports/:id`

- **Response**:
    ```json
    {
        "id": "string",
        "reason": "string",
        "status": "PENDING | APPROVED | REJECTED",
        "createdAt": "string (date-time)",
        "movie": {
            "id": "string",
            "title": "string"
        },
        "user": {
            "id": "string",
            "username": "string"
        }
    }
    ```

### Update Report Status

**PATCH** `/api/v1/admin/reports/status/:id`

- **Request Body**:
    ```json
    {
        "status": "APPROVED | REJECTED"
    }
    ```
- **Response**:
    ```json
    {
        "id": "string",
        "status": "APPROVED | REJECTED"
    }
    ```

### Delete Reported Movie

**DELETE** `/api/v1/admin/reports/:id`

- **Response**:
    ```json
    {
        "message": "Movie and associated report deleted successfully"
    }
    ```
