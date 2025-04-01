import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
<<<<<<< HEAD
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
=======
import RegistrationForm from "./components/auth/RegistrationForm"; 
import HomePage from "./pages/HomePage"; 
const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegistrationForm />} />
      <Route path="/Login" element={<HomePage />} />

>>>>>>> feature/registration-page
      </Routes>
    </Router>
  );
};

export default App;