"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreProvider";

type Mode = "login" | "signup";

export default function VortexAuth() {
  const [mode, setMode] = useState<Mode>("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  
  const router = useRouter();
  const { setUser, showToast } = useStore() as any;

  useEffect(() => { setMounted(true); }, []);

  const handleSubmit = () => {
    if (!username || !password || (mode === 'signup' && !email)) {
        showToast("Please fill all required fields");
        return;
    }
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        setUser({ username, email: email || `${username}@vortex.com` });
        showToast(`Welcome back, ${username}!`);
        router.back(); // Go back to where they came from
    }, 2000);
  };

  const switchMode = (m: Mode) => {
    setMode(m);
    setUsername(""); setEmail(""); setPassword(""); setConfirmPassword("");
  };

  if (!mounted) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Cinzel:wght@400;600;700&family=Lato:wght@300;400&display=swap');

        .vx-root {
          min-height: 100vh;
          width: 100%;
          font-family: 'Lato', sans-serif;
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: #F5EFE0;
          opacity: ${mounted ? 1 : 0};
          transition: opacity 0.6s ease;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 2000;
        }

        .vx-left {
          position: relative;
          background: #3D2B1F;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 40px;
        }

        .vx-left::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.012) 3px, rgba(255,255,255,0.012) 4px),
            repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(255,255,255,0.012) 3px, rgba(255,255,255,0.012) 4px);
        }

        .vx-left::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 40% 50%, rgba(185,113,74,0.35) 0%, transparent 65%);
          pointer-events: none;
        }

        .vx-left-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 32px;
          width: 100%;
        }

        .vx-brand-name {
          font-family: 'Cinzel', serif;
          font-size: 40px;
          font-weight: 600;
          letter-spacing: 14px;
          color: #FAF6EE;
          text-align: center;
          line-height: 1;
        }

        .vx-brand-sub {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 14px;
          letter-spacing: 4px;
          color: #C4A882;
          text-align: center;
        }

        .vx-rule {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          max-width: 260px;
        }
        .vx-rule-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, #C9943A, transparent);
        }
        .vx-rule-gem {
          width: 6px; height: 6px;
          background: #C9943A;
          transform: rotate(45deg);
          flex-shrink: 0;
        }

        .vx-collection-tag {
          font-family: 'Cormorant Garamond', serif;
          font-size: 12px;
          letter-spacing: 5px;
          color: #8C7B6B;
          text-transform: uppercase;
          text-align: center;
        }

        .vx-season {
          font-family: 'Cinzel', serif;
          font-size: 12px;
          letter-spacing: 4px;
          color: #E8C170;
          text-align: center;
        }

        .vx-right {
          background: #FAF6EE;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 56px;
          position: relative;
          overflow: hidden;
        }

        .vx-corner-ornament {
          position: absolute;
          width: 48px; height: 48px;
          pointer-events: none;
        }
        .vx-corner-ornament--tl { top: 20px; left: 20px; border-top: 2px solid #C9943A; border-left: 2px solid #C9943A; }
        .vx-corner-ornament--br { bottom: 20px; right: 20px; border-bottom: 2px solid #C9943A; border-right: 2px solid #C9943A; }

        .vx-form-wrap {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 380px;
          animation: formIn 0.7s cubic-bezier(0.16,1,0.3,1) forwards;
        }

        @keyframes formIn {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .vx-form-header { margin-bottom: 32px; }

        .vx-form-eyebrow {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 13px;
          letter-spacing: 4px;
          color: #B5714A;
          margin-bottom: 6px;
        }

        .vx-form-title {
          font-family: 'Cinzel', serif;
          font-size: 28px;
          font-weight: 600;
          letter-spacing: 6px;
          color: #3D2B1F;
          line-height: 1.1;
        }

        .vx-form-desc {
          font-family: 'Cormorant Garamond', serif;
          font-size: 15px;
          color: #8C7B6B;
          margin-top: 8px;
          font-style: italic;
          letter-spacing: 1px;
        }

        .vx-tabs {
          display: flex;
          border-bottom: 2px solid #E8DBBD;
          margin-bottom: 28px;
        }

        .vx-tab {
          flex: 1;
          background: none;
          border: none;
          padding: 13px 0;
          font-family: 'Cinzel', serif;
          font-size: 11px;
          letter-spacing: 4px;
          color: #C4A882;
          cursor: pointer;
          position: relative;
          transition: color 0.3s;
          text-transform: uppercase;
        }

        .vx-tab::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0; right: 0;
          height: 2px;
          background: #B5714A;
          transform: scaleX(0);
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
        }

        .vx-tab.active { color: #3D2B1F; }
        .vx-tab.active::after { transform: scaleX(1); }

        .vx-fields {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .vx-label {
          display: block;
          font-family: 'Cinzel', serif;
          font-size: 9px;
          letter-spacing: 3px;
          color: #8C7B6B;
          margin-bottom: 7px;
          text-transform: uppercase;
        }

        .vx-input {
          width: 100%;
          background: #F5EFE0;
          border: 1px solid #E8DBBD;
          border-bottom: 2px solid #D4BFA0;
          color: #3D2B1F;
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          padding: 12px 14px;
          outline: none;
          transition: all 0.3s ease;
        }

        .vx-input:focus {
          border-bottom-color: #B5714A;
          background: #FAF6EE;
        }

        .vx-submit {
          width: 100%;
          background: #3D2B1F;
          border: none;
          color: #F5EFE0;
          font-family: 'Cinzel', serif;
          font-size: 12px;
          letter-spacing: 6px;
          padding: 18px;
          cursor: pointer;
          margin-top: 10px;
          transition: all 0.35s ease;
          text-transform: uppercase;
        }

        .vx-submit:hover { background: #B5714A; }

        .vx-or {
          display: flex;
          align-items: center;
          gap: 14px;
          margin: 22px 0;
        }
        .vx-or-line { flex: 1; height: 1px; background: #E8DBBD; }
        .vx-or-text { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 13px; color: #C4A882; }

        .vx-socials { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .vx-social {
          background: #F5EFE0;
          border: 1px solid #E8DBBD;
          padding: 12px;
          cursor: pointer;
          font-family: 'Cinzel', serif;
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .vx-switch {
          margin-top: 26px;
          text-align: center;
        }
        .vx-switch-text { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 14px; color: #8C7B6B; margin-right: 8px; }
        .vx-switch-btn { background: none; border: none; font-family: 'Cinzel', serif; font-size: 10px; letter-spacing: 2px; color: #B5714A; cursor: pointer; text-decoration: underline; }

        .vx-bottom-mark { position: absolute; bottom: 20px; width: 100%; text-align: center; font-family: 'Cinzel', serif; font-size: 7px; letter-spacing: 5px; color: #C4A882; opacity: 0.5; }

        .vx-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          font-size: 24px;
          color: #3D2B1F;
          cursor: pointer;
          z-index: 2001;
        }

        @media (max-width: 768px) {
          .vx-root { grid-template-columns: 1fr; position: absolute; }
          .vx-left { display: none; }
        }
      `}</style>

      <div className="vx-root">
        <button className="vx-close-btn" onClick={() => router.back()}>×</button>

        {/* ── LEFT ── */}
        <div className="vx-left">
          <div className="vx-left-content">
            <div style={{ textAlign: "center" }}>
              <div className="vx-brand-name">VORTEX</div>
              <div className="vx-brand-sub">Couture · Atelier · Maison</div>
            </div>
            <div className="vx-rule">
              <div className="vx-rule-line" />
              <div className="vx-rule-gem" />
              <div className="vx-rule-line" />
            </div>

            {/* Fashion SVG illustration */}
            <svg viewBox="0 0 300 360" xmlns="http://www.w3.org/2000/svg"
              style={{ width: "100%", maxWidth: "300px", height: "auto" }}>
              <defs>
                <linearGradient id="gown" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#C9943A" stopOpacity="0.85"/>
                  <stop offset="100%" stopColor="#8B4513" stopOpacity="0.65"/>
                </linearGradient>
                <linearGradient id="jacket" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#B5714A" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor="#6B4C3B" stopOpacity="0.6"/>
                </linearGradient>
                <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D4A574"/>
                  <stop offset="100%" stopColor="#C49A6C"/>
                </linearGradient>
                <linearGradient id="skinDark" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C49A6C"/>
                  <stop offset="100%" stopColor="#A67B52"/>
                </linearGradient>
              </defs>

              {/* === Figure 1 – Left, Flowing Gown === */}
              <g transform="translate(18, 10)">
                <ellipse cx="52" cy="28" rx="17" ry="21" fill="url(#skin)"/>
                <path d="M35 22 Q38 4 52 7 Q66 4 69 22 Q67 10 52 13 Q37 10 35 22Z" fill="#3D2B1F" opacity="0.75"/>
                <ellipse cx="52" cy="7" rx="10" ry="7" fill="#5C3A28" opacity="0.6"/>
                <circle cx="35" cy="33" r="2" fill="#C9943A"/>
                <circle cx="69" cy="33" r="2" fill="#C9943A"/>
                <rect x="46" y="47" width="12" height="13" rx="5" fill="url(#skin)"/>
                <path d="M22 60 Q37 54 52 57 Q67 54 82 60 L86 102 Q78 108 52 105 Q26 108 18 102Z" fill="url(#gown)"/>
                <path d="M36 60 Q52 72 68 60" stroke="rgba(201,148,58,0.5)" strokeWidth="1.5" fill="none"/>
                <rect x="18" y="100" width="68" height="8" rx="2" fill="#8B4513" opacity="0.55"/>
                <ellipse cx="52" cy="104" rx="7" ry="5" fill="#C9943A" opacity="0.8"/>
                <path d="M18 106 Q-2 132 2 200 Q6 245 16 285 L88 285 Q98 245 98 200 Q102 132 86 106Z" fill="url(#gown)" opacity="0.85"/>
                <path d="M38 118 Q52 124 66 118" stroke="rgba(201,148,58,0.35)" strokeWidth="1" fill="none"/>
                <path d="M30 145 Q52 153 74 145" stroke="rgba(201,148,58,0.28)" strokeWidth="1" fill="none"/>
                <path d="M22 178 Q52 188 82 178" stroke="rgba(201,148,58,0.2)" strokeWidth="1" fill="none"/>
                <path d="M16 215 Q52 228 88 215" stroke="rgba(201,148,58,0.15)" strokeWidth="1" fill="none"/>
                <path d="M22 63 Q6 86 8 112" stroke="url(#skin)" strokeWidth="9" fill="none" strokeLinecap="round"/>
                <path d="M82 63 Q98 86 94 108" stroke="url(#skin)" strokeWidth="9" fill="none" strokeLinecap="round"/>
                <ellipse cx="8" cy="116" rx="5" ry="7" fill="url(#skin)" transform="rotate(-15 8 116)"/>
                <ellipse cx="94" cy="112" rx="5" ry="7" fill="url(#skin)" transform="rotate(10 94 112)"/>
                <rect x="88" y="95" width="22" height="14" rx="3" fill="#8B4513" opacity="0.6"/>
                <line x1="88" y1="102" x2="110" y2="102" stroke="rgba(201,148,58,0.5)" strokeWidth="1"/>
              </g>

              {/* === Figure 2 – Right, Structured Jacket + Trousers === */}
              <g transform="translate(165, 8)">
                <ellipse cx="52" cy="29" rx="16" ry="20" fill="url(#skinDark)"/>
                <path d="M36 24 Q38 6 52 9 Q66 6 68 24 Q66 14 52 16 Q38 14 36 24Z" fill="#2A1A0E" opacity="0.8"/>
                <ellipse cx="52" cy="10" rx="14" ry="8" fill="#2A1A0E" opacity="0.6"/>
                <rect x="46" y="47" width="12" height="13" rx="5" fill="url(#skinDark)"/>
                <path d="M26 60 Q40 54 52 57 Q64 54 78 60 L82 108 Q74 113 52 110 Q30 113 22 108Z" fill="url(#jacket)"/>
                <path d="M38 60 L44 72 L52 65 L60 72 L66 60" stroke="rgba(245,239,224,0.2)" strokeWidth="1" fill="none"/>
                <path d="M52 58 L44 70 L38 110" stroke="rgba(201,148,58,0.4)" strokeWidth="1.5" fill="none"/>
                <path d="M52 58 L60 70 L66 110" stroke="rgba(201,148,58,0.4)" strokeWidth="1.5" fill="none"/>
                <path d="M64 68 L70 64 L72 70 L66 72Z" fill="#E8C170" opacity="0.6"/>
                <circle cx="52" cy="76" r="2.5" fill="#C9943A" opacity="0.9"/>
                <circle cx="52" cy="88" r="2.5" fill="#C9943A" opacity="0.9"/>
                <circle cx="52" cy="100" r="2.5" fill="#C9943A" opacity="0.9"/>
                <path d="M22 107 L28 285 L50 285 L52 160 L54 285 L76 285 L82 107Z" fill="#5C3828" opacity="0.55"/>
                <line x1="39" y1="108" x2="37" y2="285" stroke="rgba(245,239,224,0.12)" strokeWidth="1"/>
                <line x1="65" y1="108" x2="67" y2="285" stroke="rgba(245,239,224,0.12)" strokeWidth="1"/>
                <path d="M26 63 Q10 87 12 115" stroke="url(#skinDark)" strokeWidth="9" fill="none" strokeLinecap="round"/>
                <path d="M78 63 Q94 87 90 112" stroke="url(#skinDark)" strokeWidth="9" fill="none" strokeLinecap="round"/>
                <path d="M12 112 Q9 120 14 124" stroke="rgba(201,148,58,0.5)" strokeWidth="1.5" fill="none"/>
                <path d="M90 109 Q93 117 88 121" stroke="rgba(201,148,58,0.5)" strokeWidth="1.5" fill="none"/>
                <rect x="6" y="118" width="12" height="8" rx="2" fill="#C9943A" opacity="0.5"/>
              </g>

              <text x="150" y="318" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="11" letterSpacing="8" fill="rgba(201,148,58,0.6)">VORTEX</text>
              <line x1="20" y1="6" x2="280" y2="6" stroke="rgba(201,148,58,0.2)" strokeWidth="1"/>
              <line x1="20" y1="330" x2="280" y2="330" stroke="rgba(201,148,58,0.2)" strokeWidth="1"/>
              <circle cx="20" cy="6" r="2" fill="rgba(201,148,58,0.4)"/><circle cx="280" cy="6" r="2" fill="rgba(201,148,58,0.4)"/>
              <circle cx="20" cy="330" r="2" fill="rgba(201,148,58,0.4)"/><circle cx="280" cy="330" r="2" fill="rgba(201,148,58,0.4)"/>
            </svg>

            <div className="vx-collection-tag">Spring / Summer Collection</div>
            <div className="vx-season">Est. MMXVIII · Paris</div>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="vx-right">
          <div className="vx-corner-ornament vx-corner-ornament--tl" />
          <div className="vx-corner-ornament vx-corner-ornament--br" />

          <div className="vx-form-wrap">
            <div className="vx-form-header">
              <div className="vx-form-eyebrow">Welcome to</div>
              <div className="vx-form-title">VORTEX</div>
              <div className="vx-form-desc">
                {mode === "login" ? "Sign in to your exclusive account" : "Create your member account"}
              </div>
            </div>

            <div className="vx-tabs">
              <button className={`vx-tab ${mode === "login" ? "active" : ""}`} onClick={() => switchMode("login")}>
                Sign In
              </button>
              <button className={`vx-tab ${mode === "signup" ? "active" : ""}`} onClick={() => switchMode("signup")}>
                Register
              </button>
            </div>

            <div className="vx-fields">
              <div className="vx-field">
                <label className="vx-label">Username</label>
                <input className="vx-input" type="text" placeholder="your name"
                    value={username} onChange={e => setUsername(e.target.value)} />
              </div>

              {mode === "signup" && (
                <div className="vx-field">
                  <label className="vx-label">Email Address</label>
                  <input className="vx-input" type="email" placeholder="your@email.com"
                      value={email} onChange={e => setEmail(e.target.value)} />
                </div>
              )}

              <div className="vx-field">
                <label className="vx-label">Password</label>
                <input className="vx-input" type="password" placeholder="············"
                    value={password} onChange={e => setPassword(e.target.value)} />
              </div>

              <button className={`vx-submit ${loading ? "loading" : ""}`}
                onClick={handleSubmit} disabled={loading}>
                {loading ? "AUTHENTICATING..." : mode === "login" ? "Enter the Atelier" : "Join Vortex"}
              </button>
            </div>

            <div className="vx-or">
              <div className="vx-or-line" />
              <span className="vx-or-text">or continue with</span>
              <div className="vx-or-line" />
            </div>

            <div className="vx-socials">
              <button className="vx-social">Google</button>
              <button className="vx-social">Apple</button>
            </div>

            <div className="vx-switch">
              <span className="vx-switch-text">
                {mode === "login" ? "New to Vortex?" : "Already a member?"}
              </span>
              <button className="vx-switch-btn" onClick={() => switchMode(mode === "login" ? "signup" : "login")}>
                {mode === "login" ? "Create Account" : "Sign In"}
              </button>
            </div>
          </div>
          <div className="vx-bottom-mark">VORTEX ATELIER · ALL RIGHTS RESERVED · MMXXV</div>
        </div>
      </div>
    </>
  );
}
