import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
<<<<<<< Updated upstream
=======
import SignUpForm from "./components/auth/SignUpForm";
import LoginPage from "./pages/LoginPage";
import UserTypeSelector from "./components/ui/UserTypeSelector";
import CandidateDashboard from "./components/ui/CandidateDashboard";
>>>>>>> Stashed changes
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <Routes>
<<<<<<< Updated upstream
        <Route path="/" element={<HomePage />} />
=======
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/UserTypeSelector" element={<UserTypeSelector />} />
        <Route path="/candidatedashboard" element={<CandidateDashboard />} />

>>>>>>> Stashed changes
      </Routes>
    </Router>
  );
}

export default App;
