# 🔗 Linkdrop - Bio-Link & Analytics Platform

## Project Title:
**Linkdrop - Full-Stack Bio-Link Management System**

---

## 1. Introduction & Project Overview
Linkdrop is a full-stack MERN application inspired by popular "Link-in-Bio" tools like Linktree. It provides content creators, students, and professionals with a centralized single landing page to display all their vital web links, social profiles, and portfolios dynamically.

### Core Objectives:
* Allow users to manage multiple social and web links through one profile URL.
* Provide real-time insights with dynamic click logs and tracking.
* Offer a responsive, aesthetic dark-theme user experience.

---

## 2. System Architecture & Tech Stack
The platform is engineered using modern full-stack web technologies:

* **Frontend:** React.js, Tailwind CSS / Custom Responsive Grid Layout
* **Backend:** Node.js, Express.js (REST API Server Architecture)
* **Database:** MongoDB Cloud Atlas / Synced Memory Architecture

---

## 3. Implemented Features (Lab Update 1)
* **Dynamic Username Customization:** Users can update their profile handler and instantly change their bio metadata.
* **Instant Link Management Form:** React state integration for appending new target URLs on the fly.
* **Responsive Grid Dashboard:** Built with a dark blue tone optimization for a seamless presentation.
* **Synchronized Backend API:** Express.js routing setup on Port 5000 to manage secure link traffic.
* **Public Visitor View:** Dedicated interface view for generic end-users to navigate external link destinations securely.

---

## 4. Software Requirements Specifications (SRS) & Scope

### Functional Requirements:
* **FR1:** The system must allow users to change their public profile username dynamically.
* **FR2:** Users must be able to input a valid Link Title and a target URL destination.
* **FR3:** The active dashboard must fetch and display the click counters for every individual link.

### Non-Functional Requirements:
* **NFR1 - Performance:** The user interface must re-render layout data in real-time without lagging.
* **NFR2 - Security:** Sensitive environmental variables (Database credentials) must be protected using `.env` configurations.
* **NFR3 - Usability:** The design must be fully mobile-responsive and visually accessible with clear typography.

---

## 5. System User Roles
1. **Profile Owner (Admin):** Can modify the username, add new social destinations, and monitor the total traffic analytics (clicks) of their bio link.
2. **Public Visitor (End User):** Can view the customized public landing page and click on the curated links to navigate to external profiles.

---

## 6. Future Enhancements (Roadmap)
* **User Authentication:** Implementing Secure SignUp/LogIn using `bcryptjs` and `JSON Web Tokens (JWT)`.
* **Custom Theme Engine:** Allowing users to change profile backgrounds, gradients, and custom button styles.
* **Advanced Analytics Dashboard:** Displaying weekly/monthly click graphs, device types, and geographic location breakdown of visitors.

---

## 7. How to Run the Project Locally

### Prerequisites:
* Node.js installed on your system.

### Steps to Run:
1. Clone or download the repository files.
2. Open your terminal in the root directory.
3. To start the **Backend Server**:
   ```bash
   cd backend
   node server.js
   ```
4. Open a second terminal window to start the **Frontend Client**:
   ```bash
   cd frontend
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:5173`.
