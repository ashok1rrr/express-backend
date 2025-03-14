import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import "./Signup.css"; // Import the CSS file

const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  // Form state for signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Validate that password and confirmPassword match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Replace with your actual signup API endpoint
      const response = await fetch("https://example.com/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signup failed");
      }

      const data = await response.json();
      const token = data.token;

      if (token) {
        localStorage.setItem("token", token);
        navigate("/dashboard");
      } else {
        throw new Error("Signup unsuccessful.");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during signup");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>SIGN UP</h1>
        <p>Create a new account</p>

        {error && <div className="error">{error}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label>Email</label>
            <input
              className="login-input"
              type="email"
              placeholder="name@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="login-field">
            <label>Password</label>
            <div style={{ position: "relative" }}>
              <input
                className="login-input"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                pattern="(?=.*[!@#$%^&*])(?=.{8,})"
                title="Password must be at least 8 characters long and include at least one special character (!@#$%^&*)."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="password-toggle" onClick={togglePasswordVisibility}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
          </div>

          <div className="login-field">
            <label>Confirm Password</label>
            <div style={{ position: "relative" }}>
              <input
                className="login-input"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                // You may also add the same pattern validation here if desired
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className="password-toggle" onClick={toggleConfirmPasswordVisibility}>
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
          </div>

          <button type="submit" className="login-button">
            SIGN UP
          </button>
        </form>

        <div className="login-footer">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
