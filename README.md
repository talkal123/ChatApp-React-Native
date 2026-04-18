📱 ChatApp - Fullstack Messaging
A streamlined Fullstack chat application demonstrating secure authentication and role-based access control.

🚀 Key Features
Secure Auth: JWT-based sessions with Bcrypt password hashing.

Role Management: Protected routes for Admin and User roles.

Logic: Dynamic message filtering and input validation.

Clean Code: Modular Monorepo structure (React Native & Node.js).

🛠️ Tech Stack
Frontend: React Native, Context API, React Navigation.

Backend: Node.js, Express, JWT, Bcrypt.

Database: FileSystem (JSON-based) for local dev.

📁 Project Structure

├── backend/          # Node.js + Express API
├── frontend/         # React Native Mobile App
└── .gitignore        # Standard ignore rules
⚙️ Quick Start
Backend:

cd backend && npm install && npm start
Frontend:

cd frontend && npm install && npx react-native run-android
🛡️ Security
The app uses a custom Middleware Guard to verify:

Bearer Token format.

JWT Signature & Expiry.

Role-based permissions & valid user IDs.

✍️ Author
Tal – Junior Fullstack Developer.