import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SimpleFirstPage from "./pages/simpleFirstPage";
import { ChakraProvider } from '@chakra-ui/react'


function App() {

  return (
    <ChakraProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/*" element={<SimpleFirstPage />} />
          </Routes>
        </Router>
      </div>
    </ChakraProvider>
  );
}

export default App;
