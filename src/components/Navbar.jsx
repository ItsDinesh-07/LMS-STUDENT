import React, { useState, useRef, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { keyframes } from "@mui/system";

import {
  Box,
  Typography,
  Avatar,
  IconButton,
  InputBase,
  Tooltip,
  Divider,
} from "@mui/material";
import {
  Search,
  NotificationsNone,
  LightMode,
  DarkMode,
  Settings,
  Update,
  Help,
  Logout,
  Announcement,
  QuestionAnswer,
  TipsAndUpdates,
  KeyboardArrowDown,
  School,
  ShoppingBag,
  AccessTime,
  ArrowForward,
  EmojiEvents,
  WorkspacePremium,
  DoneAll,
  Forum,
} from "@mui/icons-material";

// ─── Dark mode persistence ────────────────────────────────────────────────────
const DM_KEY = "lms_dark_mode";
function getInitialDark() {
  try { return localStorage.getItem(DM_KEY) === "true"; } catch { return false; }
}
function saveDark(val) {
  try { localStorage.setItem(DM_KEY, String(val)); } catch {}
}

// ─── Page name map ────────────────────────────────────────────────────────────
const PAGE_NAMES = {
  "/student":      "Dashboard",
  "/mycourses":    "My Courses",
  "/mylearning":   "My Learning",
  "/resources":    "Resources",
  "/assignments":  "Assignments",
  "/quiz":         "Quiz",
  "/certificates": "Certificates",
  "/profile":      "Profile",
  "/ai-interview": "AI Interview",
  "/achievements": "Achievements",
};

// ─── Searchable courses ───────────────────────────────────────────────────────
const ALL_COURSES = [
  { id: 1, name: "Web Dev Pro",             tag: "WEB DEVELOPMENT", color: "#4f46e5", hours: "24 hrs", path: "/mycourses", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=80&q=80" },
  { id: 2, name: "Data Science Bootcamp",   tag: "DATA SCIENCE",    color: "#0891b2", hours: "32 hrs", path: "/mycourses", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=80&q=80" },
  { id: 3, name: "UI/UX Fundamentals",      tag: "DESIGN",          color: "#7c3aed", hours: "18 hrs", path: "/mycourses", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=80&q=80" },
  { id: 4, name: "React & TypeScript",      tag: "WEB DEVELOPMENT", color: "#4f46e5", hours: "28 hrs", path: "/mycourses", image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=80&q=80" },
  { id: 5, name: "Machine Learning Basics", tag: "DATA SCIENCE",    color: "#0891b2", hours: "36 hrs", path: "/mycourses", image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=80&q=80" },
  { id: 6, name: "Node.js & Express",       tag: "BACKEND",         color: "#22c55e", hours: "20 hrs", path: "/mycourses", image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=80&q=80" },
  { id: 7, name: "Figma for Designers",     tag: "DESIGN",          color: "#7c3aed", hours: "14 hrs", path: "/mycourses", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=80&q=80" },
  { id: 8, name: "Python for Beginners",    tag: "DATA SCIENCE",    color: "#0891b2", hours: "22 hrs", path: "/mycourses", image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=80&q=80" },
];

// ─── Recent certificates ──────────────────────────────────────────────────────
const RECENT_CERTS = [
  { id: 1, title: "HTML & CSS Mastery",    date: "Apr 12, 2026", color: "#4f46e5", desc: "Web Development · Beginner",     path: "/certificates" },
  { id: 2, title: "JavaScript Essentials", date: "Mar 5, 2026",  color: "#0891b2", desc: "Web Development · Intermediate", path: "/certificates" },
  { id: 3, title: "UI/UX Fundamentals",    date: "Feb 18, 2026", color: "#7c3aed", desc: "Design · Beginner",              path: "/certificates" },
];

// ─── Community items ──────────────────────────────────────────────────────────
const COMMUNITY_ITEMS = [
  { label: "Announcements",    icon: <Announcement   sx={{ fontSize: 18, color: "#6366f1" }} />, iconBg: "#eef2ff", desc: "Latest updates, news & platform changes", meta: "3 new posts"        },
  { label: "Discussion Forum", icon: <Forum          sx={{ fontSize: 18, color: "#0891b2" }} />, iconBg: "#e0f2fe", desc: "Talk with fellow learners & share ideas",  meta: "128 members online" },
  { label: "Q&A",              icon: <QuestionAnswer sx={{ fontSize: 18, color: "#7c3aed" }} />, iconBg: "#f3e8ff", desc: "Ask questions & get expert answers",       meta: "24 open questions"  },
  { label: "Learning Tips",    icon: <TipsAndUpdates sx={{ fontSize: 18, color: "#f59e0b" }} />, iconBg: "#fef9c3", desc: "Boost your study habits & productivity",   meta: "Weekly updates"      },
];

// ─── Nav links config ─────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "My Learnings", path: "/mylearning",   dropdown: null          },
  { label: "Resources",    path: "/resources",    dropdown: null          },
  { label: "Achievements", path: "/achievements", dropdown: "achievements" },
  { label: "Community",    path: null,            dropdown: "community"   },
];

// ─── Profile menu ─────────────────────────────────────────────────────────────
const PROFILE_MENU = [
  { label: "My Learning",  icon: <School      sx={{ fontSize: 17, color: "#475569" }} />, path: "/mylearning" },
  { label: "My Purchases", icon: <ShoppingBag sx={{ fontSize: 17, color: "#475569" }} />, path: null },
  { label: "Settings",     icon: <Settings    sx={{ fontSize: 17, color: "#475569" }} />, path: null },
  { label: "Updates",      icon: <Update      sx={{ fontSize: 17, color: "#475569" }} />, path: null },
  { label: "Help Center",  icon: <Help        sx={{ fontSize: 17, color: "#475569" }} />, path: null },
  { label: "Log Out",      icon: <Logout      sx={{ fontSize: 17, color: "#e11d48" }} />, path: null, danger: true },
];

const NAV_FONT = "'Mulish', Arial, sans-serif";
// ─── Outside click hook ───────────────────────────────────────────────────────
function useOutsideClick(ref, callback) {
  useEffect(() => {
    function handle(e) {
      if (ref.current && !ref.current.contains(e.target)) callback();
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [ref, callback]);
}

// ─── Achievements dropdown ────────────────────────────────────────────────────
function AchievementsDropdown({ darkMode, onClose }) {
  const navigate = useNavigate();
  const ref = useRef(null);

  useEffect(() => {
    function handle(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    }
    document.addEventListener("mousedown", handle, true);
    return () => document.removeEventListener("mousedown", handle, true);
  }, [onClose]);

  const go = (path) => { onClose(); navigate(path); };

  return (
    <Box
      ref={ref}
      onMouseLeave={onClose}
      sx={{
        position: "absolute",
        top: "calc(100% + 10px)",
        left: "50%",
        transform: "translateX(-50%)",
        width: 340,
        bgcolor: darkMode ? "#0f172a" : "#fff",
        borderRadius: "16px",
        boxShadow: "0 12px 40px rgba(0,0,0,0.13)",
        border: `1px solid ${darkMode ? "#1e293b" : "#e8edf5"}`,
        zIndex: 1400,
        overflow: "hidden",
        animation: "ddFadeIn 0.16s ease",
        "@keyframes ddFadeIn": {
          from: { opacity: 0, transform: "translateX(-50%) translateY(-6px)" },
          to:   { opacity: 1, transform: "translateX(-50%) translateY(0)" },
        },
      }}
    >
      {/* Header row */}
      <Box sx={{
        px: 2.5, py: 1.4,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: `1px solid ${darkMode ? "#1e293b" : "#f0f4f8"}`,
      }}>
        <Typography sx={{
          fontSize: 11, fontWeight: 700, color: "#94a3b8",
          letterSpacing: "0.9px", textTransform: "uppercase", fontFamily: NAV_FONT,
        }}>
          Recent Rewards
        </Typography>
        <Box
          onClick={() => go("/certificates")}
          sx={{
            display: "flex", alignItems: "center", gap: 0.5,
            cursor: "pointer",
            "&:hover": { "& span": { color: "#4f46e5" }, "& svg": { color: "#4f46e5" } },
          }}
        >
          <Typography
            component="span"
            sx={{ fontSize: 12.5, fontWeight: 700, color: "#6366f1", fontFamily: NAV_FONT, transition: "color 0.15s" }}
          >
            View all
          </Typography>
          <ArrowForward sx={{ fontSize: 13, color: "#6366f1", transition: "color 0.15s" }} />
        </Box>
      </Box>

      {/* Certificate rows */}
      {RECENT_CERTS.map((cert, idx) => (
        <Box key={cert.id}>
          <Box
            onClick={() => go(cert.path)}
            sx={{
              display: "flex", alignItems: "center", gap: 2,
              px: 2.5, py: 1.8, cursor: "pointer",
              transition: "background 0.15s",
              "&:hover": { bgcolor: darkMode ? "#1e293b" : "#f8fafc" },
            }}
          >
            {/* Badge icon */}
            <Box sx={{
              width: 46, height: 46, borderRadius: "12px", flexShrink: 0,
              background: `linear-gradient(135deg, ${cert.color}18, ${cert.color}30)`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <WorkspacePremium sx={{ fontSize: 22, color: cert.color }} />
            </Box>

            {/* Info */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{
                fontSize: 14, fontWeight: 700,
                color: darkMode ? "#e2e8f0" : "#111827",
                fontFamily: NAV_FONT, lineHeight: 1.3, mb: 0.25,
              }}>
                {cert.title}
              </Typography>
              <Typography sx={{ fontSize: 12.5, color: "#94a3b8", fontFamily: NAV_FONT }}>
                {cert.desc}
              </Typography>
            </Box>

            {/* Date */}
            <Typography sx={{
              fontSize: 12, color: "#94a3b8", fontFamily: NAV_FONT,
              flexShrink: 0,
            }}>
              {cert.date}
            </Typography>
          </Box>
          {idx < RECENT_CERTS.length - 1 && (
            <Divider sx={{ borderColor: darkMode ? "#1e293b" : "#f1f5f9", mx: 2.5 }} />
          )}
        </Box>
      ))}

      {/* Footer */}
      <Box
        onClick={() => go("/certificates")}
        sx={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 1,
          px: 2.5, py: 1.6, cursor: "pointer",
          borderTop: `1px solid ${darkMode ? "#1e293b" : "#f0f4f8"}`,
          bgcolor: darkMode ? "#0a0f1a" : "#fafbfe",
          transition: "background 0.15s",
          "&:hover": { bgcolor: darkMode ? "#1e293b" : "#eef2ff" },
        }}
      >
        <EmojiEvents sx={{ fontSize: 17, color: "#6366f1" }} />
        <Typography sx={{ fontSize: 13.5, fontWeight: 700, color: "#6366f1", fontFamily: NAV_FONT }}>
          View All Achievements
        </Typography>
        <ArrowForward sx={{ fontSize: 14, color: "#6366f1" }} />
      </Box>
    </Box>
  );
}

// ─── Community dropdown ───────────────────────────────────────────────────────
function CommunityDropdown({ darkMode, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    function handle(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    }
    document.addEventListener("mousedown", handle, true);
    return () => document.removeEventListener("mousedown", handle, true);
  }, [onClose]);

  return (
    <Box
      ref={ref}
      onMouseLeave={onClose}
      sx={{
        position: "absolute",
        top: "calc(100% + 10px)",
        left: "50%",
        transform: "translateX(-50%)",
        width: 340,
        bgcolor: darkMode ? "#0f172a" : "#fff",
        borderRadius: "16px",
        boxShadow: "0 12px 40px rgba(0,0,0,0.13)",
        border: `1px solid ${darkMode ? "#1e293b" : "#e8edf5"}`,
        zIndex: 1400,
        overflow: "hidden",
        animation: "ddFadeIn 0.16s ease",
        "@keyframes ddFadeIn": {
          from: { opacity: 0, transform: "translateX(-50%) translateY(-6px)" },
          to:   { opacity: 1, transform: "translateX(-50%) translateY(0)" },
        },
      }}
    >
      {/* Header */}
      <Box sx={{
        px: 2.5, py: 1.4,
        borderBottom: `1px solid ${darkMode ? "#1e293b" : "#f0f4f8"}`,
      }}>
        <Typography sx={{
          fontSize: 11, fontWeight: 700, color: "#94a3b8",
          letterSpacing: "0.9px", textTransform: "uppercase", fontFamily: NAV_FONT,
        }}>
          Community
        </Typography>
      </Box>

      {/* Items */}
      {COMMUNITY_ITEMS.map((item, idx) => (
        <Box key={idx}>
          <Box sx={{
            display: "flex", alignItems: "flex-start", gap: 1.8,
            px: 2.5, py: 1.6, cursor: "pointer",
            transition: "background 0.15s",
            "&:hover": { bgcolor: darkMode ? "#1e293b" : "#f8fafc" },
          }}>
            <Box sx={{
              width: 40, height: 40, borderRadius: "11px", flexShrink: 0,
              bgcolor: darkMode ? "#1e293b" : item.iconBg,
              display: "flex", alignItems: "center", justifyContent: "center",
              mt: 0.2,
            }}>
              {item.icon}
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{
                fontSize: 14, fontWeight: 700,
                color: darkMode ? "#e2e8f0" : "#111827",
                fontFamily: NAV_FONT, lineHeight: 1.3, mb: 0.25,
              }}>
                {item.label}
              </Typography>
              <Typography sx={{
                fontSize: 12.5, color: darkMode ? "#64748b" : "#64748b",
                fontFamily: NAV_FONT, lineHeight: 1.45, mb: 0.5,
              }}>
                {item.desc}
              </Typography>
              <Box sx={{
                display: "inline-flex", alignItems: "center",
                bgcolor: darkMode ? "#0f172a" : "#f1f5f9",
                borderRadius: "20px", px: 1, py: 0.15,
              }}>
                <Typography sx={{ fontSize: 10.5, fontWeight: 600, color: "#94a3b8", fontFamily: NAV_FONT }}>
                  {item.meta}
                </Typography>
              </Box>
            </Box>
          </Box>
          {idx < COMMUNITY_ITEMS.length - 1 && (
            <Divider sx={{ borderColor: darkMode ? "#1e293b" : "#f1f5f9", mx: 2.5 }} />
          )}
        </Box>
      ))}
    </Box>
  );
}

// ─── Nav Item ─────────────────────────────────────────────────────────────────
// KEY FIX: hoveredNav state lives in Navbar and is passed down.
// Each NavItem only shows underline when IT is the hovered one.
function NavItem({ link, darkMode, hoveredLabel, setHoveredLabel, activeDropdown, setActiveDropdown }) {
  const navigate = useNavigate();
  const location = useLocation();
  const ref = useRef(null);

  const hasDropdown = !!link.dropdown;
  const isOpen      = hasDropdown && activeDropdown === link.label;
  const isActive    = link.path && location.pathname === link.path;
  // Show underline ONLY when this specific item is hovered OR it's the active route
  const showUnderline = isActive || hoveredLabel === link.label;

  const handleMouseEnter = () => {
    setHoveredLabel(link.label);
    if (hasDropdown) setActiveDropdown(link.label);
  };

  const handleMouseLeave = (e) => {
    // Check if we're moving into the dropdown — if yes, keep open
    if (ref.current && ref.current.contains(e.relatedTarget)) return;
    setHoveredLabel(null);
    // Don't close dropdown on mouse leave from the trigger —
    // the dropdown itself handles closing via its own onMouseLeave + outside click
  };

  const handleClick = () => {
    if (!hasDropdown && link.path) {
      navigate(link.path);
      setActiveDropdown(null);
    } else if (hasDropdown) {
      setActiveDropdown(isOpen ? null : link.label);
    }
  };

  return (
    <Box
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{ position: "relative" }}
    >
      <Box
        onClick={handleClick}
        sx={{
          display: "flex", alignItems: "center", gap: 0.4,
          cursor: "pointer", py: 0.5, position: "relative",
        }}
      >
        <Typography sx={{
          fontSize: 14,
          fontWeight: isActive ? 600 : 500,
          fontFamily: NAV_FONT,
          lineHeight: "22px",
          letterSpacing: "0px",
          color: isActive
            ? (darkMode ? "#a5b4fc" : "#4f46e5")
            : (darkMode ? "#f1f5f9" : "#374151"),
          transition: "color 0.2s",
        }}>
          {link.label}
        </Typography>
        {hasDropdown && (
          <KeyboardArrowDown sx={{
            fontSize: 16,
            color: darkMode ? "#94a3b8" : "#64748b",
            transition: "transform 0.22s ease",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }} />
        )}

        {/* Underline — only renders for THIS item when hovered or active */}
        <Box sx={{
          position: "absolute",
          bottom: 0, left: 0,
          height: "2px",
          borderRadius: "2px",
          bgcolor: darkMode ? "#818cf8" : "#4f46e5",
          width: showUnderline ? "100%" : "0%",
          transition: "width 0.25s ease",
          pointerEvents: "none",
        }} />
      </Box>

      {/* Dropdowns */}
      {link.dropdown === "achievements" && isOpen && (
        <AchievementsDropdown
          darkMode={darkMode}
          onClose={() => { setActiveDropdown(null); setHoveredLabel(null); }}
        />
      )}
      {link.dropdown === "community" && isOpen && (
        <CommunityDropdown
          darkMode={darkMode}
          onClose={() => { setActiveDropdown(null); setHoveredLabel(null); }}
        />
      )}
    </Box>
  );
}

// ─── Search Dropdown ──────────────────────────────────────────────────────────
function SearchDropdown({ query, darkMode, onSelect }) {
  if (!query.trim()) return null;

  const results = ALL_COURSES.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.tag.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Box sx={{
      position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0,
      bgcolor: darkMode ? "#0f172a" : "#fff",
      borderRadius: "14px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.14)",
      border: `1px solid ${darkMode ? "#1e293b" : "#e2e8f0"}`,
      zIndex: 1500, overflow: "hidden",
      animation: "srFadeIn 0.18s ease",
      "@keyframes srFadeIn": {
        from: { opacity: 0, transform: "translateY(-6px)" },
        to:   { opacity: 1, transform: "translateY(0)" },
      },
    }}>
      {results.length === 0 ? (
        <Box sx={{ px: 2.5, py: 3, textAlign: "center" }}>
          <Search sx={{ fontSize: 28, color: "#94a3b8", mb: 1 }} />
          <Typography sx={{ fontSize: 14, fontWeight: 600, color: darkMode ? "#e2e8f0" : "#0f172a", fontFamily: NAV_FONT }}>
            No courses found
          </Typography>
          <Typography sx={{ fontSize: 12.5, color: "#94a3b8", mt: 0.4, fontFamily: NAV_FONT }}>
            Try a different keyword
          </Typography>
        </Box>
      ) : (
        <>
          <Box sx={{
            px: 2, py: 1,
            borderBottom: `1px solid ${darkMode ? "#1e293b" : "#f1f5f9"}`,
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <Typography sx={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.7px", textTransform: "uppercase", fontFamily: NAV_FONT }}>
              Courses
            </Typography>
            <Box sx={{ bgcolor: darkMode ? "#1e293b" : "#f1f5f9", borderRadius: "20px", px: 1, py: 0.2 }}>
              <Typography sx={{ fontSize: 11, fontWeight: 700, color: darkMode ? "#94a3b8" : "#64748b", fontFamily: NAV_FONT }}>
                {results.length} found
              </Typography>
            </Box>
          </Box>

          {results.map((course) => (
            <Box
              key={course.id}
              onClick={() => onSelect(course)}
              sx={{
                display: "flex", alignItems: "center", gap: 1.5,
                px: 2, py: 1.2, cursor: "pointer",
                transition: "background 0.15s",
                "&:hover": {
                  bgcolor: darkMode ? "#1e293b" : "#f8fafc",
                  "& .arrow-icon": { opacity: 1, transform: "translateX(0)" },
                },
              }}
            >
              <Box sx={{ width: 40, height: 40, borderRadius: "8px", overflow: "hidden", flexShrink: 0, border: `1px solid ${darkMode ? "#1e293b" : "#e2e8f0"}` }}>
                <Box component="img" src={course.image} alt={course.name} sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontSize: 13.5, fontWeight: 600, color: darkMode ? "#f1f5f9" : "#0f172a", fontFamily: NAV_FONT, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {course.name}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mt: 0.4 }}>
                  <Box sx={{ bgcolor: `${course.color}18`, borderRadius: "4px", px: 0.7, py: 0.1 }}>
                    <Typography sx={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.4px", color: course.color, fontFamily: NAV_FONT, lineHeight: 1.6 }}>
                      {course.tag}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: 11, color: "#cbd5e1" }}>·</Typography>
                  <AccessTime sx={{ fontSize: 11, color: "#94a3b8" }} />
                  <Typography sx={{ fontSize: 11.5, color: darkMode ? "#94a3b8" : "#64748b", fontFamily: NAV_FONT }}>
                    {course.hours}
                  </Typography>
                </Box>
              </Box>
              <ArrowForward className="arrow-icon" sx={{ fontSize: 15, color: "#6366f1", opacity: 0, transform: "translateX(-4px)", transition: "all 0.2s ease", flexShrink: 0 }} />
            </Box>
          ))}

          <Box sx={{
            px: 2, py: 1,
            borderTop: `1px solid ${darkMode ? "#1e293b" : "#f1f5f9"}`,
            bgcolor: darkMode ? "#0a0f1a" : "#f8fafc",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 0.6,
          }}>
            <Search sx={{ fontSize: 12, color: "#94a3b8" }} />
            <Typography sx={{ fontSize: 11.5, color: "#94a3b8", fontFamily: NAV_FONT }}>
              Click a course to open it
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ title }) {
  const user = { name: "George David", avatar: "G" };
  const logout = () => {};
  const navigate = useNavigate();
  const location = useLocation();

  const [darkMode,       setDarkMode]       = useState(getInitialDark);
  const [notifOpen,      setNotifOpen]      = useState(false);
  const [profileOpen,    setProfileOpen]    = useState(false);
  const [searchFocused,  setSearchFocused]  = useState(false);
  const [searchQuery,    setSearchQuery]    = useState("");
  const [showResults,    setShowResults]    = useState(false);
  // KEY: single state for which nav item is hovered (for underline)
  const [hoveredLabel,   setHoveredLabel]   = useState(null);
  // KEY: single state for which dropdown is open
  const [activeDropdown, setActiveDropdown] = useState(null);

  const notifRef   = useRef(null);
  const profileRef = useRef(null);
  const searchRef  = useRef(null);

  useOutsideClick(notifRef,   () => setNotifOpen(false));
  useOutsideClick(profileRef, () => setProfileOpen(false));
  useOutsideClick(searchRef,  () => { setShowResults(false); setSearchFocused(false); });

  // Close dropdowns on route change
  useEffect(() => {
    setActiveDropdown(null);
    setHoveredLabel(null);
  }, [location.pathname]);

  const toggleDark = () => {
    setDarkMode(prev => { const next = !prev; saveDark(next); return next; });
  };

  const handleCourseSelect = (course) => {
    setSearchQuery(""); setShowResults(false); setSearchFocused(false);
    navigate(course.path);
  };

  const handleProfileMenuClick = (item) => {
    setProfileOpen(false);
    if (item.path) navigate(item.path);
  };

  const bellShake = keyframes`
    0%   { transform: rotate(0deg); }
    15%  { transform: rotate(-12deg); }
    30%  { transform: rotate(12deg); }
    45%  { transform: rotate(-8deg); }
    60%  { transform: rotate(8deg); }
    75%  { transform: rotate(-4deg); }
    100% { transform: rotate(0deg); }
  `;

  const iconBtnSx = {
    width: 36, height: 36,
    display: "flex", alignItems: "center", justifyContent: "center",
    borderRadius: "50%",
    color: darkMode ? "#94a3b8" : "#475569",
    transition: "all 0.2s ease",
    "&:hover": { bgcolor: darkMode ? "#334155" : "#f1f5f9" },
  };

  const popupSx = {
    position: "absolute",
    top: "calc(100% + 10px)",
    right: 0,
    bgcolor: darkMode ? "#0f172a" : "#fff",
    borderRadius: "14px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.14)",
    border: `1px solid ${darkMode ? "#1e293b" : "#e2e8f0"}`,
    zIndex: 1400,
    overflow: "hidden",
    animation: "ppFadeIn 0.18s ease",
    "@keyframes ppFadeIn": {
      from: { opacity: 0, transform: "translateY(-8px)" },
      to:   { opacity: 1, transform: "translateY(0)" },
    },
  };

  return (
    <Box sx={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      px: 3.5, py: 1.8,
      bgcolor: darkMode ? "#1e293b" : "#fff",
      borderBottom: `1px solid ${darkMode ? "#334155" : "#e2e8f0"}`,
      minHeight: 64,
      transition: "background 0.3s ease",
      position: "relative",
    }}>

      {/* ── Left: Nav links ── */}
      {/* KEY: onMouseLeave from the entire nav group clears hoveredLabel */}
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 4, ml: 8 }}
        onMouseLeave={() => setHoveredLabel(null)}
      >
        {NAV_LINKS.map((link) => (
          <NavItem
            key={link.label}
            link={link}
            darkMode={darkMode}
            hoveredLabel={hoveredLabel}
            setHoveredLabel={setHoveredLabel}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
          />
        ))}
      </Box>

      {/* ── Right ── */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

        {/* Search bar */}
        <Box ref={searchRef} sx={{ position: "relative", mr: 1 }}>
          <Box sx={{
            display: "flex", alignItems: "center",
            bgcolor: darkMode ? "#0f172a" : "#f1f5f9",
            borderRadius: "50px", overflow: "hidden", width: 350,
            border: searchFocused ? "1.5px solid #2563eb" : `1px solid ${darkMode ? "#334155" : "#e2e8f0"}`,
            transition: "border 0.2s ease",
          }}>
            <InputBase
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setShowResults(e.target.value.length > 0); }}
              onFocus={() => { setSearchFocused(true); if (searchQuery.length > 0) setShowResults(true); }}
              sx={{
                flex: 1, fontSize: 14, fontFamily: NAV_FONT,
                lineHeight: "24px", letterSpacing: "normal",
                color: darkMode ? "#e2e8f0" : "#475569",
                pl: 2, pr: 1,
                "& input::placeholder": {
                  color: darkMode ? "#94a3b8" : "#475569",
                  opacity: 1, fontFamily: NAV_FONT,
                },
              }}
            />
            <Tooltip title="Search" arrow>
              <Box sx={{
                bgcolor: searchFocused ? "#1d4ed8" : "#2563eb",
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 34, height: 34, borderRadius: "50%", m: "3px", flexShrink: 0,
                cursor: "pointer", transition: "background 0.2s",
                "&:hover": { bgcolor: "#1d4ed8" },
              }}>
                <Search sx={{ fontSize: 17, color: "#fff" }} />
              </Box>
            </Tooltip>
          </Box>
          {showResults && (
            <SearchDropdown query={searchQuery} darkMode={darkMode} onSelect={handleCourseSelect} />
          )}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>

          {/* Notification bell */}
          <Box ref={notifRef} sx={{ position: "relative" }}>
            <Tooltip title="Notifications" arrow open={!notifOpen ? undefined : false}>
              <IconButton
                sx={{
                  ...iconBtnSx,
                  bgcolor: notifOpen ? (darkMode ? "#334155" : "#f1f5f9") : "transparent",
                  "&:hover svg": { animation: `${bellShake} 0.5s ease` },
                }}
                onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
              >
                <NotificationsNone sx={{ fontSize: 20 }} />
              </IconButton>
            </Tooltip>

            {notifOpen && (
              <Box sx={{ ...popupSx, width: 420 }}>
                <Box sx={{
                  px: 2.5, py: 1.8,
                  borderBottom: `1px solid ${darkMode ? "#1e293b" : "#f1f5f9"}`,
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                  <Typography sx={{ fontWeight: 700, fontSize: 15, color: darkMode ? "#f1f5f9" : "#0f172a", fontFamily: NAV_FONT }}>
                    Notifications
                  </Typography>
                  <Box sx={{
                    display: "flex", alignItems: "center", gap: 0.6,
                    cursor: "pointer", px: 1.2, py: 0.5, borderRadius: "8px",
                    transition: "background 0.15s",
                    "&:hover": { bgcolor: darkMode ? "#1e293b" : "#eef2ff" },
                  }}>
                    <DoneAll sx={{ fontSize: 15, color: "#6366f1" }} />
                    <Typography sx={{ fontSize: 12.5, fontWeight: 600, fontFamily: NAV_FONT, color: "#6366f1" }}>
                      Mark all as read
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ px: 2.5, py: 4, display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5 }}>
                  <Box sx={{ width: 52, height: 52, borderRadius: "50%", bgcolor: darkMode ? "#1e293b" : "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <NotificationsNone sx={{ fontSize: 26, color: "#94a3b8" }} />
                  </Box>
                  <Typography sx={{ fontWeight: 700, fontSize: 15, color: darkMode ? "#f1f5f9" : "#0f172a", fontFamily: NAV_FONT }}>
                    No notifications
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: "#64748b", textAlign: "center", lineHeight: 1.5, fontFamily: NAV_FONT }}>
                    We'll let you know when deadlines are approaching, or there is a course update
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>

          {/* Dark / Light toggle */}
          <Tooltip title={darkMode ? "Switch to Light" : "Switch to Dark"} arrow>
            <IconButton
              onClick={toggleDark}
              sx={{
                ...iconBtnSx,
                "&:hover": { bgcolor: darkMode ? "#334155" : "#f1f5f9", "& svg": { transform: "rotate(20deg)" } },
                "& svg": { transition: "transform 0.25s ease" },
              }}
            >
              {darkMode
                ? <LightMode sx={{ fontSize: 20, color: "#fbbf24" }} />
                : <DarkMode  sx={{ fontSize: 20 }} />
              }
            </IconButton>
          </Tooltip>

          {/* Profile */}
          <Box ref={profileRef} sx={{ position: "relative" }}>
            <Tooltip title={user?.name || "George David"} arrow open={!profileOpen ? undefined : false}>
              <Avatar
                onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
                sx={{
                  bgcolor: "#1e2972", width: 29, height: 28,
                  fontSize: 13, fontWeight: 700, cursor: "pointer",
                  transition: "all 0.2s ease",
                  outline: profileOpen ? "2px solid #2563eb" : "none",
                  outlineOffset: "2px",
                  "&:hover": { opacity: 0.88 },
                  fontFamily: NAV_FONT,
                }}
              >
                {user?.avatar || "G"}
              </Avatar>
            </Tooltip>

            {profileOpen && (
              <Box sx={{ ...popupSx, width: 210 }}>
                <Box sx={{
                  px: 2, py: 2,
                  borderBottom: `1px solid ${darkMode ? "#1e293b" : "#f1f5f9"}`,
                  display: "flex", alignItems: "center", gap: 1.5,
                }}>
                  <Avatar sx={{ bgcolor: "#1e2972", width: 36, height: 36, fontSize: 14, fontWeight: 700, fontFamily: NAV_FONT }}>
                    {user?.avatar || "G"}
                  </Avatar>
                  <Box>
                    <Typography sx={{ fontSize: 13.5, fontWeight: 700, color: darkMode ? "#f1f5f9" : "#0f172a", fontFamily: NAV_FONT, lineHeight: 1.2 }}>
                      {user?.name || "George David"}
                    </Typography>
                    <Typography sx={{ fontSize: 11.5, color: "#64748b", fontFamily: NAV_FONT }}>Student</Typography>
                  </Box>
                </Box>
                {PROFILE_MENU.map((item, i) => (
                  <Box key={item.label}>
                    {i === PROFILE_MENU.length - 1 && (
                      <Divider sx={{ borderColor: darkMode ? "#1e293b" : "#f1f5f9", mx: 1 }} />
                    )}
                    <Box
                      onClick={() => {
                        if (item.danger) { setProfileOpen(false); logout(); navigate("/login"); }
                        else handleProfileMenuClick(item);
                      }}
                      sx={{
                        display: "flex", alignItems: "center", gap: 1.5,
                        px: 2, py: 1.4, cursor: "pointer",
                        transition: "background 0.15s",
                        "&:hover": { bgcolor: darkMode ? "#1e293b" : "#f8fafc" },
                      }}
                    >
                      {item.icon}
                      <Typography sx={{
                        fontSize: 13.5, fontWeight: 600, fontFamily: NAV_FONT,
                        color: item.danger ? "#e11d48" : (darkMode ? "#e2e8f0" : "#0f172a"),
                      }}>
                        {item.label}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </Box>

        </Box>
      </Box>
    </Box>
  );
}

export default Navbar;
