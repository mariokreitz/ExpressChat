# ExpressChat

**ExpressChat** is a real-time chat application designed to explore full-stack development using **Node.js**, **Express.js**, **Angular 19**, and **Socket.IO**. This project served as an opportunity to dive into both the backend and frontend aspects of modern web development, focusing on real-time communication.

> **Note**: This repository is archived and will no longer be actively developed. It was originally created as a test project for learning full-stack development and is now kept for reference and personal use.

## 📂 Project Structure

The repository is organized into two main directories:

- **`backend`**: Contains the backend code responsible for API requests, authentication, and real-time messaging.
- **`frontend`**: Contains the Angular 19 code for the user interface and interactions.

## 🛠️ Backend Dependencies

The backend leverages the following dependencies to build out the core functionality:

- **`bcrypt`**: For securely hashing passwords.
- **`cors`**: Middleware for enabling Cross-Origin Resource Sharing (CORS).
- **`dotenv`**: Loads environment variables from a `.env` file for configuration.
- **`express`**: The web framework used to build the API.
- **`express-validator`**: For validating incoming request data in the backend.
- **`jsonwebtoken`**: For creating and verifying JSON Web Tokens (JWT) for secure user authentication.
- **`mongoose`**: MongoDB object modeling tool to interact with the database.
- **`socket.io`**: Enables real-time, bidirectional communication between the server and clients.

### Development Dependencies

- **`nodemon`**: Automatically restarts the server during development when files change, enhancing the development workflow.

> **Note**: **Helmet** is included in the dependencies for future security enhancements. It will be implemented later to add security headers for the Express app, as this project is primarily designed for learning full-stack development.

## 🎨 Frontend

The frontend is built with:

- **Angular 19**: A powerful platform for building web applications with a complete development framework.
- **Angular Material**: A UI component library that follows Material Design principles, offering reusable and attractive components.

## 📋 Installation

To get started with **ExpressChat**, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/mariokreitz/ExpressChat.git
cd ExpressChat
```

### 2. Install Dependencies

#### Backend

Navigate to the `backend` directory and install the required dependencies:

```bash
cd backend
npm install
```

#### Frontend

Navigate to the `frontend` directory and install the Angular dependencies:

```bash
cd frontend
npm install
```

### 3. Set Up Environment Variables for the Backend

Create a `.env` file in the `backend` directory with the following variables:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Make sure to replace `your_mongodb_connection_string` with your actual MongoDB URI and `your_jwt_secret` with a secure JWT secret.

## 🚀 Running the Project

### Backend

To run the backend server with **nodemon** (which automatically restarts on changes):

```bash
cd backend
npm run dev
```

The backend server will be available at `http://localhost:3000` (or the port specified in your `.env` file).

### Frontend

To start the Angular frontend development server:

```bash
cd frontend
ng serve
```

The Angular frontend will be available at `http://localhost:4200`.

## 🌟 Features

- **Real-time Messaging**: Powered by **Socket.IO** for instant communication between users.
- **User Authentication**: Implemented with **JWT** for secure user login and session management.
- **Input Validation**: Ensures data integrity with **express-validator**.
- **Future Security Enhancements**: **Helmet** will be used to set HTTP headers for additional security in future updates.
- **MongoDB Integration**: Store and manage user data and messages using **Mongoose**.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Acknowledgements

- [Socket.IO](https://socket.io/) for real-time communication.
- [Angular Material](https://material.angular.io/) for elegant UI components.
- [Express.js](https://expressjs.com/) for building a fast and lightweight API.
- [JWT](https://jwt.io/) for secure authentication.
- **Helmet** (for future progress!) to secure Express apps with HTTP headers.

---

Feel free to fork this repository for your reference. This project is archived and will not receive further updates, but it serves as a learning project for full-stack development.
