# 🎓 Scholar Stream

Scholar Stream is a full-stack web application designed to manage and streamline scholarship discovery, applications, and administration. It provides separate dashboards for **users**, **moderators**, and **admins**, ensuring a secure and role-based experience.

---

## 🚀 Features

### 👨‍🎓 User

* Browse available scholarships
* View scholarship details
* Apply for scholarships
* Track application status
* Secure authentication (Firebase)

### 🧑‍💼 Moderator

* Review submitted scholarships
* Approve or reject scholarship posts
* Manage reported content

### 🛡️ Admin

* Full system control
* Manage users and roles
* View platform statistics
* Manage scholarships and applications

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios
* React Router

### Backend

* Node.js
* Express.js
* MongoDB
* Firebase Admin SDK
* JWT Authentication

---

## 🔐 Authentication & Security

* Firebase Authentication (Email/Password, Google)
* Firebase ID Token verification on backend
* Role-based access control (RBAC)
* Secure API using JWT & middleware

---

## 📦 Project Structure

```
scholar-stream/
│
├── client/        # React frontend
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   └── utils/
│
├── server/        # Express backend
│   ├── routes/
│   ├── middleware/
│   ├── controllers/
│   └── index.js
│
└── README.md
```

---

## ⚙️ Environment Variables

### Backend (`.env`)

```
PORT=5000
MONGODB_URI=your_mongodb_uri
FB_SERVICE_ACCOUNT=base64_encoded_firebase_key
JWT_SECRET=your_jwt_secret
```

### Frontend (`.env`)

```
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_key
```

---

## ▶️ Run Locally

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

---

## 📊 Future Improvements
* Payment integration (Stripe)
* Scholarship recommendation system
* Email notifications
* Advanced analytics dashboard

---

## 👤 Author
**Mohammed Abdul Hakim Arman**
Full Stack Web Developer (MERN)

---

## 📄 License
This project is for educational purposes.