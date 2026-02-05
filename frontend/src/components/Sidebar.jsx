import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-item" onClick={() => navigate('/')}>🏠 Home</div>
      <div className="sidebar-item">🔥 Trending</div>
      <div className="sidebar-item">📚 Library</div>
      <div className="sidebar-item">⏱️ History</div>
      <div className="sidebar-item">👍 Liked Videos</div>
    </aside>
  );
};

export default Sidebar;
