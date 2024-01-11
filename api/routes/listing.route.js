import express from "express";
import { allListings, createListing, deleteUserListing } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUserError.js";

const app = express();

app.post('/create', verifyToken ,createListing);
app.delete('/delete/:id', verifyToken, deleteUserListing);
app.get('allListing', verifyToken, allListings);

export default app;