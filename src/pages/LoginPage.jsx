import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Typography, TextField, Button, InputAdornment,
  IconButton, Alert, CircularProgress, Divider, Chip,
} from "@mui/material";
import {
  Email, Lock, Visibility, VisibilityOff, MenuBook,
  School, Person,
} from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) return setError("Please enter your email address.");
    if (!password) return setError("Please enter your password.");

    setLoading(true);
    // Simulate a brief network delay
    await new Promise((r) => setTimeout(r, 800));
    const result = login(email.trim(), password);
    setLoading(false);

    if (result.success) {
      navigate("/student");
    } else {
      setError(result.error);
    }
  };

  // Demo fill buttons
  const fillDemo = (type) => {
    if (type === "institute") {
      setEmail("25mca27@kgisliim.ac.in");
      setPassword("Student@123");
    } else {
      setEmail("georgedavid07@gmail.com");
      setPassword("Student@123");
    }
    setError("");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        fontFamily: "'Inter', sans-serif",
        bgcolor: "#f8fafc",
      }}
    >
      {/* ── Left Panel ─────────────────────────────────── */}
      <Box
        sx={{
          width: { xs: 0, md: "52%" },
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
          position: "relative",
          overflow: "hidden",
          p: 6,
        }}
      >
        {/* Decorative blobs */}
        <Box sx={{ position: "absolute", top: -80, left: -80, width: 320, height: 320, borderRadius: "50%", background: "rgba(79,70,229,0.18)", filter: "blur(60px)" }} />
        <Box sx={{ position: "absolute", bottom: -60, right: -60, width: 260, height: 260, borderRadius: "50%", background: "rgba(124,58,237,0.15)", filter: "blur(50px)" }} />
        <Box sx={{ position: "absolute", top: "40%", right: "10%", width: 140, height: 140, borderRadius: "50%", background: "rgba(79,70,229,0.1)", filter: "blur(40px)" }} />

        <Box sx={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 420 }}>
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1.5, mb: 6 }}>
            <Box sx={{ bgcolor: "#4f46e5", borderRadius: "14px", p: 1.2, display: "flex" }}>
              <MenuBook sx={{ color: "#fff", fontSize: 28 }} />
            </Box>
            <Typography sx={{ color: "#fff", fontWeight: 800, fontSize: 24, letterSpacing: "0.5px" }}>
              EduPlatform
            </Typography>
          </Box>

          <Typography sx={{ color: "#fff", fontWeight: 800, fontSize: 32, mb: 2, lineHeight: 1.2 }}>
            Learn Without<br />
            <Box component="span" sx={{ background: "linear-gradient(90deg,#818cf8,#c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Boundaries
            </Box>
          </Typography>
          <Typography sx={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.7, mb: 5 }}>
            Access thousands of courses, track your progress, and earn certificates that matter — all in one place.
          </Typography>

          {/* Stats */}
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            {[{ v: "12K+", l: "Students" }, { v: "300+", l: "Courses" }, { v: "98%", l: "Satisfaction" }].map((s) => (
              <Box key={s.l} sx={{ bgcolor: "rgba(255,255,255,0.06)", borderRadius: "14px", px: 2.5, py: 1.8, border: "1px solid rgba(255,255,255,0.08)" }}>
                <Typography sx={{ color: "#818cf8", fontWeight: 800, fontSize: 20 }}>{s.v}</Typography>
                <Typography sx={{ color: "#64748b", fontSize: 12, fontWeight: 600 }}>{s.l}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* ── Right Panel / Form ─────────────────────────── */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          px: { xs: 3, sm: 6 },
          py: 5,
          bgcolor: "#fff",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 420 }}>
          {/* Mobile logo */}
          <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center", gap: 1, mb: 4 }}>
            <Box sx={{ bgcolor: "#4f46e5", borderRadius: "10px", p: 0.8, display: "flex" }}>
              <MenuBook sx={{ color: "#fff", fontSize: 20 }} />
            </Box>
            <Typography sx={{ fontWeight: 800, fontSize: 18, color: "#0f172a" }}>EduPlatform</Typography>
          </Box>

          <Typography sx={{ fontWeight: 800, fontSize: 26, color: "#0f172a", mb: 0.5 }}>
            Welcome back 👋
          </Typography>
          <Typography sx={{ color: "#64748b", fontSize: 14, mb: 4 }}>
            Sign in to continue your learning journey
          </Typography>

          {/* Demo quick fill */}
          <Box sx={{ bgcolor: "#f8fafc", borderRadius: "14px", p: 2, mb: 3, border: "1px solid #e2e8f0" }}>
            <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#64748b", mb: 1.5, textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Quick Demo Login
            </Typography>
            <Box sx={{ display: "flex", gap: 1.5 }}>
              <Button
                size="small"
                startIcon={<School sx={{ fontSize: 15 }} />}
                onClick={() => fillDemo("institute")}
                sx={{
                  flex: 1, textTransform: "none", borderRadius: "10px", fontSize: 12, fontWeight: 700,
                  bgcolor: "#e0e7ff", color: "#4f46e5", border: "1px solid #c7d2fe",
                  "&:hover": { bgcolor: "#c7d2fe" },
                }}
              >
                Institute Student
              </Button>
              <Button
                size="small"
                startIcon={<Person sx={{ fontSize: 15 }} />}
                onClick={() => fillDemo("direct")}
                sx={{
                  flex: 1, textTransform: "none", borderRadius: "10px", fontSize: 12, fontWeight: 700,
                  bgcolor: "#f3e8ff", color: "#7c3aed", border: "1px solid #e9d5ff",
                  "&:hover": { bgcolor: "#e9d5ff" },
                }}
              >
                Direct Student
              </Button>
            </Box>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2.5, borderRadius: "12px", fontSize: 13 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <Box sx={{ mb: 2 }}>
              <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#374151", mb: 0.8 }}>
                Email Address
              </Typography>
              <TextField
                fullWidth
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ fontSize: 18, color: "#94a3b8" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    fontSize: 14,
                    "&:hover fieldset": { borderColor: "#a5b4fc" },
                    "&.Mui-focused fieldset": { borderColor: "#4f46e5", borderWidth: 2 },
                  },
                }}
              />
            </Box>

            {/* Password */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.8 }}>
                <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#374151" }}>Password</Typography>
                <Typography sx={{ fontSize: 12, color: "#4f46e5", fontWeight: 600, cursor: "pointer", "&:hover": { textDecoration: "underline" } }}>
                  Forgot password?
                </Typography>
              </Box>
              <TextField
                fullWidth
                type={showPwd ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ fontSize: 18, color: "#94a3b8" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setShowPwd((p) => !p)} edge="end">
                        {showPwd ? <VisibilityOff sx={{ fontSize: 18 }} /> : <Visibility sx={{ fontSize: 18 }} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    fontSize: 14,
                    "&:hover fieldset": { borderColor: "#a5b4fc" },
                    "&.Mui-focused fieldset": { borderColor: "#4f46e5", borderWidth: 2 },
                  },
                }}
              />
            </Box>

            <Button
              type="submit"
              fullWidth
              disabled={loading}
              sx={{
                background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                color: "#fff",
                fontWeight: 800,
                fontSize: 15,
                borderRadius: "14px",
                py: 1.6,
                textTransform: "none",
                boxShadow: "0 4px 14px rgba(79,70,229,0.35)",
                "&:hover": { background: "linear-gradient(135deg, #4338ca, #6d28d9)", boxShadow: "0 6px 20px rgba(79,70,229,0.45)" },
                "&:disabled": { opacity: 0.7 },
                transition: "all 0.2s",
              }}
            >
              {loading ? <CircularProgress size={20} sx={{ color: "#fff" }} /> : "Sign In →"}
            </Button>
          </Box>

          <Divider sx={{ my: 3 }}>
            <Typography sx={{ fontSize: 12, color: "#94a3b8", px: 1 }}>Password for both demo accounts: Student@123</Typography>
          </Divider>

          <Box sx={{ display: "flex", gap: 1, justifyContent: "center", flexWrap: "wrap" }}>
            <Chip icon={<School sx={{ fontSize: 14 }} />} label="Institute: 25mca27@kgisliim.ac.in" size="small" sx={{ fontSize: 11, bgcolor: "#e0e7ff", color: "#4f46e5", fontWeight: 600, "& .MuiChip-icon": { color: "#4f46e5" } }} />
            <Chip icon={<Person sx={{ fontSize: 14 }} />} label="Direct: georgedavid07@gmail.com" size="small" sx={{ fontSize: 11, bgcolor: "#f3e8ff", color: "#7c3aed", fontWeight: 600, "& .MuiChip-icon": { color: "#7c3aed" } }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
