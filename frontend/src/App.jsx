import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegistrationForm from "./components/auth/RegistrationForm"; 
import HomePage from "./pages/HomePage"; 
const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegistrationForm />} />
      <Route path="/HomePage" element={<HomePage />} />

      </Routes>
    </Router>
  );
};

export default App;
