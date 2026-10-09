# 🎮 Kyros Esports — Tournament Management & Gaming Platform

[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Firebase](https://img.shields.io/badge/Backend-Firebase%20Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**Kyros Esports** is an all-in-one gaming community and competitive tournament platform. Built with **React** and backed by **Firebase Firestore**, it empowers organizers to host competitive esports tournaments, track live match brackets, manage player registrations, and publish gaming news.

---

## ✨ Features

* 🏆 **Tournament Bracket Management:** Real-time single-elimination and round-robin tournament schedules.
* 👥 **Team Roster & Player Profiles:** Clan management, player statistics, and match history tracking.
* 🔥 **Live Match Leaderboards:** Automated leaderboard score recalculation backed by Firestore real-time snapshots.
* 📝 **Community News & Patch Notes:** Integrated rich text editor (`@tinymce/tinymce-react`) for game updates and announcements.

---

## 📁 Repository Structure

```text
kyros-esports/
├── src/                # Tournament views, bracket charts, player registration forms
├── firestore.rules     # Secure Firestore access control rules
├── firebase.json       # Firebase hosting & index configurations
├── SETUP.md            # Step-by-step setup and deployment manual
├── package.json        # Dependencies & scripts
├── LICENSE             # MIT License
└── README.md
```

---

## 🚀 Getting Started

### 1. Installation
```bash
git clone https://github.com/Tarunjit45/kyros-esports.git
cd kyros-esports

npm install
```

### 2. Configure Firebase
Provide your Firebase keys in `.env` (refer to `SETUP.md` for full instructions).

### 3. Run Development Server
```bash
npm start
```

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).
