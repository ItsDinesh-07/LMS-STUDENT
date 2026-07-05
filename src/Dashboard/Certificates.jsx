import React, { useState, useMemo } from "react";
import StudentLayout from "../Components/StudentLayout";
import {
  Box, Typography, Button, Chip, Divider,
  LinearProgress, IconButton, Avatar, Tooltip,
} from "@mui/material";
import {
  FileDownload, LinkedIn, Visibility, FilterList,
  ArrowForward, EmojiEvents, Share, CheckCircle,
  Verified, WorkspacePremium, CalendarMonth,
  School, TrendingUp, KeyboardArrowDown,
  OpenInNew, Download, Twitter,
} from "@mui/icons-material";
 
// ─── Theme ────────────────────────────────────────────────────────────────────
const T = {
  indigo:       "#4f46e5",
  indigoDark:   "#4338ca",
  indigoLight:  "#eef2ff",
  border:       "#e2e8f0",
  bg:           "#f8fafc",
  text:         "#0f172a",
  textMid:      "#475569",
  textSoft:     "#64748b",
  textFaint:    "#94a3b8",
  font:         "'Inter', 'Segoe UI', sans-serif",
};
 
// ─── Data ─────────────────────────────────────────────────────────────────────
const EARNED_CERTS = [
  { id: 1, title: "React Development",      course: "Web Development – Pro",    issued: "Jun 13, 2026", status: "Verified", borderColor: "#4f46e5", badgeColor: "#fbbf24", credentialId: "EDU-2026-001", category: "Web Development",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80" },
  { id: 2, title: "JavaScript Advanced",    course: "JavaScript Mastery",        issued: "Jun 06, 2026", status: "Verified", borderColor: "#f97316", badgeColor: "#fbbf24", credentialId: "EDU-2026-002", category: "Web Development",
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600&q=80" },
  { id: 3, title: "TypeScript Essentials",  course: "TypeScript Course",         issued: "May 20, 2026", status: "Virtual",  borderColor: "#0891b2", badgeColor: "#a78bfa", credentialId: "EDU-2026-003", category: "Web Development",
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=600&q=80" },
  { id: 4, title: "CSS Mastery",            course: "Frontend Development",      issued: "May 20, 2026", status: "Verified", borderColor: "#7c3aed", badgeColor: "#fbbf24", credentialId: "EDU-2026-004", category: "Design",
    image: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=600&q=80" },
  { id: 5, title: "HTML Fundamentals",      course: "Web Basics",                issued: "May 13, 2026", status: "Verified", borderColor: "#4f46e5", badgeColor: "#fbbf24", credentialId: "EDU-2026-005", category: "Web Development",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80" },
  { id: 6, title: "MongoDB Basics",         course: "Database Management",       issued: "Apr 30, 2026", status: "Verified", borderColor: "#22c55e", badgeColor: "#34d399", credentialId: "EDU-2026-006", category: "Data Science",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80" },
  { id: 7, title: "Node.js Fundamentals",   course: "Backend Development",       issued: "Apr 18, 2026", status: "Virtual",  borderColor: "#0891b2", badgeColor: "#fbbf24", credentialId: "EDU-2026-007", category: "Web Development",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&q=80" },
  { id: 8, title: "Git & GitHub",           course: "DevOps Basics",             issued: "Apr 05, 2026", status: "Verified", borderColor: "#ef4444", badgeColor: "#fbbf24", credentialId: "EDU-2026-008", category: "DevOps",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&q=80" },
];
 
const IN_PROGRESS = [
  { title: "Advanced JavaScript", course: "JavaScript Mastery",   icon: "JS", iconBg: "#fef9c3", iconColor: "#854d0e", pct: 70, modules: 4, totalModules: 4, color: "#f97316",
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=300&q=80" },
  { title: "Advanced TypeScript", course: "TypeScript Course",    icon: "TS", iconBg: "#dbeafe", iconColor: "#1e40af", pct: 45, modules: 0, totalModules: 5, color: "#3b82f6",
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=300&q=80" },
  { title: "MongoDB Advanced",    course: "Database Management",  icon: "MG", iconBg: "#f0fdf4", iconColor: "#15803d", pct: 36, modules: 1, totalModules: 6, color: "#22c55e",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&q=80" },
];
 
const BENEFITS = [
  { emoji: "🏢", label: "Industry Recognized", desc: "Recognised by top companies worldwide",          color: "#6366f1", bg: "#e0e7ff" },
  { emoji: "🔗", label: "Share Anywhere",       desc: "Share on LinkedIn and social media instantly",   color: "#22c55e", bg: "#dcfce7" },
  { emoji: "⬇️", label: "Download & Print",     desc: "High-quality PDF for your records",              color: "#0891b2", bg: "#e0f2fe" },
  { emoji: "💼", label: "Career Boost",         desc: "Enhance your resume and advance your career",    color: "#f97316", bg: "#fff7ed" },
  { emoji: "♾️", label: "Lifetime Access",      desc: "Access your certificates any time, anywhere",   color: "#a855f7", bg: "#f3e8ff" },
];
 
// ─── Tab config ───────────────────────────────────────────────────────────────
const TABS = [
  { label: "All Certificates", key: "all"      },
  { label: "Verified",         key: "verified"  },
  { label: "By Course",        key: "byCourse"  },
  { label: "By Date",          key: "byDate"    },
];
 
// ─── Helpers ──────────────────────────────────────────────────────────────────
function StatusChip({ status, statusColor }) {
  const isVerified = status === "Verified";
  return (
    <Box sx={{
      display: "inline-flex", alignItems: "center", gap: 0.5,
      bgcolor: isVerified ? "#dcfce7" : "#e0e7ff",
      borderRadius: "8px", px: 1.1, py: 0.35,
    }}>
      {isVerified
        ? <CheckCircle sx={{ fontSize: 11, color: "#16a34a" }} />
        : <WorkspacePremium sx={{ fontSize: 11, color: "#6366f1" }} />}
      <Typography sx={{ fontSize: 11, fontWeight: 700, color: isVerified ? "#16a34a" : "#6366f1", fontFamily: T.font }}>
        {status}
      </Typography>
    </Box>
  );
}
 
// ─── Certificate Card ─────────────────────────────────────────────────────────
function CertCard({ cert }) {
  return (
    <Box sx={{
      border: `1px solid ${T.border}`, borderRadius: "16px", overflow: "hidden",
      bgcolor: "#fff", transition: "all 0.24s ease", cursor: "pointer",
      display: "flex", flexDirection: "column",
      "&:hover": { boxShadow: "0 12px 32px rgba(0,0,0,0.10)", transform: "translateY(-4px)", borderColor: "#94a3b8" },
    }}>
 
      {/* Image with overlay certificate preview */}
      <Box sx={{ position: "relative", height: 160, overflow: "hidden", flexShrink: 0 }}>
        <Box
          component="img"
          src={cert.image}
          alt={cert.title}
          sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block",
            transition: "transform 0.3s ease", "&:hover": { transform: "scale(1.05)" } }}
        />
        {/* Gradient overlay */}
        <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.08) 60%, transparent 100%)" }} />
 
        {/* Certificate label top-center */}
        <Box sx={{
          position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)",
          bgcolor: "rgba(255,255,255,0.92)", backdropFilter: "blur(6px)",
          borderRadius: "8px", px: 1.4, py: 0.4,
          border: `1px solid ${cert.borderColor}55`,
        }}>
          <Typography sx={{ fontSize: 9, fontWeight: 800, color: cert.borderColor, letterSpacing: 1.2, textTransform: "uppercase", fontFamily: T.font }}>
            Certificate of Completion
          </Typography>
        </Box>
 
        {/* Status chip top-right */}
        <Box sx={{ position: "absolute", top: 10, right: 10 }}>
          <StatusChip status={cert.status} />
        </Box>
 
        {/* Title bottom of image */}
        <Box sx={{ position: "absolute", bottom: 10, left: 12, right: 12 }}>
          <Typography sx={{ fontSize: 14, fontWeight: 800, color: "#fff", lineHeight: 1.25, fontFamily: T.font,
            textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>
            {cert.title}
          </Typography>
          <Typography sx={{ fontSize: 11.5, color: "rgba(255,255,255,0.75)", fontFamily: T.font, mt: 0.2 }}>
            {cert.course}
          </Typography>
        </Box>
 
        {/* Medal badge */}
        <Box sx={{
          position: "absolute", bottom: -12, right: 14,
          width: 32, height: 32, borderRadius: "50%",
          bgcolor: cert.badgeColor,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 3px 10px rgba(0,0,0,0.25)", fontSize: 16, zIndex: 2,
        }}>
          🏅
        </Box>
      </Box>
 
      {/* Card body */}
      <Box sx={{ px: 2, pt: 2, pb: 1.8, flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Issued date */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1.2 }}>
          <CalendarMonth sx={{ fontSize: 13, color: T.textFaint }} />
          <Typography sx={{ fontSize: 11.5, color: T.textSoft, fontFamily: T.font }}>
            Issued {cert.issued}
          </Typography>
        </Box>
 
        {/* Credential ID */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1.5 }}>
          <Typography sx={{ fontSize: 11, color: T.textFaint, fontFamily: T.font }}>ID:</Typography>
          <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: T.indigo, fontFamily: T.font, letterSpacing: 0.3 }}>
            {cert.credentialId}
          </Typography>
        </Box>
 
        {/* Left accent bar */}
        <Box sx={{ height: 2, borderRadius: 2, bgcolor: cert.borderColor, mb: 1.8, opacity: 0.6 }} />
 
        {/* Actions */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: "auto" }}>
          <StatusChip status={cert.status} />
          <Box sx={{ display: "flex", gap: 0.3 }}>
            <Tooltip title="View" arrow>
              <IconButton size="small" sx={{ color: T.textSoft, width: 28, height: 28, "&:hover": { color: T.indigo, bgcolor: T.indigoLight } }}>
                <Visibility sx={{ fontSize: 14 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Download" arrow>
              <IconButton size="small" sx={{ color: T.textSoft, width: 28, height: 28, "&:hover": { color: "#16a34a", bgcolor: "#dcfce7" } }}>
                <FileDownload sx={{ fontSize: 14 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Share" arrow>
              <IconButton size="small" sx={{ color: T.textSoft, width: 28, height: 28, "&:hover": { color: "#0891b2", bgcolor: "#e0f2fe" } }}>
                <Share sx={{ fontSize: 14 }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
 
// ─── By-Course grouped view ───────────────────────────────────────────────────
function ByCourseView({ certs }) {
  const grouped = useMemo(() => {
    const map = {};
    certs.forEach(c => {
      if (!map[c.category]) map[c.category] = [];
      map[c.category].push(c);
    });
    return map;
  }, [certs]);
 
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {Object.entries(grouped).map(([cat, items]) => (
        <Box key={cat}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
            <Box sx={{ width: 32, height: 32, borderRadius: "8px", bgcolor: T.indigoLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <School sx={{ fontSize: 16, color: T.indigo }} />
            </Box>
            <Typography sx={{ fontWeight: 700, fontSize: 15, color: T.text, fontFamily: T.font }}>{cat}</Typography>
            <Box sx={{ bgcolor: T.indigoLight, borderRadius: "20px", px: 1, py: 0.2 }}>
              <Typography sx={{ fontSize: 11, fontWeight: 700, color: T.indigo, fontFamily: T.font }}>{items.length}</Typography>
            </Box>
          </Box>
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2 }}>
            {items.map(c => <CertCard key={c.id} cert={c} />)}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
 
// ─── By-Date sorted view ──────────────────────────────────────────────────────
function ByDateView({ certs }) {
  const sorted = useMemo(() =>
    [...certs].sort((a, b) => new Date(b.issued) - new Date(a.issued)), [certs]);
 
  // Group by month-year
  const grouped = useMemo(() => {
    const map = {};
    sorted.forEach(c => {
      const d = new Date(c.issued);
      const key = d.toLocaleString("en-US", { month: "long", year: "numeric" });
      if (!map[key]) map[key] = [];
      map[key].push(c);
    });
    return map;
  }, [sorted]);
 
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {Object.entries(grouped).map(([month, items]) => (
        <Box key={month}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
            <Box sx={{ width: 32, height: 32, borderRadius: "8px", bgcolor: "#fef9c3", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CalendarMonth sx={{ fontSize: 16, color: "#b45309" }} />
            </Box>
            <Typography sx={{ fontWeight: 700, fontSize: 15, color: T.text, fontFamily: T.font }}>{month}</Typography>
            <Box sx={{ bgcolor: "#fef9c3", borderRadius: "20px", px: 1, py: 0.2 }}>
              <Typography sx={{ fontSize: 11, fontWeight: 700, color: "#b45309", fontFamily: T.font }}>{items.length}</Typography>
            </Box>
          </Box>
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2 }}>
            {items.map(c => <CertCard key={c.id} cert={c} />)}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
 
// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Certificates() {
  const [activeTab, setActiveTab]   = useState(0);
  const [showAll,   setShowAll]     = useState(false);
 
  const activeKey = TABS[activeTab].key;
 
  // Filter for "Verified" tab
  const filteredCerts = useMemo(() => {
    if (activeKey === "verified") return EARNED_CERTS.filter(c => c.status === "Verified");
    return EARNED_CERTS;
  }, [activeKey]);
 
  const displayedCerts = showAll ? filteredCerts : filteredCerts.slice(0, 4);
 
  return (
    <StudentLayout title="Certificates">
      <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 3.5, bgcolor: T.bg, minHeight: "100vh" }}>
 
        {/* ── Hero Stats Banner ───────────────────────────────────────────── */}
        <Box sx={{
          background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 45%, #4f46e5 100%)",
          borderRadius: "18px", p: 3.5,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          position: "relative", overflow: "hidden",
        }}>
          {/* Decorative circles */}
          <Box sx={{ position: "absolute", top: -40, right: "30%", width: 220, height: 220, borderRadius: "50%", bgcolor: "rgba(255,255,255,0.05)" }} />
          <Box sx={{ position: "absolute", bottom: -60, right: "10%", width: 160, height: 160, borderRadius: "50%", bgcolor: "rgba(255,255,255,0.04)" }} />
          {[{t:"12%",l:"52%"},{t:"60%",l:"68%"},{t:"25%",l:"78%"}].map((d,i)=>(
            <Box key={i} sx={{ position:"absolute", top:d.t, left:d.l, width:3, height:3, borderRadius:"50%", bgcolor:"rgba(255,255,255,0.7)" }} />
          ))}
 
          <Box sx={{ zIndex: 1 }}>
            <Box sx={{ display:"inline-flex", alignItems:"center", gap:0.8, bgcolor:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.22)", borderRadius:"20px", px:1.8, py:0.5, mb:1.5 }}>
              <EmojiEvents sx={{ fontSize:14, color:"#fbbf24" }} />
              <Typography sx={{ fontSize:12, fontWeight:600, color:"rgba(255,255,255,0.85)", fontFamily:T.font }}>Your Achievements</Typography>
            </Box>
            <Typography sx={{ fontSize:26, fontWeight:800, color:"#fff", lineHeight:1.2, fontFamily:T.font, mb:0.5 }}>
              {EARNED_CERTS.length} Certificates Earned
            </Typography>
            <Typography sx={{ fontSize:13.5, color:"rgba(255,255,255,0.6)", fontFamily:T.font }}>
              Keep learning to unlock more achievements and grow your career.
            </Typography>
          </Box>
 
          {/* Stat boxes */}
          <Box sx={{ zIndex:1, display:"flex", gap:1.5 }}>
            {[
              { val: EARNED_CERTS.filter(c=>c.status==="Verified").length, label:"Verified",    bg:"rgba(34,197,94,0.15)", border:"rgba(34,197,94,0.3)",  color:"#4ade80" },
              { val: EARNED_CERTS.filter(c=>c.status==="Virtual").length,  label:"Virtual",     bg:"rgba(99,102,241,0.2)", border:"rgba(99,102,241,0.35)", color:"#a5b4fc" },
              { val: IN_PROGRESS.length,                                    label:"In Progress", bg:"rgba(251,191,36,0.15)",border:"rgba(251,191,36,0.3)",  color:"#fcd34d" },
            ].map((s,i)=>(
              <Box key={i} sx={{ bgcolor:s.bg, border:`1px solid ${s.border}`, borderRadius:"12px", px:2.2, py:1.6, textAlign:"center", minWidth:90, backdropFilter:"blur(6px)" }}>
                <Typography sx={{ fontSize:26, fontWeight:800, color:s.color, lineHeight:1, fontFamily:T.font }}>{s.val}</Typography>
                <Typography sx={{ fontSize:10.5, fontWeight:600, color:"rgba(255,255,255,0.55)", letterSpacing:0.7, textTransform:"uppercase", mt:0.4, fontFamily:T.font }}>{s.label}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
 
        {/* ── Tab bar + Filter ────────────────────────────────────────────── */}
        <Box sx={{ bgcolor:"#fff", borderRadius:"14px", border:`1px solid ${T.border}`, px:2.5, py:0, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <Box sx={{ display:"flex", gap:0 }}>
            {TABS.map((tab, i) => (
              <Box
                key={tab.key}
                onClick={() => { setActiveTab(i); setShowAll(false); }}
                sx={{
                  px:2.5, py:1.6, cursor:"pointer", position:"relative",
                  fontSize:14, fontWeight: activeTab===i ? 700 : 500,
                  fontFamily:T.font,
                  color: activeTab===i ? T.indigo : T.textSoft,
                  transition:"color 0.15s",
                  "&:hover": { color: T.indigo },
                  "&::after": {
                    content:'""', position:"absolute",
                    bottom:0, left:0, right:0, height:2.5,
                    bgcolor: activeTab===i ? T.indigo : "transparent",
                    borderRadius:"2px 2px 0 0",
                    transition:"background 0.18s",
                  },
                }}
              >
                {tab.label}
                {tab.key === "verified" && (
                  <Box component="span" sx={{ ml:0.8, display:"inline-flex", alignItems:"center", bgcolor: activeTab===i ? T.indigoLight : "#f1f5f9", borderRadius:"20px", px:0.8, py:0.1 }}>
                    <Typography sx={{ fontSize:10.5, fontWeight:700, color: activeTab===i ? T.indigo : T.textSoft, fontFamily:T.font }}>
                      {EARNED_CERTS.filter(c=>c.status==="Verified").length}
                    </Typography>
                  </Box>
                )}
              </Box>
            ))}
          </Box>
          <Button
            startIcon={<FilterList sx={{ fontSize:15 }} />}
            sx={{ textTransform:"none", color:T.textSoft, fontSize:13.5, fontFamily:T.font, border:`1px solid ${T.border}`, borderRadius:"10px", px:2, height:36, "&:hover":{ bgcolor:T.bg, borderColor:"#94a3b8" } }}
          >
            Filter
          </Button>
        </Box>
 
        {/* ── Tab Content ─────────────────────────────────────────────────── */}
        <Box>
          {/* Heading */}
          {activeKey !== "byCourse" && activeKey !== "byDate" && (
            <Box sx={{ display:"flex", alignItems:"center", justifyContent:"space-between", mb:2.5 }}>
              <Box>
                <Typography sx={{ fontWeight:800, fontSize:18, color:T.text, fontFamily:T.font }}>
                  {activeKey === "verified" ? "Verified Certificates" : "Earned Certificates"}
                </Typography>
                <Typography sx={{ fontSize:13, color:T.textSoft, fontFamily:T.font, mt:0.3 }}>
                  {filteredCerts.length} certificate{filteredCerts.length!==1?"s":""} · showing {Math.min(displayedCerts.length, filteredCerts.length)} of {filteredCerts.length}
                </Typography>
              </Box>
            </Box>
          )}
 
          {/* Grid or grouped */}
          {activeKey === "byCourse" ? (
            <ByCourseView certs={EARNED_CERTS} />
          ) : activeKey === "byDate" ? (
            <ByDateView certs={EARNED_CERTS} />
          ) : (
            <>
              <Box sx={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:2.5 }}>
                {displayedCerts.map(cert => <CertCard key={cert.id} cert={cert} />)}
              </Box>
 
              {filteredCerts.length > 4 && (
                <Box sx={{ textAlign:"center", mt:3 }}>
                  <Button
                    onClick={() => setShowAll(!showAll)}
                    endIcon={<KeyboardArrowDown sx={{ transform: showAll ? "rotate(180deg)" : "none", transition:"0.3s", fontSize:16 }} />}
                    sx={{ textTransform:"none", color:T.indigo, fontWeight:700, fontSize:13.5, fontFamily:T.font, border:`1.5px solid #c7d2fe`, borderRadius:"50px", px:3.5, py:1, bgcolor:"#fff", "&:hover":{ bgcolor:T.indigoLight } }}
                  >
                    {showAll ? "Show Less" : `Load ${filteredCerts.length - 4} More`}
                  </Button>
                </Box>
              )}
            </>
          )}
        </Box>
 
        {/* ── In Progress ─────────────────────────────────────────────────── */}
        <Box>
          <Typography sx={{ fontWeight:800, fontSize:18, color:T.text, fontFamily:T.font, mb:0.4 }}>Certificates In Progress</Typography>
          <Typography sx={{ fontSize:13, color:T.textSoft, fontFamily:T.font, mb:2.5 }}>Complete these courses to earn your next certificate.</Typography>
 
          <Box sx={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:2.5 }}>
            {IN_PROGRESS.map((c, i) => (
              <Box key={i} sx={{
                bgcolor:"#fff", border:`1px solid ${T.border}`, borderRadius:"16px",
                overflow:"hidden", transition:"all 0.22s ease",
                "&:hover":{ boxShadow:"0 8px 24px rgba(0,0,0,0.09)", borderColor:"#94a3b8" },
              }}>
                {/* Course image strip */}
                <Box sx={{ position:"relative", height:90, overflow:"hidden" }}>
                  <Box component="img" src={c.image} alt={c.title} sx={{ width:"100%", height:"100%", objectFit:"cover", display:"block", filter:"brightness(0.85)" }} />
                  <Box sx={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }} />
                  {/* Icon badge */}
                  <Box sx={{ position:"absolute", bottom:10, left:12, width:38, height:38, borderRadius:"9px", bgcolor:c.iconBg, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 2px 8px rgba(0,0,0,0.2)" }}>
                    <Typography sx={{ fontSize:12, fontWeight:800, color:c.iconColor, fontFamily:T.font }}>{c.icon}</Typography>
                  </Box>
                </Box>
 
                <Box sx={{ p:2 }}>
                  <Typography sx={{ fontSize:14, fontWeight:700, color:T.text, fontFamily:T.font, mb:0.2 }}>{c.title}</Typography>
                  <Typography sx={{ fontSize:12, color:T.textSoft, fontFamily:T.font, mb:1.5 }}>{c.course}</Typography>
 
                  <Box sx={{ display:"flex", justifyContent:"space-between", alignItems:"center", mb:0.8 }}>
                    <Typography sx={{ fontSize:13, fontWeight:700, color:c.color, fontFamily:T.font }}>{c.pct}% Complete</Typography>
                    <Typography sx={{ fontSize:11.5, color:T.textFaint, fontFamily:T.font }}>{c.modules}/{c.totalModules} modules</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={c.pct}
                    sx={{ height:6, borderRadius:3, bgcolor:"#f1f5f9", mb:1.8, "& .MuiLinearProgress-bar":{ bgcolor:c.color, borderRadius:3 } }} />
 
                  <Button
                    fullWidth
                    endIcon={<ArrowForward sx={{ fontSize:14 }} />}
                    sx={{
                      textTransform:"none", fontWeight:700, fontSize:13, fontFamily:T.font,
                      bgcolor:c.color, color:"#fff", borderRadius:"10px", py:0.9,
                      boxShadow:"none",
                      "&:hover":{ filter:"brightness(0.92)", boxShadow:"none" },
                    }}
                  >
                    Continue Learning
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
 
        {/* ── Benefits ────────────────────────────────────────────────────── */}
        <Box>
          <Typography sx={{ fontWeight:800, fontSize:18, color:T.text, fontFamily:T.font, mb:0.4 }}>Certificate Benefits</Typography>
          <Typography sx={{ fontSize:13, color:T.textSoft, fontFamily:T.font, mb:2.5 }}>Why your EduPlatform certificates matter.</Typography>
 
          <Box sx={{ display:"grid", gridTemplateColumns:"repeat(5, 1fr)", gap:2 }}>
            {BENEFITS.map((b, i) => (
              <Box key={i} sx={{
                bgcolor:"#fff", border:`1px solid ${T.border}`, borderRadius:"14px", p:2.5,
                textAlign:"center", transition:"all 0.22s ease", cursor:"pointer",
                "&:hover":{ boxShadow:"0 8px 24px rgba(0,0,0,0.09)", transform:"translateY(-4px)", borderColor:b.color },
              }}>
                <Box sx={{ width:52, height:52, borderRadius:"50%", bgcolor:b.bg, display:"flex", alignItems:"center", justifyContent:"center", mx:"auto", mb:1.5, fontSize:24 }}>
                  {b.emoji}
                </Box>
                <Typography sx={{ fontSize:13, fontWeight:700, color:T.text, fontFamily:T.font, mb:0.6 }}>{b.label}</Typography>
                <Typography sx={{ fontSize:11.5, color:T.textSoft, fontFamily:T.font, lineHeight:1.55 }}>{b.desc}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
 
        {/* ── Recently Earned + Share ──────────────────────────────────────── */}
        <Box sx={{ display:"grid", gridTemplateColumns:"1fr 300px", gap:2.5 }}>
 
          {/* Recently Earned table */}
          <Box sx={{ bgcolor:"#fff", border:`1px solid ${T.border}`, borderRadius:"16px", overflow:"hidden" }}>
            <Box sx={{ px:2.5, py:2.2, borderBottom:`1px solid #f1f5f9`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <Box>
                <Typography sx={{ fontWeight:700, fontSize:16, color:T.text, fontFamily:T.font }}>Recently Earned</Typography>
                <Typography sx={{ fontSize:12.5, color:T.textSoft, fontFamily:T.font, mt:0.2 }}>Your latest certificates</Typography>
              </Box>
              <Box sx={{ bgcolor:T.indigoLight, borderRadius:"8px", px:1.2, py:0.4 }}>
                <Typography sx={{ fontSize:12, fontWeight:700, color:T.indigo, fontFamily:T.font }}>{EARNED_CERTS.length} total</Typography>
              </Box>
            </Box>
 
            {/* Table header */}
            <Box sx={{ display:"grid", gridTemplateColumns:"2fr 2fr 1.4fr 1.6fr 1fr", px:2.5, py:1.3, bgcolor:"#f8fafc", borderBottom:`1px solid #f1f5f9` }}>
              {["Certificate","Course","Issued Date","Credential ID","Action"].map(h=>(
                <Typography key={h} sx={{ fontSize:11, fontWeight:700, color:T.textFaint, textTransform:"uppercase", letterSpacing:0.6, fontFamily:T.font }}>{h}</Typography>
              ))}
            </Box>
 
            {EARNED_CERTS.slice(0,5).map((r, i) => (
              <Box key={r.id}>
                <Box sx={{
                  display:"grid", gridTemplateColumns:"2fr 2fr 1.4fr 1.6fr 1fr",
                  px:2.5, py:1.8, alignItems:"center",
                  transition:"all 0.15s", "&:hover":{ bgcolor:"#f8fafc" },
                }}>
                  {/* Cert */}
                  <Box sx={{ display:"flex", alignItems:"center", gap:1.2 }}>
                    <Box sx={{
                      width:34, height:34, borderRadius:"9px", overflow:"hidden",
                      flexShrink:0, border:`1px solid ${T.border}`,
                    }}>
                      <Box component="img" src={r.image} alt={r.title} sx={{ width:"100%", height:"100%", objectFit:"cover" }} />
                    </Box>
                    <Typography sx={{ fontSize:12.5, fontWeight:600, color:T.text, fontFamily:T.font, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{r.title}</Typography>
                  </Box>
                  {/* Course */}
                  <Typography sx={{ fontSize:12, color:T.textSoft, fontFamily:T.font, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{r.course}</Typography>
                  {/* Date */}
                  <Typography sx={{ fontSize:12, color:T.textMid, fontFamily:T.font }}>{r.issued}</Typography>
                  {/* Credential */}
                  <Typography sx={{ fontSize:11.5, fontWeight:700, color:T.indigo, fontFamily:T.font, letterSpacing:0.3 }}>{r.credentialId}</Typography>
                  {/* Actions */}
                  <Box sx={{ display:"flex", alignItems:"center", gap:0.3 }}>
                    <Tooltip title="View" arrow>
                      <IconButton size="small" sx={{ width:26, height:26, color:T.textSoft, "&:hover":{ color:T.indigo, bgcolor:T.indigoLight } }}>
                        <Visibility sx={{ fontSize:14 }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Download" arrow>
                      <IconButton size="small" sx={{ width:26, height:26, color:T.textSoft, "&:hover":{ color:"#16a34a", bgcolor:"#dcfce7" } }}>
                        <Download sx={{ fontSize:14 }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Share" arrow>
                      <IconButton size="small" sx={{ width:26, height:26, color:T.textSoft, "&:hover":{ color:"#0891b2", bgcolor:"#e0f2fe" } }}>
                        <Share sx={{ fontSize:14 }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
                {i < 4 && <Divider sx={{ borderColor:"#f8fafc", mx:2.5 }} />}
              </Box>
            ))}
 
            <Box sx={{ px:2.5, py:1.8, borderTop:`1px solid #f1f5f9`, textAlign:"center" }}>
              <Button endIcon={<ArrowForward sx={{ fontSize:14 }} />}
                sx={{ textTransform:"none", color:T.indigo, fontWeight:600, fontSize:13, fontFamily:T.font, "&:hover":{ bgcolor:"transparent", textDecoration:"underline" } }}>
                View All Certificates
              </Button>
            </Box>
          </Box>
 
          {/* Share card */}
          <Box sx={{
            bgcolor:"#fff", border:`1px solid ${T.border}`, borderRadius:"16px", p:2.8,
            display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center",
            position:"relative", overflow:"hidden",
          }}>
            <Box sx={{ position:"absolute", top:-24, right:-24, width:110, height:110, borderRadius:"50%", bgcolor:"#f3e8ff", opacity:0.5 }} />
            <Box sx={{ position:"absolute", bottom:-16, left:-16, width:80, height:80, borderRadius:"50%", bgcolor:T.indigoLight, opacity:0.4 }} />
 
            <Box sx={{ position:"relative", zIndex:1, mb:2 }}>
              <Typography sx={{ fontSize:56, lineHeight:1 }}>🏆</Typography>
              <Box sx={{ position:"absolute", bottom:0, right:-8, width:26, height:26, borderRadius:"50%", bgcolor:"#a855f7", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13 }}>⭐</Box>
              <Box sx={{ position:"absolute", top:4, left:-10, width:20, height:20, borderRadius:"50%", bgcolor:T.indigo, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10 }}>✦</Box>
            </Box>
 
            <Typography sx={{ fontWeight:800, fontSize:15, color:T.text, mb:0.5, position:"relative", zIndex:1, fontFamily:T.font }}>
              Share Your Achievement
            </Typography>
            <Typography sx={{ fontSize:12.5, color:T.textSoft, mb:2.5, lineHeight:1.6, position:"relative", zIndex:1, fontFamily:T.font }}>
              Let the world know about your skills and hard-earned credentials.
            </Typography>
 
            <Button fullWidth startIcon={<LinkedIn />}
              sx={{ textTransform:"none", fontWeight:700, fontSize:13.5, fontFamily:T.font, borderRadius:"11px", py:1.1, mb:1.2, bgcolor:"#0077b5", color:"#fff", boxShadow:"none", "&:hover":{ bgcolor:"#005f8e" }, position:"relative", zIndex:1 }}>
              Share on LinkedIn
            </Button>
 
            <Button fullWidth startIcon={<Twitter />}
              sx={{ textTransform:"none", fontWeight:700, fontSize:13.5, fontFamily:T.font, borderRadius:"11px", py:1.1, mb:1.2, bgcolor:"#1da1f2", color:"#fff", boxShadow:"none", "&:hover":{ bgcolor:"#1991da" }, position:"relative", zIndex:1 }}>
              Share on Twitter
            </Button>
 
            <Button fullWidth startIcon={<FileDownload />}
              sx={{ textTransform:"none", fontWeight:700, fontSize:13.5, fontFamily:T.font, borderRadius:"11px", py:1.1, border:`1.5px solid ${T.border}`, color:T.textMid, bgcolor:"#fff", boxShadow:"none", "&:hover":{ bgcolor:T.bg, borderColor:"#94a3b8" }, position:"relative", zIndex:1 }}>
              Download All
            </Button>
          </Box>
        </Box>
 
      </Box>
    </StudentLayout>
  );
}