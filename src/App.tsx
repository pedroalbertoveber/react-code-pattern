import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { CartProvider } from "./contexts/CartContext";
import {Home} from "./pages/Home";

const queryClient = new QueryClient()

function App() {  
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Home />
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App
