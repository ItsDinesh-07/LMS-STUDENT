import React, { useState } from "react";
import StudentLayout from "../Components/StudentLayout";
import {
  Box, Typography, TextField, InputAdornment, Chip, Button,
  LinearProgress, Rating,
} from "@mui/material";
import {
  Search, PlayCircle, People, AccessTime, Star, Explore,
  TrendingUp, Code, Brush, BarChart, Psychology,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const CATEGORIES = [
  { label: "All", icon: <Explore sx={{ fontSize: 14 }} /> },
  { label: "Web Dev", icon: <Code sx={{ fontSize: 14 }} /> },
  { label: "Data Science", icon: <BarChart sx={{ fontSize: 14 }} /> },
  { label: "Design", icon: <Brush sx={{ fontSize: 14 }} /> },
  { label: "AI & ML", icon: <Psychology sx={{ fontSize: 14 }} /> },
  { label: "Marketing", icon: <TrendingUp sx={{ fontSize: 14 }} /> },
];

const COURSES = [
  {
    id: 1, title: "Full-Stack Web Development", category: "Web Dev",
    instructor: "Alex Johnson", rating: 4.8, students: 12400,
    duration: "48 hrs", price: 2999, originalPrice: 5999,
    level: "Beginner", progress: 0, enrolled: false,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80",
    color: "#4f46e5", badge: "Bestseller",
  },
  {
    id: 2, title: "Data Science & Machine Learning", category: "Data Science",
    instructor: "Sarah Kim", rating: 4.9, students: 9800,
    duration: "60 hrs", price: 3499, originalPrice: 6999,
    level: "Intermediate", progress: 0, enrolled: false,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    color: "#0891b2", badge: "Top Rated",
  },
  {
    id: 3, title: "UI/UX Design Masterclass", category: "Design",
    instructor: "Maria Garcia", rating: 4.7, students: 7200,
    duration: "32 hrs", price: 1999, originalPrice: 3999,
    level: "Beginner", progress: 0, enrolled: false,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
    color: "#7c3aed", badge: "New",
  },
  {
    id: 4, title: "Python for AI & Deep Learning", category: "AI & ML",
    instructor: "David Chen", rating: 4.8, students: 15600,
    duration: "56 hrs", price: 3999, originalPrice: 7999,
    level: "Advanced", progress: 0, enrolled: false,
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=600&q=80",
    color: "#059669", badge: "Trending",
  },
  {
    id: 5, title: "Digital Marketing & SEO", category: "Marketing",
    instructor: "Priya Patel", rating: 4.6, students: 5400,
    duration: "24 hrs", price: 1499, originalPrice: 2999,
    level: "Beginner", progress: 0, enrolled: false,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    color: "#d97706", badge: null,
  },
  {
    id: 6, title: "React & TypeScript Advanced", category: "Web Dev",
    instructor: "James Lee", rating: 4.9, students: 8900,
    duration: "40 hrs", price: 2499, originalPrice: 4999,
    level: "Advanced", progress: 0, enrolled: false,
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&q=80",
    color: "#4f46e5", badge: "Hot",
  },
];

const LEVEL_COLORS = {
  Beginner: { bg: "#dcfce7", color: "#16a34a" },
  Intermediate: { bg: "#fef9c3", color: "#ca8a04" },
  Advanced: { bg: "#fee2e2", color: "#dc2626" },
};

const BADGE_COLORS = {
  Bestseller: { bg: "#fef9c3", color: "#b45309" },
  "Top Rated": { bg: "#e0e7ff", color: "#4f46e5" },
  New: { bg: "#f0fdf4", color: "#16a34a" },
  Trending: { bg: "#fce7f3", color: "#be185d" },
  Hot: { bg: "#fee2e2", color: "#dc2626" },
};

export default function ExplorePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = COURSES.filter((c) => {
    const matchCat = activeCategory === "All" || c.category === activeCategory;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <StudentLayout title="Explore Courses">
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontSize: 22, fontWeight: 800, color: "#0f172a", mb: 0.5 }}>
          Explore Courses
        </Typography>
        <Typography sx={{ color: "#64748b", fontSize: 14 }}>
          Discover and enroll in courses that match your goals
        </Typography>
      </Box>

      {/* Search + Categories */}
      <Box sx={{ bgcolor: "#fff", borderRadius: "16px", p: 2.5, border: "1px solid #e2e8f0", mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search courses, instructors…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: <InputAdornment position="start"><Search sx={{ fontSize: 18, color: "#94a3b8" }} /></InputAdornment>,
          }}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px", fontSize: 14,
              "&.Mui-focused fieldset": { borderColor: "#4f46e5" },
            },
          }}
        />
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {CATEGORIES.map((cat) => (
            <Chip
              key={cat.label}
              label={cat.label}
              icon={cat.icon}
              onClick={() => setActiveCategory(cat.label)}
              sx={{
                fontWeight: 700, fontSize: 12, borderRadius: "10px", cursor: "pointer",
                bgcolor: activeCategory === cat.label ? "#4f46e5" : "#f1f5f9",
                color: activeCategory === cat.label ? "#fff" : "#475569",
                "& .MuiChip-icon": { color: activeCategory === cat.label ? "#fff" : "#64748b" },
                "&:hover": { bgcolor: activeCategory === cat.label ? "#4338ca" : "#e2e8f0" },
                border: "none",
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Course Grid */}
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 2.5 }}>
        {filtered.map((course) => (
          <Box
            key={course.id}
            sx={{
              bgcolor: "#fff",
              borderRadius: "16px",
              border: "1px solid #e2e8f0",
              overflow: "hidden",
              transition: "all 0.22s",
              "&:hover": { boxShadow: "0 8px 30px rgba(0,0,0,0.10)", transform: "translateY(-3px)" },
            }}
          >
            {/* Thumbnail */}
            <Box sx={{ position: "relative", height: 160, overflow: "hidden" }}>
              <Box
                component="img"
                src={course.image}
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)" }} />
              {course.badge && (
                <Chip
                  label={course.badge}
                  size="small"
                  sx={{
                    position: "absolute", top: 10, left: 10,
                    bgcolor: BADGE_COLORS[course.badge]?.bg || "#e0e7ff",
                    color: BADGE_COLORS[course.badge]?.color || "#4f46e5",
                    fontWeight: 800, fontSize: 10, border: "none",
                  }}
                />
              )}
              <Chip
                label={course.level}
                size="small"
                sx={{
                  position: "absolute", top: 10, right: 10,
                  bgcolor: LEVEL_COLORS[course.level]?.bg,
                  color: LEVEL_COLORS[course.level]?.color,
                  fontWeight: 700, fontSize: 10, border: "none",
                }}
              />
            </Box>

            {/* Content */}
            <Box sx={{ p: 2 }}>
              <Chip
                label={course.category}
                size="small"
                sx={{ bgcolor: "#f1f5f9", color: "#475569", fontWeight: 700, fontSize: 10, mb: 1, border: "none" }}
              />
              <Typography sx={{ fontWeight: 800, fontSize: 14, color: "#0f172a", mb: 0.5, lineHeight: 1.4 }}>
                {course.title}
              </Typography>
              <Typography sx={{ color: "#64748b", fontSize: 12, mb: 1.5 }}>
                by {course.instructor}
              </Typography>

              {/* Rating */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1.5 }}>
                <Typography sx={{ fontWeight: 800, fontSize: 13, color: "#ca8a04" }}>{course.rating}</Typography>
                <Rating value={course.rating} precision={0.1} readOnly size="small" sx={{ fontSize: 14 }} />
                <Typography sx={{ fontSize: 11, color: "#94a3b8" }}>({course.students.toLocaleString()})</Typography>
              </Box>

              <Box sx={{ display: "flex", gap: 1.5, mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
                  <AccessTime sx={{ fontSize: 13, color: "#94a3b8" }} />
                  <Typography sx={{ fontSize: 11, color: "#64748b" }}>{course.duration}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
                  <People sx={{ fontSize: 13, color: "#94a3b8" }} />
                  <Typography sx={{ fontSize: 11, color: "#64748b" }}>{course.students.toLocaleString()} students</Typography>
                </Box>
              </Box>

              {/* Price + Enroll */}
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                  <Typography sx={{ fontWeight: 800, fontSize: 16, color: "#0f172a" }}>
                    ₹{course.price.toLocaleString()}
                  </Typography>
                  <Typography sx={{ fontSize: 11, color: "#94a3b8", textDecoration: "line-through" }}>
                    ₹{course.originalPrice.toLocaleString()}
                  </Typography>
                </Box>
                <Button
                  size="small"
                  onClick={() => navigate(`/purchase/${course.id}`)}
                  sx={{
                    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                    color: "#fff", fontWeight: 700, fontSize: 12,
                    borderRadius: "10px", px: 2, py: 0.8,
                    textTransform: "none", boxShadow: "none",
                    "&:hover": { background: "linear-gradient(135deg,#4338ca,#6d28d9)" },
                  }}
                >
                  Enroll Now
                </Button>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      {filtered.length === 0 && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography sx={{ fontSize: 16, color: "#94a3b8", fontWeight: 600 }}>No courses found for "{search}"</Typography>
        </Box>
      )}
    </StudentLayout>
  );
}
