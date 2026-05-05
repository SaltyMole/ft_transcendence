const express = require('express');
const router = express.Router();
const friendCtrl = require('../controllers/friend');
const auth = require('../middleware/auth');

router.post('/request', auth, friendCtrl.sendRequest);
router.post('/accept/:id', auth, friendCtrl.acceptRequest);
router.get('/', auth, friendCtrl.getFriends);
router.get('/pending', auth, friendCtrl.getPendingRequests);

module.exports = router;