import  express from "express";
import mysql from "mysql";
import { conn } from "../dbcon";
import { movie } from "../model/movie";
import { stars } from "../model/stars";
import { person } from "../model/person";
import { creators } from "../model/creators";

export const router = express.Router();
router.get("/",(req, res) => {
    res.send('hhhhh');
});

router.post("/movie", (req, res) => {
    const insertmovie: movie = req.body;
    console.log(insertmovie);
    
    let sql =
      "INSERT INTO `movie`( `namemovie`, `type`, `data`, `time`, `rate`) VALUES (?,?,?,?,?)";
    sql = mysql.format(sql, [
      insertmovie.namemovie,
      insertmovie.type,
      insertmovie.data,
      insertmovie.time,
      insertmovie.rate,
    ]);
    conn.query(sql, (err, result) => {
      if (err) throw err;
      res
        .status(201)
        .json({ affected_row: result.affectedRows, last_idx: result.insertId });
    });
  });


  router.post("/person", (req, res) => {
    const insertper: person = req.body;
    let sql =
      "INSERT INTO `person`( `nameper`, `birthday`, `dataper`) VALUES (?,?,?)";
    sql = mysql.format(sql, [
      insertper.nameper,
      insertper.birthday,
      insertper.dataper
    ]);
    conn.query(sql, (err, result) => {
      if (err) throw err;
      res
        .status(201)
        .json({ affected_row: result.affectedRows, last_idx: result.insertId });
    });
  });


  router.post("/stars", (req, res) => {
    const insertstars: stars = req.body;
    
    let sql =
      "INSERT INTO `stars`(`mid`,`pid`) VALUES (?,?)";
    sql = mysql.format(sql, [
        insertstars.mid,
        insertstars.pid
    ]);
    conn.query(sql, (err, result) => {
      if (err) throw err;
      res
        .status(201)
        .json({ affected_row: result.affectedRows, last_idx: result.insertId });
    });
  });

 

  router.post("/creators", (req, res) => {
    const insertcre: creators = req.body;
    
    let sql =
      "INSERT INTO `creators`(`mid`,`pid`) VALUES (?,?)";
    sql = mysql.format(sql, [
        insertcre.mid,
        insertcre.pid
    ]);
    conn.query(sql, (err, result) => {
      if (err) throw err;
      res
        .status(201)
        .json({ affected_row: result.affectedRows, last_idx: result.insertId });
    });
  });