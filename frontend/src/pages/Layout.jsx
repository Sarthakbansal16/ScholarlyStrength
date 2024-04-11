import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomeHeader from "../components/HomeHeader/HomeHeader";
import Home from "../components/Home/Home";
import Cookies from "js-cookie";

export default function Layout() {
  const navigate = useNavigate();

  useEffect(() => {
    const allowLogin = !!Cookies.get("refreshToken");
    if (!allowLogin) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <HomeHeader />
      <Home />
    </>
  );
}
