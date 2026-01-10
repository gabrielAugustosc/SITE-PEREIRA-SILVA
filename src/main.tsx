
  import { createRoot } from "react-dom/client";
  import { Toaster } from 'sonner';
  import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
  import App from "./App.tsx";
  import "./styles/index.css";

  createRoot(document.getElementById("root")!).render(
    <GoogleReCaptchaProvider
      reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || ''}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: 'head',
      }}
    >
      <App />
      <Toaster position="top-right" richColors />
    </GoogleReCaptchaProvider>
  );
  