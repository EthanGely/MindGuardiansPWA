import ReactDOM from "react-dom/client";
import AppRouter from "./routes/AppRouter";
import AuthProvider from "./context/NewAuthProvider";
import * as Sentry from "@sentry/react";
import "./main.scss";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: "https://9923db31cc8f67b8a0ef22bab3d08675@o4508440002494464.ingest.de.sentry.io/4508440004984912",
    integrations: [],
  });
}


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  //<React.StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  //</React.StrictMode>
);
