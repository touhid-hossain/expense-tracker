import { Toaster } from "./components/ui/toaster";
import TransactionProvider from "./provider/transactionProvider";
import AuthProvider from "./provider/authProvider";
import Routes from "./routes";
import { SWRConfig } from "swr";
import axios from "@/lib/axios";

function App() {
  return (
    <SWRConfig
      value={{
        refreshInterval: 0,
        revalidateOnFocus: false,
        fetcher: (resource) => axios.get(resource).then((res) => res.data),
      }}
    >
      <AuthProvider>
        <TransactionProvider>
          <Toaster />
          <Routes />
        </TransactionProvider>
      </AuthProvider>
    </SWRConfig>
  );
}

export default App;
