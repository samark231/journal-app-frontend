# 🧠 Slate of Mind (Frontend)

A modern, responsive journaling application built to help users document their thoughts securely. This is the frontend repository, built with **React** and **Vite**, designed to communicate with a Java Spring Boot backend.

## ✨ Features

* **Responsive "Split-View" Design:**
* **Desktop:** Side-by-side Editor and Journal List for efficient writing and reviewing.
* **Mobile:** Adaptive stacked layout with a collapsible, app-like header and bottom-heavy touch controls.


* **Smart Search:**
* Real-time client-side filtering (searches title and content instantly).
* Mobile-optimized search bar that expands/collapses to save screen real estate.


* **Journal Management:**
* Create, view, and save daily entries.
* Auto-formatted dates using ISO standards (compatible with Java `LocalDateTime`).


* **System Status:**
* Built-in "Heartbeat" check to verify backend connectivity.


* **Secure Authentication:**
* Login/Signup flows with JWT token management (stored in local storage).



## 🛠️ Tech Stack

* **Framework:** [React](https://reactjs.org/) (v18)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **State Management:** [Zustand](https://github.com/pmndrs/zustand) (Auth, Journal Data, General App State)
* **Styling:** CSS3 (Flexbox/Grid), FontAwesome Icons
* **HTTP Client:** Axios (Interceptors configured for JWT injection)
* **Deployment:** Render (Static Site)

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

* Node.js (v18 or higher)
* npm

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/samark231/journal-app-frontend.git
cd journal-app-frontend

```


2. **Install dependencies:**
```bash
npm install

```


3. **Configure Environment Variables:**
Create a `.env` file in the root directory:
```bash
touch .env

```


Add your backend URL (for local development, this is usually localhost):
```env
# .env
VITE_API_URL=http://localhost:8080

```


4. **Run the development server:**
```bash
npm run dev

```


Open `http://localhost:5173` to view it in the browser.

## 📂 Project Structure

```text
src/
├── api/
│   └── axiosConfig.js       # Global Axios instance with Interceptors
├── assets/                  # Images, Logos
├── components/
│   ├── Header.jsx           # Responsive Header (Mobile logic inside)
│   ├── JournalCard.jsx      # Individual Entry Display
│   ├── AddJournal.jsx       # Editor Component
│   └── PrivateRoute.jsx     # Route Guard
├── pages/
│   ├── AuthPage.jsx         # Login/Signup Logic
│   └── HomePage.jsx         # Main Dashboard (Flexbox Layout)
├── store/
│   ├── authStore.js         # User Session State
│   └── JournalStore.js      # Filtering & Data Logic
└── styles/                  # Component-specific CSS

```

## 🌐 Deployment (Render)

This project is optimized for deployment on **Render Static Sites**.

1. **Connect Repo:** Link your GitHub repository to a new Static Site service on Render.
2. **Build Settings:**
* **Build Command:** `npm run build`
* **Publish Directory:** `dist`


3. **Environment Variables:**
* Set `VITE_API_BASE_URL` to your production backend URL (e.g., `https://journal-app-nfnl.onrender.com/`).


4. **Rewrite Rule (Crucial for React Router):**
* Go to **Settings > Redirects/Rewrites**.
* Add rule: Source `/*` ➝ Destination `/index.html` ➝ Action `Rewrite`.



## 🤝 Contributing

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

*Built by Samar K.*