import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  Box, Typography, IconButton, List, ListItem,
  ListItemButton, ListItemIcon, Tooltip,
  Dialog, DialogContent, Button, Stack,
} from "@mui/material";
import {
  Menu, Dashboard, MenuBook, Assignment, EmojiEvents,
  Person, Help, Logout, Psychology, Explore,
  LocalOffer, Error, ChevronRight,  AutoAwesome,
  GridView, AutoStories, Task, CardMembership,
  ManageAccounts, SmartToy, Storefront, Sell,
  SupportAgent,
} from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";

const SIDE_FONT = "'Mulish', Arial, sans-serif";
// ─── Nav items ────────────────────────────────────────────────────────────────
const INSTITUTE_NAV = [
  { label: "Dashboard",    icon: GridView,        path: "/student" },
  { label: "My Courses",   icon: AutoStories,     path: "/mycourses" },
  { label: "Assignments",  icon: Task,            path: "/assignments" },
  { label: "Certificates", icon: CardMembership,  path: "/certificates" },
  { label: "Profile",      icon: ManageAccounts,  path: "/profile" },
  { label: "AI Interview", icon: SmartToy,        path: "/aiinterview"},
];

const DIRECT_NAV = [
  { label: "Dashboard",      icon: GridView,       path: "/student" },
  { label: "Explore Courses",icon: Storefront,     path: "/explore", },
  { label: "My Courses",     icon: AutoStories,    path: "/mycourses" },
 
  { label: "Assignments",    icon: Task,           path: "/assignments" },
  { label: "Certificates",   icon: CardMembership, path: "/certificates" },
  { label: "Profile",        icon: ManageAccounts, path: "/profile" },
  { label: "AI Interview",   icon: AutoAwesome,       path: "/aiinterview", },
];

// ─── Icon wrapper — renders MUI icon component ────────────────────────────────
function NavIcon({ IconComponent, color }) {
  return <IconComponent sx={{ fontSize: 20, color }} />;
}

export default function Sidebar() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { user, logout } = useAuth();

  const [logoutOpen,   setLogoutOpen]   = useState(false);
  const [sidebarOpen,  setSidebarOpen]  = useState(() => {
    try { const s = localStorage.getItem("sidebarOpen"); return s !== null ? JSON.parse(s) : true; }
    catch { return true; }
  });

  const NAV_ITEMS = user?.role === "direct" ? DIRECT_NAV : INSTITUTE_NAV;

  const toggleSidebar = (e) => {
    e.stopPropagation();
    setSidebarOpen(prev => {
      const next = !prev;
      localStorage.setItem("sidebarOpen", JSON.stringify(next));
      return next;
    });
  };

  const handleNav = (e, path) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(path);
  };

  const handleLogout = () => {
    setLogoutOpen(false);
    logout();
    navigate("/login");
  };

  return (
    <>
      <Box sx={{
        width: sidebarOpen ? 250 : 72,
        minWidth: sidebarOpen ? 250 : 72,
        bgcolor:  "#0f172a",
        display:  "flex",
        flexDirection: "column",
        height:   "100vh",
        transition:
        "width 0.40s cubic-bezier(0.22, 1, 0.36, 1), min-width 0.40s cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: "width, min-width",
        overflow: "hidden",
        borderRight: "1px solid #1e293b",
        flexShrink: 0,
      }}>

        {/* ── Logo row ── */}
        <Box sx={{
          display: "flex", alignItems: "center",
          justifyContent: sidebarOpen ? "space-between" : "center",
          px: sidebarOpen ? 3 : 1.5,
          py: 2.4,
          minHeight: 72,
          transition: "all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1)",
        }}>
          {sidebarOpen && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.4 }}>
              <Box sx={{ bgcolor: "#4f46e5", borderRadius: "10px", p: 0.85, display: "flex", flexShrink: 0, boxShadow: "0 2px 8px rgba(79,70,229,0.5)" }}>
                <MenuBook sx={{ color: "#fff", fontSize: 20 }} />
              </Box>
              <Typography sx={{ color: "#fff", fontWeight: 800, fontSize: 17, letterSpacing: "0.2px", whiteSpace: "nowrap", fontFamily: SIDE_FONT }}>
                EduPlatform
              </Typography>
            </Box>
          )}
          {/* Always Menu icon — no X */}
          <IconButton
            size="small"
            onClick={toggleSidebar}
            sx={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              color: "#94a3b8",
              flexShrink: 0,
              transition: "all 0.28s cubic-bezier(0.22, 1, 0.36, 1)",
              "&:hover": {
                color: "#fff",
                bgcolor: "#1e293b",
                transform: "scale(1.06)",
              },
            }}
          >
            <Menu fontSize="small" />
          </IconButton>
        </Box>

        {/* ── Section label ── */}
        {sidebarOpen && (
          <Box sx={{ px: 4.5, pt: 1, pb: 1.2, }}>
            <Typography sx={{
              fontSize: 10.5, fontWeight: 800, color: "#475569",
              letterSpacing: "1.2px", textTransform: "uppercase", fontFamily: SIDE_FONT,
            }}>
              Dashboard &amp; Panels
            </Typography>
          </Box>
        )}

        {/* ── Nav list ── */}
        <List dense sx={{ px: sidebarOpen ? 1.8 : 1, mt: sidebarOpen ? 0.5 : 2,ml:1, flex: 1, overflowY: "auto",transition: "all 0.35s ease",
          "&::-webkit-scrollbar": { width: 4 },
          "&::-webkit-scrollbar-track": { bgcolor: "transparent" },
          "&::-webkit-scrollbar-thumb": { bgcolor: "#1e293b", borderRadius: 2 },
        }}>
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            const IconComp = item.icon;

            // Color logic
            const iconColor = isActive
              ? "#818cf8"
              : item.isAI   ? "#c4b5fd"
              : item.isNew  ? "#34d399"
              : "#4f72a6";        // muted blue for default — matches dashlite style

            return (
              <Tooltip key={item.label} title={!sidebarOpen ? item.label : ""} placement="right" arrow>
                <ListItem disablePadding sx={{ display: "block", mb: 0.5 }}>
                  <ListItemButton
                    onClick={(e) => handleNav(e, item.path)}
                    sx={{
                      borderRadius: "10px",
                      py: 1.35,
                      px: sidebarOpen ? 1.2 : 1,
                      justifyContent: sidebarOpen ? "flex-start" : "center",
                      background: isActive && item.isAI
                        ? "linear-gradient(135deg, #4f46e5, #7c3aed)"
                        : isActive
                        ? "rgba(79,70,229,0.14)"
                        : "transparent",
                      borderLeft: isActive && !item.isAI
                        ? "3px solid #4f46e5"
                        : "3px solid transparent",
                      borderRadius: isActive && !item.isAI
                        ? "0px 10px 10px 0px"
                        : "10px",
                      // Hover: increase opacity of text/icon
                      "&:hover": {
                        background: item.isAI
                          ? "linear-gradient(135deg, #4338ca, #6d28d9)"
                          : isActive
                          ? "rgba(79,70,229,0.2)"
                          : "rgba(255,255,255,0.05)",
                        "& .nav-text":  { color: "#fff", opacity: 1 },
                        "& .nav-icon":  { color: "#818cf8", opacity: 1 },
                        "& .nav-arrow": { opacity: 1 },
                      },
                     color: isActive ? "#ffffff" : "#7d8aa5",
                      minWidth: 0,
                      transition: "all 0.18s ease",
                    }}
                  >
                    {/* Icon */}
                    <ListItemIcon sx={{ minWidth: sidebarOpen ? 22 : 0, justifyContent: "center", pointerEvents: "none" , mr :0.5, }}>
                      <IconComp
                        className="nav-icon"
                        sx={{
                          fontSize: 21,
                          color: iconColor,
                          opacity: isActive ? 1 : 0.65,
                          transition: "opacity 0.18s, color 0.18s",
                        }}
                      />
                    </ListItemIcon>

                    {sidebarOpen && (
                      <>
                        {/* Label */}
                        <Typography
                          className="nav-text"
                          sx={{
                            fontSize: 14.5,
                            fontWeight: isActive ? 700 : 600,
                            color: isActive ? "#ffffff" : "#7d8aa5",
                            opacity: isActive ? 1 : 0.82,
                            whiteSpace: "nowrap",
                            letterSpacing: "0px",
                            lineHeight: "24px",
                            fontFamily: SIDE_FONT,
                            ml: 3,
                            flex: 1,
                            pointerEvents: "none",
                            transition: "opacity 0.18s, color 0.18s",
                          }}
                        >
                          {item.label}
                        </Typography>

                        {/* Badges */}
                        {item.isAI && (
                          <Box sx={{ bgcolor: "rgba(168,85,247,0.25)", border: "1px solid rgba(168,85,247,0.5)", borderRadius: "6px", px: 0.9, py: 0.2, flexShrink: 0, mr: 0.5 }}>
                            <Typography sx={{ fontSize: 9, fontWeight: 800, color: "#d8b4fe", letterSpacing: 0.6 }}>NEW</Typography>
                          </Box>
                        )}

                        {/* Chevron arrow (dashlite style) */}
                        <ChevronRight
                          className="nav-arrow"
                          sx={{
                            fontSize: 16,
                            color: "#475569",
                            opacity: 0,
                            transition: "opacity 0.18s",
                            flexShrink: 0,
                          }}
                        />
                      </>
                    )}
                  </ListItemButton>
                </ListItem>
              </Tooltip>
            );
          })}
        </List>

        {/* ── Bottom: Help + Logout ── */}
        <Box sx={{ px: sidebarOpen ? 1.8 : 1, pb: 3, borderTop: "1px solid #1e293b", pt: 2 }}>

          {/* Help */}
          <Tooltip title={!sidebarOpen ? "Help & Support" : ""} placement="right" arrow>
            <ListItem disablePadding sx={{ display: "block", mb: 0.5 }}>
              <ListItemButton
                onClick={(e) => e.stopPropagation()}
                sx={{
                  borderRadius: "10px", py: 1.35, px: sidebarOpen ? 1.2 : 1,
                  justifyContent: sidebarOpen ? "flex-start" : "center",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.05)",
                    "& .nav-text": { color: "#fff", opacity: 1 },
                    "& .nav-icon": { opacity: 1 },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: sidebarOpen ? 22 : 0, justifyContent: "center", pointerEvents: "none"  , mr: 0.5,}}>
                  <SupportAgent className="nav-icon" sx={{ fontSize: 21, color: "#4f72a6", opacity: 0.65, transition: "opacity 0.18s" }} />
                </ListItemIcon>
                {sidebarOpen && (
                  <Typography className="nav-text" sx={{ fontSize: 14.5, fontWeight: 600, color: "#94a3b8", opacity: 0.7, whiteSpace: "nowrap", fontFamily: SIDE_FONT, lineHeight: "24px",letterSpacing: "0px",ml:3, flex: 1, transition: "opacity 0.18s, color 0.18s" }}>
                    Help &amp; Support
                  </Typography>
                )}
              </ListItemButton>
            </ListItem>
          </Tooltip>

          {/* Logout */}
          <Tooltip title={!sidebarOpen ? "Logout" : ""} placement="right" arrow>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={(e) => { e.stopPropagation(); setLogoutOpen(true); }}
                sx={{
                  borderRadius: "10px", py: 1.35, px: sidebarOpen ? 1.2 : 1,
                  justifyContent: sidebarOpen ? "flex-start" : "center",
                  "&:hover": { bgcolor: "rgba(239,68,68,0.1)", "& .logout-icon": { opacity: 1 }, "& .logout-text": { opacity: 1 } },
                }}
              >
                <ListItemIcon sx={{ minWidth: sidebarOpen ? 22 : 0, justifyContent: "center", pointerEvents: "none" , mr:0.5,}}>
                  <Logout className="logout-icon" sx={{ fontSize: 21, color: "#f87171", opacity: 0.7, transition: "opacity 0.18s" }} />
                </ListItemIcon>
                {sidebarOpen && (
                  <Typography className="logout-text" sx={{ fontSize: 14.5, fontWeight: 700, color: "#f87171", opacity: 0.7, whiteSpace: "nowrap", fontFamily: SIDE_FONT,letterSpacing: "0px",lineHeight: "24px",ml:3, transition: "opacity 0.18s" }}>
                    Logout
                  </Typography>
                )}
              </ListItemButton>
            </ListItem>
          </Tooltip>
        </Box>
      </Box>

      {/* ── Logout Dialog — compact & clean ── */}
      <Dialog
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        BackdropProps={{ sx: { backgroundColor: "rgba(15,23,42,0.45)", backdropFilter: "blur(4px)" } }}
        PaperProps={{
          sx: {
            bgcolor: "#fff", borderRadius: "16px",
            maxWidth: 320, width: "100%",
            boxShadow: "0 20px 48px rgba(15,23,42,0.14)",
            p: 0, overflow: "hidden",
          },
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          {/* Top accent */}
          <Box sx={{ height: 4, background: "linear-gradient(90deg, #ef4444, #f97316)" }} />

          <Stack alignItems="center" spacing={2} sx={{ px: 3, pt: 3, pb: 3 }} textAlign="center">
            {/* Icon */}
            <Box sx={{
              width: 52, height: 52, borderRadius: "14px",
              bgcolor: "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Logout sx={{ color: "#ef4444", fontSize: 24 }} />
            </Box>

            {/* Text */}
            <Box>
              <Typography sx={{ fontWeight: 800, fontSize: 17, color: "#0f172a", mb: 0.6, fontFamily: SIDE_FONT }}>
                Log out?
              </Typography>
              <Typography sx={{ color: "#64748b", fontSize: 13, fontWeight: 500, lineHeight: 1.6, fontFamily: SIDE_FONT }}>
                You'll need to sign back in to continue tracking your learning progress.
              </Typography>
            </Box>

            {/* Actions */}
            <Stack direction="row" spacing={1.2} sx={{ width: "100%", pt: 0.5 }}>
              <Button
                fullWidth variant="outlined"
                onClick={() => setLogoutOpen(false)}
                sx={{
                  textTransform: "none", color: "#475569", borderColor: "#e2e8f0",
                  fontWeight: 700, fontSize: 13.5, borderRadius: "10px", py: 1,
                  fontFamily: SIDE_FONT,
                  "&:hover": { bgcolor: "#f8fafc", borderColor: "#94a3b8" },
                }}
              >
                Cancel
              </Button>
              <Button
                fullWidth variant="contained"
                onClick={handleLogout}
                sx={{
                  textTransform: "none", bgcolor: "#ef4444", color: "#fff",
                  fontWeight: 700, fontSize: 13.5, borderRadius: "10px", py: 1,
                  boxShadow: "none", fontFamily: SIDE_FONT,
                  "&:hover": { bgcolor: "#dc2626", boxShadow: "none" },
                }}
              >
                Log out
              </Button>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}
