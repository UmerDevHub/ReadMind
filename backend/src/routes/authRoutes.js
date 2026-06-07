const express = require('express');
const router = express.Router();

// @route   GET /api/auth/github
// @desc    Initiate GitHub OAuth
router.get('/github', (req, res) => {
    res.json({ message: "GitHub OAuth flow will be implemented here" });
});

// @route   GET /api/auth/profile
// @desc    Get user profile
router.get('/profile', (req, res) => {
    res.json({ message: "User profile data will be returned here" });
});

module.exports = router;