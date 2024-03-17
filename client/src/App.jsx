import { Toaster } from "./components/ui/toaster";

import AuthProvider from "./provider/authProvider";
import Routes from "./routes";

function App() {
  

  return (
    <AuthProvider>
      <Toaster />
      <Routes />
    </AuthProvider>
  )
}

export default App;
