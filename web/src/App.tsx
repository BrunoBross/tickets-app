import "./App.css";
import Routes from "./components/Routes/Routes";
import { AuthProvider } from "./contexts/AuthContext";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
