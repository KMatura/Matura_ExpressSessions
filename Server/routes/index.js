import express from 'express';
import { login, logout, register, getSecret } from '../controllers/index.js';
import { redirectLogin } from '../helper/redirect.js';

const router = express.Router();

router.post('/login', login);

router.get('/logout', logout);

router.post('/register', register);

router.get('/users/:id/secret', redirectLogin, getSecret);

router.get('/isauthenticated', isauthenticated);

export default router;
