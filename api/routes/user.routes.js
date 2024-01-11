import express from "express";
import { deleteUser, update, getUserListing } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUserError.js";

const app = express();

app.post('/update/:id',verifyToken, update);
app.delete('/delete/:id', verifyToken, deleteUser);
app.get('/listings/:id', verifyToken, getUserListing);

export default app;