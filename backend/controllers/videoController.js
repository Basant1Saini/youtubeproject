import Video from '../models/Video.js';

export const getVideos = async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    if (category) {
      query.category = category;
    }

    const videos = await Video.find(query).populate('channel', 'name avatar').sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate('channel', 'name avatar description');
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    video.views += 1;
    await video.save();
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createVideo = async (req, res) => {
  try {
    const video = await Video.create({ ...req.body, channel: req.body.channelId });
    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json({ message: 'Video deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const likeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    const userId = req.user._id;

    // Check if user already liked
    const alreadyLiked = video.likedBy.includes(userId);
    const alreadyDisliked = video.dislikedBy.includes(userId);

    if (alreadyLiked) {
      // Remove like (toggle off)
      video.likedBy.pull(userId);
      video.likes -= 1;
    } else {
      // Add like
      video.likedBy.push(userId);
      video.likes += 1;
      // Remove dislike if exists
      if (alreadyDisliked) {
        video.dislikedBy.pull(userId);
        video.dislikes -= 1;
      }
    }

    await video.save();
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const dislikeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    const userId = req.user._id;

    // Check if user already disliked
    const alreadyDisliked = video.dislikedBy.includes(userId);
    const alreadyLiked = video.likedBy.includes(userId);

    if (alreadyDisliked) {
      // Remove dislike (toggle off)
      video.dislikedBy.pull(userId);
      video.dislikes -= 1;
    } else {
      // Add dislike
      video.dislikedBy.push(userId);
      video.dislikes += 1;
      // Remove like if exists
      if (alreadyLiked) {
        video.likedBy.pull(userId);
        video.likes -= 1;
      }
    }

    await video.save();
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
