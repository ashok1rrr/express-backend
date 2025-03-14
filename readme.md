# **OneClick Backend API** 🚀  
A **secure and scalable backend** for user authentication and task management, built using **Node.js, Express, MongoDB, JWT, and Nginx**.

## **📌 Features**  
✅ **User Authentication** (Signup, Login, JWT Authentication)  
✅ **Task Management** (CRUD operations)  
✅ **Secure API** with **JWT-based Authentication**  
✅ **Rate Limiting** to prevent excessive API requests  
✅ **Load Balancing & Reverse Proxy** with **Nginx**  

---

## **📂 Project Structure**  

onlyclick-backend/ │── node_modules/
│── src/
│ ├── config/
│ │ ├── db.js # MongoDB connection
│ ├── models/
│ │ ├── User.js
│ │ ├── Task.js
│ ├── routes/
│ │ ├── authRoutes.js
│ │ ├── taskRoutes.js
│ ├── middleware/
│ │ ├── authMiddleware.js
│ │ ├── rateLimiter.js
│ ├── controllers/
│ │ ├── authController.js
│ │ ├── taskController.js
│ ├── interfaces/
│ │ ├── apiResponses.ts
│ ├── app.js # Main Express app
│── .env
│── nginx.conf # Nginx configuration
│── package.json
│── README.md


---

## **🛠️ Tech Stack**  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB + Mongoose  
- **Authentication:** JWT (JSON Web Token)  
- **Security:** Rate Limiting  
- **Reverse Proxy & Load Balancing:** Nginx  

---

## **🚀 Setup & Installation**  

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/Dhanush-2209/onlyclick-backend.git
cd onlyclick-backend

2️⃣ Install Dependencies

     npm install

3️⃣ Configure Environment Variables
Create a .env file in the root directory and add:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

4️⃣ Start the Server
npm start
Your backend should now be running on http://localhost:5000.

📌 API Endpoints
1️⃣ Authentication (Public)
Method	Endpoint	Description
POST	/api/auth/signup	Register a new user
POST	/api/auth/login	User login & get JWT token

🔹 Example Signup Request
POST /api/auth/signup
{
    "name": "Dhanush",
    "email": "dhanushreddy2209@gmail.com",
    "password": "securepassword"
}
🔹 Example Login Response
{
    "token": "your_jwt_token"
}

2️⃣ Protected Routes (Require JWT)
Method	Endpoint	Description
GET	/api/auth/protected	Test protected route

🔹 Usage: Send JWT token in Authorization header:
Authorization: Bearer your_jwt_token

3️⃣ Task Management (CRUD)
Method	Endpoint	Description
POST	/api/tasks	Create a new task
GET	/api/tasks	Get all tasks
GET	/api/tasks/:id	Get task by ID
PUT	/api/tasks/:id	Update task by ID
DELETE	/api/tasks/:id	Delete task by ID

🔹 Example Create Task Request
POST /api/tasks
{
    "title": "Complete Assignment",
    "description": "Finish the OneClick Backend task"
}

🔹 Example Response
{
    "success": true,
    "message": "Task created successfully",
    "data": {
        "_id": "task_id",
        "title": "Complete Assignment",
        "description": "Finish the OneClick Backend task",
        "user": "user_id"
    }
}


🔐 JWT Authentication
Upon login, the user gets a JWT Token.
To access protected routes, include this token in the Authorization header:
Authorization: Bearer your_jwt_token
If the token is missing or invalid, the request is denied.

⏳ Rate Limiting
To prevent abuse, we have implemented rate limiting in rateLimiter.js.

Maximum 100 requests per 15 minutes per IP.
If exceeded, it returns:

{
    "success": false,
    "message": "Too many requests, please try again later."
}


⚡ Nginx Configuration
We have set up Nginx as a Reverse Proxy to forward requests to Node.js.

🛠️ Steps to Configure Nginx
1️⃣ Install Nginx (Windows/Linux/macOS)
2️⃣ Modify nginx.conf (Location: nginx/conf/nginx.conf)

🔹 Example Configuration (nginx.conf)

server {
    listen 80;
    server_name localhost;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}


3️⃣ Restart Nginx
nginx -s reload

Now, your backend is accessible at:
🔹 http://localhost/api/auth/signup
🔹 http://localhost/api/tasks

📌 Final Checklist Before Submission
✔ Signup & Login working in Postman
✔ JWT Authentication tested
✔ CRUD operations working for tasks
✔ Rate Limiting enforced
✔ Nginx forwarding requests correctly

📜 License
This project is open-source under the MIT License.

📞 Contact
For any queries, feel free to reach out:
📧 Email: dhanushreddy2209@gmail.com
👨‍💻 GitHub: Dhanush-2209





