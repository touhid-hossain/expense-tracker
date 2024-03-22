import { Toaster } from "./components/ui/toaster";

import AuthProvider from "./provider/authProvider";
import UserProvider from "./provider/userProvider";
import Routes from "./routes";

function App() {
 
  return (
    <AuthProvider>
      <UserProvider>
        <Toaster />
        <Routes />
      </UserProvider>
    </AuthProvider>
  )
}

export default App;
