import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = ({ onSearch, onToggleSidebar }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-btn" onClick={onToggleSidebar}>☰</button>
        <h1 className="logo" onClick={() => navigate('/')}>YouTube</h1>
      </div>
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">🔍</button>
      </form>
      <div className="header-right">
        {user ? (
          <>
            <span className="user-name">{user.username}</span>
            <button onClick={() => navigate('/channel')}>My Channel</button>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <button onClick={() => navigate('/login')}>Sign In</button>
        )}
      </div>
    </header>
  );
};

export default Header;
