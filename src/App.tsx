import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import store from "./redux/store";
import AppRoutes from "./routes";
import { GlobalStyles } from "./styles/globalStyles";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <GlobalStyles />
    <Toaster
      richColors
      position="top-right"
      closeButton
      toastOptions={{
        style: {
          height: "50px", // Set the height you want
          lineHeight: "50px", // Ensure the text is vertically centered
          padding: "0 10px", // Add padding as needed
        },
      }}
    />

    <QueryClientProvider client={queryClient}>
      <AppRoutes />
    </QueryClientProvider>
  </Provider>
);

export default App;
