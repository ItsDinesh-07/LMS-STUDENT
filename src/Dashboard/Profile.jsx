import React, { useState, useRef } from "react";
import StudentLayout from "../Components/StudentLayout";
import {
  Box, Typography, Avatar, Button, Divider,
  IconButton, Tooltip, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField,
  InputAdornment, Paper, List, ListItem, ListItemText,
  ClickAwayListener, Chip,
} from "@mui/material";
import {
  Edit, CameraAlt, School, CalendarMonth, Close, Save, Search,
  Email, Phone, LocationOn, LinkedIn, GitHub, Language,
} from "@mui/icons-material";

// ── Font ──────────────────────────────────────────────────────────────────────
const FONT = "'Plus Jakarta Sans', sans-serif";

// ── Theme ─────────────────────────────────────────────────────────────────────
const T = {
  bg:          "#f8fafc",
  surface:     "#ffffff",
  heroBg:      "#f5f0ff",
  accent:      "#7c3aed",
  accentDark:  "#6d28d9",
  accentLight: "#ede9fe",
  accentMid:   "#ddd6fe",
  border:      "#e5e7eb",
  borderLight: "#f3f4f6",
  text:        "#0f172a",
  textMid:     "#334155",
  textSoft:    "#475569",
  textFaint:   "#94a3b8",
  radius:      "16px",
  radiusSm:    "10px",
  radiusXs:    "8px",
  shadow:      "0 1px 6px rgba(0,0,0,0.06), 0 2px 12px rgba(0,0,0,0.04)",
  shadowMd:    "0 4px 20px rgba(0,0,0,0.08)",
};

// ── Default data ──────────────────────────────────────────────────────────────
const DEFAULT_STUDENT = {
  name:        "George David",
  initial:     "G",
  role:        "Learner",
  department:  "Computer Science",
  bio:         "Passionate full-stack developer in the making. Currently focused on mastering React and Data Science.",
  email:       "georgedavid@learnhub.com",
  phone:       "+91 98765 43210",
  location:    "Chennai, Tamil Nadu",
  college:     "KGiSL Institute of Information Management",
  degree:      "B.Tech Computer Science",
  yearRange:   "2022 – 2026",
  currentYear: "3rd Year",
  joined:      "January 2025",
  linkedin:    "linkedin.com/in/georgedavid",
  github:      "github.com/georgedavid",
  website:     "georgedavid.dev",
};

const ALL_SKILLS = [
  "HTML & CSS","JavaScript","React","Python","SQL","Figma",
  "TypeScript","Node.js","Express.js","MongoDB","PostgreSQL",
  "Vue.js","Angular","Next.js","Tailwind CSS","Bootstrap",
  "Java","C++","Docker","AWS","Firebase","GraphQL","Git","Linux",
  "Machine Learning","Data Science","TensorFlow","Pandas","NumPy",
];

const DEFAULT_SKILLS = ["HTML & CSS","JavaScript","React","Python","SQL","Figma"];

const TABS = ["Personal Details", "Education"];

// ── Info block ────────────────────────────────────────────────────────────────
function InfoBlock({ icon, label, value }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.8, py: 2.2, px: 2 }}>
      <Box sx={{ width: 40, height: 40, borderRadius: "10px", bgcolor: T.accentLight, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {icon}
      </Box>
      <Box>
        <Typography sx={{ fontSize: 11.5, fontWeight: 600, color: T.textFaint, fontFamily: FONT, mb: 0.3, letterSpacing: 0.2 }}>
          {label}
        </Typography>
        <Typography sx={{ fontSize: 13.5, fontWeight: 600, color: T.textMid, fontFamily: FONT }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
}

// ── Tab bar ───────────────────────────────────────────────────────────────────
function TabBar({ active, onChange }) {
  return (
    <Box sx={{ display: "flex", borderBottom: `1.5px solid ${T.border}`, mb: 3 }}>
      {TABS.map((t, i) => (
        <Box key={t} onClick={() => onChange(i)}
          sx={{ px: 0.5, pb: 1.5, mr: 4, cursor: "pointer", position: "relative" }}>
          <Typography sx={{ fontSize: 14, fontWeight: active === i ? 600 : 500, fontFamily: FONT, color: active === i ? T.accent : T.textSoft, transition: "color 0.15s" }}>
            {t}
          </Typography>
          {active === i && (
            <Box sx={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2.5, bgcolor: T.accent, borderRadius: "2px 2px 0 0" }} />
          )}
        </Box>
      ))}
    </Box>
  );
}

// ── Skills section ────────────────────────────────────────────────────────────
function SkillsSection({ skills, onChange }) {
  const [query,       setQuery]       = useState("");
  const [dropOpen,    setDropOpen]    = useState(false);
  const [customSkill, setCustomSkill] = useState("");

  const filtered = ALL_SKILLS.filter(s => !skills.includes(s) && s.toLowerCase().includes(query.toLowerCase()));
  const add      = s => { if (!skills.includes(s)) onChange([...skills, s]); setQuery(""); setDropOpen(false); };
  const remove   = s => onChange(skills.filter(x => x !== s));
  const addCustom = () => {
    const t = customSkill.trim();
    if (t && !skills.includes(t)) { onChange([...skills, t]); setCustomSkill(""); }
  };

  const fSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px", fontSize: 13, bgcolor: T.bg, fontFamily: FONT,
      "& fieldset": { borderColor: T.border },
      "&:hover fieldset": { borderColor: "#9ca3af" },
      "&.Mui-focused fieldset": { borderColor: T.accent },
    },
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
      <Box>
        <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: T.textMid, fontFamily: FONT, mb: 1.2 }}>Your Skills</Typography>
        {skills.length === 0
          ? <Typography sx={{ fontSize: 13, color: T.textFaint, fontStyle: "italic", fontFamily: FONT }}>No skills added yet.</Typography>
          : (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {skills.map(s => (
                <Chip key={s} label={s} onDelete={() => remove(s)} size="small"
                  sx={{ height: 28, borderRadius: "8px", fontSize: 12.5, fontWeight: 500, fontFamily: FONT, bgcolor: T.accentLight, color: T.accent, border: `1px solid ${T.accentMid}`, "& .MuiChip-deleteIcon": { fontSize: 14, color: "#a78bfa", "&:hover": { color: "#ef4444" } } }} />
              ))}
            </Box>
          )
        }
      </Box>

      <Divider sx={{ borderColor: T.borderLight }} />

      <Box>
        <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: T.textMid, fontFamily: FONT, mb: 1 }}>Add custom skill</Typography>
        <Box sx={{ display: "flex", gap: 1.5 }}>
          <TextField placeholder="e.g. Advanced React" value={customSkill} onChange={e => setCustomSkill(e.target.value)} onKeyDown={e => e.key === "Enter" && addCustom()} fullWidth size="small" sx={fSx} />
          <Button onClick={addCustom} disabled={!customSkill.trim()} variant="outlined"
            sx={{ textTransform: "none", fontWeight: 600, fontSize: 13, fontFamily: FONT, borderColor: T.accent, color: T.accent, borderRadius: "10px", px: 2.5, flexShrink: 0, "&:hover": { bgcolor: T.accentLight }, "&.Mui-disabled": { borderColor: T.border, color: T.textFaint } }}>
            Add
          </Button>
        </Box>
      </Box>

      <Box>
        <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: T.textMid, fontFamily: FONT, mb: 1 }}>Search and select</Typography>
        <ClickAwayListener onClickAway={() => setDropOpen(false)}>
          <Box sx={{ position: "relative" }}>
            <TextField placeholder="Search skills…" value={query} size="small" fullWidth
              onChange={e => { setQuery(e.target.value); setDropOpen(true); }}
              onFocus={() => setDropOpen(true)}
              InputProps={{ endAdornment: <InputAdornment position="end"><Search sx={{ fontSize: 17, color: T.textFaint }} /></InputAdornment> }}
              sx={fSx}
            />
            {dropOpen && filtered.length > 0 && (
              <Paper elevation={4} sx={{ position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, zIndex: 1300, borderRadius: "10px", maxHeight: 200, overflowY: "auto", border: `1px solid ${T.border}`, boxShadow: "0 8px 24px rgba(0,0,0,0.10)" }}>
                <List dense disablePadding>
                  {filtered.map((s, i) => (
                    <ListItem key={s} onClick={() => add(s)} sx={{ py: 1, px: 2, cursor: "pointer", borderBottom: i < filtered.length - 1 ? `1px solid ${T.borderLight}` : "none", "&:hover": { bgcolor: T.accentLight } }}>
                      <ListItemText primary={s} primaryTypographyProps={{ fontSize: 13, fontWeight: 500, color: T.textMid, fontFamily: FONT }} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            )}
          </Box>
        </ClickAwayListener>
      </Box>
    </Box>
  );
}

// ── Edit dialog ───────────────────────────────────────────────────────────────
function EditProfileDialog({ open, onClose, student, onSave }) {
  const [form, setForm] = useState({ ...student });
  React.useEffect(() => { if (open) setForm({ ...student }); }, [open, student]);
  const f = key => e => setForm(p => ({ ...p, [key]: e.target.value }));

  const fSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px", fontSize: 13, bgcolor: T.bg, fontFamily: FONT,
      "& fieldset": { borderColor: T.border },
      "&:hover fieldset": { borderColor: "#9ca3af" },
      "&.Mui-focused fieldset": { borderColor: T.accent },
    },
    "& .MuiInputLabel-root": { fontSize: 13, color: T.textFaint, fontFamily: FONT },
    "& .MuiInputLabel-root.Mui-focused": { color: T.accent },
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: T.radius, overflow: "hidden", bgcolor: T.bg } }}>
      <DialogTitle sx={{ bgcolor: T.surface, px: 3, py: 2.5, borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography sx={{ fontSize: 16, fontWeight: 700, color: T.text, fontFamily: FONT }}>Edit Profile</Typography>
        <IconButton size="small" onClick={onClose} sx={{ color: T.textSoft, "&:hover": { bgcolor: T.borderLight } }}>
          <Close sx={{ fontSize: 18 }} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: 3, py: 3 }}>
        <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: T.accent, letterSpacing: 1, textTransform: "uppercase", fontFamily: FONT, mb: 2 }}>Personal Info</Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, mb: 3.5 }}>
          <TextField label="Full Name" value={form.name}     onChange={f("name")}     fullWidth sx={fSx} />
          <TextField label="Email"     value={form.email}    onChange={f("email")}    fullWidth sx={fSx} />
          <TextField label="Phone"     value={form.phone}    onChange={f("phone")}    fullWidth sx={fSx} />
          <TextField label="Location"  value={form.location} onChange={f("location")} fullWidth sx={fSx} />
          <TextField label="Bio"       value={form.bio}      onChange={f("bio")}      fullWidth multiline minRows={2} sx={{ ...fSx, gridColumn: "1 / -1" }} />
        </Box>

        <Divider sx={{ mb: 3.5, borderColor: T.border }} />
        <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: T.accent, letterSpacing: 1, textTransform: "uppercase", fontFamily: FONT, mb: 2 }}>Education</Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, mb: 3.5 }}>
          <TextField label="College"      value={form.college}     onChange={f("college")}     fullWidth sx={{ ...fSx, gridColumn: "1 / -1" }} />
          <TextField label="Degree"       value={form.degree}      onChange={f("degree")}      fullWidth sx={fSx} />
          <TextField label="Year"         value={form.yearRange}   onChange={f("yearRange")}   fullWidth sx={fSx} />
          <TextField label="Current Year" value={form.currentYear} onChange={f("currentYear")} fullWidth sx={fSx} />
        </Box>

        <Divider sx={{ mb: 3.5, borderColor: T.border }} />
        <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: T.accent, letterSpacing: 1, textTransform: "uppercase", fontFamily: FONT, mb: 2 }}>Social Links</Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}>
          <TextField label="LinkedIn" value={form.linkedin} onChange={f("linkedin")} fullWidth sx={fSx} InputProps={{ startAdornment: <LinkedIn sx={{ fontSize: 16, color: "#0a66c2", mr: 1 }} /> }} />
          <TextField label="GitHub"   value={form.github}   onChange={f("github")}   fullWidth sx={fSx} InputProps={{ startAdornment: <GitHub   sx={{ fontSize: 16, color: "#1f2937", mr: 1 }} /> }} />
          <TextField label="Website"  value={form.website}  onChange={f("website")}  fullWidth sx={fSx} InputProps={{ startAdornment: <Language sx={{ fontSize: 16, color: T.accent,  mr: 1 }} /> }} />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2.5, bgcolor: T.surface, borderTop: `1px solid ${T.border}`, gap: 1 }}>
        <Button onClick={onClose}
          sx={{ textTransform: "none", color: T.textSoft, fontWeight: 600, fontSize: 13, fontFamily: FONT, borderRadius: T.radiusSm, px: 2.5, "&:hover": { bgcolor: T.borderLight } }}>
          Cancel
        </Button>
        <Button onClick={() => { onSave({ ...form, initial: form.name?.trim()[0]?.toUpperCase() || student.initial }); onClose(); }}
          variant="contained" startIcon={<Save sx={{ fontSize: 15 }} />}
          sx={{ textTransform: "none", fontWeight: 700, fontSize: 13, fontFamily: FONT, bgcolor: T.accent, borderRadius: T.radiusSm, px: 3, boxShadow: "none", "&:hover": { bgcolor: T.accentDark, boxShadow: "none" } }}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Profile() {
  const [activeTab, setActiveTab] = useState(0);
  const [avatarSrc, setAvatarSrc] = useState(null);
  const [student,   setStudent]   = useState({ ...DEFAULT_STUDENT });
  const [skills,    setSkills]    = useState([...DEFAULT_SKILLS]);
  const [editOpen,  setEditOpen]  = useState(false);
  const fileRef = useRef(null);

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setAvatarSrc(ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <StudentLayout>
      <Box sx={{ flex: 1, overflowY: "auto", bgcolor: T.bg, minHeight: "100vh" }}>
        <Box sx={{ maxWidth: 1000, mx: "auto", px: 4, py: 4 }}>

          {/* ── Hero card ── */}
          <Box sx={{
            bgcolor: T.heroBg,
            border: `1px solid ${T.accentMid}`,
            borderRadius: T.radius,
            boxShadow: T.shadow,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            px: 4, py: 3.5, mb: 3, overflow: "hidden", position: "relative",
          }}>
            <Box sx={{ position: "absolute", top: -40, left: "40%", width: 160, height: 160, borderRadius: "50%", bgcolor: "rgba(124,58,237,0.06)", pointerEvents: "none" }} />
            <Box sx={{ position: "absolute", bottom: -50, left: "60%", width: 120, height: 120, borderRadius: "50%", bgcolor: "rgba(109,40,217,0.05)", pointerEvents: "none" }} />

            <Box sx={{ zIndex: 1 }}>
              <Typography sx={{ fontSize: 10.5, fontWeight: 700, color: T.accent, letterSpacing: 2, textTransform: "uppercase", fontFamily: FONT, mb: 1 }}>
                {student.role}
              </Typography>
              <Typography sx={{ fontSize: 32, fontWeight: 800, color: T.text, fontFamily: FONT, letterSpacing: -0.5, lineHeight: 1.15, mb: 0.6 }}>
                {student.name}
              </Typography>
              <Typography sx={{ fontSize: 14, color: T.textSoft, fontFamily: FONT }}>
                {student.role}&nbsp;•&nbsp;{student.department}
              </Typography>
            </Box>

            <Box sx={{ bgcolor: T.surface, borderRadius: "14px", border: `1px solid ${T.border}`, boxShadow: T.shadowMd, px: 3, py: 2.5, display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5, zIndex: 1, minWidth: 160 }}>
              <Box sx={{ position: "relative" }}>
                {avatarSrc
                  ? <Box component="img" src={avatarSrc} sx={{ width: 72, height: 72, borderRadius: "50%", objectFit: "cover", border: `3px solid ${T.accentMid}` }} />
                  : (
                    <Avatar sx={{ width: 72, height: 72, bgcolor: "#1e2972", fontSize: 26, fontWeight: 800, border: `3px solid ${T.accentMid}`, fontFamily: FONT }}>
                      {student.initial}
                    </Avatar>
                  )
                }
                <Tooltip title="Change photo" arrow>
                  <IconButton size="small" onClick={() => fileRef.current.click()}
                    sx={{ position: "absolute", bottom: 1, right: 1, width: 24, height: 24, bgcolor: T.accent, border: "2px solid #fff", boxShadow: "0 1px 4px rgba(0,0,0,0.2)", "&:hover": { bgcolor: T.accentDark } }}>
                    <CameraAlt sx={{ fontSize: 12, color: "#fff" }} />
                  </IconButton>
                </Tooltip>
                <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageChange} />
              </Box>
              <Button variant="outlined" startIcon={<Edit sx={{ fontSize: 14 }} />} onClick={() => setEditOpen(true)} size="small"
                sx={{ textTransform: "none", fontWeight: 600, fontSize: 12.5, fontFamily: FONT, borderColor: T.accent, color: T.accent, borderRadius: "9px", px: 2, py: 0.7, "&:hover": { bgcolor: T.accentLight, borderColor: T.accentDark } }}>
                Edit profile
              </Button>
            </Box>
          </Box>

          {/* ── Tabs ── */}
          <TabBar active={activeTab} onChange={setActiveTab} />

          {/* ── PERSONAL DETAILS ── */}
          {activeTab === 0 && (
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 3, alignItems: "start" }}>

              {/* Left column */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

                {/* Personal Details card */}
                <Box sx={{ bgcolor: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, boxShadow: T.shadow, overflow: "hidden" }}>
                  <Box sx={{ px: 3, py: 2, borderBottom: `1px solid ${T.borderLight}` }}>
                    <Typography sx={{ fontSize: 14.5, fontWeight: 700, color: T.text, fontFamily: FONT }}>Personal Details</Typography>
                  </Box>
                  <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                    {[
                      { icon: <Email      sx={{ fontSize: 18, color: T.accent }} />, label: "Email",     value: student.email    },
                      { icon: <Phone      sx={{ fontSize: 18, color: T.accent }} />, label: "Phone",     value: student.phone    },
                      { icon: <CalendarMonth sx={{ fontSize: 18, color: T.accent }} />, label: "Joined On", value: student.joined },
                      { icon: <LocationOn sx={{ fontSize: 18, color: T.accent }} />, label: "Location",  value: student.location },
                    ].map((item, i) => (
                      <Box key={item.label} sx={{ borderRight: i % 2 === 0 ? `1px solid ${T.borderLight}` : "none", borderBottom: i < 2 ? `1px solid ${T.borderLight}` : "none" }}>
                        <InfoBlock icon={item.icon} label={item.label} value={item.value} />
                      </Box>
                    ))}
                  </Box>
                </Box>

                {/* Skills */}
                <Box sx={{ bgcolor: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, boxShadow: T.shadow }}>
                  <Box sx={{ px: 3, py: 2, borderBottom: `1px solid ${T.borderLight}` }}>
                    <Typography sx={{ fontSize: 14.5, fontWeight: 700, color: T.text, fontFamily: FONT }}>Skills</Typography>
                  </Box>
                  <Box sx={{ px: 3, py: 2.5 }}>
                    <SkillsSection skills={skills} onChange={setSkills} />
                  </Box>
                </Box>
              </Box>

              {/* Right column */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

                {/* Social Links */}
                <Box sx={{ bgcolor: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, boxShadow: T.shadow }}>
                  <Box sx={{ px: 3, py: 2, borderBottom: `1px solid ${T.borderLight}` }}>
                    <Typography sx={{ fontSize: 14.5, fontWeight: 700, color: T.text, fontFamily: FONT }}>Social Links</Typography>
                  </Box>
                  <Box sx={{ px: 3, py: 2.5, display: "flex", flexDirection: "column", gap: 0 }}>
                    {[
                      { icon: <LinkedIn sx={{ fontSize: 17, color: "#0a66c2" }} />, label: "LinkedIn", value: student.linkedin },
                      { icon: <GitHub   sx={{ fontSize: 17, color: "#1f2937" }} />, label: "GitHub",   value: student.github   },
                      { icon: <Language sx={{ fontSize: 17, color: T.accent  }} />, label: "Website",  value: student.website  },
                    ].map((item, i, arr) => (
                      <Box key={item.label}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 1.4, cursor: "pointer", borderRadius: T.radiusXs, px: 0.5, transition: "background 0.15s", "&:hover": { bgcolor: T.bg } }}>
                          <Box sx={{ width: 32, height: 32, borderRadius: "8px", bgcolor: T.bg, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            {item.icon}
                          </Box>
                          <Box sx={{ minWidth: 0 }}>
                            <Typography sx={{ fontSize: 11, fontWeight: 600, color: T.textFaint, fontFamily: FONT, letterSpacing: 0.3, textTransform: "uppercase" }}>{item.label}</Typography>
                            <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: T.textMid, fontFamily: FONT, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.value}</Typography>
                          </Box>
                        </Box>
                        {i < arr.length - 1 && <Divider sx={{ borderColor: T.borderLight }} />}
                      </Box>
                    ))}
                  </Box>
                </Box>

                {/* About */}
                <Box sx={{ bgcolor: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, boxShadow: T.shadow }}>
                  <Box sx={{ px: 3, py: 2, borderBottom: `1px solid ${T.borderLight}` }}>
                    <Typography sx={{ fontSize: 14.5, fontWeight: 700, color: T.text, fontFamily: FONT }}>About</Typography>
                  </Box>
                  <Box sx={{ px: 3, py: 2.5, display: "flex", flexDirection: "column", gap: 0 }}>
                    {[
                      { label: "Full name", value: student.name     },
                      { label: "Phone",     value: student.phone    },
                      { label: "Location",  value: student.location },
                      { label: "College",   value: student.college  },
                      { label: "Joined",    value: student.joined   },
                    ].map((item, i, arr) => (
                      <Box key={item.label}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", py: 1.5 }}>
                          <Typography sx={{ fontSize: 12.5, color: T.textFaint, fontWeight: 500, fontFamily: FONT, flexShrink: 0, mr: 1 }}>{item.label}</Typography>
                          <Typography sx={{ fontSize: 12.5, color: T.textMid, fontWeight: 600, fontFamily: FONT, textAlign: "right" }}>{item.value}</Typography>
                        </Box>
                        {i < arr.length - 1 && <Divider sx={{ borderColor: T.borderLight }} />}
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>
          )}

          {/* ── EDUCATION TAB ── */}
          {activeTab === 1 && (
            <Box sx={{ maxWidth: 680 }}>
              <Box sx={{ bgcolor: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, boxShadow: T.shadow }}>
                <Box sx={{ px: 3, py: 2, borderBottom: `1px solid ${T.borderLight}` }}>
                  <Typography sx={{ fontSize: 14.5, fontWeight: 700, color: T.text, fontFamily: FONT }}>Education</Typography>
                </Box>
                <Box sx={{ px: 3, py: 3 }}>
                  <Box sx={{ display: "flex", gap: 2.5, alignItems: "flex-start" }}>
                    <Box sx={{ width: 46, height: 46, borderRadius: "12px", bgcolor: T.accentLight, border: `1px solid ${T.accentMid}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <School sx={{ fontSize: 22, color: T.accent }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ fontSize: 15.5, fontWeight: 700, color: T.text, fontFamily: FONT, mb: 0.4 }}>{student.college}</Typography>
                      <Typography sx={{ fontSize: 13.5, color: T.textMid, fontFamily: FONT, mb: 1.5 }}>{student.degree}</Typography>
                      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                          <CalendarMonth sx={{ fontSize: 14, color: T.textFaint }} />
                          <Typography sx={{ fontSize: 13, color: T.textSoft, fontFamily: FONT }}>{student.yearRange}</Typography>
                        </Box>
                        <Box sx={{ bgcolor: T.accentLight, border: `1px solid ${T.accentMid}`, borderRadius: "7px", px: 1.3, py: 0.3 }}>
                          <Typography sx={{ fontSize: 12, fontWeight: 600, color: T.accent, fontFamily: FONT }}>{student.currentYear}</Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}

        </Box>
      </Box>

      {/* Edit dialog */}
      <EditProfileDialog open={editOpen} onClose={() => setEditOpen(false)} student={student} onSave={setStudent} />
    </StudentLayout>
  );
}

