import React from "react";
import useFetch from "@/utils/axios";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

interface UserCreds {
  email: string;
  password: string;
}

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [userCreds, setUserCreds] = useState<UserCreds>({ email: "", password: "" });
  const handleChange = (name: keyof UserCreds, value: string) => {
    setUserCreds((state) => ({ ...state, [name]: value }));
  };
  const loginMut = useLogin(userCreds);
  return (
    <div className="page d-flex justify-content-center align-items-center">
      <div>
        <h1 className="text-center">Log In</h1>
        <form onSubmit={(e) => loginMut.submit(e)}>
          <div className="d-flex flex-wrap justify-content-center align-items-center mb-3 gap-3">
            <label>
              <span>Email:</span>
              <input
                className="form-control"
                type="email"
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </label>
            <label>
              <span>Password:</span>
              <div className="input-group">
                <input
                  className="form-control"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => handleChange("password", e.target.value)}
                />
                <button
                  onClick={() => setShowPassword((state) => !state)}
                  className="btn btn-sm btn-outline-warning"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </label>
          </div>
          <div className="d-flex flex-wrap gap-3 justify-content-center align-items-center">
            <button className="btn btn-success">LOG IN</button>
            <Link to="/" className="btn btn-outline-secondary">
              CANCEL
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

function useLogin(userCreds: UserCreds) {
  const [errorMessage, setErrorMessage] = useState("");
  const loginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await useFetch.post("/api/auth.login", userCreds);
    console.log(userCreds, res.data);
  };
  return {
    submit: loginSubmit,
    error: errorMessage,
    token: "",
  };
}
