import { Route, Routes } from "react-router-dom";
import { Header, Footer } from "./components";
import { Home, Contact, Login, Register, Reset, OrderHistory } from "./pages";

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
      </Routes>
      <Footer />
    </>
  );
}

export default App;
