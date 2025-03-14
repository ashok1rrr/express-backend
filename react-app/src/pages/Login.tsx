import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import "./Login.css"; // Import the CSS file

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  // Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      // Replace with your actual API endpoint
      const response = await fetch("https://example.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      const token = data.token;

      if (token) {
        localStorage.setItem("token", token);
        navigate("/dashboard");
      } else {
        throw new Error("Invalid login credentials.");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during login");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>LOGIN</h1>
        <p>Please enter your login and password!</p>

        {error && <div className="error">{error}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field" style={{ position: "relative" }}>
            <label>Email</label>
            <input
              className="login-input"
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="login-field" style={{ position: "relative" }}>
            <label>Password</label>
            <input
              className="login-input"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="password-toggle" onClick={togglePasswordVisibility}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <Link to="/forgot-password" style={{ color: "#aaa", fontSize: "0.875rem" }}>
              Forgot password?
            </Link>
          </div>

          <button className="login-button" type="submit">
            LOGIN
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don&apos;t have an account?
            <Link to="/signup"> Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
