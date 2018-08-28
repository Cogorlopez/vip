const express = require("express");
const router = express.Router();
const sql = require("mssql");

// Load input validtation
const validateAddDrawingInput = require("../../validation/addDrawing");
const validateSearchDrawingInput = require("../../validation/searchDrawing");

// Load Drawing model
const Drawing = require("../../models/Drawing");

// DB Config
const config = {
  user: "vip",
  password: "vip123",
  server: "CS-SQL-VIP-US-DEV-001", // You can use 'localhost\\instance' to connect to named instance
  database: "VIP",

  options: {
    encrypt: true // Use this if you're on Windows Azure
  }
};

// @route   GET api/drawings/test
// @desc    Tests drawings route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Drawings works" }));

// @route   POST api/drawings/add
// @desc    Add drawing
// @access  Public
router.post("/add", (req, res) => {
  const { errors, isValid } = validateAddDrawingInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Drawing.findOne({ drwnum: req.body.drwnum, revison: req.body.revision }).then(
    drawing => {
      if (drawing) {
        errors.drwnum = "Drawing and revision already exists";
        return res.status("400").json(errors);
      } else {
        const newDrawing = new Drawing({
          drwnum: req.body.drwnum,
          revision: req.body.revision,
          description: req.body.description
        });

        newDrawing
          .save()
          .then(drawing => res.json(drawing))
          .catch(err => console.log(err));
        //   return res.status('200')
      }
    }
  );
});

// @route   GET api/drawings/getall
// @desc    Retrieve all drawings in DB
// @access  Public
router.get("/getall", (req, res) => {
  // const { errors, isValid } = validateAddDrawingInput(req.body);

  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }

  Drawing.find({}, function(err, drawings) {
    var drawingMap = {};
    debugger;
    if (drawings.length === 0) {
      errors.msg = "No drawings found";
      return res.status(404).json(errors);
    }
    drawings.forEach(drawing => {
      drawingMap[drawing._id] = drawing;
    });

    res.send(drawingMap);
  });
});

// @route   POST api/drawings/find
// @desc    Retrieve specified drawing
// @access  Public
router.get("/find", (req, res) => {
  const { errors, isValid } = validateSearchDrawingInput(req.body);
  debugger;
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const drwnum = req.body.drwnum;
  Drawing.findOne({ drwnum })
    .then(drawing => {
      if (!drawing) {
        errors.drwnum = "Drawing not found";
        return res.status("404").json(errors);
      }

      return res.status("200").json(drawing);
    })
    .catch(err => {
      console.log(err);
    });
});

// @route   POST api/documents/find
// @desc    Finds specified document
// @access  Public
router.post("/finddrawing", (req, res) => {
  const drawingNumber = req.body.drwnum;
  debugger;

  sql
    .connect(config)
    .then(pool => {
      // Query

      return pool
        .request()
        .input("input_parameter", sql.VarChar, drawingNumber)
        .query(
          "select Document.Id, Document.Name, Document.Revision, Document.title, Document.Models from Document where Document.Name = @input_parameter and Document.PublisherId = 1"
        );
      // .query(
      //   "select [File].DocId, [File].Directory, Document.Name, Document.Revision, Document.title, Document.Models from [File] Inner join Document on [File].DocId = Document.Id where Document.Name = @input_parameter" select Document.Id, Document.Name, Document.Revision, Document.title, Document.Models from Document where Document.Name = '20q260'
      // );
    })
    .then(result => {
      if (result.rowsAffected[0] === 0) {
        sql.close();
        return res.status(404).json({ douments: "No documents found" });
      } else {
        //console.dir(result);
        sql.close();
        return res.status(200).json(result);
      }
    })
    .catch(err => {
      // ... error checks
      console.log(err);
    });

  sql.on("error", err => {
    // ... error handler
    console.log(err);
  });
  //   sql.close();
});

module.exports = router;
