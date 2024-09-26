import React from "react";
import "./App.css";
import "./assets/fonts/Vazirmatn-Regular.ttf";
import { Routes, Route, Navigate } from "react-router-dom";

import NavBar from "./components/NavBar";
import MainPage from "./pages/home/MainPage";
import AboutTest from "./pages/about-test/AboutTest";
import AboutUs from "./pages/about-us/AboutUs";
import TestRoutes from "./pages/test/TestRoutes";
import DataRoutes from "./pages/data/DataRoutes";
import Login from "./pages/login/Login";

////////////
function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="test/*" element={<TestRoutes />} />
        <Route path="about-test" element={<AboutTest />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="login" element={<Login />} />
        <Route path="data/*" element={<DataRoutes />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
