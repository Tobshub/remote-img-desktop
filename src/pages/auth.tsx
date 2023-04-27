import { useState } from "react";
import { Link } from "react-router-dom";

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="page d-flex justify-content-center align-items-center">
      <div>
        <h1 className="text-center">Log In</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="d-flex flex-wrap justify-content-center align-items-center mb-3 gap-3">
            <label>
              <span>Email:</span>
              <input className="form-control" type="email" />
            </label>
            <label>
              <span>Password:</span>
              <div className="input-group">
                <input
                  className="form-control"
                  type={showPassword ? "text" : "password"}
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
