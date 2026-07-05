import React, { useState } from "react";
import StudentLayout from "../Components/StudentLayout";
import {
  Box, Typography, Button, Chip, IconButton,
  Menu, MenuItem, Divider, InputBase, Tooltip,
} from "@mui/material";
import {
  Search, Download, MoreHoriz, PictureAsPdf,
  VideoLibrary, MenuBook, Code, Slideshow,
  FolderZip, Description, FilterList,
} from "@mui/icons-material";

// ─── Theme ────────────────────────────────────────────────────────────────────
const T = {
  indigo:      "#4f46e5",
  indigoDark:  "#4338ca",
  indigoLight: "#eef2ff",
  border:      "#e2e8f0",
  bg:          "#f8fafc",
  text:        "#0f172a",
  textMid:     "#475569",
  textSoft:    "#64748b",
  textFaint:   "#94a3b8",
};

// ─── Tab definitions ──────────────────────────────────────────────────────────
const TABS = ["All", "Documents", "Videos", "Readings", "Code", "Slides", "Others"];

// ─── File type config ─────────────────────────────────────────────────────────
const TYPE_CONFIG = {
  Document: { bg: "#dbeafe", color: "#1d4ed8", icon: <PictureAsPdf sx={{ fontSize: 22, color: "#1d4ed8" }} />,  label: "Document" },
  Video:    { bg: "#dcfce7", color: "#15803d", icon: <VideoLibrary  sx={{ fontSize: 22, color: "#16a34a" }} />,  label: "Video"    },
  Reading:  { bg: "#fef9c3", color: "#b45309", icon: <MenuBook      sx={{ fontSize: 22, color: "#b45309" }} />,  label: "Reading"  },
  Code:     { bg: "#f3e8ff", color: "#7c3aed", icon: <Code          sx={{ fontSize: 22, color: "#7c3aed" }} />,  label: "Code"     },
  Slides:   { bg: "#ffedd5", color: "#c2410c", icon: <Slideshow     sx={{ fontSize: 22, color: "#ea580c" }} />,  label: "Slides"   },
  Others:   { bg: "#f1f5f9", color: "#475569", icon: <FolderZip     sx={{ fontSize: 22, color: "#64748b" }} />,  label: "Others"   },
};

// ─── Resource data ────────────────────────────────────────────────────────────
const ALL_RESOURCES = [
  { id: 1, name: "Technical Support Fundamentals - Guide",  desc: "Comprehensive guide covering IT support fundamentals and troubleshooting",    type: "Document", size: "2.4 MB",  addedOn: "May 20, 2025" },
  { id: 2, name: "Program Introduction - Video",            desc: "Introduction video for the Google IT Support Professional Certificate program", type: "Video",    size: "45.6 MB", addedOn: "May 18, 2025" },
  { id: 3, name: "Networking Basics - Reading Material",    desc: "Essential reading on computer networking concepts and protocols",              type: "Reading",  size: "1.2 MB",  addedOn: "May 15, 2025" },
  { id: 4, name: "Sample Code - Python Basics",             desc: "Python starter scripts covering variables, loops, and functions",              type: "Code",     size: "320 KB",  addedOn: "May 12, 2025" },
  { id: 5, name: "System Architecture - Slides",            desc: "Presentation slides on system design and IT infrastructure architecture",       type: "Slides",   size: "3.8 MB",  addedOn: "May 10, 2025" },
  { id: 6, name: "Reference Materials - ZIP",               desc: "Bundled reference documents, cheatsheets, and supplementary PDFs",             type: "Others",   size: "12.6 MB", addedOn: "May 08, 2025" },
  { id: 7, name: "Operating Systems - Lecture Notes",       desc: "Detailed notes on OS concepts: processes, memory, and file systems",            type: "Document", size: "1.8 MB",  addedOn: "May 06, 2025" },
  { id: 8, name: "DNS & HTTP - Explainer Video",            desc: "Short explainer on how DNS resolution and HTTP requests work",                  type: "Video",    size: "28.3 MB", addedOn: "May 04, 2025" },
];

// ─── Animated SVG Illustration ────────────────────────────────────────────────
function ResourcesIllustration() {
  return (
    <Box
      sx={{
        flexShrink: 0,
        mt: -1,
        // overall gentle float
        animation: "floatScene 5s ease-in-out infinite",
        "@keyframes floatScene": {
          "0%,100%": { transform: "translateY(0px)"  },
          "50%":     { transform: "translateY(-8px)" },
        },
      }}
    >
      <svg
        width="260"
        height="120"
        viewBox="0 0 260 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── Shelf ── */}
        <rect x="18" y="136" width="224" height="8" rx="4" fill="#e0e7ff" />

        {/* ── Shadow under shelf ── */}
        <ellipse cx="130" cy="148" rx="80" ry="5" fill="#e0e7ff" opacity="0.4" />

        {/* ── Book 1 — tall indigo ── */}
        <rect x="28" y="70" width="28" height="66" rx="3" fill="#4f46e5" />
        <rect x="30" y="70" width="5"  height="66" rx="2" fill="#818cf8" opacity="0.45" />
        <rect x="32" y="88" width="18" height="3"  rx="1" fill="#c7d2fe" opacity="0.8" />
        <rect x="32" y="94" width="14" height="3"  rx="1" fill="#c7d2fe" opacity="0.55" />
        <rect x="32" y="100" width="16" height="3" rx="1" fill="#c7d2fe" opacity="0.4" />

        {/* ── Book 2 — short purple ── */}
        <rect x="58" y="94" width="24" height="42" rx="3" fill="#7c3aed" />
        <rect x="60" y="94" width="5"  height="42" rx="2" fill="#a78bfa" opacity="0.45" />
        <rect x="62" y="108" width="14" height="3" rx="1" fill="#ede9fe" opacity="0.8" />
        <rect x="62" y="114" width="10" height="3" rx="1" fill="#ede9fe" opacity="0.55" />

        {/* ── Book 3 — medium teal ── */}
        <rect x="84" y="82" width="26" height="54" rx="3" fill="#0891b2" />
        <rect x="86" y="82" width="5"  height="54" rx="2" fill="#67e8f9" opacity="0.35" />
        <rect x="88" y="100" width="16" height="3" rx="1" fill="#cffafe" opacity="0.8" />
        <rect x="88" y="106" width="12" height="3" rx="1" fill="#cffafe" opacity="0.55" />
        <rect x="88" y="112" width="14" height="3" rx="1" fill="#cffafe" opacity="0.4" />

        {/* ── Book 4 — wide green ── */}
        <rect x="112" y="78" width="32" height="58" rx="3" fill="#16a34a" />
        <rect x="114" y="78" width="6"  height="58" rx="2" fill="#86efac" opacity="0.35" />
        <rect x="117" y="98" width="20" height="3"  rx="1" fill="#dcfce7" opacity="0.8" />
        <rect x="117" y="104" width="16" height="3" rx="1" fill="#dcfce7" opacity="0.55" />

        {/* ── Book 5 — orange ── */}
        <rect x="146" y="90" width="22" height="46" rx="3" fill="#ea580c" />
        <rect x="148" y="90" width="5"  height="46" rx="2" fill="#fed7aa" opacity="0.4" />
        <rect x="150" y="106" width="14" height="3" rx="1" fill="#ffedd5" opacity="0.8" />
        <rect x="150" y="112" width="10" height="3" rx="1" fill="#ffedd5" opacity="0.55" />

        {/* ── Book 6 — slim slate ── */}
        <rect x="170" y="98" width="16" height="38" rx="3" fill="#64748b" />
        <rect x="172" y="98" width="4"  height="38" rx="2" fill="#cbd5e1" opacity="0.4" />
        <rect x="173" y="112" width="9" height="2.5" rx="1" fill="#f1f5f9" opacity="0.6" />

        {/* ── Book 7 — rose ── */}
        <rect x="188" y="86" width="20" height="50" rx="3" fill="#e11d48" />
        <rect x="190" y="86" width="4"  height="50" rx="2" fill="#fda4af" opacity="0.4" />
        <rect x="191" y="104" width="12" height="2.5" rx="1" fill="#ffe4e6" opacity="0.8" />
        <rect x="191" y="110" width="9"  height="2.5" rx="1" fill="#ffe4e6" opacity="0.55" />

        {/* ── Floating doc card (top-right) ── */}
        <g style={{ animation: "cardBob 3.8s ease-in-out infinite", transformOrigin: "205px 46px" }}>
          <style>{`@keyframes cardBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}`}</style>
          <rect x="166" y="16" width="74" height="52" rx="8" fill="#fff" stroke="#e0e7ff" strokeWidth="1.5"
            filter="url(#cardShadow)" />
          {/* card lines */}
          <rect x="176" y="26" width="28" height="4"  rx="2" fill="#4f46e5" opacity="0.8" />
          <rect x="176" y="34" width="44" height="3"  rx="1.5" fill="#e2e8f0" />
          <rect x="176" y="40" width="36" height="3"  rx="1.5" fill="#e2e8f0" />
          <rect x="176" y="46" width="28" height="3"  rx="1.5" fill="#e2e8f0" />
          {/* download circle */}
          <circle cx="225" cy="28" r="9" fill="#eef2ff" />
          <path d="M225 24v8M222 29l3 4 3-4" stroke="#4f46e5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* ── Floating dot — purple (top-left area) ── */}
        <circle cx="14" cy="42" r="5" fill="#a78bfa" opacity="0.75">
          <animate attributeName="opacity" values="0.75;0.35;0.75" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="cy" values="42;38;42" dur="2.4s" repeatCount="indefinite" />
        </circle>

        {/* ── Floating dot — yellow ── */}
        <circle cx="146" cy="22" r="4" fill="#fbbf24" opacity="0.85">
          <animate attributeName="opacity" values="0.85;0.45;0.85" dur="3s" begin="0.6s" repeatCount="indefinite" />
          <animate attributeName="cy" values="22;17;22" dur="3s" begin="0.6s" repeatCount="indefinite" />
        </circle>

        {/* ── Floating dot — indigo small ── */}
        <circle cx="244" cy="78" r="3.5" fill="#4f46e5" opacity="0.6">
          <animate attributeName="opacity" values="0.6;0.25;0.6" dur="2.8s" begin="1.1s" repeatCount="indefinite" />
          <animate attributeName="cy" values="78;73;78" dur="2.8s" begin="1.1s" repeatCount="indefinite" />
        </circle>

        {/* ── Floating dot — rose tiny ── */}
        <circle cx="52" cy="54" r="3" fill="#fb7185" opacity="0.65">
          <animate attributeName="opacity" values="0.65;0.3;0.65" dur="3.2s" begin="0.3s" repeatCount="indefinite" />
          <animate attributeName="cy" values="54;49;54" dur="3.2s" begin="0.3s" repeatCount="indefinite" />
        </circle>

        {/* ── Drop shadow filter ── */}
        <defs>
          <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#4f46e5" floodOpacity="0.12" />
          </filter>
        </defs>
      </svg>
    </Box>
  );
}

// ─── Kebab menu ───────────────────────────────────────────────────────────────
function RowMenu() {
  const [anchor, setAnchor] = useState(null);
  return (
    <>
      <IconButton size="small" onClick={(e) => { e.stopPropagation(); setAnchor(e.currentTarget); }}
        sx={{ color: T.textSoft, width: 30, height: 30, "&:hover": { bgcolor: "#f1f5f9" } }}>
        <MoreHoriz sx={{ fontSize: 19 }} />
      </IconButton>
      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}
        PaperProps={{ elevation: 3, sx: { borderRadius: "10px", minWidth: 160, border: `1px solid ${T.border}` } }}>
        <MenuItem onClick={() => setAnchor(null)} sx={{ fontSize: 13, color: T.textMid, gap: 1.2 }}>
          <Download sx={{ fontSize: 16 }} /> Download
        </MenuItem>
        <MenuItem onClick={() => setAnchor(null)} sx={{ fontSize: 13, color: T.textMid }}>View details</MenuItem>
        <MenuItem onClick={() => setAnchor(null)} sx={{ fontSize: 13, color: T.textMid }}>Share link</MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={() => setAnchor(null)} sx={{ fontSize: 13, color: "#dc2626" }}>Remove</MenuItem>
      </Menu>
    </>
  );
}

// ─── Pagination button ────────────────────────────────────────────────────────
function PageBtn({ label, active, onClick, disabled }) {
  return (
    <Box
      onClick={!disabled ? onClick : undefined}
      sx={{
        minWidth: 34, height: 34, px: 1,
        display: "flex", alignItems: "center", justifyContent: "center",
        borderRadius: "8px",
        border: `1px solid ${active ? T.indigo : T.border}`,
        bgcolor: active ? T.indigo : "#fff",
        color: active ? "#fff" : disabled ? T.textFaint : T.textMid,
        fontSize: 13.5, fontWeight: active ? 700 : 500,
        fontFamily: "'Inter', sans-serif",
        cursor: disabled ? "default" : "pointer",
        transition: "all 0.15s",
        "&:hover": !disabled && !active ? { bgcolor: T.indigoLight, borderColor: T.indigo, color: T.indigo } : {},
      }}
    >
      {label}
    </Box>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Resources() {
  const [activeTab, setActiveTab]     = useState(0);
  const [search, setSearch]           = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const ROWS_PER_PAGE   = 6;
  const TOTAL_RESOURCES = 278;

  const tabType  = TABS[activeTab];
  const filtered = ALL_RESOURCES.filter((r) => {
    const matchTab    = tabType === "All" || r.type === tabType;
    const matchSearch = !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.desc.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const displayed   = filtered.slice(0, ROWS_PER_PAGE);
  const totalPages  = 47;
  const startRow    = (currentPage - 1) * ROWS_PER_PAGE + 1;
  const endRow      = Math.min(currentPage * ROWS_PER_PAGE, TOTAL_RESOURCES);

  return (
    <StudentLayout title="Resources">
      <Box sx={{ bgcolor: T.bg, minHeight: "100vh", p: 3 }}>

        {/* ── Page header ── */}
        <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", mb: 3 }}>
          <Box>
            <Typography sx={{ fontSize: 27, fontWeight: 800, color: T.text, letterSpacing: -0.3, fontFamily: "'Inter', sans-serif", mb: 0.4 }}>
              Resources
            </Typography>
            <Typography sx={{ fontSize: 14, color: T.textSoft, fontFamily: "'Inter', sans-serif" }}>
              Access study materials, documents, videos, and more to support your learning.
            </Typography>
          </Box>

          {/* ── Animated SVG illustration (larger + animated) ── */}
          <ResourcesIllustration />
        </Box>

        {/* ── Main card ── */}
        <Box sx={{ bgcolor: "#fff", borderRadius: "16px", border: `1px solid ${T.border}`, boxShadow: "0 2px 16px rgba(15,23,42,0.06)", overflow: "hidden" }}>

          {/* ── Top bar: tabs + search ── */}
          <Box sx={{ px: 3, pt: 2.5, pb: 0, borderBottom: `1.5px solid ${T.border}` }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, bgcolor: T.bg, border: `1px solid ${T.border}`, borderRadius: "50px", px: 1.8, height: 38, width: 280, "&:focus-within": { borderColor: T.indigo, boxShadow: "0 0 0 3px rgba(79,70,229,0.08)" } }}>
                <Search sx={{ fontSize: 17, color: T.textFaint, flexShrink: 0 }} />
                <InputBase
                  placeholder="Search resources..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                  sx={{ flex: 1, fontSize: 13.5, color: T.text, fontFamily: "'Inter', sans-serif", "& input::placeholder": { color: T.textFaint } }}
                />
              </Box>
              <Button startIcon={<FilterList sx={{ fontSize: 16 }} />}
                sx={{ textTransform: "none", fontWeight: 600, fontSize: 13.5, fontFamily: "'Inter', sans-serif", color: T.textMid, borderRadius: "50px", border: `1px solid ${T.border}`, px: 2, height: 38, bgcolor: "#fff", "&:hover": { bgcolor: T.bg, borderColor: "#94a3b8" } }}>
                Filter
              </Button>
            </Box>

            <Box sx={{ display: "flex", gap: 0 }}>
              {TABS.map((tab, i) => (
                <Box key={tab} onClick={() => { setActiveTab(i); setCurrentPage(1); }}
                  sx={{ px: 2.2, py: 1.2, cursor: "pointer", position: "relative", fontSize: 14, fontWeight: activeTab === i ? 700 : 500, fontFamily: "'Inter', sans-serif", color: activeTab === i ? T.indigo : T.textSoft, transition: "color 0.15s", "&:hover": { color: T.indigo }, "&::after": { content: '""', position: "absolute", bottom: -1.5, left: 0, right: 0, height: 2.5, bgcolor: activeTab === i ? T.indigo : "transparent", borderRadius: "2px 2px 0 0", transition: "background 0.18s" } }}>
                  {tab}
                </Box>
              ))}
            </Box>
          </Box>

          {/* ── Table header ── */}
          <Box sx={{ display: "grid", gridTemplateColumns: "2fr 120px 90px 130px 100px", px: 3, py: 1.4, bgcolor: "#f8fafc", borderBottom: `1px solid ${T.border}` }}>
            {["Resource Name", "Type", "Size", "Added On", "Actions"].map(h => (
              <Typography key={h} sx={{ fontSize: 11.5, fontWeight: 700, color: T.textFaint, letterSpacing: 0.6, textTransform: "uppercase", fontFamily: "'Inter', sans-serif" }}>{h}</Typography>
            ))}
          </Box>

          {/* ── Table rows ── */}
          {displayed.length === 0 ? (
            <Box sx={{ py: 10, textAlign: "center" }}>
              <Typography sx={{ fontSize: 15, fontWeight: 700, color: T.text, mb: 0.5, fontFamily: "'Inter', sans-serif" }}>No resources found</Typography>
              <Typography sx={{ fontSize: 13, color: T.textSoft, fontFamily: "'Inter', sans-serif" }}>Try adjusting your search or tab filter.</Typography>
            </Box>
          ) : (
            displayed.map((r, idx) => {
              const tc = TYPE_CONFIG[r.type] || TYPE_CONFIG["Others"];
              return (
                <Box key={r.id}>
                  <Box sx={{ display: "grid", gridTemplateColumns: "2fr 120px 90px 130px 100px", alignItems: "center", px: 3, py: 1.8, transition: "background 0.15s", "&:hover": { bgcolor: "#fafbff" } }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.8, minWidth: 0 }}>
                      <Box sx={{ width: 42, height: 42, borderRadius: "10px", bgcolor: tc.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{tc.icon}</Box>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography sx={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: "'Inter', sans-serif", lineHeight: 1.35, mb: 0.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.name}</Typography>
                        <Typography sx={{ fontSize: 12, color: T.textSoft, fontFamily: "'Inter', sans-serif", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.desc}</Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Box sx={{ display: "inline-flex", alignItems: "center", bgcolor: tc.bg, borderRadius: "6px", px: 1.2, py: 0.4 }}>
                        <Typography sx={{ fontSize: 12, fontWeight: 700, color: tc.color, fontFamily: "'Inter', sans-serif" }}>{r.type}</Typography>
                      </Box>
                    </Box>
                    <Typography sx={{ fontSize: 13, color: T.textMid, fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>{r.size}</Typography>
                    <Typography sx={{ fontSize: 13, color: T.textMid, fontFamily: "'Inter', sans-serif" }}>{r.addedOn}</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      <Tooltip title="Download" arrow>
                        <IconButton size="small" sx={{ width: 30, height: 30, color: T.indigo, "&:hover": { bgcolor: T.indigoLight } }}>
                          <Download sx={{ fontSize: 17 }} />
                        </IconButton>
                      </Tooltip>
                      <RowMenu />
                    </Box>
                  </Box>
                  {idx < displayed.length - 1 && <Divider sx={{ borderColor: "#f1f5f9", mx: 3 }} />}
                </Box>
              );
            })
          )}

          {/* ── Pagination ── */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 3, py: 2, borderTop: `1px solid ${T.border}` }}>
            <Typography sx={{ fontSize: 13.5, color: T.textSoft, fontFamily: "'Inter', sans-serif" }}>
              Showing <Box component="span" sx={{ fontWeight: 700, color: T.text }}>{startRow}</Box> to <Box component="span" sx={{ fontWeight: 700, color: T.text }}>{endRow}</Box> of <Box component="span" sx={{ fontWeight: 700, color: T.text }}>{TOTAL_RESOURCES}</Box> resources
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.7 }}>
              <PageBtn label="← Prev"   disabled={currentPage === 1}          onClick={() => setCurrentPage(p => p - 1)} />
              {[1, 2, 3].map(p => <PageBtn key={p} label={p} active={currentPage === p} onClick={() => setCurrentPage(p)} />)}
              <Box sx={{ px: 0.5, color: T.textFaint, fontSize: 14, fontFamily: "'Inter', sans-serif" }}>…</Box>
              <PageBtn label={totalPages} active={currentPage === totalPages}  onClick={() => setCurrentPage(totalPages)} />
              <PageBtn label="Next →"   disabled={currentPage === totalPages}  onClick={() => setCurrentPage(p => p + 1)} />
            </Box>
          </Box>

        </Box>
      </Box>
    </StudentLayout>
  );
}
