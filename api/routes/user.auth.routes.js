import express from "express";
import { google, signOut, signin, signup } from "../controllers/user.auth.controller.js";

const app = express();

app.post('/signup', signup);
app.post('/signin', signin);
app.post('/google', google);
app.get('/signout', signOut);

export default app;