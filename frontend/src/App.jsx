import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpForm from "./components/auth/SignUpForm";
import LoginPage from "./pages/LoginPage";
import UserTypeSelector from "./components/ui/UserTypeSelector";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/UserTypeSelector" element={<UserTypeSelector />} />
      </Routes>
    </Router>
  );
};

export default App;