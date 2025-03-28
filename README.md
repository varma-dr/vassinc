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
- **Backend**: Node.js
- **Database**: MongoDB

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

2. Create and set up the frontend
```
npm create vite@latest
# Select 'frontend' as the project name
# Select 'React' as the framework
# Select 'JavaScript' as the variant
cd frontend
npm install
```

3. Install Tailwind CSS v3
```
npm install -D tailwindcss@3.3.5 postcss autoprefixer
npx tailwindcss init -p
```

4. Configure Tailwind CSS
   
   Update `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

5. Add Tailwind directives to CSS
   
   Replace the contents of `src/index.css` with:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

6. Make sure your `src/main.jsx` imports the CSS:
```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

7. Start the development server
```
npm run dev
```

8. Open your browser and navigate to `http://localhost:5173`

### 🧪 Testing Tailwind CSS

To verify Tailwind CSS is working properly, update your `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Then update your `App.jsx`:

```jsx
function App() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-blue-500">VASS INC</h1>
        <p className="mt-4 text-green-600">Tailwind CSS is working correctly!</p>
      </div>
    </div>
  )
}
export default App

export default App
```

9.📁 Frontend 
- The `pages/` folder contains different views/screens for the application.



Project Link: [https://github.com/varma-dr/vassinc](https://github.com/varma-dr/vassinc)
