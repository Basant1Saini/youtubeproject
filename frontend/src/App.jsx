import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import VideoPlayer from './pages/VideoPlayer';
import Login from './pages/Login';
import Channel from './pages/Channel';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Header 
            onSearch={setSearchTerm} 
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
          />
          <div className="app-body">
            <Sidebar isOpen={sidebarOpen} />
            <main className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
              <Routes>
                <Route path="/" element={<Home searchTerm={searchTerm} />} />
                <Route path="/video/:id" element={<VideoPlayer />} />
                <Route path="/login" element={<Login />} />
                <Route path="/channel" element={<Channel />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
