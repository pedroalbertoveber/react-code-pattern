import { ItemsContextProvider } from "./contexts/ItemsContext";

type ProvidersProps = {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ItemsContextProvider>
      {children}
    </ItemsContextProvider>
  )
}