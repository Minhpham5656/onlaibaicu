import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Test from "./pages/Test";
import Result from "./pages/Result";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/test/:id" element={<Test />} />
      <Route path="/result" element={<Result />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
);

export default App;
