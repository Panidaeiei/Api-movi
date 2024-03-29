import express from "express";
import { router as insert } from "./api/insert";
import { router as Deletes } from "./api/delete";
import { router as select } from "./api/select";
import bodyParser from "body-parser";
import cors from "cors";

export const app = express();
// app.use(
//     cors({
//         origin:"*",
//     })
// )
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use("/insert", insert);
app.use("/delete", Deletes);
app.use("/search", select);
