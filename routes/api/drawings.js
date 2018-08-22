const express = require('express');
const router = express.Router();

// Load Drawing model
const Drawing = require('../../models/Drawing');

// @route   GET api/drawings/test
// @desc    Tests drawings route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Drawings works' }));

// @route   POST api/drawings/add
// @desc    Add drawing
// @access  Public
router.post('/add', (req, res) => {
  Drawing.findOne({ drwnum: req.body.drwnum, revison: req.body.revision }).then(
    drawing => {
      if (drawing) {
        return res
          .status('400')
          .json({ drwnum: 'Drawing and revision already exists' });
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

module.exports = router;
