import express from "express";
import { signin, signup } from "../controllers/user.auth.controller.js";

const app = express();

app.post('/signup', signup);
app.post('/signin', signin);

export default app;