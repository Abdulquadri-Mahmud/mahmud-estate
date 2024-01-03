import express from "express";
import { createListing } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUserError.js";

const app = express();

app.post('/create', verifyToken ,createListing)

export default app;