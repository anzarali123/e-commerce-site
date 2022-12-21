import { Route, Routes } from "react-router-dom";
import { Header, Footer } from "./components";
import { Home, Contact } from "./pages";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
