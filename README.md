# 📅 Daily Planner API

A robust RESTful API for managing daily tasks and tracking productivity, built with **Spring Boot 3** and **Java 21**. Create recurring task templates, log daily completions, and analyze your progress over time — all secured with JWT authentication.

---

## ✨ Features

- **🔐 JWT Authentication** — Secure registration & login with stateless token-based auth
- **📝 Task Templates** — Create reusable daily task definitions with categories
- **✅ Daily Task Logging** — Toggle task completion status for each day
- **📊 Progress Analytics** — Track your completion rate over configurable time periods
- **🛡️ Per-User Data Isolation** — Each user only sees and manages their own tasks
- **📦 Consistent API Responses** — Uniform JSON response structure across all endpoints

---

## 🏗️ Tech Stack

| Technology | Purpose |
|---|---|
| **Java 21** | Language |
| **Spring Boot 3.5** | Application framework |
| **Spring Security** | Authentication & authorization |
| **Spring Data JPA** | Data persistence & ORM |
| **PostgreSQL** | Relational database |
| **JWT (jjwt 0.11.5)** | Token-based authentication |
| **Lombok** | Boilerplate reduction |
| **Bean Validation** | Request validation |
| **Maven** | Build & dependency management |

---

## 📁 Project Structure

```
src/main/java/com/daily/demo/
├── Controllers/
│   ├── AuthController.java            # Registration & login endpoints
│   ├── TaskTemplateController.java    # Task CRUD operations
│   ├── DailyPlannerController.java    # Daily task view & toggle
│   └── AnalyticsController.java       # Progress analytics
├── Service/
│   ├── AuthService.java               # Auth business logic
│   ├── TaskTemplateService.java       # Task template management
│   ├── DailyPlannerService.java       # Daily logging & toggling
│   └── AnalyticsService.java          # Progress calculation
├── Entities/
│   ├── User.java                      # User entity (implements UserDetails)
│   ├── TaskTemplate.java             # Recurring task definition
│   ├── TaskLog.java                   # Daily completion record
│   └── TaskStatus.java               # Enum: COMPLETED / PENDING
├── Repositories/
│   ├── UserRepository.java
│   ├── TaskTemplateRepository.java
│   └── TaskLogRepository.java
├── DTO/
│   ├── ApiResponse.java               # Generic API response wrapper
│   ├── AuthRequestDTO.java            # Login/register request body
│   ├── TaskRequestDTO.java            # Task creation request body
│   ├── DailyTaskDTO.java              # Daily task view response
│   └── ProgressResponseDTO.java       # Analytics response
└── Security/
    ├── SecurityConfig.java            # Security filter chain & CORS
    ├── JwtService.java                # Token generation & validation
    └── JwtAuthenticationFilter.java   # JWT request filter
```

---

## 🚀 Getting Started

### Prerequisites

- **Java 21** or higher
- **PostgreSQL** installed and running
- **Maven 3.9+** (or use the included Maven Wrapper)

### 1. Clone the Repository

```bash
git clone https://github.com/Amin-alian/Daily-planner.git
cd Daily-planner
```

### 2. Set Up the Database

Create a PostgreSQL database:

```sql
CREATE DATABASE planner_db;
```

### 3. Configure Application Properties

Update `src/main/resources/application.yaml` with your database credentials:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/planner_db
    username: your_username
    password: your_password

jwt:
  secret: your-base64-encoded-secret-key-at-least-256-bits
  expiration: 86400000  # 24 hours in milliseconds
```

> ⚠️ **Important:** Never commit real credentials to version control. Use environment variables or a secrets manager for production.

### 4. Run the Application

Using Maven Wrapper:

```bash
# Linux / macOS
./mvnw spring-boot:run

# Windows
mvnw.cmd spring-boot:run
```

The API will start on **http://localhost:8080**

---

## 💻 Frontend (React + TypeScript)

A modern frontend is available in the `frontend/` folder.

### Run Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend runs on **http://localhost:5173** and connects to the backend using:

```
VITE_API_BASE_URL=http://localhost:8080/api
```

---

## 📡 API Endpoints

All responses follow a consistent format:

```json
{
  "success": true,
  "message": "Description of the result",
  "timestamp": "2026-02-25T12:00:00",
  "data": { }
}
```

### 🔓 Authentication (Public)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login and receive JWT token |

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "timestamp": "2026-02-25T12:00:00",
  "data": "eyJhbGciOiJIUzI1NiJ9..."
}
```

### 📝 Task Templates (Authenticated)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/tasks` | Create a new task template |
| `GET` | `/api/tasks` | Get all active task templates |

**Create Task — Request Body:**
```json
{
  "title": "Read for 30 minutes",
  "category": "Learning"
}
```

### 📋 Daily Planner (Authenticated)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/planner/today` | Get today's tasks with status |
| `POST` | `/api/planner/toggle/{templateId}` | Toggle task completion for today |

### 📊 Analytics (Authenticated)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/analytics/progress?days=7` | Get completion stats for the last N days |

**Response:**
```json
{
  "success": true,
  "message": "Analytics fetched successfully",
  "timestamp": "2026-02-25T12:00:00",
  "data": {
    "period": "LAST_7_DAYS",
    "completionPercentage": 71.4,
    "totalCompleted": 15,
    "totalExpected": 21
  }
}
```

---

## 🔑 Authentication Usage

Include the JWT token in the `Authorization` header for all protected endpoints:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
```

**Example with cURL:**

```bash
# Register
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"mypassword"}'

# Use the returned token for subsequent requests
curl -X GET http://localhost:8080/api/planner/today \
  -H "Authorization: Bearer <your-jwt-token>"
```

---

## 🗄️ Database Schema

```
┌──────────────┐       ┌──────────────────┐       ┌──────────────┐
│    users     │       │  task_template   │       │   task_log   │
├──────────────┤       ├──────────────────┤       ├──────────────┤
│ id (PK)      │──┐    │ id (PK)          │─���┐    │ id (PK)      │
│ email        │  └───>│ user_id (FK)     │  └───>│ template_id  │
│ password     │       │ title            │       │ log_date     │
│ created_at   │       │ category         │       │ status       │
└──────────────┘       │ is_active        │       │ completed_at │
                       │ created_at       │       └──────────────┘
                       └──────────────────┘
                                            UNIQUE(template_id, log_date)
```

---

## 🧪 Running Tests

```bash
./mvnw test
```

---

## 🛣️ Roadmap

- [ ] Add task editing and soft-delete functionality
- [ ] Weekly/monthly analytics breakdown
- [ ] Task priority levels and ordering
- [ ] Notification/reminder system
- [ ] Frontend client (React / mobile app)
- [ ] Docker & Docker Compose setup
- [ ] CI/CD pipeline with GitHub Actions
- [ ] Swagger/OpenAPI documentation

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 📄 License

This project is currently unlicensed. Consider adding an [open-source license](https://choosealicense.com/) to let others know how they can use your code.

---

## 👤 Author

**Amin-alian** — [GitHub Profile](https://github.com/Amin-alian)

---

<p align="center">
  ⭐ If you find this project useful, please consider giving it a star!
</p>
