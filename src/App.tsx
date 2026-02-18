import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./features/home/pages/Home";
import Login from "./features/auth/pages/Login";
import SelectOrderType from "./features/order/pages/SelectOrderType";
import { AuthProvider } from "./features/auth/context/AuthContext";
import { LoadingProvider } from "./shared/context/LoadingProvider";
import { GlobalDialog } from "./components/ui/layout/GlobalDialog";
import PrivateRoute from "./components/common/privateRoute";
import Dashboard from "./features/auth/pages/Dashboard";
import Header from "./components/common/Header";
import CartSidebar from "./components/features/cart/CartSidebar";
import { useCartSyncOnAuth } from "./features/cart/hooks/useCartSyncOnAuth";
import { useAuthStore } from "./features/auth/stores/useAuthStore";
import SelectLocation from "./features/store/pages/SelectLocation";
import Products from "./features/product/pages/Products";
import ProductDetail from "./features/product/pages/ProductDetail";
import GlobalToaster from "./components/ui/layout/GlobalToaster";
import CheckOut from "./features/order/pages/CheckOut";

const AppContent = () => {
  useAuthStore((state) => state.token);
  const location = useLocation();
  
  useCartSyncOnAuth();

  return (
    <div className='App flex flex-col min-h-screen'>

      {location.pathname !== "/login" && <Header />}
      
      <GlobalToaster />
      <GlobalDialog />
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
          <Route path="/order/pickup/:storeId/checkout" element={<CheckOut />}/>
        </Route>
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <LoadingProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </LoadingProvider>
    </AuthProvider>
  );
};

export default App;

