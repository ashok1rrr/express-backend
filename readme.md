                                          React Authentication App

This is a React-based authentication app that allows users to sign up, log in, and access a protected dashboard. The app uses the following technologies:

-React.js: For building the user interface.
- React Router: For client-side navigation.
- Axios: For making API requests.
- React Context API: For global state management (authentication and theme).
- Framer Motion: For smooth UI animations.
- React Hook Form: For form validation.

     Features

1. Authentication:
   - Users can sign up and log in.
   - JWT tokens are stored in `localStorage` for session management.
   - Protected routes ensure only authenticated users can access the dashboard.

2. Dark Mode:
   - A theme switcher allows users to toggle between light and dark modes.
   - Theme preferences are managed using React Context.

3. Smooth Animations:
   - Page transitions and component animations are implemented using **Framer Motion**.

4. Form Validation:
   - Forms are validated using **React Hook Form**.
   - Error messages are displayed for invalid inputs.

5. Backend Integration:
   - The app integrates with a backend API for authentication and data fetching.
   - Mock data is used for testing purposes.

 Installation

1. Clone the repository:
     git clone https://github.com/your-username/react-auth-app.git

2. Navigate to the project directory:    
    cd react-auth-app

3. Install dependencies:
    npm install

4. Start the development server:
     npm run dev

Open your browser and go to http://localhost:5173.

Usage

Sign Up: Navigate to the signup page and create an account.

Log In: Use your credentials to log in.

Dashboard:After logging in, you will be redirected to the dashboard.The dashboard displays user-specific data.

Log Out: Click the logout button on the dashboard to log out.

Dark Mode: Toggle the theme switcher to switch between light and dark modes.

Folder Structure

src/
├── components/
│   ├── ProtectedRoute.jsx
│   ├── ThemeSwitcher.jsx
├── context/
│   ├── AuthContext.js
│   ├── ThemeContext.js
├── pages/
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── Dashboard.jsx
├── App.jsx
├── main.jsx
├── api.js
├── App.css

Dependencies

react:  18.2.0
react-router-dom:  6.14.2
axios:  1.5.0
react-hook-form:  7.45.4
framer-motion:  10.15.1