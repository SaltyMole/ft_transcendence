const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const uploadCtrl = require('../controllers/upload');

router.post('/', auth, multer, uploadCtrl.uploadAvatar);

module.exports = router;