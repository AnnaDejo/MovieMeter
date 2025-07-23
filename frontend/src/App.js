import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserProvider } from "./contexts/UserContext";
import './index.css';

function LayoutWrapper({ children }) {
  const location = useLocation();
  const hideNavbarRoutes = ["/register", "/login"];
  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <div
        style={{
          marginTop: hideNavbar ? 0 : "60px",
          minHeight: "100vh",
          backgroundColor: "#121212", // Matches Home.css
          color: "#fff",
        }}
      >
        {children}
      </div>
    </>
  );
}


function AppRoutes() {
  return (
    <LayoutWrapper>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </LayoutWrapper>
  );
}

function App() {
  return (
    <UserProvider>
      <Router>
        <AppRoutes />
      </Router>
    </UserProvider>
  );
}

export default App;
