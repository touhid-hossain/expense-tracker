import { Toaster } from "./components/ui/toaster";
import TransactionProvider from "./provider/TransactionsProvider";

import AuthProvider from "./provider/authProvider";
import UserProvider from "./provider/userProvider";
import Routes from "./routes";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <TransactionProvider>
          <Toaster />
          <Routes />
        </TransactionProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
