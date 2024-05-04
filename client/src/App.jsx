import { Toaster } from "./components/ui/toaster";
import TransactionProvider from "./provider/transactionProvider";
import AuthProvider from "./provider/authProvider";
import Routes from "./routes";
import useSWR, { SWRConfig } from "swr";
import axios from "@/lib/axios";

function App() {
  // const authAxios = useAuth(); // get the axios instance with the Authorization header from the AuthProvider
  return (
    <AuthProvider>
      <TransactionProvider>
        <Toaster />
        <SWRConfig
          value={{
            refreshInterval: 0,
            fetcher: (resource) => axios.get(resource).then((res) => res.data),
          }}
        >
          <Routes />
        </SWRConfig>
      </TransactionProvider>
    </AuthProvider>
  );
}

export default App;
