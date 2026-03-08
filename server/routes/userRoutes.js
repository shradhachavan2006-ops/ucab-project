const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require('../controllers/userController');
const { authUser } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multer');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authUser, getUserProfile);
router.put('/profile', authUser, upload.single('profileImage'), updateUserProfile);

module.exports = router;
