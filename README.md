# Harisaran S — CachyOS Hyprland-Noctalia Portfolio Website

An interactive, production-ready personal portfolio website built with Next.js 14, TypeScript, Framer Motion, and Tailwind CSS. Faithfully recreates the authentic **CachyOS Linux Hyprland-Noctalia rice aesthetic** layered with KDE Plasma polish.

![CachyOS Hyprland Rice](https://cachyos.org/img/logo.svg)

---

## 🌟 Visual & Architectural Features

1. **Plymouth-Style Boot Sequence**
   - Plymouth boot splash with CachyOS logo mark, animated progress bar, live kernel logs (`Linux 6.10-bore`), and single-session persistence (skippable via keypress or ESC).

2. **SDDM Login Screen**
   - Authentic CachyOS SDDM login card with blurred backdrop, candidate identity (`Harisaran S`), security subtitle, and password dot input that triggers desktop transition.

3. **Persistent Animated Wallpaper Layer**
   - Interactive GPU-efficient canvas particle net background responding subtly to mouse movement with subtle grid overlay.

4. **Waybar-Style Top Bar**
   - Workspaces 1–7 (Home, Monitor, Certs, Projects, Journal, Trophies, Contact) with real-time smooth scroll.
   - Live clock/date widget updating every second.
   - Mock system status tray (WiFi %, Battery % charging state, Volume).
   - Plasma-style quick settings theme switcher (Catppuccin Mocha, Tokyo Night, Nord, Cyberpunk, Rosé Pine).

5. **Hyprland Bottom Dock**
   - Magnification-on-hover dock with quick links for GitHub, LinkedIn, Email copy-to-clipboard, Resume view, Rofi launcher, and Lock screen.

6. **Rofi-Style Fuzzy Command Launcher**
   - Press `/` anywhere or click launcher icon.
   - Keyboard navigable (`↑`, `↓`, `ENTER`, `ESC`).
   - Commands: `whoami`, `htop skills`, `paru -S certifications`, `ls projects/`, `cat education.md`, `cat achievements.txt`, `contact --email`, `sudo hire harisaran`, `lock`.

7. **Neofetch / Fastfetch Hero Widget**
   - CachyOS logo mark + line-by-line typing reveal of system specs (OS, Host, Kernel, Uptime, DE, Shell, CGPA 8.43, Packages).

8. **btop / Conky System Monitor Widget**
   - Animated skill progress bars organized in tabs: Programming (Java, Python, JS/TS, Bash), Cybersecurity Tools (Burp Suite, Nmap, Wireshark, Metasploit, MobSF, Docker, AWS), and Security Domains (Web Security, API Security, Android Security, Network Risk Intelligence, Vulnerability Assessment).

9. **Pacman / Paru Package Installer (Certifications)**
   - Terminal pane executing `paru -S certifications-harisaran`, displaying dependency resolution, downloading progress bars, and installation checkmarks for 5 certifications.

10. **Dolphin / Nautilus File Manager (Projects)**
    - Interactive folder grid. Clicking folders opens floating Hyprland windows with titlebar (`● ● ●`), architectural feature breakdown, tech stack badges, and GitHub links:
      - **Aegis Shield** — AI Autonomous SOC in Go (Wazuh SIEM + Velociraptor EDR)
      - **Sn1p3rNetX** — AI-Powered Network Risk Intelligence (Nmap + Groq Llama-3.3-70B + NIST/Vulners APIs)
      - **Browser-Based Digital Forensics Workbench** — Client-side DOM artifact parser

11. **journalctl / Git Log Timeline (Education & Experience)**
    - Commit graph vertical timeline for B.E CSE Cybersecurity at Sri Eshwar College of Engineering (CGPA 8.43), HSC (93.5%), SSLC (91.5%), and internships at Isaii Technologies and CodeAlpha.

12. **Dunst / Mako Notification Stack (Achievements)**
    - Desktop notifications for TryHackMe (Top 1%), LeetCode (230+), Skillrack (1290+), CREST CTF (1st Place), AxiosCTF, TrustoryxCTF, and SafeTradeServices vulnerability disclosures.

13. **Hyprlock Lock Screen Overlay**
    - Clock overlay and blur backdrop, unlocked via click or ESC keypress.

14. **KDE System Settings Contact Panel**
    - Configured network endpoints for Phone (+91 6385428704), Email, LinkedIn, GitHub, with direct copy-to-clipboard and message dispatch form.

15. **Precision Crosshair Custom Cursor**
    - SVG blade reticle with spring follow trail and hover target morphing. (Disabled on touch devices and `prefers-reduced-motion`).

---

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom Vanilla CSS Glassmorphism
- **Animations**: Framer Motion (spring physics, layout animations, exit transitions)
- **State Management**: Zustand
- **Icons**: Lucide React
- **Effects**: Canvas Confetti

---

## 🛠 Local Development & Build Instructions

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# Open http://localhost:3000 in your browser.

# 3. Test production build
npm run build
npm run start
```

---

## ☁ Deploying to Vercel

This repository is optimized for zero-config one-click static deployment on Vercel:

1. Push your repository to GitHub (`github.com/HarisaranS/...`).
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Import the repository and click **Deploy**. Next.js App Router static optimization handles everything automatically!
