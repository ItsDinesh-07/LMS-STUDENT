import React, { useState } from "react";
import StudentLayout from "../Components/StudentLayout";
import { useNavigate } from "react-router-dom";
import {
  Box, Typography, Button, LinearProgress, Chip, Divider,
  IconButton, Menu, MenuItem, Tooltip,
} from "@mui/material";
import {
  CheckCircle, MoreHoriz, LinkedIn, PlayArrow,
  School, VideoLibrary, Assignment, Quiz,
  EmojiEvents, Download, Share, Visibility,
  FiberManualRecord, BookmarkBorder, TrendingUp,
} from "@mui/icons-material";

const T = {
  indigo: "#4f46e5",
  indigoDark: "#4338ca",
  indigoLight: "#ede9fe",
  blue: "#1c5197",
  blueDark: "#163d78",
  blueLight: "#e0e7ff",
  success: "#16a34a",
  successLight: "#dcfce7",
  border: "#e2e8f0",
  bg: "#f8fafc",
  text: "#0f172a",
  textMid: "#475569",
  textSoft: "#64748b",
  textFaint: "#94a3b8",
  font: "'Inter', 'Plus Jakarta Sans', sans-serif",
};

// ── All groups now have multiple modules ──────────────────────────────────────
const IN_PROGRESS_GROUPS = [
  {
    id: "g1",
    provider: "Google",
    providerLogo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    institution: "KGiSL Educational Institutions",
    title: "Google IT Support",
    tags: ["Credit"],
    overallPct: 15,
    courses: [
      { id: 1,  name: "Technical Support Fundamentals",                      index: "1 of 6", status: "in_progress", pct: 15, nextItem: { type: "video",      label: "Program Introduction",       sublabel: "Video · 5 mins"           }, action: "continue",    estCompletion: "Jul 27, 2026" },
      { id: 2,  name: "The Bits and Bytes of Computer Networking",           index: "2 of 6", status: "not_started", pct: 0,  nextItem: { type: "video",      label: "Networking Basics",          sublabel: "Video · 8 mins"           }, action: "get_started", estCompletion: null },
      { id: 3,  name: "Operating Systems and You: Becoming a Power User",    index: "3 of 6", status: "not_started", pct: 0,  nextItem: { type: "video",      label: "Intro to OS Concepts",       sublabel: "Video · 6 mins"           }, action: "get_started", estCompletion: null },
      { id: 4,  name: "System Administration and IT Infrastructure Services",index: "4 of 6", status: "not_started", pct: 0,  nextItem: { type: "assignment", label: "Sysadmin Fundamentals Quiz", sublabel: "Graded · 20 mins"         }, action: "get_started", estCompletion: null },
      { id: 5,  name: "IT Security: Defense against the digital dark arts",  index: "5 of 6", status: "not_started", pct: 0,  nextItem: { type: "quiz",       label: "Security Concepts Quiz",     sublabel: "Practice · 15 mins"       }, action: "get_started", estCompletion: null },
      { id: 6,  name: "Accelerate Your Job Search with AI",                  index: "6 of 6", status: "not_started", pct: 0,  nextItem: { type: "video",      label: "AI in Job Search",           sublabel: "Video · 10 mins"          }, action: "get_started", estCompletion: null },
    ],
  },
  {
    id: "g2",
    provider: "Microsoft",
    providerLogo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
    institution: "KGiSL Educational Institutions",
    title: "Microsoft Back-End Developer",
    tags: ["Credit"],
    overallPct: 0,
    courses: [
      { id: 7,  name: "Foundations of Coding Back-End",                     index: "1 of 5", status: "not_started", pct: 0, nextItem: { type: "video",      label: "Introduction to the Program",      sublabel: "Video · 3 mins"   }, action: "continue",    estCompletion: "Aug 10, 2026" },
      { id: 8,  name: "Introduction to Databases for Back-End Development", index: "2 of 5", status: "not_started", pct: 0, nextItem: { type: "video",      label: "Relational Databases Intro",        sublabel: "Video · 7 mins"   }, action: "get_started", estCompletion: null },
      { id: 9,  name: "APIs and Back-End Services",                         index: "3 of 5", status: "not_started", pct: 0, nextItem: { type: "assignment", label: "REST API Design Task",              sublabel: "Graded · 30 mins" }, action: "get_started", estCompletion: null },
      { id: 16, name: "Security and Authentication",                         index: "4 of 5", status: "not_started", pct: 0, nextItem: { type: "quiz",       label: "Auth Concepts Quiz",               sublabel: "Practice · 20 mins"}, action: "get_started", estCompletion: null },
      { id: 17, name: "Back-End Developer Capstone",                         index: "5 of 5", status: "not_started", pct: 0, nextItem: { type: "assignment", label: "Capstone Project Submission",       sublabel: "Graded · 90 mins" }, action: "get_started", estCompletion: null },
    ],
  },
  {
    id: "g3",
    provider: "KGiSL",
    providerLogo: null,
    institution: "KGiSL Educational Institutions",
    title: "HTML, CSS, and Javascript for Web Developers",
    tags: [],
    overallPct: 68,
    courses: [
      { id: 10, name: "HTML, CSS, and Javascript for Web Developers",           index: "1 of 4", status: "complete",    pct: 100, nextItem: null,                                                                                                          action: "linkedin",    estCompletion: null },
      { id: 11, name: "Introduction to CSS3",                                   index: "2 of 4", status: "complete",    pct: 100, nextItem: null,                                                                                                          action: "linkedin",    estCompletion: null },
      { id: 12, name: "Coding the Static Restaurant Site",                      index: "3 of 4", status: "in_progress", pct: 97,  nextItem: { type: "assignment", label: "Module 3 Coding Assignment",   sublabel: "Peer-graded · 60 mins" }, action: "continue",    estCompletion: "Apr 25, 2026" },
      { id: 13, name: "Introduction to Javascript and Ajax: Building Web Apps", index: "4 of 4", status: "in_progress", pct: 78,  nextItem: { type: "quiz",       label: "Optional Practice Quiz",       sublabel: "Practice · 30 mins"    }, action: "continue",    estCompletion: "May 2, 2026" },
    ],
  },
  {
    id: "g4",
    provider: "KGiSL",
    providerLogo: null,
    institution: "KGiSL Educational Institutions",
    title: "JavaScript: Comprehensive Skills Assessment",
    tags: ["Exclusive", "Credit"],
    overallPct: 0,
    courses: [
      { id: 14, name: "JavaScript Fundamentals & ES6 Features",    index: "1 of 3", status: "not_started", pct: 0, nextItem: { type: "video",      label: "JS Basics Introduction",        sublabel: "Video · 6 mins"    }, action: "get_started", estCompletion: "Nov 5, 2025" },
      { id: 18, name: "Advanced JavaScript Patterns",              index: "2 of 3", status: "not_started", pct: 0, nextItem: { type: "assignment", label: "Design Patterns Task",           sublabel: "Graded · 45 mins"  }, action: "get_started", estCompletion: null },
      { id: 19, name: "JavaScript Comprehensive Skills Assessment",index: "3 of 3", status: "not_started", pct: 0, nextItem: { type: "assignment", label: "Final Skills Assessment",        sublabel: "Graded · 80 mins"  }, action: "get_started", estCompletion: "Nov 19, 2025" },
    ],
  },
  {
    id: "g5",
    provider: "KGiSL",
    providerLogo: null,
    institution: "KGiSL Educational Institutions",
    title: "CSS & Bootstrap Mastery: Comprehensive Skills Assessment",
    tags: ["Exclusive", "Credit"],
    overallPct: 0,
    courses: [
      { id: 15, name: "CSS Fundamentals & Flexbox",                      index: "1 of 3", status: "not_started", pct: 0, nextItem: { type: "video",      label: "CSS Basics Overview",              sublabel: "Video · 5 mins"    }, action: "get_started", estCompletion: null },
      { id: 20, name: "Bootstrap Framework & Responsive Design",          index: "2 of 3", status: "not_started", pct: 0, nextItem: { type: "assignment", label: "Responsive Layout Task",           sublabel: "Graded · 60 mins"  }, action: "get_started", estCompletion: null },
      { id: 21, name: "CSS & Bootstrap Comprehensive Skills Assessment",  index: "3 of 3", status: "not_started", pct: 0, nextItem: { type: "assignment", label: "Final CSS & Bootstrap Assessment", sublabel: "Graded · 90 mins"  }, action: "get_started", estCompletion: "Nov 19, 2025" },
    ],
  },
];

const COMPLETED_GROUPS = [
  {
    id: "c1", provider: "Johns Hopkins University",
    providerLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Johns_Hopkins_University_seal.svg/800px-Johns_Hopkins_University_seal.svg.png",
    institution: "KGiSL Educational Institutions", title: "The Data Scientist's Toolbox", tags: [], overallPct: 100,
    courses: [
      { id: 101, name: "The Data Scientist's Toolbox",       index: "1 of 3", status: "complete", pct: 100, nextItem: null, action: "linkedin" },
      { id: 108, name: "R Programming for Data Science",     index: "2 of 3", status: "complete", pct: 100, nextItem: null, action: "linkedin" },
      { id: 109, name: "Getting and Cleaning Data",          index: "3 of 3", status: "complete", pct: 100, nextItem: null, action: "linkedin" },
    ],
  },
  {
    id: "c2", provider: "Microsoft",
    providerLogo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
    institution: "KGiSL Educational Institutions", title: "Project Delivery in Business Analysis and Capstone Project", tags: ["Credit"], overallPct: 100,
    courses: [
      { id: 102, name: "Business Analysis Fundamentals",                          index: "1 of 3", status: "complete", pct: 100, nextItem: null, action: "linkedin" },
      { id: 110, name: "Requirements and Design in Business Analysis",            index: "2 of 3", status: "complete", pct: 100, nextItem: null, action: "linkedin" },
      { id: 111, name: "Project Delivery in Business Analysis and Capstone Project", index: "3 of 3", status: "complete", pct: 100, nextItem: null, action: "linkedin" },
    ],
  },
  {
    id: "c3", provider: "University of Michigan",
    providerLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Seal_of_the_University_of_Michigan.svg/800px-Seal_of_the_University_of_Michigan.svg.png",
    institution: "KGiSL Educational Institutions", title: "Python Basics", tags: ["Credit"], overallPct: 100,
    courses: [
      { id: 103, name: "Python Basics",                index: "1 of 3", status: "complete", pct: 100, nextItem: null, action: "linkedin" },
      { id: 112, name: "Python Data Structures",       index: "2 of 3", status: "complete", pct: 100, nextItem: null, action: "linkedin" },
      { id: 113, name: "Using Python to Access Web Data", index: "3 of 3", status: "complete", pct: 100, nextItem: null, action: "linkedin" },
    ],
  },
  {
    id: "c4", provider: "Coursera",
    providerLogo: "https://upload.wikimedia.org/wikipedia/commons/9/97/Coursera-Logo_600x600.svg",
    institution: "KGiSL Educational Institutions", title: "Hands-on Internet of Things", tags: [], overallPct: 100,
    courses: [
      { id: 104, name: "IoT Devices",            index: "1 of 4", status: "complete", pct: 100, nextItem: null, action: "linkedin" },
      { id: 105, name: "IoT Communications",     index: "2 of 4", status: "complete", pct: 100, nextItem: null, action: "linkedin" },
      { id: 106, name: "IoT Networking",         index: "3 of 4", status: "complete", pct: 100, nextItem: null, action: "linkedin" },
      { id: 107, name: "IoT Security & Privacy", index: "4 of 4", status: "complete", pct: 100, nextItem: null, action: "linkedin" },
    ],
  },
];

const CERTIFICATES = [
  { id: 1, title: "Google IT Support Professional Certificate",  provider: "Google",  providerLogo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",        date: "Earned Mar 2024", credentialId: "GG-IT-2024-001",  image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80",  skills: ["IT Support","Networking","Linux","Cybersecurity"] },
  { id: 2, title: "IBM Data Science Professional Certificate",   provider: "IBM",     providerLogo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",               date: "Earned Jan 2024", credentialId: "IBM-DS-2024-007", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",  skills: ["Python","Data Analysis","Machine Learning","SQL"] },
  { id: 3, title: "Meta Front-End Developer Certificate",        provider: "Meta",    providerLogo: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta-Logo.png",               date: "Earned Nov 2023", credentialId: "META-FE-2023-045",image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80", skills: ["React","HTML/CSS","JavaScript","UI/UX"] },
];

function TagChip({ label }) {
  const map = {
    Credit:    { bg: "#1c5197", color: "#fff" },
    Exclusive: { bg: "#0f172a", color: "#fff" },
    New:       { bg: "#dcfce7", color: "#15803d" },
  };
  const c = map[label] || { bg: T.blueLight, color: T.blue };
  return (
    <Box sx={{ display: "inline-flex", alignItems: "center", bgcolor: c.bg, borderRadius: "5px", px: 1, py: 0.3 }}>
      <Typography sx={{ fontSize: 10.5, fontWeight: 700, color: c.color, letterSpacing: 0.3, fontFamily: T.font }}>{label}</Typography>
    </Box>
  );
}

function NextItemIcon({ type }) {
  const m = {
    video:      <VideoLibrary sx={{ fontSize: 13, color: T.textSoft }} />,
    assignment: <Assignment   sx={{ fontSize: 13, color: T.textSoft }} />,
    quiz:       <Quiz         sx={{ fontSize: 13, color: T.textSoft }} />,
  };
  return m[type] || <FiberManualRecord sx={{ fontSize: 9, color: T.textSoft }} />;
}

function KebabMenu() {
  const [anchor, setAnchor] = useState(null);
  return (
    <>
      <IconButton size="small" onClick={e => setAnchor(e.currentTarget)}
        sx={{ color: T.textSoft, borderRadius: "8px", "&:hover": { bgcolor: "#f1f5f9" } }}>
        <MoreHoriz sx={{ fontSize: 19 }} />
      </IconButton>
      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}
        PaperProps={{ elevation: 3, sx: { borderRadius: "10px", minWidth: 170, border: `1px solid ${T.border}`, fontFamily: T.font } }}>
        {["View details","Mark as complete","Remove from list"].map((item, i) => (
          <MenuItem key={item} onClick={() => setAnchor(null)}
            sx={{ fontSize: 13, color: i === 2 ? "#dc2626" : T.textMid, fontFamily: T.font, py: 1 }}>
            {item}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

function CourseRow({ course, isFirst, isLast, navigate }) {
  const isComplete   = course.status === "complete";
  const isInProgress = course.status === "in_progress";

  const iconColors = ["#4f46e5","#0891b2","#7c3aed","#f97316","#22c55e","#e11d48"];
  const iconBg     = iconColors[(course.id - 1) % iconColors.length] + "20";
  const iconColor  = iconColors[(course.id - 1) % iconColors.length];

  const handleAction = () => navigate(`/course/${course.id}`);

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, px: 2.5, py: 2, transition: "background 0.15s", "&:hover": { bgcolor: "#f8fafc" } }}>
        <Box sx={{ mt: 0.4, flexShrink: 0 }}>
          {isComplete ? (
            <CheckCircle sx={{ fontSize: 22, color: T.success }} />
          ) : (
            <Box sx={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${T.border}`, bgcolor: "#fff" }} />
          )}
        </Box>

        <Box sx={{ width: 34, height: 34, borderRadius: "8px", bgcolor: iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, mt: 0.1 }}>
          <School sx={{ fontSize: 17, color: iconColor }} />
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontSize: 14, fontWeight: 600, color: T.text, lineHeight: 1.35, fontFamily: T.font, mb: 0.3 }}>
            {course.name}
          </Typography>
          <Typography sx={{ fontSize: 12, color: T.indigo, fontWeight: 500, fontFamily: T.font }}>
            {[
              course.index ? `Course ${course.index}` : "Course",
              isComplete ? "Complete" : isInProgress ? `${course.pct}% complete` : "Not started",
              course.estCompletion ? `Est. ${course.estCompletion}` : null,
            ].filter(Boolean).join(" · ")}
          </Typography>
          {isInProgress && course.pct > 0 && (
            <LinearProgress variant="determinate" value={course.pct}
              sx={{ mt: 1, height: 4, borderRadius: 2, bgcolor: "#ede9fe", maxWidth: 300,
                "& .MuiLinearProgress-bar": { bgcolor: T.indigo, borderRadius: 2 } }} />
          )}
          {course.nextItem && (
            <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center", gap: 0.6, mt: 0.8 }}>
              <NextItemIcon type={course.nextItem.type} />
              <Typography sx={{ fontSize: 11.5, color: T.textSoft, fontFamily: T.font }}>{course.nextItem.label}</Typography>
            </Box>
          )}
        </Box>

        {course.nextItem && (
          <Box sx={{ display: { xs: "none", md: "block" }, minWidth: 140, maxWidth: 180, ml: 2 }}>
            <Typography sx={{ fontSize: 13, fontWeight: 600, color: T.text, mb: 0.3, fontFamily: T.font, lineHeight: 1.3 }}>
              {course.nextItem.label}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <NextItemIcon type={course.nextItem.type} />
              <Typography sx={{ fontSize: 11.5, color: T.textSoft, fontFamily: T.font }}>{course.nextItem.sublabel}</Typography>
            </Box>
          </Box>
        )}

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0, ml: "auto" }}>
          {isComplete && (
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button variant="contained" startIcon={<LinkedIn sx={{ fontSize: 14 }} />} size="small" onClick={handleAction}
                sx={{ textTransform: "none", fontWeight: 700, fontSize: 12.5, borderRadius: "8px", px: 1.8, py: 0.8, bgcolor: T.blue, boxShadow: "none", "&:hover": { bgcolor: T.blueDark }, whiteSpace: "nowrap", fontFamily: T.font }}>
                Add to LinkedIn
              </Button>
              <Button variant="outlined" size="small" onClick={handleAction}
                sx={{ textTransform: "none", fontWeight: 600, fontSize: 12.5, borderRadius: "8px", px: 1.5, py: 0.8, borderColor: T.border, color: T.textMid, whiteSpace: "nowrap", fontFamily: T.font, "&:hover": { borderColor: T.indigo, color: T.indigo } }}>
                View certificate
              </Button>
            </Box>
          )}
          {!isComplete && course.action === "continue" && (
            <Button variant="contained" startIcon={<PlayArrow sx={{ fontSize: 14 }} />} size="small" onClick={handleAction}
              sx={{ textTransform: "none", fontWeight: 700, fontSize: 12.5, borderRadius: "8px", px: 2, py: 0.9, whiteSpace: "nowrap", background: "linear-gradient(135deg, #4f46e5, #7c3aed)", boxShadow: "0 2px 8px rgba(79,70,229,0.3)", "&:hover": { background: "linear-gradient(135deg, #4338ca, #6d28d9)" }, fontFamily: T.font }}>
              Continue
            </Button>
          )}
          {!isComplete && course.action === "get_started" && (
            <Button variant="outlined" size="small" onClick={handleAction}
              sx={{ textTransform: "none", fontWeight: 600, fontSize: 12.5, borderRadius: "8px", px: 2, py: 0.9, borderColor: T.border, color: T.textMid, whiteSpace: "nowrap", fontFamily: T.font, "&:hover": { borderColor: T.indigo, color: T.indigo, bgcolor: T.indigoLight } }}>
              Get started
            </Button>
          )}
          <KebabMenu />
        </Box>
      </Box>
      {!isLast && <Divider sx={{ borderColor: T.border, mx: 2.5 }} />}
    </Box>
  );
}

function GroupCard({ group, navigate }) {
  return (
    <Box sx={{ mb: 3.5 }}>
      <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", mb: 1.5, flexWrap: "wrap", gap: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box sx={{ width: 34, height: 34, borderRadius: "8px", border: `1px solid ${T.border}`, overflow: "hidden", flexShrink: 0, bgcolor: "#fff", display: "flex", alignItems: "center", justifyContent: "center", p: 0.5, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            {group.providerLogo
              ? <Box component="img" src={group.providerLogo} alt={group.provider} sx={{ width: "100%", height: "100%", objectFit: "contain" }} onError={e => { e.target.style.display = "none"; }} />
              : <School sx={{ fontSize: 17, color: T.textSoft }} />
            }
          </Box>
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap", mb: 0.3 }}>
              <Typography sx={{ fontSize: 15, fontWeight: 700, color: T.text, fontFamily: T.font }}>{group.title}</Typography>
              {group.tags.map(t => <TagChip key={t} label={t} />)}
            </Box>
            <Typography sx={{ fontSize: 12, color: T.textSoft, fontFamily: T.font }}>
              Offered by {group.institution}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: 200 }}>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.4 }}>
              <Typography sx={{ fontSize: 11, color: T.textSoft, fontFamily: T.font }}>Overall Progress</Typography>
              <Typography sx={{ fontSize: 11, fontWeight: 700, color: T.indigo, fontFamily: T.font }}>{group.overallPct}%</Typography>
            </Box>
            <LinearProgress variant="determinate" value={group.overallPct}
              sx={{ height: 6, borderRadius: 3, bgcolor: "#ede9fe", "& .MuiLinearProgress-bar": { background: "linear-gradient(90deg, #4f46e5, #7c3aed)", borderRadius: 3 } }} />
          </Box>
        </Box>
      </Box>

      <Box sx={{ border: `1px solid ${T.border}`, borderRadius: "14px", overflow: "hidden", bgcolor: "#fff", boxShadow: "0 2px 8px rgba(15,23,42,0.05)" }}>
        {group.courses.map((c, i) => (
          <CourseRow key={c.id} course={c} isFirst={i === 0} isLast={i === group.courses.length - 1} navigate={navigate} />
        ))}
      </Box>
    </Box>
  );
}

function EmptyInProgress({ onBrowse }) {
  return (
    <Box sx={{ textAlign: "center", py: 8 }}>
      <Box sx={{ width: 110, height: 110, mx: "auto", mb: 3 }}>
        <svg viewBox="0 0 110 110" width="110" height="110" fill="none">
          <rect x="25" y="68" width="60" height="12" rx="3" fill="#f0abfc" />
          <rect x="30" y="54" width="50" height="16" rx="3" fill="#c4b5fd" />
          <rect x="36" y="38" width="38" height="18" rx="3" fill="#a78bfa" />
          <rect x="44" y="22" width="22" height="18" rx="3" fill="#7c3aed" opacity="0.85" />
          <ellipse cx="55" cy="80" rx="28" ry="5" fill="#ede9fe" />
          <circle cx="55" cy="32" r="5" fill="#0d9488" />
        </svg>
      </Box>
      <Typography sx={{ fontSize: 20, fontWeight: 800, color: T.text, mb: 0.8, fontFamily: T.font }}>Start your learning journey</Typography>
      <Typography sx={{ fontSize: 13.5, color: T.textSoft, maxWidth: 420, mx: "auto", lineHeight: 1.7, mb: 3, fontFamily: T.font }}>
        Enroll in a course to begin tracking your progress here.
      </Typography>
      <Button variant="contained" onClick={onBrowse}
        sx={{ textTransform: "none", fontWeight: 700, fontSize: 13.5, borderRadius: "10px", px: 3, py: 1.1, background: "linear-gradient(135deg, #4f46e5, #7c3aed)", boxShadow: "none", fontFamily: T.font }}>
        Browse Courses
      </Button>
    </Box>
  );
}

function EmptySaved({ onBrowse }) {
  return (
    <Box sx={{ textAlign: "center", py: 8 }}>
      <BookmarkBorder sx={{ fontSize: 52, color: T.textFaint, mb: 1.5 }} />
      <Typography sx={{ fontSize: 20, fontWeight: 800, color: T.text, mb: 0.8, fontFamily: T.font }}>No saved courses yet</Typography>
      <Typography sx={{ fontSize: 13.5, color: T.textSoft, maxWidth: 380, mx: "auto", lineHeight: 1.7, mb: 3, fontFamily: T.font }}>
        Browse the catalog and bookmark courses you're interested in.
      </Typography>
      <Button variant="outlined" onClick={onBrowse}
        sx={{ textTransform: "none", fontWeight: 700, fontSize: 13.5, borderRadius: "10px", px: 3, py: 1.1, borderColor: T.indigo, color: T.indigo, fontFamily: T.font }}>
        Explore catalog
      </Button>
    </Box>
  );
}

function EmptyCompleted() {
  return (
    <Box sx={{ textAlign: "center", py: 8 }}>
      <Typography sx={{ fontSize: 52, mb: 1.5 }}>🎓</Typography>
      <Typography sx={{ fontSize: 20, fontWeight: 800, color: T.text, mb: 0.8, fontFamily: T.font }}>No completed courses yet</Typography>
      <Typography sx={{ fontSize: 13.5, color: T.textSoft, maxWidth: 380, mx: "auto", fontFamily: T.font }}>Keep going! Completed courses and certificates will appear here.</Typography>
    </Box>
  );
}

function EmptyCertificates() {
  return (
    <Box sx={{ textAlign: "center", py: 8 }}>
      <Typography sx={{ fontSize: 52, mb: 1.5 }}>🏅</Typography>
      <Typography sx={{ fontSize: 20, fontWeight: 800, color: T.text, mb: 0.8, fontFamily: T.font }}>No certificates yet</Typography>
      <Typography sx={{ fontSize: 13.5, color: T.textSoft, maxWidth: 380, mx: "auto", fontFamily: T.font }}>Complete a course to earn your first certificate.</Typography>
    </Box>
  );
}

function CertificatesTab({ navigate }) {
  return (
    <Box>
      <Typography sx={{ fontSize: 13.5, color: T.textSoft, mb: 3, fontFamily: T.font }}>
        {CERTIFICATES.length} certificate{CERTIFICATES.length !== 1 ? "s" : ""} earned
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        {CERTIFICATES.map(cert => (
          <Box key={cert.id} sx={{ border: `1px solid ${T.border}`, borderRadius: "16px", bgcolor: "#fff", overflow: "hidden", display: "flex", alignItems: "stretch", boxShadow: "0 2px 8px rgba(15,23,42,0.05)", transition: "all 0.22s", "&:hover": { boxShadow: "0 8px 24px rgba(15,23,42,0.1)", transform: "translateY(-2px)" } }}>
            <Box sx={{ width: 130, flexShrink: 0, position: "relative", overflow: "hidden" }}>
              <Box component="img" src={cert.image} alt={cert.title} sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.3), transparent)" }} />
            </Box>
            <Box sx={{ flex: 1, p: 2.5, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <Box sx={{ width: 22, height: 22, border: `1px solid ${T.border}`, borderRadius: "4px", overflow: "hidden", bgcolor: "#fff", display: "flex", alignItems: "center", justifyContent: "center", p: 0.3 }}>
                  <Box component="img" src={cert.providerLogo} alt={cert.provider} sx={{ width: "100%", height: "100%", objectFit: "contain" }} onError={e => { e.target.style.display = "none"; }} />
                </Box>
                <Typography sx={{ fontSize: 12, color: T.textSoft, fontWeight: 500, fontFamily: T.font }}>{cert.provider}</Typography>
              </Box>
              <Typography sx={{ fontSize: 15.5, fontWeight: 700, color: T.text, mb: 0.4, lineHeight: 1.3, fontFamily: T.font }}>{cert.title}</Typography>
              <Typography sx={{ fontSize: 12, color: T.textSoft, mb: 1.5, fontFamily: T.font }}>{cert.date} · ID: {cert.credentialId}</Typography>
              <Box sx={{ display: "flex", gap: 0.8, flexWrap: "wrap", mb: 2 }}>
                {cert.skills.map(s => (
                  <Box key={s} sx={{ px: 1.2, py: 0.3, bgcolor: T.indigoLight, borderRadius: "6px" }}>
                    <Typography sx={{ fontSize: 11.5, fontWeight: 600, color: T.indigo, fontFamily: T.font }}>{s}</Typography>
                  </Box>
                ))}
              </Box>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {[
                  { label: "Add to LinkedIn", icon: <LinkedIn sx={{ fontSize: 14 }} />, variant: "contained", sx: { background: "linear-gradient(135deg,#4f46e5,#7c3aed)", boxShadow: "none" } },
                  { label: "View",     icon: <Visibility sx={{ fontSize: 14 }} />, variant: "outlined", sx: { borderColor: T.border, color: T.textMid, "&:hover": { borderColor: T.indigo, color: T.indigo } } },
                  { label: "Download", icon: <Download   sx={{ fontSize: 14 }} />, variant: "outlined", sx: { borderColor: T.border, color: T.textMid, "&:hover": { borderColor: T.indigo, color: T.indigo } } },
                  { label: "Share",    icon: <Share      sx={{ fontSize: 14 }} />, variant: "outlined", sx: { borderColor: T.border, color: T.textMid, "&:hover": { borderColor: T.indigo, color: T.indigo } } },
                ].map(btn => (
                  <Button key={btn.label} variant={btn.variant} startIcon={btn.icon} size="small"
                    sx={{ textTransform: "none", fontWeight: 700, fontSize: 12.5, borderRadius: "8px", px: 1.8, py: 0.8, fontFamily: T.font, ...btn.sx }}>
                    {btn.label}
                  </Button>
                ))}
              </Box>
            </Box>
            <Box sx={{ width: 60, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "#fefce8", borderLeft: `1px solid ${T.border}` }}>
              <EmojiEvents sx={{ fontSize: 28, color: "#f59e0b" }} />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

// ── Animated SVG Illustration ─────────────────────────────────────────────────
function LearningIllustration() {
  return (
    <svg width="260" height="120" viewBox="0 0 220 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes floatY2 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(0.92); }
        }
        @keyframes slideBar {
          0% { width: 20px; }
          60% { width: 52px; }
          100% { width: 52px; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .float-main { animation: floatY 3.5s ease-in-out infinite; transform-origin: center bottom; }
        .float-star { animation: floatY2 2.8s ease-in-out infinite 0.4s; transform-origin: center; }
        .float-trophy { animation: floatY2 3.2s ease-in-out infinite 0.8s; transform-origin: center; }
        .pulse-dot1 { animation: pulse 2s ease-in-out infinite; }
        .pulse-dot2 { animation: pulse 2s ease-in-out infinite 0.7s; }
        .pulse-dot3 { animation: pulse 2s ease-in-out infinite 1.4s; }
        .blink-cursor { animation: blink 1.1s step-end infinite; }
      `}</style>

      {/* Shadow ellipse */}
      <ellipse cx="110" cy="158" rx="55" ry="8" fill="#e2e8f0" opacity="0.7" />

      {/* ── Floating main screen group ── */}
      <g className="float-main">
        {/* Monitor body */}
        <rect x="50" y="42" width="120" height="80" rx="10" fill="#1e293b" />
        <rect x="56" y="48" width="108" height="68" rx="7" fill="#0f172a" />

        {/* Code lines */}
        <rect x="64" y="58" width="72" height="5" rx="2.5" fill="#4f46e5" />
        <rect x="64" y="68" width="90" height="3" rx="1.5" fill="#334155" />
        <rect x="64" y="75" width="80" height="3" rx="1.5" fill="#334155" />
        <rect x="64" y="82" width="60" height="3" rx="1.5" fill="#334155" />
        <rect x="64" y="89" width="50" height="3" rx="1.5" fill="#2d3748" />
        <rect x="64" y="96" width="70" height="3" rx="1.5" fill="#334155" />

        {/* Progress bar bg */}
        <rect x="64" y="106" width="92" height="6" rx="3" fill="#1e293b" />
        {/* Animated progress fill */}
        <rect x="64" y="106" rx="3" height="6" fill="#4f46e5">
          <animate attributeName="width" values="20;52;52;20" dur="3.5s" repeatCount="indefinite" />
        </rect>

        {/* Blinking cursor */}
        <rect x="116" y="82" width="2" height="8" rx="1" fill="#a78bfa" className="blink-cursor" />

        {/* Monitor stand */}
        <rect x="97" y="122" width="26" height="16" rx="3" fill="#cbd5e1" />
        {/* Base */}
        <rect x="82" y="136" width="56" height="6" rx="3" fill="#94a3b8" />
      </g>

      {/* ── Floating left book ── */}
      <g className="float-main" style={{ animationDuration: "4s", animationDelay: "0.2s" }}>
        <rect x="18" y="98" width="24" height="36" rx="3" fill="#7c3aed" />
        <rect x="22" y="102" width="3" height="28" rx="1" fill="#ede9fe" opacity="0.5" />
        <rect x="44" y="104" width="20" height="30" rx="3" fill="#0891b2" />
        <rect x="48" y="108" width="3" height="22" rx="1" fill="#e0f2fe" opacity="0.5" />
      </g>

      {/* ── Floating right book ── */}
      <g className="float-main" style={{ animationDuration: "3.8s", animationDelay: "0.6s" }}>
        <rect x="168" y="106" width="24" height="28" rx="3" fill="#f97316" />
        <rect x="172" y="110" width="3" height="20" rx="1" fill="#fff7ed" opacity="0.5" />
      </g>

      {/* ── Floating star badge ── */}
      <g className="float-star">
        <circle cx="186" cy="48" r="15" fill="#fef9c3" />
        <text x="179" y="54" fontSize="14">⭐</text>
      </g>

      {/* ── Floating trophy badge ── */}
      <g className="float-trophy">
        <circle cx="33" cy="34" r="15" fill="#dcfce7" />
        <text x="26" y="40" fontSize="15">🏆</text>
      </g>

      {/* ── Animated dots (pulsing) ── */}
      <circle cx="160" cy="30" r="4.5" fill="#a78bfa" className="pulse-dot1" />
      <circle cx="174" cy="20" r="3" fill="#4f46e5" className="pulse-dot2" />
      <circle cx="148" cy="22" r="3" fill="#7c3aed" className="pulse-dot3" />
    </svg>
  );
}

const TABS = ["In Progress", "Completed", "Saved", "Certificates & Badges"];

export default function MyLearning() {
  const navigate   = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const hasInProgress   = IN_PROGRESS_GROUPS.length > 0;
  const hasCompleted    = COMPLETED_GROUPS.length > 0;
  const hasSaved        = false;
  const hasCertificates = CERTIFICATES.length > 0;

  return (
    <StudentLayout title="My Learning">
      <Box sx={{ bgcolor: T.bg, minHeight: "100vh" }}>
        <Box sx={{ px: { xs: 2, md: 4 }, pt: 3.5, pb: 6, width: "100%", maxWidth: "100%" }}>

          {/* ── Page header with animated illustration ── */}
          <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", mb: 0.2 }}>
            <Box>
              <Typography sx={{ fontSize: 26, fontWeight: 800, color: T.text, mb: 0.5, fontFamily: T.font, letterSpacing: "-0.3px" }}>
                My Learnings
              </Typography>
              <Typography sx={{ fontSize: 13.5, color: T.textSoft, fontFamily: T.font, maxWidth: 480 }}>
                Track your enrolled courses, completions, and earned certificates.
              </Typography>
            </Box>

            {/* Animated SVG Illustration */}
            <Box sx={{ width: 140, height: 130, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <LearningIllustration />
            </Box>
          </Box>

          {/* ── Tabs ── */}
          <Box sx={{ display: "flex", borderBottom: `2px solid ${T.border}`, mb: 4, gap: 0 }}>
            {TABS.map((tab, i) => (
              <Box key={tab} onClick={() => setActiveTab(i)}
                sx={{
                  px: 2.5, py: 1.5, cursor: "pointer", position: "relative", userSelect: "none",
                  fontSize: 14.5, fontWeight: activeTab === i ? 700 : 500,
                  color: activeTab === i ? T.text : T.textSoft,
                  fontFamily: T.font, letterSpacing: "0.1px",
                  transition: "color 0.15s",
                  "&:hover": { color: T.text },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -2, left: 0, right: 0,
                    height: 2.5,
                    bgcolor: activeTab === i ? T.indigo : "transparent",
                    borderRadius: "2px",
                    transition: "background 0.18s",
                  },
                }}
              >
                {tab}
              </Box>
            ))}
          </Box>

          {/* ── Tab content ── */}
          {activeTab === 0 && (
            hasInProgress
              ? <Box>{IN_PROGRESS_GROUPS.map(g => <GroupCard key={g.id} group={g} navigate={navigate} />)}</Box>
              : <EmptyInProgress onBrowse={() => navigate("/mycourses")} />
          )}
          {activeTab === 1 && (
            hasCompleted
              ? <Box>{COMPLETED_GROUPS.map(g => <GroupCard key={g.id} group={g} navigate={navigate} />)}</Box>
              : <EmptyCompleted />
          )}
          {activeTab === 2 && (
            hasSaved
              ? <Typography sx={{ color: T.textSoft, fontFamily: T.font }}>Your saved courses appear here.</Typography>
              : <EmptySaved onBrowse={() => navigate("/mycourses")} />
          )}
          {activeTab === 3 && (
            hasCertificates
              ? <CertificatesTab navigate={navigate} />
              : <EmptyCertificates />
          )}

        </Box>
      </Box>
    </StudentLayout>
  );
}
