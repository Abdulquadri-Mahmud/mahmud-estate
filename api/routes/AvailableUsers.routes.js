import express from 'express';
// import { verifyToken } from '../utils/verifyUserError';
import { AvailableUsers } from '../controllers/availableUsers.controller.js';
import { verifyToken } from '../utils/verifyUserError.js';

const app = express();

app.get('/availusers:id', verifyToken, AvailableUsers);

export default app;