const express = require('express');
const path = require('path');
const User = require('../models/User.model');
const Json = require('../jsons/boots.json');

const { isAuthenticated } = require('../middleware/jwt.middleware');
const router = express.Router();

router.use(express.json());
router.use(express.static(path.join(__dirname, 'public')));

router.get('/')