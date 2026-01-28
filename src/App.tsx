import { BrowserRouter, Route, Routes, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/privateRoute";
import Dashboard from "./pages/Dashboard";
import Button from "./components/Button";
import Header from "./components/Header";
import { useAuthStore } from "./stores/useAuthStore";
import { useAuthActions } from "./api/authService";

function AppContent() {
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = !!token;
  const { signout } = useAuthActions();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signout();
    navigate('/');
  };

  return (
    <div className='App'>
      <Header />
      <Routes>
        {/* <Route path="/" element={<Home/>}></Route> */}
        <Route path="/login" element={<Login/>}></Route>

        {/* 보호된 라우트 */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Route>
      </Routes>
{/* 
      <Link to="/">
        <Button className="mr-2">Home</Button>
      </Link>

      {!isAuthenticated && (
        <Link to="/login">
          <Button className="mr-2">login</Button>
        </Link>
      )}

      {isAuthenticated && (
        <Button onClick={handleLogout}>logout</Button>
      )} */}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
