import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { AuthProvider } from "./AuthContext/AuthContext.jsx";

// Restore saved theme on startup
const saved = JSON.parse(localStorage.getItem("netclone_theme") || "{}");
const r = document.documentElement;
if (saved.accent)   r.style.setProperty("--accent",        saved.accent);
if (saved.hover)    r.style.setProperty("--accent-hover",  saved.hover);
if (saved.muted)    r.style.setProperty("--accent-muted",  saved.muted);
if (saved.faint)    r.style.setProperty("--accent-faint",  saved.faint);
if (saved.border)   r.style.setProperty("--accent-border", saved.border);
if (saved.base)     r.style.setProperty("--bg-base",       saved.base);
if (saved.elevated) r.style.setProperty("--bg-elevated",   saved.elevated);
if (saved.card)     r.style.setProperty("--bg-card",       saved.card);
if (saved.bgBorder) r.style.setProperty("--bg-border",     saved.bgBorder);

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
  </AuthProvider>
)
