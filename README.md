# Messy - MERN Stack Mess Coupon Management System

Welcome to Messy, the MERN stack Mess Coupon Management System designed specifically for IIIT Bhubaneswar. This application simplifies the management of meal coupons for the mess, providing an efficient and user-friendly interface for both administrators and users.

## Features

- **User Authentication**: Secure user authentication and authorization system.
- **Coupon Management**: Allows users to view, purchase, and manage meal coupons.
- **Admin Dashboard**: Provides administrators with a dashboard to manage coupons, users, and transactions.
- **Razorpay payment**: Integrated Razorpay payment gateway to facilitate online purchase of coupons on the platform.
- **Mobile Responsive**: Designed to be responsive and accessible on various devices.

## Dummy Credentials
- Admin
  - Email : admin@gmail.com Password : admin@1234
- Student
  - Student : student@gmail.com Password : student@1234

Feel free to create new account and explore our application

## Installation

To run Messy locally, follow these steps:

1. Clone the repository:

```bash
git clone <repository-url>
```
2. Install dependencies for both client and server

```bash
npm install
cd client
npm install
```
3. Set up environment variables
- Create a .env file in the root directory.
- Define the following variables :
```bash
MONGODB_URI= YOUR DATABASE URL
PORT = 5000
JWT_SECRET = YOUR SECRET STRING
RAZORPAY_ID_KEY = YOUR RAZORPAY ID KEY
RAZORPAY_SECRET_KEY = YOUR RAZORPAY SECRET KEY
NODE_ENV = development/production
```
- Create .env file in the client directory
- Define the following variables :
```bash
REACT_APP_SERVER_BASE_URL = http://localhost:5000
RAZORPAY_ID_KEY = YOUR RAZORPAY ID KEY
```
4. Start the development servers:
- Start the client :
```bash
cd ./client
npm start
```
- Start the server :
```bash
npm start
```
## Technologies Used
- Frontend:
  - React.js
  - Material-UI
- Backend:
  - Node.js
  - Express.js
  - MongoDB
- Payment Gateway:
  - Razorpay
    
## Contributing
Contributions are welcome! If you'd like to contribute to Messy, please follow these steps:
1. Fork the repository.
2. Create a new branch (git checkout -b feature/<feature-name>).
3. Commit your changes (git commit -am 'Add new feature').
4. Push to the branch (git push origin feature/<feature-name>).
5. Create a new Pull Request.
