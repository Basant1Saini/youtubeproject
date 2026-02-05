import express from 'express';
import { getVideos, getVideo, createVideo, updateVideo, deleteVideo, likeVideo, dislikeVideo } from '../controllers/videoController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getVideos);
router.get('/:id', getVideo);
router.post('/', protect, createVideo);
router.put('/:id', protect, updateVideo);
router.delete('/:id', protect, deleteVideo);
router.post('/:id/like', protect, likeVideo);
router.post('/:id/dislike', protect, dislikeVideo);

export default router;
