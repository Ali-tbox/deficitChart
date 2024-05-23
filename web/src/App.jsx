import { ChakraProvider } from "@chakra-ui/react";
import Root from "./app/Root";

function App() {
  return (
    <>
      <ChakraProvider>
        <Root />
      </ChakraProvider>
    </>
  );
}

export default App;
