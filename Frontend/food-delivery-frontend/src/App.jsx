import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Restaurants from "./pages/Restaurants";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/restaurants" element={<Restaurants />} />
      </Routes>
    </BrowserRouter>
  );
}