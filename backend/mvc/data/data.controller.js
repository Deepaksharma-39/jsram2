import express from "express";

import { getPaginatedfilterData, getPaginatedResult, getUniqueCities, searchAndPaginate, uploadData } from "./data.service.js";

const dataRouter = express.Router();

// DB Operations
dataRouter.post('/upload', uploadData);
dataRouter.get('/readPagination', getPaginatedResult);
dataRouter.get('/search', searchAndPaginate);
dataRouter.post('/filter', getPaginatedfilterData);
dataRouter.get('/uniqueCities', getUniqueCities);

export default dataRouter;