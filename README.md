# VASS INC - Employee Management System 🚀

A web application for the entire recruitment lifecycle, from candidate registration to job placement and managing employee documents.

## 📋 Project Overview

VASS INC Recruitment Management System streamlines the process of matching candidates with job opportunities, tracking applications, managing vendor communications, and monitoring performance metrics.

### 👥 User Types

- **Candidates** 👨‍💻: OPT/H1B/Green Card holders seeking jobs
- **Recruiters** 🔍: Staff who help candidates find jobs
- **Employees** 💼: Candidates who have successfully been placed in jobs
- **Admins** 👑: CEO/HR personnel with oversight access

### 🔄 Core Process Flow

1. Candidates register with their details
2. Recruiters work with candidates to apply for jobs
3. When a candidate gets a job, they become an Employee
4. All activities are monitored by Admins

## ✨ Features

### 👨‍💻 Candidate Management
- Profile with personal details
- Visa information (original visa and marketing visa)
- Technical specialization (Java Full Stack, Data Engineer, etc.)
- Document repository (resume, visa documents)
- Application status tracking
- Candidate dashboard

### 🔍 Recruiter Activities
- Managing candidate portfolios
- Applying to jobs for candidates
- Vendor communication tracking
- Rate negotiation records
- Interview scheduling
- Submission tracking

### 💼 Employee Conversion
- Transition from candidate to employee
- Employment documentation

### 📊 Performance Analytics
- Recruiter and Candidate performance metrics (submissions, interviews, placements)
- Weekly/biweekly/monthly/quarterly/yearly reports
- Comparative performance dashboards

## 🛠️ Tech Stack

- **Frontend**: React with Tailwind CSS
- **Backend**: Not Yet Decided
- **Database**: Not Yet Decided

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- Git

### Installation

1. Clone the repository
   ```
   git clone https://github.com/varma-dr/vassinc.git
   cd vassinc
   ```

2. Install frontend dependencies
   ```
   cd frontend
   npm install
   ```

3. Start the development server
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### 🎨 Setting Up Tailwind CSS

If you need to rebuild the Tailwind configuration:

1. Create or update the Tailwind config file
   ```
   cd frontend
   ```

2. Create `tailwind.config.js` with the following content:
   ```javascript
   /** @type {import('tailwindcss').Config} */
   export default {
     content: [
       "./index.html",
       "./src/**/*.{js,jsx,ts,tsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```

3. Create `postcss.config.js` with:
   ```javascript
   export default {
     plugins: {
       tailwindcss: {},
       autoprefixer: {},
     },
   }
   ```

4. Ensure `src/index.css` contains:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```


Project Link: [https://github.com/varma-dr/vassinc](https://github.com/varma-dr/vassinc)
