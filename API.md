# 🌟 Solo Sparks - API Documentation

RESTful API for the Solo Sparks self-discovery platform. Enables users to build emotional intelligence through quests, reflections, points, and personalized growth.

---

## 🔐 Authentication

### 📌 Register

**POST** `/api/auth/register`  
Register a new user.

**Body:**
```json
{
  "name": "Prince Raj",
  "email": "prince@example.com",
  "password": "securepass123"
}
