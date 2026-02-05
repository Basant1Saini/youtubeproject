import { useState, useEffect, useContext } from 'react';
import API from '../utils/api';
import { AuthContext } from '../context/AuthContext';

const Channel = () => {
  const { user } = useContext(AuthContext);
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [showCreateChannel, setShowCreateChannel] = useState(false);
  const [showVideoForm, setShowVideoForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [channelForm, setChannelForm] = useState({ name: '', description: '' });
  const [videoForm, setVideoForm] = useState({ title: '', description: '', videoUrl: '', thumbnail: '', category: 'Technology' });

  useEffect(() => {
    if (user) fetchChannel();
  }, [user]);

  const fetchChannel = async () => {
    try {
      const { data: channels } = await API.get('/channels');
      const userChannel = channels.find(c => c.owner === user._id);
      if (userChannel) {
        setChannel(userChannel);
        fetchVideos(userChannel._id);
      } else {
        setShowCreateChannel(true);
      }
    } catch (error) {
      console.error('Error fetching channel:', error);
    }
  };

  const fetchVideos = async (channelId) => {
    try {
      const { data } = await API.get(`/channels/${channelId}`);
      setVideos(data.videos || []);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const handleCreateChannel = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/channels', channelForm);
      setChannel(data);
      setShowCreateChannel(false);
    } catch (error) {
      alert(error.response?.data?.message || 'Error creating channel');
    }
  };

  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingVideo) {
        await API.put(`/videos/${editingVideo._id}`, videoForm);
      } else {
        await API.post('/videos', { ...videoForm, channelId: channel._id });
      }
      fetchVideos(channel._id);
      setShowVideoForm(false);
      setEditingVideo(null);
      setVideoForm({ title: '', description: '', videoUrl: '', thumbnail: '', category: 'Technology' });
    } catch (error) {
      alert(error.response?.data?.message || 'Error saving video');
    }
  };

  const handleDeleteVideo = async (videoId) => {
    if (!confirm('Delete this video?')) return;
    try {
      await API.delete(`/videos/${videoId}`);
      fetchVideos(channel._id);
    } catch (error) {
      alert('Error deleting video');
    }
  };

  const handleEditVideo = (video) => {
    setEditingVideo(video);
    setVideoForm({
      title: video.title,
      description: video.description,
      videoUrl: video.videoUrl,
      thumbnail: video.thumbnail,
      category: video.category
    });
    setShowVideoForm(true);
  };

  if (!user) return <div className="channel-page">Please login to manage your channel</div>;

  if (showCreateChannel) {
    return (
      <div className="channel-page">
        <form className="channel-form" onSubmit={handleCreateChannel}>
          <h2>Create Your Channel</h2>
          <input
            type="text"
            placeholder="Channel Name"
            value={channelForm.name}
            onChange={(e) => setChannelForm({ ...channelForm, name: e.target.value })}
            required
          />
          <textarea
            placeholder="Channel Description"
            value={channelForm.description}
            onChange={(e) => setChannelForm({ ...channelForm, description: e.target.value })}
          />
          <button type="submit">Create Channel</button>
        </form>
      </div>
    );
  }

  return (
    <div className="channel-page">
      <div className="channel-header">
        <h1>{channel?.name}</h1>
        <p>{channel?.description}</p>
        <button onClick={() => setShowVideoForm(true)}>Upload Video</button>
      </div>

      {showVideoForm && (
        <form className="video-form" onSubmit={handleVideoSubmit}>
          <h3>{editingVideo ? 'Edit Video' : 'Upload Video'}</h3>
          <input
            type="text"
            placeholder="Title"
            value={videoForm.title}
            onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={videoForm.description}
            onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
          />
          <input
            type="text"
            placeholder="Video URL"
            value={videoForm.videoUrl}
            onChange={(e) => setVideoForm({ ...videoForm, videoUrl: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Thumbnail URL"
            value={videoForm.thumbnail}
            onChange={(e) => setVideoForm({ ...videoForm, thumbnail: e.target.value })}
          />
          <select
            value={videoForm.category}
            onChange={(e) => setVideoForm({ ...videoForm, category: e.target.value })}
          >
            <option>Technology</option>
            <option>Gaming</option>
            <option>Music</option>
            <option>Education</option>
            <option>Entertainment</option>
            <option>Sports</option>
          </select>
          <div className="form-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={() => { setShowVideoForm(false); setEditingVideo(null); }}>Cancel</button>
          </div>
        </form>
      )}

      <div className="channel-videos">
        <h2>Your Videos ({videos.length})</h2>
        <div className="video-grid">
          {videos.map((video) => (
            <div key={video._id} className="video-item">
              <img src={video.thumbnail} alt={video.title} />
              <h3>{video.title}</h3>
              <p>{video.views} views</p>
              <div className="video-actions">
                <button onClick={() => handleEditVideo(video)}>Edit</button>
                <button onClick={() => handleDeleteVideo(video._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Channel;
