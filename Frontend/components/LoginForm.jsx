"use client";
import { useState } from "react";
import { login } from "@/services/authService";

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = await login(username, password);
      onLogin(token);
    } catch (error) {
      alert("Login failed — check username and password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#0f0f11",
      fontFamily: "'DM Sans', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Glow effects */}
      <div style={{
        position: "absolute",
        width: 600, height: 600,
        background: "radial-gradient(circle, rgba(123,97,255,0.12) 0%, transparent 70%)",
        top: -100, left: -100,
        pointerEvents: "none",
      }}/>
      <div style={{
        position: "absolute",
        width: 400, height: 400,
        background: "radial-gradient(circle, rgba(200,240,77,0.08) 0%, transparent 70%)",
        bottom: -50, right: -50,
        pointerEvents: "none",
      }}/>

      {/* Card */}
      <div style={{
        background: "#1a1a1f",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 20,
        padding: "48px 40px",
        width: 380,
        position: "relative",
        zIndex: 1,
      }}>

        {/* Logo */}
        <div style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 28,
          color: "#f0efe8",
          marginBottom: 6,
          letterSpacing: -0.5,
        }}>
          Student<span style={{ color: "#c8f04d" }}>.</span>
        </div>

        <div style={{
          fontSize: 13,
          color: "#888",
          marginBottom: 36,
        }}>
          Sign in to manage your students
        </div>

        <form onSubmit={handleLogin}>

          {/* Username */}
          <div style={{ marginBottom: 16 }}>
            <label style={{
              display: "block",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#888",
              marginBottom: 8,
            }}>
              Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                width: "100%",
                background: "#222228",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 10,
                padding: "12px 16px",
                color: "#f0efe8",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                outline: "none",
              }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: 16 }}>
            <label style={{
              display: "block",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#888",
              marginBottom: 8,
            }}>
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                background: "#222228",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 10,
                padding: "12px 16px",
                color: "#f0efe8",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                outline: "none",
              }}
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              background: "#c8f04d",
              color: "#0f0f11",
              border: "none",
              borderRadius: 10,
              padding: 13,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              fontWeight: 500,
              cursor: loading ? "not-allowed" : "pointer",
              marginTop: 8,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Signing in..." : "Sign in →"}
          </button>

        </form>
      </div>

      {/* Google Font import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500&display=swap');
      `}</style>
    </div>
  );
}