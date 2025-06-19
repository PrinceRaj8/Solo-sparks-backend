🌟 Solo Sparks API Documentation

Base URL: https://solo-sparks-backend-3.onrender.com/api
Auth: JWT via Authorization: Bearer <token>




🧑 Auth Routes

POST /auth/register

Register a new user.

Body:

{
  "name": "Prince",
  "email": "prince@example.com",
  "password": "123456"
}

Response:

{
  "token": "JWT_TOKEN",
  "user": {
    "id": "user_id",
    "name": "Prince",
    "email": "prince@example.com"
  }
}




POST /auth/login

Login user and receive JWT token.

Body:

{
  "email": "prince@example.com",
  "password": "123456"
}

Response: Same as /register




📋 Quest Routes

GET /quests/today 🔐

Get today’s personalized quest for logged-in user.

Headers:

Authorization: Bearer <token>

Response:

{
  "_id": "quest_id",
  "title": "Watch a sunset",
  "description": "Spend 15 minutes alone during sunset and reflect.",
  "type": "daily",
  "traits": ["introspective", "romantic"]
}




POST /quests/complete 🔐

Submit quest reflection with optional media.

Headers:

Authorization: Bearer <token>
Content-Type: multipart/form-data

Body (FormData):

questId: Quest ID

reflectionText: (optional)

image: (optional file)

audio: (optional file)


Response:

{
  "msg": "Quest completed!",
  "sparkPoints": 50
}




🧠 User Routes

PUT /users/mood 🔐

Update current user mood.

Headers: Authorization: Bearer <token>

Body:

{
  "mood": "Happy"
}

Response:

{ "msg": "Mood updated", "mood": "Happy" }




PUT /users/profile 🔐

Update personality traits and preferences.

Body:

{
  "traits": ["creative", "independent"],
  "preferences": ["outdoors", "solo travel"]
}

Response:

{
  "msg": "Profile updated successfully",
  "personalityTraits": [...],
  "preferences": [...]
}




🎁 Reward Routes

GET /rewards 🔐

Get all available rewards.

Response:

[
  {
    "_id": "reward_id",
    "title": "Profile Boost",
    "pointsRequired": 100,
    "type": "profile_boost"
  },
  ...
]




POST /rewards/redeem 🔐

Redeem a reward using Spark Points.

Body:

{
  "userId": "user_id",
  "rewardId": "reward_id"
}

Response:

{
  "msg": "Reward redeemed!",
  "reward": {
    "title": "Profile Boost",
    
  }
}


