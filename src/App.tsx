import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { queryClient } from "./libs/react-query";
import { ToastContainer } from "react-toastify";
import RoutesProvider from "./routes";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer autoClose={5000} closeOnClick={true} draggable={true} />
      <BrowserRouter>
        <RoutesProvider />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
