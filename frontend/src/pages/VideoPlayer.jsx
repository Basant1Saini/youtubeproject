import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import API from '../utils/api';
import { AuthContext } from '../context/AuthContext';

const VideoPlayer = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    API.get(`/videos/${id}`).then(res => setVideo(res.data));
    API.get(`/comments/${id}`).then(res => setComments(res.data));
  }, [id]);

  const handleLike = async () => {
    if (!user) return alert('Please login to like');
    const { data } = await API.post(`/videos/${id}/like`);
    setVideo(data);
  };

  const handleDislike = async () => {
    if (!user) return alert('Please login to dislike');
    const { data } = await API.post(`/videos/${id}/dislike`);
    setVideo(data);
  };

  const addComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const { data } = await API.post('/comments', { text: newComment, videoId: id });
    setComments([data, ...comments]);
    setNewComment('');
  };

  const editComment = async (commentId, text) => {
    const { data } = await API.put(`/comments/${commentId}`, { text });
    setComments(comments.map(c => c._id === commentId ? data : c));
    setEditingId(null);
  };

  const deleteComment = async (commentId) => {
    await API.delete(`/comments/${commentId}`);
    setComments(comments.filter(c => c._id !== commentId));
  };

  if (!video) return <div>Loading...</div>;

  return (
    <div className="video-player-page">
      <div className="video-container">
        <iframe src={video.videoUrl} title={video.title} allowFullScreen></iframe>
      </div>
      <div className="video-details">
        <h1>{video.title}</h1>
        <div className="video-actions">
          <span>{video.views} views</span>
          <div className="action-buttons">
            <button onClick={handleLike} className={video.likedBy?.includes(user?._id) ? 'active' : ''}>
              👍 {video.likes}
            </button>
            <button onClick={handleDislike} className={video.dislikedBy?.includes(user?._id) ? 'active' : ''}>
              👎 {video.dislikes}
            </button>
          </div>
        </div>
        <div className="channel-info">
          <h3>{video.channel?.name}</h3>
          <p>{video.description}</p>
        </div>
      </div>
      <div className="comments-section">
        <h3>{comments.length} Comments</h3>
        
        {user && (
          <form onSubmit={addComment} className="comment-form">
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button type="submit">Comment</button>
          </form>
        )}

        <div className="comments-list">
          {comments.map((c) => (
            <div key={c._id} className="comment">
              <strong>{c.user?.username}</strong>
              {editingId === c._id ? (
                <input defaultValue={c.text} onBlur={(e) => editComment(c._id, e.target.value)} />
              ) : (
                <p>{c.text}</p>
              )}
              {user?._id === c.user?._id && (
                <div className="comment-actions">
                  <button onClick={() => setEditingId(c._id)}>Edit</button>
                  <button onClick={() => deleteComment(c._id)}>Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
