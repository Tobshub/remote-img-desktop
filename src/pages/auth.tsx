import React from "react";
import useFetch from "@/utils/axios";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { parseAxiosTrpcResponse } from "@/utils/trpc";

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
  const handleLoginSuccess = (token: string) => {};
  return (
    <div className="page d-flex justify-content-center align-items-center">
      <div>
        <h1 className="text-center">Log In</h1>
        <form onSubmit={(e) => loginMut.submit(e, handleLoginSuccess)}>
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
                  type="button"
                  onClick={() => setShowPassword((state) => !state)}
                  className="btn btn-sm btn-outline-warning"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </label>
          </div>
          <div className="d-flex flex-wrap gap-3 justify-content-center align-items-center">
            <button className="btn btn-success" type="submit">
              LOG IN
            </button>
            <Link to="/" className="btn btn-outline-secondary">
              CANCEL
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

function useLogin(
  userCreds: UserCreds,
  errorState?:
    | [string | undefined, React.Dispatch<React.SetStateAction<string | undefined>>]
    | undefined
) {
  const [errorMessage, setErrorMessage] = errorState ?? useState<string | undefined>(undefined);
  const [authToken, setAuthToken] = useState<string | undefined>(undefined);
  const loginSubmit = async (e: FormEvent, nextFunction?: (token: string) => any) => {
    e.preventDefault();
    const rawRes = await useFetch.post("/api/auth.login", userCreds).catch((e) => e as AxiosError);
    const res = parseAxiosTrpcResponse<{ ok: boolean; value: string }>(rawRes);
    if (res.success) {
      if (res.data.ok) {
        const token = res.data.value;
        setAuthToken(token);
        nextFunction && nextFunction(token);
        return;
      }
      console.error("UNREACHABLE");
      setErrorMessage("An error occured");
      return;
    }
    setErrorMessage(res.message);
  };
  return {
    submit: loginSubmit,
    error: errorMessage,
    token: authToken,
  };
}
