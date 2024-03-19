"use client";
import React from "react";
import Register from "../../../../components/registerform";
import "./register.css";
import RegistrationStepper from "@/components/Stepper";
import ColourNav from "@/components/Nav";

const RegisterPage = () => {
  return (
    <>
      <ColourNav />
      <div className="mt-5">
        <RegistrationStepper />
      </div>
      <>
        <Register />
      </>
    </>
  );
};

export default RegisterPage;
