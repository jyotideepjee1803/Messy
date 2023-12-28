# Node.js OAuth Sign-In Using Passport

## Overview

This repository provides a simple Node.js application that demonstrates OAuth sign-in using Passport with Google as the authentication provider. OAuth allows users to sign in to your application using their Google credentials, providing a seamless and secure authentication experience.

## Prerequisites

Before getting started, ensure that you have the following installed:

- Node.js
- npm (Node Package Manager)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/nodejs-oauth-signin.git
   
2. Navigate to the project directory:
   
   ```bash
   cd nodejs-oauth-signin

3. Install dependencies:
   
   ```bash
   npm install
   
## Configuration
1. Create a project in the [Google Cloud Console](https://console.cloud.google.com/).
2. Enable the "Google+ API" for your project.
3. Create credentials for a new OAuth 2.0 client ID.
4. Configure the .env file with your Google OAuth credentials:

```env
    PORT = Port number
    clientID = your-google-client-id
    clientSecret = your-google-client-secret
    MONGODB_URI = your database URL
    cookieKey = your string to be used as key in cookies
```

## USAGE
Start the application
```bash
  node index.js
```

## CONTRIBUTIONS
Contributions are welcome! Feel free to submit pull requests or to open issues
