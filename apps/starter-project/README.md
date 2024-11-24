# Chapter 1: Starter Project  

Welcome to the **Starter Project**! This chapter provides a foundational setup for the course, ensuring all necessary tools and configurations are in place.  

## 🚀 **Features and Configurations**  
This project comes pre-configured with the following:  
- **[TailwindCSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapid UI development.  
- **[Axios](https://axios-http.com/)**: A promise-based HTTP client for API requests.  
- **[React Router](https://reactrouter.com/)**: Declarative routing for React applications.  
- **[MSW (Mock Service Worker)](https://mswjs.io/)**: A powerful tool for mocking API requests during development.  
- Additional small configurations to streamline development.  

## 📁 **Project Structure**  
Here’s an overview of the project structure:  

```
starter-project/  
├── src/    
│   ├── mocks/          # MSW mock server setup  
│   │   ├── handlers/   # API request handlers  
│   │   └── index.ts    # MSW browser setup  
│   ├── services/       # all services needed for this project 
│   │   ├── http/       # API request handlers  
│   ├── App.tsx         # Main app entry point  
│   ├── main.tsx        # React DOM rendering  
├── public/             # Static assets  
├── package.json        # Dependencies and scripts  
├── tailwind.config.js  # TailwindCSS configuration  
├── tsconfig.json       # TypeScript configuration  
└── README.md           # Documentation for this chapter  
```  

## 🛠️ **Setup and Installation**  

1. **Navigate to the Starter Project**:  
   ```bash  
   cd ./apps/starter-project  
   ```  

2. **Install Dependencies**:  
   Run the following command to install all required packages:  
   ```bash  
   yarn install  
   ```  

3. **Run the Mock Server**:  
   The MSW server automatically starts with the app. Ensure `src/mocks/browser.ts` is imported in your `main.tsx` file:  
  ```typescript  
    import { StrictMode } from "react";
    import { createRoot } from "react-dom/client";
    import "./index.css";
    import App from "./App.tsx";
    import { worker } from "./mocks";

    worker.start().then(() => {
      createRoot(document.getElementById("root")!).render(
        <StrictMode>
          <App />
        </StrictMode>
      );
    }); 
  ```  

4. **Run the Development Server**:  
   Start the project locally:  
   ```bash  
   yarn dev  
   ``` 

5. **View in Browser**:  
   Open your browser and go to [http://localhost:5173](http://localhost:5173) to see the app.  

## ✨ **Next Steps**  
With the starter project ready, you can now dive into the core concepts of React Query in the next chapters!  

## 🧑‍💻 **Customization**  
Feel free to modify or expand the setup based on your project needs as we progress through the course.  