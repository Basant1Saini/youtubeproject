import { useState, useEffect } from 'react';
import API from '../utils/api';
import VideoCard from '../components/VideoCard';

// Category buttons
const categories = ['All', 'Technology', 'Gaming', 'Music', 'Education', 'Entertainment', 'Sports'];

const Home = ({ searchTerm }) => {
  const [videos, setVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Fetch videos when search or category changes
  useEffect(() => {
    fetchVideos();
  }, [searchTerm, selectedCategory]);

  // Get videos from API
  const fetchVideos = async () => {
    try {
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (selectedCategory !== 'All') params.category = selectedCategory;
      
      const { data } = await API.get('/videos', { params });
      setVideos(data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  return (
    <div className="home">
      <div className="categories">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="video-grid">
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default Home;
