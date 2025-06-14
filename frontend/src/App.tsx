import { ThemeProvider } from "./hooks/theme-provider";
import { AuthProvider } from "./hooks/use-auth";
import { BrowserRouter } from "react-router-dom";

import Routes from "./routes";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes />
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
