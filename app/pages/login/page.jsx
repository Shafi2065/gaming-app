"use client";
import React from "react";
import Login from "../../../components/loginform";
import "./register/register.css";
import ColourNav from "@/components/Nav";

const LoginPage = () => {
  return (
    <div>
      <ColourNav />
      <Login />
    </div>
  );
};

export default LoginPage;
