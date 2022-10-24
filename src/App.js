import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import { ChakraProvider } from '@chakra-ui/react'
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";

function App() {

  return (
    <ChakraProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </div>
    </ChakraProvider>
  );
}

export default App;
