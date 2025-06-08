import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import AddAnnonce from "./pages/AddAnnonce/AddAnnonce";
import Cart from "./pages/Cart/Cart";
import Category from "./pages/Category/Category"; // ⬅️ Add this
import NavBarUI from "./components/NavBar/NavBarUI";

function App() {
  return (
    <BrowserRouter>
      <NavBarUI />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/annonce/ajouter" element={<AddAnnonce />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category" element={<Category />} /> {/* ⬅️ Add this */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
