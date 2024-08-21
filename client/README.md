# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Install Tailwind CSS with Vite

### Create app and go to your project file

```
 npm create vite@latest my-project
 cd my-project
```

### Initialize tailwind

```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Inside tailwind.config.js file

```
/** @type {import('tailwindcss').Config} \*/
export default {
content: [
"./index.html",
"./src/**/\*.{js,ts,jsx,tsx}",
],
theme: {
extend: {},
},
plugins: [],
}
```

### index.css

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```
