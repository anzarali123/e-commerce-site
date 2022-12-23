import { Route, Routes } from "react-router-dom";
import { Header, Footer, AdminOnlyRoute } from "./components";
import {
  Home,
  Contact,
  Login,
  Register,
  Reset,
  OrderHistory,
  Cart,
  Admin,
} from "./pages";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/admin/*"
          element={
            <AdminOnlyRoute>
              <Admin />
            </AdminOnlyRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
