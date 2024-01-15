import express from "express";
import { createListing, deleteUserListing, updateListings } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUserError.js";

const app = express();

app.post('/create', verifyToken ,createListing);
app.delete('/delete/:id', verifyToken, deleteUserListing);
app.post('/update/:id', verifyToken, updateListings);

export default app;