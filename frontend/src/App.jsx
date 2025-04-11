import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpForm from "./components/auth/SignUpForm";
import LoginPage from "./pages/LoginPage";
import UserTypeSelector from "./components/ui/UserTypeSelector";
import CandidateDashboard from "./components/ui/CandidateDashboard";
import RecruiterDashboard from "./components/ui/RecruiterDashboard";





const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpForm />} />
                
                {/* Original route - keep this */}
                <Route path="/UserTypeSelector" element={<UserTypeSelector />} />
                <Route path="/recruiterdashboard" element={<RecruiterDashboard />} />

                
                {/* Additional route options for better URL convention */}
                <Route path="/usertypeselector" element={<UserTypeSelector />} />
                <Route path="/user-type-selector" element={<UserTypeSelector />} />
                
                <Route path="/candidatedashboard" element={<CandidateDashboard />} />
            </Routes>
        </Router>
    );
};

export default App;