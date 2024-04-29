import { Toaster } from "./components/ui/toaster";
import TransactionProvider from "./provider/transactionProvider";
import AuthProvider from "./provider/authProvider";
import UserProvider from "./provider/userProvider";
import Routes from "./routes";
import useSWR, { SWRConfig } from "swr";
import axios from "./lib/axios";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <TransactionProvider>
          <Toaster />
          <SWRConfig
            value={{
              refreshInterval: 0,
              fetcher: (resource) =>
                axios.get(resource).then((res) => res.data),
            }}
          >
            <Routes />
          </SWRConfig>
        </TransactionProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
