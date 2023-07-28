import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/dashboard.jsx";
import NoPage from "./Components/noPage.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
