import React, { useState } from "react";
import StudentLayout from "../Components/StudentLayout";
import {
  Box, Typography, Button, Chip, Switch,
} from "@mui/material";
import {
  Check, Star, Bolt, WorkspacePremium, RocketLaunch,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const PLANS = [
  {
    id: "basic",
    name: "Basic",
    icon: <Bolt sx={{ fontSize: 22, color: "#64748b" }} />,
    monthlyPrice: 499,
    yearlyPrice: 3999,
    description: "Perfect to get started with online learning",
    color: "#4f46e5",
    gradient: "linear-gradient(135deg, #e0e7ff, #f8fafc)",
    border: "#c7d2fe",
    badge: null,
    features: [
      "Access to 50+ free courses",
      "Course completion certificates",
      "Mobile & desktop access",
      "Community forum access",
      "Basic progress tracking",
      "Email support",
    ],
    missing: ["Live mentorship sessions", "AI-powered practice", "Placement assistance", "Priority support"],
  },
  {
    id: "pro",
    name: "Pro",
    icon: <Star sx={{ fontSize: 22, color: "#f59e0b" }} />,
    monthlyPrice: 999,
    yearlyPrice: 7999,
    description: "Most popular — ideal for serious learners",
    color: "#4f46e5",
    gradient: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    border: "#4f46e5",
    badge: "Most Popular",
    features: [
      "Access to 300+ premium courses",
      "Verified certificates",
      "Offline downloads",
      "Live mentorship (4 sessions/month)",
      "AI-powered practice tests",
      "Priority email & chat support",
      "Advanced analytics dashboard",
      "Early access to new courses",
    ],
    missing: ["Dedicated career coach", "Placement guarantee"],
  },
  {
    id: "elite",
    name: "Elite",
    icon: <WorkspacePremium sx={{ fontSize: 22, color: "#7c3aed" }} />,
    monthlyPrice: 1999,
    yearlyPrice: 15999,
    description: "Full-access with placement assistance",
    color: "#7c3aed",
    gradient: "linear-gradient(135deg, #f3e8ff, #f8fafc)",
    border: "#e9d5ff",
    badge: "Best Value",
    features: [
      "All Pro features included",
      "Unlimited live mentorship",
      "Dedicated career coach",
      "Resume & portfolio review",
      "Mock interview sessions",
      "Job placement assistance",
      "1-on-1 doubt clearing",
      "Lifetime course access",
    ],
    missing: [],
  },
];

export default function PricingPage() {
  const navigate = useNavigate();
  const [annual, setAnnual] = useState(false);

  return (
    <StudentLayout title="Pricing Plans">
      <Box sx={{ maxWidth: 1100, mx: "auto" }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Chip
            icon={<RocketLaunch sx={{ fontSize: 14 }} />}
            label="Flexible Plans"
            sx={{ bgcolor: "#e0e7ff", color: "#4f46e5", fontWeight: 700, mb: 1.5, border: "none" }}
          />
          <Typography sx={{ fontWeight: 800, fontSize: 28, color: "#0f172a", mb: 1 }}>
            Choose Your Learning Plan
          </Typography>
          <Typography sx={{ color: "#64748b", fontSize: 15, mb: 3 }}>
            Unlock your potential with the right plan. Cancel anytime.
          </Typography>

          {/* Toggle */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1.5 }}>
            <Typography sx={{ fontWeight: 700, fontSize: 14, color: annual ? "#94a3b8" : "#0f172a" }}>Monthly</Typography>
            <Switch
              checked={annual}
              onChange={(e) => setAnnual(e.target.checked)}
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": { color: "#4f46e5" },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: "#4f46e5" },
              }}
            />
            <Typography sx={{ fontWeight: 700, fontSize: 14, color: annual ? "#0f172a" : "#94a3b8" }}>
              Annual
            </Typography>
            {annual && (
              <Chip label="Save up to 33%" size="small" sx={{ bgcolor: "#dcfce7", color: "#16a34a", fontWeight: 700, fontSize: 11, border: "none" }} />
            )}
          </Box>
        </Box>

        {/* Plans */}
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 2.5 }}>
          {PLANS.map((plan) => {
            const isPro = plan.id === "pro";
            const price = annual ? plan.yearlyPrice : plan.monthlyPrice;

            return (
              <Box
                key={plan.id}
                sx={{
                  position: "relative",
                  borderRadius: "20px",
                  border: `2px solid ${isPro ? "#4f46e5" : plan.border}`,
                  overflow: "hidden",
                  transition: "all 0.22s",
                  "&:hover": { transform: "translateY(-4px)", boxShadow: isPro ? "0 20px 50px rgba(79,70,229,0.25)" : "0 12px 30px rgba(0,0,0,0.10)" },
                  boxShadow: isPro ? "0 8px 30px rgba(79,70,229,0.2)" : "none",
                }}
              >
                {/* Badge */}
                {plan.badge && (
                  <Box sx={{
                    position: "absolute", top: 16, right: 16,
                    bgcolor: isPro ? "#fef9c3" : "#e0e7ff",
                    color: isPro ? "#b45309" : "#4f46e5",
                    borderRadius: "8px", px: 1.2, py: 0.3,
                    fontSize: 11, fontWeight: 800,
                  }}>
                    {plan.badge}
                  </Box>
                )}

                {/* Header */}
                <Box sx={{ background: isPro ? plan.gradient : plan.gradient, p: 3, pb: 2.5 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                    <Box sx={{
                      bgcolor: isPro ? "rgba(255,255,255,0.2)" : "#fff",
                      borderRadius: "10px", p: 0.8, display: "flex",
                    }}>
                      {plan.icon}
                    </Box>
                    <Typography sx={{ fontWeight: 800, fontSize: 18, color: isPro ? "#fff" : "#0f172a" }}>
                      {plan.name}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: 13, color: isPro ? "rgba(255,255,255,0.8)" : "#64748b", mb: 2 }}>
                    {plan.description}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5 }}>
                    <Typography sx={{ fontSize: 32, fontWeight: 900, color: isPro ? "#fff" : "#0f172a" }}>
                      ₹{price.toLocaleString()}
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: isPro ? "rgba(255,255,255,0.7)" : "#94a3b8", fontWeight: 600 }}>
                      /{annual ? "year" : "month"}
                    </Typography>
                  </Box>
                  {annual && (
                    <Typography sx={{ fontSize: 11, color: isPro ? "rgba(255,255,255,0.6)" : "#94a3b8", mt: 0.5 }}>
                      ₹{Math.round(price / 12).toLocaleString()}/month billed annually
                    </Typography>
                  )}
                </Box>

                {/* Features */}
                <Box sx={{ bgcolor: "#fff", p: 3 }}>
                  <Box sx={{ mb: 2.5 }}>
                    {plan.features.map((f) => (
                      <Box key={f} sx={{ display: "flex", alignItems: "flex-start", gap: 1, mb: 1 }}>
                        <Check sx={{ fontSize: 16, color: "#16a34a", mt: 0.2, flexShrink: 0 }} />
                        <Typography sx={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>{f}</Typography>
                      </Box>
                    ))}
                    {plan.missing.map((f) => (
                      <Box key={f} sx={{ display: "flex", alignItems: "flex-start", gap: 1, mb: 1, opacity: 0.4 }}>
                        <Box sx={{ width: 16, height: 16, mt: 0.2, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Box sx={{ width: 12, height: 1.5, bgcolor: "#94a3b8", borderRadius: 1 }} />
                        </Box>
                        <Typography sx={{ fontSize: 13, color: "#94a3b8", textDecoration: "line-through", fontWeight: 500 }}>{f}</Typography>
                      </Box>
                    ))}
                  </Box>

                  <Button
                    fullWidth
                    onClick={() => navigate("/purchase/plan/" + plan.id)}
                    sx={{
                      background: isPro ? "linear-gradient(135deg,#4f46e5,#7c3aed)" : "#f1f5f9",
                      color: isPro ? "#fff" : "#0f172a",
                      fontWeight: 800, fontSize: 14, borderRadius: "12px",
                      py: 1.4, textTransform: "none", boxShadow: "none",
                      "&:hover": {
                        background: isPro ? "linear-gradient(135deg,#4338ca,#6d28d9)" : "#e2e8f0",
                        boxShadow: "none",
                      },
                    }}
                  >
                    {isPro ? "Get Started →" : plan.id === "elite" ? "Contact Sales" : "Choose Basic"}
                  </Button>
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* Trust badges */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 4, mt: 4, flexWrap: "wrap" }}>
          {["✅ No hidden fees", "✅ Cancel anytime", "✅ 7-day free trial", "✅ Secure payments"].map((t) => (
            <Typography key={t} sx={{ fontSize: 13, color: "#64748b", fontWeight: 600 }}>{t}</Typography>
          ))}
        </Box>
      </Box>
    </StudentLayout>
  );
}
