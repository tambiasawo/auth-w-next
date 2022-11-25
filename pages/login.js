import React from "react";
import LoginForm from "../components/LoginForm";

function Login() {
  const submitHandler = (values) => {
    console.log("login pg ", values);
  };
  return (
    <div>
      <LoginForm
        submitFunc={(values) => {
          console.log("Form Submitted", values);
        }}
      />
    </div>
  );
}

export default Login;
