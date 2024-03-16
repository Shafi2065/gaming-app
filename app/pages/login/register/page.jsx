"use client";
import React from "react";
import Register from "../../../components/registerform";
import "./register.css";
import RegistrationStepper from "@/components/Stepper";

const RegisterPage = () => {
  return (
    <div>
      <RegistrationStepper />
      <Register />
    </div>
  );
};

export default RegisterPage;
