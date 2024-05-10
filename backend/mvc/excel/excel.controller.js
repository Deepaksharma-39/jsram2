import express from "express";
import { downloadFile, uploadFile } from "./excel.service.js";
const excelRouter = express.Router();

// Excel Sheet Operations
excelRouter.post('/upload', uploadFile);
excelRouter.get('/download/:filename', downloadFile);

export default excelRouter;