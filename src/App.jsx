import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/slate/bootstrap.min.css';

import AppNavbar from "./components/AppNavbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import DetailPage from "./pages/DetailPage";
import AddPage from './pages/AddPage';
import UpdatePage from "./pages/UpdatePage";
import CodeRunnerPage from "./pages/CodeRunnerPage";


function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Router>
        <AppNavbar />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/codesnippet_detail/:id" element={<DetailPage />} />
            <Route path="/add_codesnippet" element={<AddPage />} />
            <Route path="/update_codesnippet/:id" element={<UpdatePage />} />
            <Route path="/run_code" element={<CodeRunnerPage />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
