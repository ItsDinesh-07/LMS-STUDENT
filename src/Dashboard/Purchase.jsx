import React, { useState } from "react";
import StudentLayout from "../Components/StudentLayout";
import {
  Box, Typography, Button, TextField, Chip,
  Alert, Divider,
} from "@mui/material";
import {
  CreditCard, Lock, CheckCircle, ShoppingCart, ArrowBack,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";

const COURSE_DATA = {
  1: { title: "Full-Stack Web Development", instructor: "Alex Johnson", price: 2999, originalPrice: 5999, duration: "48 hrs", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80", color: "#4f46e5" },
  2: { title: "Data Science & Machine Learning", instructor: "Sarah Kim", price: 3499, originalPrice: 6999, duration: "60 hrs", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80", color: "#0891b2" },
  3: { title: "UI/UX Design Masterclass", instructor: "Maria Garcia", price: 1999, originalPrice: 3999, duration: "32 hrs", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80", color: "#7c3aed" },
  4: { title: "Python for AI & Deep Learning", instructor: "David Chen", price: 3999, originalPrice: 7999, duration: "56 hrs", image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=600&q=80", color: "#059669" },
  5: { title: "Digital Marketing & SEO", instructor: "Priya Patel", price: 1499, originalPrice: 2999, duration: "24 hrs", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80", color: "#d97706" },
  6: { title: "React & TypeScript Advanced", instructor: "James Lee", price: 2499, originalPrice: 4999, duration: "40 hrs", image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&q=80", color: "#4f46e5" },
};

export default function PurchasePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paySuccess, setPaySuccess] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [cardNum, setCardNum] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");

  const course = COURSE_DATA[id] || COURSE_DATA[1];
  const discount = couponApplied ? Math.round(course.price * 0.1) : 0;
  const finalPrice = course.price - discount;

  const handleCoupon = () => {
    if (coupon.trim().toUpperCase() === "EDU10") setCouponApplied(true);
  };

  const handlePay = () => {
    if (!cardNum || !expiry || !cvv || !name) return;
    setPaySuccess(true);
  };

  if (paySuccess) {
    return (
      <StudentLayout title="Purchase">
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
          <Box sx={{ textAlign: "center", maxWidth: 400 }}>
            <Box sx={{ bgcolor: "#f0fdf4", borderRadius: "50%", width: 100, height: 100, display: "flex", alignItems: "center", justifyContent: "center", mx: "auto", mb: 3 }}>
              <CheckCircle sx={{ fontSize: 52, color: "#16a34a" }} />
            </Box>
            <Typography sx={{ fontWeight: 800, fontSize: 24, color: "#0f172a", mb: 1 }}>Payment Successful! 🎉</Typography>
            <Typography sx={{ color: "#64748b", fontSize: 14, mb: 3 }}>
              You're now enrolled in <strong>{course.title}</strong>. Start learning right away!
            </Typography>
            <Button
              onClick={() => navigate("/mycourses")}
              sx={{
                background: "linear-gradient(135deg,#4f46e5,#7c3aed)", color: "#fff",
                fontWeight: 700, borderRadius: "12px", px: 4, py: 1.5, textTransform: "none",
              }}
            >
              Go to My Courses →
            </Button>
          </Box>
        </Box>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout title="Purchase">
      <Box sx={{ maxWidth: 860, mx: "auto" }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{ mb: 2.5, textTransform: "none", color: "#64748b", fontWeight: 600 }}
        >
          Back
        </Button>

        <Typography sx={{ fontWeight: 800, fontSize: 22, color: "#0f172a", mb: 3 }}>
          Complete Purchase
        </Typography>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 380px" }, gap: 3 }}>
          {/* Payment Form */}
          <Box sx={{ bgcolor: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0", p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
              <CreditCard sx={{ fontSize: 22, color: "#4f46e5" }} />
              <Typography sx={{ fontWeight: 800, fontSize: 16, color: "#0f172a" }}>Payment Details</Typography>
              <Box sx={{ ml: "auto", display: "flex", gap: 1 }}>
                {["VISA", "MASTER", "UPI"].map((p) => (
                  <Chip key={p} label={p} size="small" sx={{ fontWeight: 700, fontSize: 10, bgcolor: "#f1f5f9", color: "#475569", border: "none" }} />
                ))}
              </Box>
            </Box>

            <Box sx={{ display: "grid", gap: 2 }}>
              <TextField
                label="Name on Card"
                fullWidth size="small"
                value={name} onChange={(e) => setName(e.target.value)}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px", "&.Mui-focused fieldset": { borderColor: "#4f46e5" } } }}
              />
              <TextField
                label="Card Number"
                fullWidth size="small"
                placeholder="1234 5678 9012 3456"
                value={cardNum}
                onChange={(e) => setCardNum(e.target.value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim())}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px", "&.Mui-focused fieldset": { borderColor: "#4f46e5" } } }}
              />
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                <TextField
                  label="Expiry (MM/YY)"
                  size="small"
                  value={expiry}
                  onChange={(e) => {
                    let v = e.target.value.replace(/\D/g, "").slice(0, 4);
                    if (v.length >= 3) v = v.slice(0, 2) + "/" + v.slice(2);
                    setExpiry(v);
                  }}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px", "&.Mui-focused fieldset": { borderColor: "#4f46e5" } } }}
                />
                <TextField
                  label="CVV"
                  size="small"
                  type="password"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px", "&.Mui-focused fieldset": { borderColor: "#4f46e5" } } }}
                />
              </Box>
            </Box>

            {/* Coupon */}
            <Box sx={{ mt: 3, pt: 3, borderTop: "1px solid #f1f5f9" }}>
              <Typography sx={{ fontWeight: 700, fontSize: 13, color: "#374151", mb: 1 }}>Coupon Code (try: EDU10)</Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                  size="small" placeholder="Enter coupon"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  disabled={couponApplied}
                  sx={{ flex: 1, "& .MuiOutlinedInput-root": { borderRadius: "10px", "&.Mui-focused fieldset": { borderColor: "#4f46e5" } } }}
                />
                <Button
                  onClick={handleCoupon}
                  disabled={couponApplied}
                  sx={{
                    bgcolor: couponApplied ? "#dcfce7" : "#4f46e5", color: couponApplied ? "#16a34a" : "#fff",
                    fontWeight: 700, borderRadius: "10px", textTransform: "none", px: 2.5,
                    "&:hover": { bgcolor: couponApplied ? "#dcfce7" : "#4338ca" },
                  }}
                >
                  {couponApplied ? "Applied ✓" : "Apply"}
                </Button>
              </Box>
              {couponApplied && <Alert severity="success" sx={{ mt: 1, borderRadius: "10px", fontSize: 12 }}>10% discount applied!</Alert>}
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 3, color: "#94a3b8" }}>
              <Lock sx={{ fontSize: 14 }} />
              <Typography sx={{ fontSize: 11, fontWeight: 600 }}>256-bit SSL encryption · Your payment is secure</Typography>
            </Box>
          </Box>

          {/* Order Summary */}
          <Box>
            <Box sx={{ bgcolor: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden", mb: 2 }}>
              <Box
                component="img"
                src={course.image}
                sx={{ width: "100%", height: 150, objectFit: "cover" }}
              />
              <Box sx={{ p: 2.5 }}>
                <Typography sx={{ fontWeight: 800, fontSize: 14, color: "#0f172a", mb: 0.5 }}>{course.title}</Typography>
                <Typography sx={{ fontSize: 12, color: "#64748b", mb: 2 }}>by {course.instructor} · {course.duration}</Typography>

                <Divider sx={{ mb: 2 }} />

                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography sx={{ fontSize: 13, color: "#64748b" }}>Original Price</Typography>
                  <Typography sx={{ fontSize: 13, color: "#94a3b8", textDecoration: "line-through" }}>₹{course.originalPrice.toLocaleString()}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography sx={{ fontSize: 13, color: "#64748b" }}>Course Price</Typography>
                  <Typography sx={{ fontSize: 13, color: "#0f172a", fontWeight: 700 }}>₹{course.price.toLocaleString()}</Typography>
                </Box>
                {couponApplied && (
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography sx={{ fontSize: 13, color: "#16a34a", fontWeight: 700 }}>Coupon Discount</Typography>
                    <Typography sx={{ fontSize: 13, color: "#16a34a", fontWeight: 700 }}>-₹{discount.toLocaleString()}</Typography>
                  </Box>
                )}
                <Divider sx={{ my: 1.5 }} />
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2.5 }}>
                  <Typography sx={{ fontWeight: 800, fontSize: 15, color: "#0f172a" }}>Total</Typography>
                  <Typography sx={{ fontWeight: 900, fontSize: 18, color: "#4f46e5" }}>₹{finalPrice.toLocaleString()}</Typography>
                </Box>

                <Button
                  fullWidth
                  onClick={handlePay}
                  startIcon={<ShoppingCart />}
                  sx={{
                    background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
                    color: "#fff", fontWeight: 800, fontSize: 15,
                    borderRadius: "12px", py: 1.5, textTransform: "none",
                    boxShadow: "0 4px 14px rgba(79,70,229,0.35)",
                    "&:hover": { background: "linear-gradient(135deg,#4338ca,#6d28d9)" },
                  }}
                >
                  Pay ₹{finalPrice.toLocaleString()}
                </Button>
              </Box>
            </Box>

            <Box sx={{ bgcolor: "#f0fdf4", borderRadius: "12px", p: 2, border: "1px solid #bbf7d0" }}>
              {["30-day money back guarantee", "Lifetime access", "Certificate of completion"].map((t) => (
                <Box key={t} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.6 }}>
                  <CheckCircle sx={{ fontSize: 14, color: "#16a34a" }} />
                  <Typography sx={{ fontSize: 12, color: "#166534", fontWeight: 600 }}>{t}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </StudentLayout>
  );
}
