const express = require("express");
const router = express.Router();

// Load Drawing model
const Drawing = require("../../models/Drawing");

// @route   GET api/drawings/test
// @desc    Tests drawings route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Drawings works" }));

// @route   POST api/drawings/add
// @desc    Add drawing
// @access  Public
router.post("/add", (req, res) => {
  Drawing.findOne({ drwnum: req.body.drwnum, revison: req.body.revision }).then(
    drawing => {
      if (drawing) {
        return res
          .status("400")
          .json({ drwnum: "Drawing and revision already exists" });
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
  Drawing.find({}, function(err, drawings) {
    var drawingMap = {};
    debugger;
    if (drawings.length === 0) {
      return res.status(404).json({ msg: "No drawings found" });
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
router.post("/find", (req, res) => {
  const drwnum = req.body.drwnum;
  Drawing.findOne({ drwnum })
    .then(drawing => {
      if (!drawing) {
        return res.status("404").json({ drawing: "Drawing not found" });
      }

      return res.status("200").json(drawing);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
