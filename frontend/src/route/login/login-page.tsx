import React, { useState } from "react";
import { LoginForm } from "./login-form";
import { SignupForm } from "./sign-up-form";

export const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="space-y-4 mt-4">
      <div className="flex flex-col items-center">
        <p>{isLogin ? "Log in" : " Sign up"}</p>
        <p className="text-gray-500 text-sm">
          {isLogin ? "No account?" : "Already have an account?"} Go here to{" "}
          <button
            className="underline hover:text-sky-500 transition-colors duration-200"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
          !
        </p>
      </div>

      {isLogin ? <LoginForm /> : <SignupForm />}
    </div>
  );
};
