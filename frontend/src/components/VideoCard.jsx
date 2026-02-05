import { useNavigate } from 'react-router-dom';

const VideoCard = ({ video }) => {
  const navigate = useNavigate();

  return (
    <div className="video-card" onClick={() => navigate(`/video/${video._id}`)}>
      <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
      <div className="video-info">
        <h3 className="video-title">{video.title}</h3>
        <p className="video-channel">{video.channel?.name}</p>
        <p className="video-stats">{video.views} views</p>
      </div>
    </div>
  );
};

export default VideoCard;
