import React, { useState } from "react";
import StudentLayout from "../components/StudentLayout";
import {
  Box, Typography, LinearProgress, Button, Chip, Divider,
} from "@mui/material";
import {
  PlayArrow, FileDownload, CheckCircle, AutoStories,
  WorkspacePremium, Quiz, MenuBook, Assignment, EmojiEvents,
  Code, BarChart, Brush, AccessTime, Group,
  OpenInNew, LinkedIn, Star, Timer, ArrowForward,
} from "@mui/icons-material";

// ─── Stat cards ───────────────────────────────────────────────────────────────
const STATS = [
  { label: "ENROLLED COURSES", value: 4, sub: "In Progress",  image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80", icon: <MenuBook sx={{ fontSize: 16, color: "#334155" }} /> },
  { label: "ASSIGNMENTS",      value: 3, sub: "Pending",      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&q=80", icon: <Assignment sx={{ fontSize: 16, color: "#334155" }} /> },
  { label: "CERTIFICATES",     value: 2, sub: "Earned",       image: "https://cdn.dribbble.com/userupload/18288845/file/original-a5a1d7972c866e7cb3052dd0e94848f8.jpg?crop=545x178-3974x2750&format=webp&resize=400x300&vertical=center", icon: <EmojiEvents sx={{ fontSize: 16, color: "#334155" }} /> },
  { label: "SKILLS",           value: 8, sub: "Acquired",     image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80", icon: <WorkspacePremium sx={{ fontSize: 16, color: "#334155" }} /> },
];

// ─── Courses ──────────────────────────────────────────────────────────────────
const COURSES = [
  { name: "Web Dev Pro",          module: "Module 5 – React Hooks",  pct: 68, color: "#4f46e5", tag: "WEB DEVELOPMENT", tagColor: "#4f46e5", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80", students: 340, hours: "24 hrs video" },
  { name: "Data Science Bootcamp",module: "Module 3 – Pandas",       pct: 42, color: "#0891b2", tag: "DATA SCIENCE",    tagColor: "#0891b2", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80", students: 280, hours: "32 hrs video" },
  { name: "UI/UX Fundamentals",   module: "Module 7 – Prototyping",  pct: 89, color: "#7c3aed", tag: "DESIGN",          tagColor: "#7c3aed", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80", students: 210, hours: "18 hrs video" },
];

// ─── Quizzes ──────────────────────────────────────────────────────────────────
const QUIZZES = [
  { title: "React Hooks Quiz",  course: "Web Dev Pro",  date: "Jun 21, 6 PM",  q: "20Q", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&q=80", provider: "Web Dev Pro",   rating: 4.8, duration: "30 mins" },
  { title: "Pandas Assessment", course: "Data Science", date: "Jun 23, 11 PM", q: "15Q", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&q=80", provider: "Data Science", rating: 4.6, duration: "25 mins" },
];

// ─── Certificates ─────────────────────────────────────────────────────────────
const CERTS = [
  { title: "HTML & CSS Mastery",    date: "Apr 12, 2026", image: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=300&q=80" },
  { title: "JavaScript Essentials", date: "Mar 5, 2026",  image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=300&q=80" },
];

// ─── Activities ───────────────────────────────────────────────────────────────
const ACTIVITIES = [
  { icon: "course", text: "Completed Module 4 in Web Dev Pro",         time: "2 hours ago",   color: "#4f46e5", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&q=80", provider: "Web Dev Pro",   tag: "Course",      rating: 4.8 },
  { icon: "quiz",   text: "Scored 85% in JavaScript Basics Quiz",      time: "Yesterday, 4 PM",color: "#f97316", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&q=80", provider: "Web Dev Pro",   tag: "Quiz",        rating: 4.5 },
  { icon: "cert",   text: "Earned HTML & CSS Mastery Certificate",      time: "Apr 12, 2026",  color: "#22c55e", image: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=300&q=80", provider: "EduPlatform",   tag: "Certificate", rating: 5.0 },
  { icon: "course", text: "Started Module 3 – Pandas in Data Science",  time: "Apr 10, 2026",  color: "#a855f7", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&q=80", provider: "Data Science",  tag: "Course",      rating: 4.7 },
];

// ─── Recommended ──────────────────────────────────────────────────────────────
const RECOMMENDED = [
  { title: "React & TypeScript: The Complete Developer's Guide", provider: "Udemy",     providerLogo: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg",                                  image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=400&q=80", type: "Course",                  rating: 4.7, badge: "Bestseller", badgeBg: "#fef9c3", badgeColor: "#854d0e" },
  { title: "Full-Stack Web Development with Node.js",           provider: "Coursera",  providerLogo: "https://upload.wikimedia.org/wikipedia/commons/9/97/Coursera-Logo_600x600.svg",                      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&q=80", type: "Professional Certificate", rating: 4.9, badge: "New",       badgeBg: "#dcfce7", badgeColor: "#15803d" },
  { title: "Advanced JavaScript: ES6 and Beyond",               provider: "freeCodeCamp", providerLogo: "https://upload.wikimedia.org/wikipedia/commons/3/39/FreeCodeCamp_logo.png",                     image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&q=80", type: "Course",                  rating: 4.6, badge: "Free",      badgeBg: "#dbeafe", badgeColor: "#1d4ed8" },
  { title: "System Design for Frontend Engineers",              provider: "Meta",       providerLogo: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta-Logo.png",                                  image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80", type: "Guided Project",          rating: 4.8, badge: "Free Trial", badgeBg: "#f3e8ff", badgeColor: "#7c3aed" },
];

export default function StudentDashboard() {
  return (
    <StudentLayout title="Dashboard">
      
     <Box sx={{ p: 3 }}>

      {/* Hero banner */}
      <Box sx={{ bgcolor: "#1e2d5a", borderRadius: "14px", p: 3, mb: 3, position: "relative", overflow: "hidden" }}>
        <Box sx={{ position: "absolute", top: -30, right: -30, width: 200, height: 200, borderRadius: "50%", bgcolor: "rgba(99,102,241,0.12)" }} />
        <Box sx={{ position: "absolute", bottom: -40, right: 60, width: 140, height: 140, borderRadius: "50%", bgcolor: "rgba(99,102,241,0.08)" }} />
        <Typography sx={{ color: "#94a3b8", fontSize: 12.5, mb: 0.3 }}>Welcome back</Typography>
        <Typography sx={{ color: "#fff", fontSize: 24, fontWeight: 700, mb: 0.5 }}>George David</Typography>
        <Typography sx={{ color: "#cbd5e1", fontSize: 13.5, mb: 2 }}>Continue where you left off — you are 68% through Web Dev Pro</Typography>
        <LinearProgress variant="determinate" value={68} sx={{ height: 8, borderRadius: 4, bgcolor: "rgba(255,255,255,0.1)", "& .MuiLinearProgress-bar": { bgcolor: "#4f46e5", borderRadius: 4 }, mb: 1 }} />
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography sx={{ color: "#94a3b8", fontSize: 12.5 }}>68% complete</Typography>
          <Button variant="contained" startIcon={<PlayArrow />} sx={{ bgcolor: "#4f46e5", borderRadius: "10px", textTransform: "none", fontWeight: 600, fontSize: 13, px: 2.5, py: 1, "&:hover": { bgcolor: "#4338ca" } }}>Continue</Button>
        </Box>
      </Box>

      {/* Stat cards */}
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2, mb: 3 }}>
        {STATS.map((s) => (
          <Box key={s.label} sx={{ bgcolor: "#fff", borderRadius: "14px", border: "1px solid #e2e8f0", overflow: "hidden", transition: "all 0.22s ease", cursor: "pointer", "&:hover": { transform: "translateY(-3px)", boxShadow: "0 8px 24px rgba(0,0,0,0.10)", borderColor: "#64748b" } }}>
            <Box sx={{ position: "relative", height: 72, overflow: "hidden" }}>
              <Box component="img" src={s.image} alt={s.label} sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <Box sx={{ position: "absolute", inset: 0, bgcolor: "rgba(0,0,0,0.18)" }} />
              <Box sx={{ position: "absolute", top: 8, right: 8, bgcolor: "#fff", borderRadius: "8px", p: 0.65, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 6px rgba(0,0,0,0.15)" }}>{s.icon}</Box>
            </Box>
            <Box sx={{ px: 2, pt: 1.5, pb: 2 }}>
              <Typography sx={{ fontSize: 10.5, fontWeight: 700, color: "#64748b", letterSpacing: 0.8, mb: 0.5 }}>{s.label}</Typography>
              <Typography sx={{ fontSize: 30, fontWeight: 800, color: "#0f172a", lineHeight: 1.1 }}>{s.value}</Typography>
              <Typography sx={{ fontSize: 12, color: "#475569", fontWeight: 500, mt: 0.3 }}>{s.sub}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Lower section */}
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 2.5 }}>

        {/* Left column */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>

          {/* My Courses */}
          <Box sx={{ bgcolor: "#fff", borderRadius: "12px", p: 2.5, border: "1px solid #e2e8f0" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.5 }}>
              <Typography sx={{ fontWeight: 700, fontSize: 15, color: "#0f172a" }}>My Courses</Typography>
              <Typography sx={{ fontSize: 13, color: "#6366f1", fontWeight: 500, cursor: "pointer" }}>Browse More</Typography>
            </Box>
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
              {COURSES.map((c) => (
                <Box key={c.name} sx={{ border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden", transition: "all 0.22s ease", cursor: "pointer", "&:hover": { boxShadow: "0 8px 28px rgba(0,0,0,0.13)", transform: "translateY(-3px)", borderColor: "#64748b" } }}>
                  <Box sx={{ position: "relative", height: 120, overflow: "hidden", "&:hover img": { transform: "scale(1.07)" } }}>
                    <Box component="img" src={c.image} alt={c.name} sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.22s ease" }} />
                    <Box sx={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50%", background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)" }} />
                  </Box>
                  <Box sx={{ p: 1.5 }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 0.8 }}>
                      <Typography sx={{ fontSize: 10, fontWeight: 700, color: c.tagColor, letterSpacing: 0.6 }}>{c.tag}</Typography>
                      <Box sx={{ bgcolor: "#dcfce7", borderRadius: "20px", px: 1, py: 0.2 }}><Typography sx={{ fontSize: 10, fontWeight: 700, color: "#15803d" }}>Enrolled</Typography></Box>
                    </Box>
                    <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#0f172a", lineHeight: 1.35, mb: 1 }}>{c.name}</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.2 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}><Group sx={{ fontSize: 12, color: "#94a3b8" }} /><Typography sx={{ fontSize: 11, color: "#64748b" }}>{c.students}</Typography></Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}><AccessTime sx={{ fontSize: 12, color: "#94a3b8" }} /><Typography sx={{ fontSize: 11, color: "#64748b" }}>{c.hours}</Typography></Box>
                    </Box>
                    <Typography sx={{ fontSize: 10.5, color: "#94a3b8", fontFamily: "monospace", mb: 1 }}>{c.module}</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.2 }}>
                      <LinearProgress variant="determinate" value={c.pct} sx={{ flex: 1, height: 5, borderRadius: 3, bgcolor: "#eff6ff", "& .MuiLinearProgress-bar": { bgcolor: "#2563eb", borderRadius: 3 } }} />
                      <Typography sx={{ fontSize: 11, fontWeight: 700, color: "#475569", flexShrink: 0 }}>{c.pct}%</Typography>
                    </Box>
                    <Box sx={{ borderTop: "1px solid #f1f5f9", pt: 1, display: "flex", justifyContent: "flex-end" }}>
                      <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#2563eb", cursor: "pointer", px: 1, py: 0.2, borderRadius: "5px", "&:hover": { textDecoration: "underline", bgcolor: "#eff6ff" } }}>View</Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Recent Activities */}
          <Box sx={{ bgcolor: "#fff", borderRadius: "12px", p: 2.5, border: "1px solid #e2e8f0" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography sx={{ fontWeight: 700, fontSize: 15, color: "#0f172a" }}>Recent Activities</Typography>
              <Typography sx={{ fontSize: 13, color: "#6366f1", fontWeight: 500, cursor: "pointer" }}>View All</Typography>
            </Box>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}>
              {ACTIVITIES.map((a, i) => (
                <Box key={i} sx={{ bgcolor: "#f0f4ff", borderRadius: "12px", p: 1.5, border: "1px solid #e0e7ff", transition: "all 0.2s ease", cursor: "pointer", "&:hover": { boxShadow: "0 4px 16px rgba(99,102,241,0.12)", transform: "translateY(-2px)", bgcolor: "#e8edff" } }}>
                  <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                    <Box sx={{ width: 60, height: 46, borderRadius: "8px", overflow: "hidden", flexShrink: 0, border: "1px solid #e2e8f0" }}>
                      <Box component="img" src={a.image} alt={a.tag} sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, mb: 0.4 }}>
                        <Box sx={{ width: 14, height: 14, borderRadius: "3px", bgcolor: a.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          {a.icon === "course" && <AutoStories sx={{ fontSize: 9, color: "#fff" }} />}
                          {a.icon === "quiz" && <Quiz sx={{ fontSize: 9, color: "#fff" }} />}
                          {a.icon === "cert" && <WorkspacePremium sx={{ fontSize: 9, color: "#fff" }} />}
                        </Box>
                        <Typography sx={{ fontSize: 10.5, fontWeight: 600, color: a.color }}>{a.provider}</Typography>
                      </Box>
                      <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: "#0f172a", lineHeight: 1.35, mb: 0.5, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{a.text}</Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                        <Typography sx={{ fontSize: 10, color: "#64748b" }}>{a.tag}</Typography>
                        <Typography sx={{ fontSize: 10, color: "#64748b" }}>·</Typography>
                        <Star sx={{ fontSize: 11, color: "#f59e0b" }} />
                        <Typography sx={{ fontSize: 10, fontWeight: 600, color: "#64748b" }}>{a.rating}</Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Typography sx={{ fontSize: 10, color: "#94a3b8", mt: 1, pl: 0.3 }}>{a.time}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Right column */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>

          {/* Upcoming Quiz */}
          <Box sx={{ bgcolor: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
            <Box sx={{ px: 2.5, pt: 2.5, pb: 1.5 }}>
              <Typography sx={{ fontWeight: 700, fontSize: 15, color: "#0f172a" }}>Upcoming Quiz</Typography>
            </Box>
            {QUIZZES.map((q, i) => (
              <Box key={q.title}>
                <Box sx={{ bgcolor: "#dbeafe", px: 2.5, py: 1.2 }}>
                  <Typography sx={{ fontSize: 11.5, fontWeight: 600, color: "#1e3a5f" }}>Upcoming — {q.date}</Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 2, px: 2.5, py: 2, alignItems: "flex-start", transition: "all 0.2s ease", cursor: "pointer", "&:hover": { bgcolor: "#f8fafc" } }}>
                  <Box sx={{ width: 72, height: 52, borderRadius: "8px", overflow: "hidden", flexShrink: 0, border: "1px solid #e2e8f0", boxShadow: "0 2px 6px rgba(0,0,0,0.08)" }}>
                    <Box component="img" src={q.image} alt={q.title} sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.4 }}>
                      <Box sx={{ width: 14, height: 14, borderRadius: "3px", bgcolor: "#6366f1", display: "flex", alignItems: "center", justifyContent: "center" }}><Quiz sx={{ fontSize: 9, color: "#fff" }} /></Box>
                      <Typography sx={{ fontSize: 10.5, fontWeight: 600, color: "#6366f1" }}>{q.provider}</Typography>
                    </Box>
                    <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: "#0f172a", lineHeight: 1.35, mb: 0.6 }}>{q.title}</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                      <Typography sx={{ fontSize: 10, color: "#64748b" }}>Quiz</Typography>
                      <Typography sx={{ fontSize: 10, color: "#64748b" }}>·</Typography>
                      <Star sx={{ fontSize: 11, color: "#f59e0b" }} />
                      <Typography sx={{ fontSize: 10, fontWeight: 600, color: "#64748b" }}>{q.rating}</Typography>
                      <Typography sx={{ fontSize: 10, color: "#64748b" }}>·</Typography>
                      <Timer sx={{ fontSize: 11, color: "#94a3b8" }} />
                      <Typography sx={{ fontSize: 10, color: "#64748b" }}>{q.duration}</Typography>
                    </Box>
                    <Box sx={{ mt: 1 }}>
                      <Chip label={q.q} size="small" sx={{ fontSize: 10, fontWeight: 700, bgcolor: "#e0e7ff", color: "#4f46e5", height: 20, borderRadius: "6px" }} />
                    </Box>
                  </Box>
                </Box>
                {i < QUIZZES.length - 1 && <Divider sx={{ borderColor: "#e2e8f0" }} />}
              </Box>
            ))}
          </Box>

          {/* Certificates */}
          <Box sx={{ bgcolor: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 2.5, pt: 2.5, pb: 1.5 }}>
              <Typography sx={{ fontWeight: 700, fontSize: 15, color: "#0f172a" }}>Certificates</Typography>
              <Typography sx={{ fontSize: 13, color: "#6366f1", fontWeight: 500, cursor: "pointer" }}>View All</Typography>
            </Box>
            {CERTS.map((c, i) => (
              <Box key={c.title}>
                <Box sx={{ bgcolor: "#dbeafe", px: 2.5, py: 1.5 }}>
                  <Typography sx={{ fontSize: 12, fontWeight: 600, color: "#1e3a5f" }}>Congratulations on completing</Typography>
                  <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#1e3a5f" }}>{c.title}!</Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 2, px: 2.5, py: 2, alignItems: "center" }}>
                  <Box sx={{ width: 90, height: 64, borderRadius: "8px", overflow: "hidden", border: "1px solid #e2e8f0", flexShrink: 0, position: "relative", boxShadow: "0 2px 8px rgba(0,0,0,0.10)" }}>
                    <Box component="img" src={c.image} alt={c.title} sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    <Box sx={{ position: "absolute", top: 4, right: 4, width: 18, height: 18, bgcolor: "rgba(255,255,255,0.9)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <OpenInNew sx={{ fontSize: 11, color: "#334155" }} />
                    </Box>
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ fontSize: 12, fontWeight: 600, color: "#0f172a", mb: 0.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.title}</Typography>
                    <Typography sx={{ fontSize: 11, color: "#94a3b8", mb: 1.2 }}>{c.date}</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, px: 1.2, py: 0.5, bgcolor: "#1d4ed8", borderRadius: "7px", cursor: "pointer", "&:hover": { bgcolor: "#1e40af" } }}>
                        <LinkedIn sx={{ fontSize: 13, color: "#fff" }} />
                        <Typography sx={{ fontSize: 11, fontWeight: 600, color: "#fff", whiteSpace: "nowrap" }}>LinkedIn</Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, px: 1.2, py: 0.5, border: "1px solid #cbd5e1", borderRadius: "7px", cursor: "pointer", "&:hover": { bgcolor: "#f1f5f9" } }}>
                        <FileDownload sx={{ fontSize: 13, color: "#475569" }} />
                        <Typography sx={{ fontSize: 11, fontWeight: 600, color: "#475569", whiteSpace: "nowrap" }}>View</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                {i < CERTS.length - 1 && <Divider sx={{ borderColor: "#e2e8f0" }} />}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Recommended For You */}
      <Box sx={{ mt: 3, bgcolor: "#fff", borderRadius: "14px", border: "1px solid #e2e8f0", p: 2.5 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.5 }}>
          <Box>
            <Typography sx={{ fontWeight: 800, fontSize: 18, color: "#0f172a" }}>Recommended For You</Typography>
            <Typography sx={{ fontSize: 12.5, color: "#64748b", mt: 0.3 }}>Based on your Web Development journey</Typography>
          </Box>
          <Button endIcon={<ArrowForward />} sx={{ textTransform: "none", color: "#2563eb", fontWeight: 600, fontSize: 13, border: "1px solid #bfdbfe", borderRadius: "10px", px: 2, "&:hover": { bgcolor: "#eff6ff" } }}>Show More</Button>
        </Box>
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2 }}>
          {RECOMMENDED.map((r, i) => (
            <Box key={i} sx={{ border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden", bgcolor: "#fff", transition: "all 0.22s ease", cursor: "pointer", "&:hover": { boxShadow: "0 8px 32px rgba(0,0,0,0.12)", transform: "translateY(-4px)", borderColor: "#94a3b8" } }}>
              <Box sx={{ position: "relative", height: 140, overflow: "hidden" }}>
                <Box component="img" src={r.image} alt={r.title} sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.3s", "&:hover": { transform: "scale(1.05)" } }} />
                <Box sx={{ position: "absolute", top: 10, right: 10, bgcolor: r.badgeBg, borderRadius: "20px", px: 1.2, py: 0.3, boxShadow: "0 2px 6px rgba(0,0,0,0.15)" }}>
                  <Typography sx={{ fontSize: 10.5, fontWeight: 700, color: r.badgeColor }}>{r.badge}</Typography>
                </Box>
              </Box>
              <Box sx={{ p: 1.8 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <Box sx={{ width: 20, height: 20, borderRadius: "4px", overflow: "hidden", border: "1px solid #e2e8f0", flexShrink: 0, bgcolor: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Box component="img" src={r.providerLogo} alt={r.provider} sx={{ width: "100%", height: "100%", objectFit: "contain" }} onError={(e) => { e.target.style.display = "none"; }} />
                  </Box>
                  <Typography sx={{ fontSize: 11, fontWeight: 600, color: "#64748b" }}>{r.provider}</Typography>
                </Box>
                <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#0f172a", lineHeight: 1.4, mb: 1, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", minHeight: 36 }}>{r.title}</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                  <Typography sx={{ fontSize: 11, color: "#64748b" }}>{r.type}</Typography>
                  <Typography sx={{ fontSize: 11, color: "#94a3b8" }}>·</Typography>
                  <Star sx={{ fontSize: 13, color: "#f59e0b" }} />
                  <Typography sx={{ fontSize: 11, fontWeight: 700, color: "#475569" }}>{r.rating}</Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

         </Box>
    </StudentLayout>
  );
}  
 
