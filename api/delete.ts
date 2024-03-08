import express from "express";
import { conn } from "../dbcon";

export const router = express.Router();

router.delete("/demovie/:id", (req, res) => {
    let id = +req.params.id;
    conn.query("delete from movie where mid = ?", [id], (err, result) => {
        if (err) throw err;
        res.status(200).json({
            affected_row: result.affectedRows
        });
    });
});

router.delete("/deperson/:id",(req,res)=>{
    let id=+req.params.id;
    conn.query("delete from person where pid = ?",[id], (err,result) => {
        if (err) throw err;
        res.status(200).json({
            affected_row: result.affectedRows
        });
    });
});

router.delete("/destars/:id",(req,res)=>{
    let id=+req.params.id;
    conn.query("delete from stars where sid = ?",[id], (err,result) => {
        if (err) throw err;
        res.status(200).json({
            affected_row: result.affectedRows
        });
    });
});

router.delete("/decre/:id",(req,res)=>{
    let id=+req.params.id;
    conn.query("delete from creators where cid = ?",[id], (err,result) => {
        if (err) throw err;
        res.status(200).json({
            affected_row: result.affectedRows
        });
    });
});