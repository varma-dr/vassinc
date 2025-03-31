import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/auth/Register";  

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />  
      </Routes>
    </Router>
  );
}

export default App;
