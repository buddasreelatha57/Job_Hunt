Job Hunt Tracker 🚀
A full-stack AI-powered Job Hunt Tracker application that helps users manage job applications, track interview progress, organize resumes, and automate parts of the job search process.

📌 Features
👤 Authentication
User Registration & Login
JWT Authentication
Secure Password Hashing
Protected Routes
💼 Job Management
Add New Job Applications
Update Job Status
Delete Applications
Track Interview Stages
Store Company Details
Application Timeline Tracking
🤖 AI Features
AI Resume Assistance
AI Job Suggestions
AI Content Generation
OpenAI API Integration
🔔 Notifications
Real-time Notifications
Application Updates
Reminder System
📊 Dashboard
Job Statistics
Status Analytics
Application Overview
Progress Monitoring
🛠️ Tech Stack
Frontend
React.js
React Router DOM
Axios
Tailwind CSS
Lucide React
Backend
Node.js
Express.js
MongoDB
Mongoose
bcrypt.js
AI Integration
OpenAI API
📂 Project Structure
job-tracker/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   └── App.js
│   └── package.json
│
├── backend/
│   ├── telethon_service/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── server.js
│   └── package.json
│
├── .gitignore
├── README.md
└── package.json
⚙️ Installation
1️⃣ Clone Repository
git clone https://github.com/YOUR_USERNAME/Job_Hunt.git
cd Job_Hunt
2️⃣ Install Frontend Dependencies
cd frontend
npm install
3️⃣ Install Backend Dependencies
cd ../backend
npm install
🔐 Environment Variables
Create a .env file inside the backend folder.

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
⚠️ Never upload your .env file to GitHub.

▶️ Running the Project
Start Backend
cd backend
npm start

Start Frontend
cd frontend
npm start
Frontend runs on:
http://localhost:3000

Backend runs on:
http://localhost:5000

📡 API Endpoints

Authentication
Method	Endpoint	Description
POST	/api/auth/register	Register User
POST	/api/auth/login	Login User
Jobs
Method	Endpoint	Description
GET	/api/jobs	Get All Jobs
POST	/api/jobs	Create Job
PUT	/api/jobs/:id	Update Job
DELETE	/api/jobs/:id	Delete Job
🧠 AI Features
The application integrates with the OpenAI API to:

Generate resume improvements
Suggest job descriptions
Create interview preparation content
Assist in job search automation

🔒 Security Features
JWT Token Authentication
Password Encryption
Environment Variable Protection
Secure API Access
Protected Routes

🚀 Deployment
🌐 Frontend Deployment (Vercel)
Push frontend code to GitHub
Go to:
https://vercel.com
Import your GitHub repository
Select the frontend folder
Add environment variables if needed
Click Deploy

⚙️ Backend Deployment (Render)
1️⃣ Push Backend to GitHub
Make sure your backend folder contains:

package.json
server.js
.env (NOT pushed)
2️⃣ Create Render Account
Go to:

https://render.com

Login using GitHub.

3️⃣ Create New Web Service
Click "New +"
Select "Web Service"
Connect your GitHub repository
Select your Job_Hunt repository
4️⃣ Configure Render Settings
Setting	Value
Name	job-hunt-backend
Environment	Node
Root Directory	backend
Build Command	npm install
Start Command	npm start
5️⃣ Add Environment Variables
Inside Render Dashboard → Environment Variables:

PORT=5000
MONGO_URI=your_mongodb_connection
OPENAI_API_KEY=your_openai_api_key

6️⃣ Deploy Backend
Click:
Create Web Service
Render will automatically:
Install dependencies
Build project
Start backend server
7️⃣ Backend Live URL
Example:
https://job-hunt-backend.onrender.com

🗄️ Database Deployment
MongoDB Atlas
Create free cluster
Create database user
Whitelist IP:
0.0.0.0/0
Copy MongoDB connection string
Add it inside Render Environment Variables

🔗 Connect Frontend to Backend
Inside frontend .env:

REACT_APP_API_URL=https://job-hunt-backend.onrender.com
⚠️ Important Deployment Notes
Never upload .env files to GitHub
Keep API keys private
Use HTTPS APIs only
Enable CORS in backend
Add node_modules/ to .gitignore

🧩 Recommended Deployment Stack
Service	Platform
Frontend	Vercel
Backend	Render
Database	MongoDB Atlas
Authentication	JWT
AI Services	OpenAI API
Database

MongoDB Atlas
📸 Screenshots
Add your project screenshots here.
/screenshots/dashboard.png
/screenshots/login.png
/screenshots/job.png

🧪 Future Enhancements
Resume Parsing
LinkedIn Integration
Email Automation
AI Interview Bot
Mobile Application
Advanced Analytics

🤝 Contributing
Contributions are welcome.

Fork the repository
Create a new branch
Commit your changes
Push to your branch
Open a Pull Request

📄 License
This project is licensed under the MIT License.

👨‍💻 Author
Developed by Sreelatha Budda

GitHub: https://github.com/buddasreelatha57

⭐ Support
If you like this project, please give it a star on GitHub ⭐
