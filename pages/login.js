import React from "react";
import LoginForm from "../components/LoginForm";

function Login() {
  const submitHandler = (values) => {
    console.log("login pg ", values);
  };
  return (
    <div>
      <LoginForm />
    </div>
  );
}

export default Login;
