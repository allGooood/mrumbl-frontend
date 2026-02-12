import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SelectOrderType from "./pages/SelectOrderType";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/common/privateRoute";
import Dashboard from "./pages/Dashboard";
import Header from "./components/common/Header";
import CartSidebar from "./components/features/cart/CartSidebar";
import { useCartSyncOnAuth } from "./hooks/cart/useCartSyncOnAuth";
import { useAuthStore } from "./stores/useAuthStore";
import SelectLocation from "./pages/SelectLocation";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";

function AppContent() {
  useAuthStore((state) => state.token);
  const location = useLocation();

  useCartSyncOnAuth();

  return (
    <div className='App flex flex-col min-h-screen'>

      {location.pathname !== "/login" && (
        <Header />
      )}

      <CartSidebar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/order" element={<SelectOrderType />} />
        <Route path="/order/pickup" element={<SelectLocation />} />
        <Route path="/order/pickup/:storeId" element={<Products />} />
        <Route path="/order/pickup/:storeId/product/:productId" element={<ProductDetail />} />

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
