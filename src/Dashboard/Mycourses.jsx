import React, { useState, useRef } from "react";
import StudentLayout from "../Components/StudentLayout";
import { useNavigate } from "react-router-dom";
import {
  Box, Typography, LinearProgress, Button, Divider,
  IconButton, InputBase, Checkbox, Radio, RadioGroup,
  FormControlLabel, ClickAwayListener, Modal, Fade, Backdrop,
} from "@mui/material";
import {
  PlayArrow, AccessTime, Group, Star,
  Bookmark, BookmarkBorder, CheckCircle, Search,
  KeyboardArrowDown, KeyboardArrowUp, Close,
  GridView, ArrowUpward, ArrowDownward, SearchOff,
} from "@mui/icons-material";

// ── constants ─────────────────────────────────────────────────────────────────
const SQ = "6px";                      // unified card / chip radius (slightly rounded)
const PILL = "50px";                   // category pill radius
const BTN_COLOR = "#1c5197";           // single colour for ALL action buttons
const BTN_HOVER  = "#163d78";
const PROGRESS_COLOR = "#4f46e5";      // single colour for ALL progress bars

// ── Data ─────────────────────────────────────────────────────────────────────
const MY_COURSES = [
  {
    id: 1,
    name: "Web Dev Pro",
    instructor: "Alex Johnson",
    tag: "WEB DEVELOPMENT", tagColor: "#4f46e5",
    image: "https://images.unsplash.com/photo-1547658719-da2b81166b58?w=600&q=80",
    pct: 100, students: 340, hours: "24 hrs", rating: 4.8,
    lastAccessed: "2 hours ago", recency: 0,
    status: "Completed", statusColor: "#22c55e",
    modules: 12, completedModules: 12, level: "Beginner", topic: "Web Development",
    highlights: [
      "Master HTML, CSS, and JavaScript from scratch",
      "Build real-world full-stack web applications",
      "Learn React, Node.js, and modern web tools",
    ],
  },
  {
    id: 2,
    name: "Data Science Bootcamp",
    instructor: "Sarah Kim",
    tag: "DATA SCIENCE", tagColor: "#0891b2",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    pct: 42, students: 280, hours: "32 hrs", rating: 4.6,
    lastAccessed: "Yesterday", recency: 1,
    status: "In Progress", statusColor: "#f97316",
    modules: 16, completedModules: 7, level: "Intermediate", topic: "Data Science & AI",
    highlights: [
      "Analyse datasets using Python and Pandas",
      "Visualise insights with Matplotlib and Seaborn",
      "Build and evaluate machine learning models",
    ],
  },
  {
    id: 3,
    name: "UI/UX Fundamentals",
    instructor: "Maria Garcia",
    tag: "DESIGN", tagColor: "#7c3aed",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
    pct: 89, students: 210, hours: "18 hrs", rating: 4.9,
    lastAccessed: "3 days ago", recency: 3,
    status: "Almost Done", statusColor: "#22c55e",
    modules: 10, completedModules: 9, level: "Beginner", topic: "UI/UX Design",
    highlights: [
      "Design user interfaces with Figma",
      "Apply UX research and usability principles",
      "Create interactive prototypes for real projects",
    ],
  },
  {
    id: 4,
    name: "React & TypeScript Mastery",
    instructor: "David Chen",
    tag: "WEB DEVELOPMENT", tagColor: "#4f46e5",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80",
    pct: 15, students: 520, hours: "28 hrs", rating: 4.7,
    lastAccessed: "1 week ago", recency: 7,
    status: "Just Started", statusColor: "#6366f1",
    modules: 14, completedModules: 2, level: "Advanced", topic: "Web Development",
    highlights: [
      "Write strongly-typed React apps with TypeScript",
      "Master hooks, context, and advanced patterns",
      "Integrate APIs and manage complex state",
    ],
  },
  {
    id: 5,
    name: "Node.js & Express",
    instructor: "James Carter",
    tag: "BACKEND", tagColor: "#16a34a",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&q=80",
    pct: 60, students: 315, hours: "20 hrs", rating: 4.5,
    lastAccessed: "4 days ago", recency: 4,
    status: "In Progress", statusColor: "#f97316",
    modules: 10, completedModules: 6, level: "Intermediate", topic: "Web Development",
    highlights: [
      "Build RESTful APIs with Node.js and Express",
      "Connect to MongoDB and PostgreSQL databases",
      "Secure your API with JWT authentication",
    ],
  },
  {
    id: 6,
    name: "Machine Learning Basics",
    instructor: "Priya Nair",
    tag: "DATA SCIENCE", tagColor: "#0891b2",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&q=80",
    pct: 30, students: 410, hours: "36 hrs", rating: 4.8,
    lastAccessed: "2 days ago", recency: 2,
    status: "In Progress", statusColor: "#f97316",
    modules: 18, completedModules: 5, level: "Intermediate", topic: "Data Science & AI",
    highlights: [
      "Understand supervised and unsupervised learning",
      "Implement algorithms from scratch in Python",
      "Deploy ML models to production environments",
    ],
  },
  {
    id: 7,
    name: "Cloud Fundamentals (AWS)",
    instructor: "Raj Kumar",
    tag: "CLOUD & DEVOPS", tagColor: "#ea580c",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
    pct: 20, students: 360, hours: "22 hrs", rating: 4.6,
    lastAccessed: "5 days ago", recency: 5,
    status: "Just Started", statusColor: "#6366f1",
    modules: 11, completedModules: 2, level: "Beginner", topic: "Cloud & DevOps",
    highlights: [
      "Navigate AWS Console and core cloud services",
      "Deploy apps on EC2, S3, and Lambda",
      "Understand IAM, VPC, and cloud security",
    ],
  },
  {
    id: 8,
    name: "Figma for Designers",
    instructor: "Lena Fischer",
    tag: "DESIGN", tagColor: "#7c3aed",
    image: "https://images.unsplash.com/photo-1609921205586-7e8a57516512?w=600&q=80",
    pct: 75, students: 190, hours: "14 hrs", rating: 4.7,
    lastAccessed: "Yesterday", recency: 1,
    status: "In Progress", statusColor: "#f97316",
    modules: 8, completedModules: 6, level: "Beginner", topic: "UI/UX Design",
    highlights: [
      "Master Figma components, variants, and auto-layout",
      "Build a full mobile app prototype end-to-end",
      "Collaborate with developers using design tokens",
    ],
  },
];

const SUGGESTED_ALL = [
  { courseId: 1, title: "Advanced React Patterns & Performance",   provider: "Meta",     providerLogo: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta-Logo.png",              image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=400&q=80", type: "Professional Certificate", rating: 4.9, students: "12K", hours: "30 hrs", badge: "Bestseller", badgeBg: "#fef9c3", badgeColor: "#854d0e" },
  { courseId: 2, title: "Node.js & Express: Full Backend Dev",     provider: "Coursera", providerLogo: "https://upload.wikimedia.org/wikipedia/commons/9/97/Coursera-Logo_600x600.svg", image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&q=80", type: "Course",                   rating: 4.7, students: "8K",  hours: "24 hrs", badge: "New",       badgeBg: "#dcfce7", badgeColor: "#15803d" },
  { courseId: 3, title: "GraphQL API Design with Apollo",          provider: "Udemy",    providerLogo: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg",            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80", type: "Course",                   rating: 4.6, students: "6K",  hours: "18 hrs", badge: "Free Trial", badgeBg: "#f3e8ff", badgeColor: "#7c3aed" },
  { courseId: 4, title: "DevOps & CI/CD for Web Developers",      provider: "Google",   providerLogo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",      image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&q=80", type: "Guided Project",           rating: 4.8, students: "15K", hours: "20 hrs", badge: "Free",       badgeBg: "#dbeafe", badgeColor: "#1d4ed8" },
  { courseId: 1, title: "TypeScript Mastery: Basics to Advanced", provider: "Udemy",    providerLogo: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg",            image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400&q=80", type: "Course",                   rating: 4.7, students: "9K",  hours: "22 hrs", badge: "Hot",        badgeBg: "#fee2e2", badgeColor: "#dc2626" },
  { courseId: 2, title: "Full-Stack with Next.js & Prisma",       provider: "Coursera", providerLogo: "https://upload.wikimedia.org/wikipedia/commons/9/97/Coursera-Logo_600x600.svg", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80", type: "Specialisation",           rating: 4.8, students: "5K",  hours: "28 hrs", badge: "New",        badgeBg: "#dcfce7", badgeColor: "#15803d" },
  { courseId: 3, title: "System Design for Frontend Engineers",   provider: "Meta",     providerLogo: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta-Logo.png",              image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80", type: "Professional Certificate", rating: 4.9, students: "11K", hours: "26 hrs", badge: "Trending",   badgeBg: "#fef9c3", badgeColor: "#854d0e" },
  { courseId: 4, title: "Docker & Kubernetes for Developers",     provider: "Google",   providerLogo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&q=80", type: "Guided Project",           rating: 4.6, students: "13K", hours: "16 hrs", badge: "Free",        badgeBg: "#dbeafe", badgeColor: "#1d4ed8" },
];

const CATEGORY_CHIPS = ["All", "Web Development", "Data Science & AI", "Cloud & DevOps", "UI/UX Design", "Cybersecurity", "Mobile Development"];
const STATUS_OPTIONS  = ["All", "In progress", "Completed", "Expired", "Not passed"];
const TYPE_OPTIONS    = ["All", "Course", "Learning Path", "Certification"];

// ── Course Detail Popup ───────────────────────────────────────────────────────
function CoursePopup({ course, open, onClose, isBookmarked, onBookmark }) {
  if (!course) return null;
  return (
    <Modal open={open} onClose={onClose} closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 200, sx: { bgcolor: "rgba(15,23,42,0.55)", backdropFilter: "blur(2px)" } } }}
    >
      <Fade in={open}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 480, maxWidth: "95vw", bgcolor: "#fff", borderRadius: SQ, boxShadow: "0 24px 64px rgba(0,0,0,0.18)", overflow: "hidden", outline: "none" }}>
          <Box sx={{ position: "relative", height: 200, overflow: "hidden" }}>
            <Box component="img" src={course.image} alt={course.name} sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)" }} />
            <IconButton onClick={onClose} size="small"
              sx={{ position: "absolute", top: 12, right: 12, bgcolor: "rgba(255,255,255,0.92)", borderRadius: SQ, "&:hover": { bgcolor: "#fff" }, width: 30, height: 30 }}>
              <Close sx={{ fontSize: 16, color: "#334155" }} />
            </IconButton>
            <Box sx={{ position: "absolute", bottom: 12, left: 14, bgcolor: course.statusColor, borderRadius: SQ, px: 1.2, py: 0.4 }}>
              <Typography sx={{ fontSize: 10.5, fontWeight: 700, color: "#fff" }}>{course.status}</Typography>
            </Box>
            <Box sx={{ position: "absolute", bottom: 12, right: 14, bgcolor: "rgba(15,23,42,0.8)", borderRadius: SQ, px: 1, py: 0.3 }}>
              <Typography sx={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>{course.pct}% Complete</Typography>
            </Box>
          </Box>

          <Box sx={{ p: 2.8 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
              <Typography sx={{ fontSize: 10.5, fontWeight: 700, color: course.tagColor, letterSpacing: 0.7, textTransform: "uppercase" }}>{course.tag}</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
                <Star sx={{ fontSize: 14, color: "#f59e0b" }} />
                <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#334155" }}>{course.rating}</Typography>
                <Typography sx={{ fontSize: 12, color: "#94a3b8", ml: 0.3 }}>({course.students} students)</Typography>
              </Box>
            </Box>

            <Typography sx={{ fontSize: 20, fontWeight: 800, color: "#0f172a", lineHeight: 1.25, mb: 0.5 }}>{course.name}</Typography>
            <Typography sx={{ fontSize: 13, color: "#64748b", mb: 2 }}>
              By <Box component="span" sx={{ fontWeight: 600, color: "#475569" }}>{course.instructor}</Box>
              {"  ·  "}{course.level}{"  ·  "}{course.hours}
            </Typography>

            <Box sx={{ mb: 2.2 }}>
              {course.highlights.map((h, i) => (
                <Box key={i} sx={{ display: "flex", alignItems: "flex-start", gap: 1, mb: 1 }}>
                  <CheckCircle sx={{ fontSize: 15, color: "#6366f1", mt: 0.2, flexShrink: 0 }} />
                  <Typography sx={{ fontSize: 13.5, color: "#334155", lineHeight: 1.5 }}>{h}</Typography>
                </Box>
              ))}
            </Box>

            <Box sx={{ mb: 2.5 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.6 }}>
                <Typography sx={{ fontSize: 12, color: "#64748b" }}>
                  Modules: <Box component="span" sx={{ fontWeight: 700, color: "#0f172a" }}>{course.completedModules}/{course.modules}</Box>
                </Typography>
                <Typography sx={{ fontSize: 12, fontWeight: 700, color: PROGRESS_COLOR }}>{course.pct}%</Typography>
              </Box>
              <LinearProgress variant="determinate" value={course.pct}
                sx={{ height: 7, borderRadius: SQ, bgcolor: "#f1f5f9", "& .MuiLinearProgress-bar": { bgcolor: PROGRESS_COLOR, borderRadius: SQ } }} />
            </Box>

            <Box sx={{ display: "flex", gap: 1.2 }}>
              {course.status === "Completed" ? (
                <Button variant="outlined" fullWidth startIcon={<CheckCircle sx={{ fontSize: 16 }} />}
                  sx={{ textTransform: "none", fontWeight: 700, fontSize: 13.5, color: BTN_COLOR, borderColor: BTN_COLOR, borderRadius: SQ, py: 1.1, "&:hover": { bgcolor: "#eff6ff", borderColor: BTN_HOVER } }}>
                  Review Content
                </Button>
              ) : (
                <Button variant="contained" fullWidth startIcon={<PlayArrow sx={{ fontSize: 16 }} />}
                  sx={{ textTransform: "none", fontWeight: 700, fontSize: 13.5, bgcolor: BTN_COLOR, borderRadius: SQ, py: 1.1, boxShadow: "none", "&:hover": { bgcolor: BTN_HOVER, boxShadow: "none" } }}>
                  Resume Learning
                </Button>
              )}
              <Button variant="outlined" onClick={onBookmark}
                startIcon={isBookmarked ? <Bookmark sx={{ fontSize: 16, color: "#f59e0b" }} /> : <BookmarkBorder sx={{ fontSize: 16 }} />}
                sx={{ textTransform: "none", fontWeight: 700, fontSize: 13, flexShrink: 0, borderRadius: SQ, py: 1.1, px: 2, borderColor: isBookmarked ? "#f59e0b" : "#e2e8f0", color: isBookmarked ? "#b45309" : "#475569", bgcolor: isBookmarked ? "#fef9c3" : "#fff", "&:hover": { bgcolor: isBookmarked ? "#fef3c7" : "#f8fafc", borderColor: isBookmarked ? "#f59e0b" : "#94a3b8" }, whiteSpace: "nowrap" }}>
                {isBookmarked ? "Bookmarked" : "Add Bookmark"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

// ── No results ────────────────────────────────────────────────────────────────
function NoResults({ title, subtitle, actionLabel, onAction }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", py: 8, mb: 5 }}>
      <Box sx={{ width: 56, height: 56, display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
        <SearchOff sx={{ fontSize: 34, color: "#94a3b8" }} />
      </Box>
      <Typography sx={{ fontSize: 17, fontWeight: 700, color: "#0f172a", mb: 0.6 }}>{title}</Typography>
      <Typography sx={{ fontSize: 13.5, color: "#64748b", textAlign: "center", maxWidth: 340 }}>{subtitle}</Typography>
      {actionLabel && (
        <Button onClick={onAction}
          sx={{ mt: 2.5, textTransform: "none", fontWeight: 700, fontSize: 13, color: "#fff", bgcolor: BTN_COLOR, borderRadius: SQ, px: 2.5, py: 0.9, "&:hover": { bgcolor: BTN_HOVER } }}>
          {actionLabel}
        </Button>
      )}
    </Box>
  );
}

// ── View Dropdown ─────────────────────────────────────────────────────────────
function ViewDropdown({ open, categoryViewChecked, setCategoryViewChecked, favoritesChecked, setFavoritesChecked, statusFilter, setStatusFilter, typeFilter, setTypeFilter }) {
  if (!open) return null;
  const rowSx = { px: 2, py: 0.55, borderRadius: SQ, cursor: "pointer", "&:hover": { bgcolor: "#f8fafc" } };
  return (
    <Box sx={{ position: "absolute", top: "calc(100% + 6px)", left: 0, zIndex: 40, width: 280, bgcolor: "#fff", border: "1px solid #cbd5e1", borderRadius: SQ, boxShadow: "0 12px 32px rgba(15,23,42,0.14)", maxHeight: 340, overflowY: "auto", py: 1 }}>
      <Box sx={rowSx}>
        <FormControlLabel sx={{ m: 0, width: "100%" }} control={<Checkbox size="small" checked={categoryViewChecked} onChange={e => setCategoryViewChecked(e.target.checked)} sx={{ p: 0.6, mr: 0.8, "&.Mui-checked": { color: BTN_COLOR } }} />}
          label={<Typography sx={{ fontSize: 13.5, color: "#0f172a" }}>Category view</Typography>} />
      </Box>
      <Box sx={rowSx}>
        <FormControlLabel sx={{ m: 0, width: "100%" }} control={<Checkbox size="small" checked={favoritesChecked} onChange={e => setFavoritesChecked(e.target.checked)} sx={{ p: 0.6, mr: 0.8, "&.Mui-checked": { color: BTN_COLOR } }} />}
          label={<Typography sx={{ fontSize: 13.5, color: "#0f172a" }}>Bookmarked</Typography>} />
      </Box>
      <Divider sx={{ my: 0.8 }} />
      <Typography sx={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: 0.6, textTransform: "uppercase", px: 2, py: 0.5 }}>Status</Typography>
      <RadioGroup value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
        {STATUS_OPTIONS.map(s => (
          <Box key={s} sx={rowSx}>
            <FormControlLabel value={s} sx={{ m: 0, width: "100%" }} control={<Radio size="small" sx={{ p: 0.6, mr: 0.8, "&.Mui-checked": { color: BTN_COLOR } }} />}
              label={<Typography sx={{ fontSize: 13.5, color: "#0f172a" }}>{s}</Typography>} />
          </Box>
        ))}
      </RadioGroup>
      <Divider sx={{ my: 0.8 }} />
      <Typography sx={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: 0.6, textTransform: "uppercase", px: 2, py: 0.5 }}>Type</Typography>
      <RadioGroup value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
        {TYPE_OPTIONS.map(t => (
          <Box key={t} sx={rowSx}>
            <FormControlLabel value={t} sx={{ m: 0, width: "100%" }} control={<Radio size="small" sx={{ p: 0.6, mr: 0.8, "&.Mui-checked": { color: BTN_COLOR } }} />}
              label={<Typography sx={{ fontSize: 13.5, color: "#0f172a" }}>{t}</Typography>} />
          </Box>
        ))}
      </RadioGroup>
    </Box>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function MyCourses() {
  const navigate = useNavigate();
  const [bookmarked,           setBookmarked]           = useState([]);
  const [activeCategory,       setActiveCategory]       = useState("All");
  const [showAllSuggested,     setShowAllSuggested]     = useState(false);
  const [viewOpen,             setViewOpen]             = useState(false);
  const [categoryViewChecked,  setCategoryViewChecked]  = useState(true);
  const [favoritesChecked,     setFavoritesChecked]     = useState(false);
  const [statusFilter,         setStatusFilter]         = useState("All");
  const [typeFilter,           setTypeFilter]           = useState("All");
  const [categorySearchOpen,   setCategorySearchOpen]   = useState(false);
  const [categorySearchText,   setCategorySearchText]   = useState("");
  const [sortOpen,             setSortOpen]             = useState(false);
  const [sortField,            setSortField]            = useState("Name");
  const [sortDir,              setSortDir]              = useState("asc");
  const [popupCourse,          setPopupCourse]          = useState(null);
  const [popupOpen,            setPopupOpen]            = useState(false);

  const viewRef        = useRef(null);
  const categoryViewRef= useRef(null);
  const sortRef        = useRef(null);

  const openPopup  = (course, e) => { e.stopPropagation(); setPopupCourse(course); setPopupOpen(true); };
  const closePopup = () => setPopupOpen(false);
  const toggleBookmark = (id) => setBookmarked(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);

  const statusMatches = (course) => {
    if (statusFilter === "All") return true;
    if (statusFilter === "In progress")  return course.status !== "Completed";
    if (statusFilter === "Completed")    return course.status === "Completed";
    return false;
  };

  const filteredCourses = MY_COURSES
    .filter(statusMatches)
    .filter(c => favoritesChecked ? bookmarked.includes(c.id) : true)
    .filter(c => activeCategory !== "All" ? c.topic === activeCategory : true)
    .filter(c => categorySearchText ? c.name.toLowerCase().includes(categorySearchText.toLowerCase()) : true)
    .sort((a, b) => {
      let cmp = 0;
      if (sortField === "Name") cmp = a.name.localeCompare(b.name);
      if (sortField === "Date") cmp = a.recency - b.recency;
      return sortDir === "asc" ? cmp : -cmp;
    });

  const suggestedVisible = showAllSuggested ? SUGGESTED_ALL : SUGGESTED_ALL.slice(0, 4);

  const btnSx = { textTransform: "none", fontWeight: 700, fontSize: 13.5, height: 38, borderRadius: SQ };

  return (
    <StudentLayout title="My Courses">
      <Box sx={{ px: 3, pt: 4, pb: 4 }}>

        {/* ── Title ── */}
        <Typography sx={{ fontSize: 24, fontWeight: 800, color: "#0f172a", mb: 3.5 }}>
          My Courses
        </Typography>

        {/* ── Filter bar ── */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 3, flexWrap: "wrap" }}>

          {/* View */}
          <Box ref={viewRef} sx={{ position: "relative" }}>
            <ClickAwayListener onClickAway={() => setViewOpen(false)}>
              <Box>
                <Button onClick={() => setViewOpen(o => !o)}
                  endIcon={viewOpen ? <KeyboardArrowUp sx={{ fontSize: 18 }} /> : <KeyboardArrowDown sx={{ fontSize: 18 }} />}
                  sx={{ ...btnSx, px: 2, border: "1.5px solid #2563eb", color: "#2563eb", bgcolor: "#fff", "&:hover": { bgcolor: "#eff6ff" } }}>
                  View
                </Button>
                <ViewDropdown open={viewOpen}
                  categoryViewChecked={categoryViewChecked} setCategoryViewChecked={setCategoryViewChecked}
                  favoritesChecked={favoritesChecked} setFavoritesChecked={setFavoritesChecked}
                  statusFilter={statusFilter} setStatusFilter={setStatusFilter}
                  typeFilter={typeFilter} setTypeFilter={setTypeFilter} />
              </Box>
            </ClickAwayListener>
          </Box>

          {/* Category view */}
          {categoryViewChecked && (
            <Box ref={categoryViewRef} sx={{ position: "relative" }}>
              <ClickAwayListener onClickAway={() => setCategorySearchOpen(false)}>
                <Box>
                  <Button onClick={() => setCategorySearchOpen(o => !o)}
                    startIcon={categorySearchOpen ? <Close sx={{ fontSize: 16 }} /> : <GridView sx={{ fontSize: 16 }} />}
                    endIcon={categorySearchOpen ? <KeyboardArrowUp sx={{ fontSize: 18 }} /> : <KeyboardArrowDown sx={{ fontSize: 18 }} />}
                    sx={{ ...btnSx, px: 2, border: `1.5px solid ${categorySearchOpen ? "#2563eb" : "#bfdbfe"}`, color: "#1d4ed8", bgcolor: "#dbeafe", "&:hover": { bgcolor: "#bfdbfe" } }}>
                    Category view
                  </Button>
                  {categorySearchOpen && (
                    <Box sx={{ position: "absolute", top: "calc(100% + 6px)", left: 0, zIndex: 40, width: 320, bgcolor: "#fff", border: "1px solid #cbd5e1", borderRadius: SQ, boxShadow: "0 12px 32px rgba(15,23,42,0.14)", p: 1.5 }}>
                      <Box sx={{ display: "flex", alignItems: "center", border: "1px solid #2563eb", borderRadius: SQ, px: 1.5, height: 38 }}>
                        <InputBase placeholder="Search" value={categorySearchText} onChange={e => setCategorySearchText(e.target.value)}
                          sx={{ fontSize: 13.5, flex: 1, fontStyle: categorySearchText ? "normal" : "italic", color: "#0f172a" }} />
                        <Search sx={{ fontSize: 18, color: "#334155" }} />
                      </Box>
                      <Typography sx={{ fontSize: 13.5, color: "#334155", mt: 1.5, px: 0.5 }}>Samples ({filteredCourses.length})</Typography>
                    </Box>
                  )}
                </Box>
              </ClickAwayListener>
            </Box>
          )}

          {/* Active filter chips */}
          {(statusFilter === "Expired" || statusFilter === "Not passed") && (
            <Button onClick={() => setStatusFilter("All")} startIcon={<Close sx={{ fontSize: 16 }} />}
              sx={{ ...btnSx, px: 2, border: "1.5px solid #bfdbfe", color: "#1d4ed8", bgcolor: "#dbeafe", "&:hover": { bgcolor: "#bfdbfe" } }}>
              {statusFilter}
            </Button>
          )}

          {/* Sort — pushed right */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: "auto" }}>
            <Typography sx={{ fontSize: 13.5, color: "#334155", fontWeight: 500 }}>Sort by</Typography>
            <Box ref={sortRef} sx={{ position: "relative" }}>
              <ClickAwayListener onClickAway={() => setSortOpen(false)}>
                <Box>
                  <Button onClick={() => setSortOpen(o => !o)}
                    sx={{ ...btnSx, px: 2, minWidth: 90, border: `1.5px solid ${sortOpen ? "#2563eb" : "#cbd5e1"}`, color: "#0f172a", bgcolor: "#fff", "&:hover": { bgcolor: "#f8fafc" } }}>
                    {sortField}
                  </Button>
                  {sortOpen && (
                    <Box sx={{ position: "absolute", top: "calc(100% + 6px)", right: 0, zIndex: 40, width: 140, bgcolor: "#fff", border: "1px solid #cbd5e1", borderRadius: SQ, boxShadow: "0 12px 32px rgba(15,23,42,0.14)", overflow: "hidden" }}>
                      {["Name", "Date"].map(opt => (
                        <Box key={opt} onClick={() => { setSortField(opt); setSortOpen(false); }}
                          sx={{ px: 2, py: 1.1, fontSize: 13.5, cursor: "pointer", color: "#0f172a", bgcolor: sortField === opt ? "#f1f5f9" : "transparent", "&:hover": { bgcolor: "#f8fafc" } }}>
                          {opt}
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>
              </ClickAwayListener>
            </Box>
            <IconButton onClick={() => setSortDir(d => d === "asc" ? "desc" : "asc")}
              sx={{ border: "1.5px solid #cbd5e1", borderRadius: SQ, width: 38, height: 38, color: "#334155", bgcolor: "#f8fafc", "&:hover": { bgcolor: "#f1f5f9" } }}>
              {sortDir === "asc" ? <ArrowUpward sx={{ fontSize: 18 }} /> : <ArrowDownward sx={{ fontSize: 18 }} />}
            </IconButton>
          </Box>
        </Box>

        {/* ── Category chips — square-ish pill with light rounding ── */}
        <Box sx={{ display: "flex", gap: 1.2, flexWrap: "wrap", mb: 4 }}>
          {CATEGORY_CHIPS.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <Box key={cat} onClick={() => setActiveCategory(cat)}
                sx={{
                  px: 2.2, py: 0.75,
                  /* CHANGE: reduced border-radius — small rounding, not full pill */
                  borderRadius: "8px",
                  fontSize: 13.5, fontWeight: isActive ? 700 : 500,
                  cursor: "pointer",
                  bgcolor: isActive ? "#2563eb" : "#fff",
                  color: isActive ? "#fff" : "#334155",
                  border: isActive ? "1.5px solid #2563eb" : "1.5px solid #e2e8f0",
                  transition: "all 0.18s ease",
                  "&:hover": { borderColor: isActive ? "#2563eb" : "#94a3b8", bgcolor: isActive ? "#1d4ed8" : "#f8fafc" },
                }}>
                {cat}
              </Box>
            );
          })}
        </Box>

        {/* ── Empty states ── */}
        {favoritesChecked && bookmarked.length === 0 && (
          <NoResults title="No bookmarks yet" subtitle="Tap the bookmark icon on any course card to save it here." actionLabel="Browse all courses" onAction={() => setFavoritesChecked(false)} />
        )}
        {filteredCourses.length === 0 && !(favoritesChecked && bookmarked.length === 0) && (
          <NoResults title="No results found" subtitle="Please try again with a different keyword or filter." />
        )}

        {/* ── Course grid ── */}
        {filteredCourses.length > 0 && (
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 3, mb: 7 }}>
            {filteredCourses.map((c) => {
              const isBkm = bookmarked.includes(c.id);
              return (
                <Box key={c.id} onClick={(e) => openPopup(c, e)}
                  sx={{
                    bgcolor: "#fff",
                    /* CHANGE: light border-radius on cards */
                    border: "1px solid #e2e8f0", borderRadius: "10px",
                    overflow: "hidden", transition: "all 0.25s ease",
                    cursor: "pointer", display: "flex", flexDirection: "column",
                    "&:hover": { boxShadow: "0 12px 28px rgba(15,23,42,0.09)", transform: "translateY(-4px)", borderColor: "#cbd5e1" },
                  }}>
                  <Box sx={{ position: "relative", height: 155, overflow: "hidden", bgcolor: "#f1f5f9" }}>
                    <Box component="img" src={c.image} alt={c.name}
                      sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.32s", "&:hover": { transform: "scale(1.06)" } }} />
                    <Box sx={{ position: "absolute", top: 12, left: 12, bgcolor: c.statusColor, borderRadius: "5px", px: 1.2, py: 0.4 }}>
                      <Typography sx={{ fontSize: 10, fontWeight: 700, color: "#fff", letterSpacing: 0.3 }}>{c.status}</Typography>
                    </Box>
                    <IconButton size="small" onClick={(e) => { e.stopPropagation(); toggleBookmark(c.id); }}
                      sx={{ position: "absolute", top: 10, right: 10, bgcolor: "rgba(255,255,255,0.95)", borderRadius: "5px", width: 28, height: 28, "&:hover": { bgcolor: "#fff", transform: "scale(1.05)" } }}>
                      {isBkm ? <Bookmark sx={{ fontSize: 15, color: "#f59e0b" }} /> : <BookmarkBorder sx={{ fontSize: 15, color: "#475569" }} />}
                    </IconButton>
                    <Box sx={{ position: "absolute", bottom: 10, left: 12, bgcolor: "rgba(15,23,42,0.75)", borderRadius: "5px", px: 0.9, py: 0.25 }}>
                      <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: 11 }}>{c.pct}% Complete</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ p: 2, flex: 1, display: "flex", flexDirection: "column" }}>
                    <Typography sx={{ fontSize: 10, fontWeight: 700, color: c.tagColor, letterSpacing: 0.8, mb: 0.7, textTransform: "uppercase" }}>{c.tag}</Typography>
                    <Typography sx={{ fontSize: 14, fontWeight: 700, color: "#0f172a", lineHeight: 1.4, mb: 0.5, minHeight: 40, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{c.name}</Typography>
                    <Typography sx={{ fontSize: 12, color: "#64748b", mb: 1.5 }}>By {c.instructor}</Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5, borderTop: "1px solid #f1f5f9", pt: 1.5 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}><Star sx={{ fontSize: 14, color: "#f59e0b" }} /><Typography sx={{ fontSize: 12, fontWeight: 700, color: "#334155" }}>{c.rating}</Typography></Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}><Group sx={{ fontSize: 14, color: "#94a3b8" }} /><Typography sx={{ fontSize: 12, color: "#64748b" }}>{c.students}</Typography></Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}><AccessTime sx={{ fontSize: 14, color: "#94a3b8" }} /><Typography sx={{ fontSize: 12, color: "#64748b" }}>{c.hours}</Typography></Box>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.8 }}>
                      <Typography sx={{ fontSize: 11.5, color: "#64748b" }}>
                        Modules: <Box component="span" sx={{ color: "#0f172a", fontWeight: 700 }}>{c.completedModules}</Box>/{c.modules}
                      </Typography>
                    </Box>

                    {/* CHANGE: uniform progress bar colour across all cards */}
                    <LinearProgress variant="determinate" value={c.pct}
                      sx={{ height: 5, borderRadius: "4px", bgcolor: "#f1f5f9", mb: 2, "& .MuiLinearProgress-bar": { bgcolor: PROGRESS_COLOR, borderRadius: "4px" } }} />

                    <Box sx={{ mt: "auto" }}>
                      {/* CHANGE: uniform button colour for all cards */}
                      {c.status === "Completed" ? (
                        <Button variant="outlined" fullWidth startIcon={<CheckCircle />}
                          onClick={(e) => { e.stopPropagation(); openPopup(c, e); }}
                          sx={{ color: BTN_COLOR, borderColor: BTN_COLOR, textTransform: "none", fontWeight: 600, fontSize: 12.5, borderRadius: "6px", py: 0.9, "&:hover": { bgcolor: "#eff6ff", borderColor: BTN_HOVER } }}>
                          Review Content
                        </Button>
                      ) : (
                        <Button variant="contained" fullWidth startIcon={<PlayArrow />}
                          onClick={(e) => { e.stopPropagation(); openPopup(c, e); }}
                          sx={{ bgcolor: BTN_COLOR, textTransform: "none", fontWeight: 600, fontSize: 12.5, borderRadius: "6px", py: 0.9, boxShadow: "none", "&:hover": { bgcolor: BTN_HOVER, boxShadow: "none" } }}>
                          Resume Learning
                        </Button>
                      )}
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        )}

        {/* ── Suggested Learning Paths ── */}
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 0.5 }}>
            <Box>
              <Typography sx={{ fontWeight: 800, fontSize: 20, color: "#0f172a" }}>Suggested Learning Paths</Typography>
              <Typography sx={{ fontSize: 13, color: "#64748b", mt: 0.4 }}>Based on your Web Development journey</Typography>
            </Box>
            <Button
              endIcon={<KeyboardArrowDown sx={{ transform: showAllSuggested ? "rotate(180deg)" : "none", transition: "0.3s" }} />}
              onClick={() => setShowAllSuggested(p => !p)}
              sx={{ textTransform: "none", color: "#1e3a8a", fontWeight: 600, fontSize: 13.5, border: "1px solid #cbd5e1", borderRadius: SQ, px: 2.5, py: 0.8, "&:hover": { bgcolor: "#f8fafc", borderColor: "#94a3b8" } }}>
              {showAllSuggested ? "Show Less" : "Show More"}
            </Button>
          </Box>

          <Divider sx={{ my: 2.5, borderColor: "#f1f5f9" }} />

          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 3 }}>
            {suggestedVisible.map((r, i) => (
              <Box key={i} onClick={() => navigate(`/course/${r.courseId}`)}
                sx={{ border: "1px solid #e2e8f0", borderRadius: "10px", overflow: "hidden", bgcolor: "#fff", transition: "all 0.22s ease", cursor: "pointer", display: "flex", flexDirection: "column", "&:hover": { boxShadow: "0 10px 24px rgba(0,0,0,0.08)", transform: "translateY(-4px)", borderColor: "#cbd5e1" } }}>
                <Box sx={{ position: "relative", height: 160, overflow: "hidden" }}>
                  <Box component="img" src={r.image} alt={r.title} sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.3s", "&:hover": { transform: "scale(1.04)" } }} />
                  {/* Badge top-right like image 3 */}
                  <Box sx={{ position: "absolute", top: 10, right: 10, bgcolor: r.badgeBg, borderRadius: "20px", px: 1.2, py: 0.35 }}>
                    <Typography sx={{ fontSize: 10.5, fontWeight: 700, color: r.badgeColor }}>{r.badge}</Typography>
                  </Box>
                </Box>
                <Box sx={{ p: 2, flex: 1, display: "flex", flexDirection: "column" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.2 }}>
                    <Box sx={{ width: 20, height: 20, borderRadius: "4px", overflow: "hidden", border: "1px solid #e2e8f0", flexShrink: 0, bgcolor: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Box component="img" src={r.providerLogo} alt={r.provider} sx={{ width: "100%", height: "100%", objectFit: "contain" }} onError={e => { e.target.style.display = "none"; }} />
                    </Box>
                    <Typography sx={{ fontSize: 13, fontWeight: 500, color: "#475569" }}>{r.provider}</Typography>
                  </Box>
                  <Typography sx={{ fontSize: 15, fontWeight: 700, color: "#0f172a", lineHeight: 1.4, mb: 1, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", minHeight: 44 }}>{r.title}</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, mb: 0.8 }}>
                    <Typography sx={{ fontSize: 12.5, color: "#64748b" }}>{r.type}</Typography>
                    <Typography sx={{ fontSize: 12, color: "#94a3b8" }}>·</Typography>
                    <Star sx={{ fontSize: 14, color: "#f59e0b" }} />
                    <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: "#0f172a" }}>{r.rating}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, mb: 2.5 }}>
                    <Group sx={{ fontSize: 14, color: "#94a3b8" }} />
                    <Typography sx={{ fontSize: 12.5, color: "#64748b" }}>{r.students}</Typography>
                    <AccessTime sx={{ fontSize: 14, color: "#94a3b8", ml: 0.5 }} />
                    <Typography sx={{ fontSize: 12.5, color: "#64748b" }}>{r.hours}</Typography>
                  </Box>
                  <Button fullWidth variant="outlined"
                    onClick={(e) => { e.stopPropagation(); navigate(`/course/${r.courseId}`); }}
                    sx={{ textTransform: "none", fontSize: 13, fontWeight: 600, bgcolor: BTN_COLOR, borderColor: BTN_COLOR, color: "#fff", borderRadius: "6px", py: 0.8, "&:hover": { bgcolor: BTN_HOVER, borderColor: BTN_HOVER } }}>
                    Start Learning
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>

          {showAllSuggested && (
            <Box sx={{ textAlign: "center", mt: 2.5 }}>
              <Typography sx={{ fontSize: 12.5, color: "#94a3b8" }}>Showing all {SUGGESTED_ALL.length} suggested learning paths</Typography>
            </Box>
          )}
        </Box>

      </Box>

      <CoursePopup
        course={popupCourse}
        open={popupOpen}
        onClose={closePopup}
        isBookmarked={popupCourse ? bookmarked.includes(popupCourse.id) : false}
        onBookmark={() => { if (popupCourse) toggleBookmark(popupCourse.id); }}
      />
    </StudentLayout>
  );
}
