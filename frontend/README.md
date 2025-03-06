# Vass INC 🚀
A website for admins, employees, and staff to manage employee records and administrative tasks efficiently.







# Project Setup - Quick Start

# In VS Code terminal, run:

# Create a new React project

```npx create-react-app login-signup```

# Navigate to the project directory

```cd login-signup```

# Start the development server 

```npm start```

# You can also clone this project from Github

# This project is hosted at

```https://github.com/varma-dr/vassinc.git```

# Clone this repository

```git clone https://github.com/varma-dr/vassinc.git```

# Navigate to project directory

```cd vassinc```

# Install dependencies

```npm install```

# Start development server

```npm start```










# THIS WE WILL DO LATER 

# Create the Project

Run the following command to create the project:

```npm create vite@latest frontend```

# Select Framework and Language

During the setup prompts:

Choose React as the framework.

Select JavaScript as the language (if prompted).

# Navigate to the Project Folder

Move into the project directory:

```cd frontend```

# Install Dependencies

Install the necessary dependencies:

```npm install```

# Install TailwindCSS and Vite Plugin

Run the following command to install TailwindCSS and the Vite plugin for Tailwind:

```npm install tailwindcss @tailwindcss/vite```

# Configure TailwindCSS

After installation, create a tailwind.config.js file:

```npx tailwindcss init```

Then, in your tailwind.config.js file, add the following content:

```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Add Tailwind Directives to Your CSS

In your src/index.css file (or create one if it doesn’t exist), add the following lines to import Tailwind's base, components, and utilities:

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

# Start the Development Server

Finally, run the development server:

```npm run dev```

