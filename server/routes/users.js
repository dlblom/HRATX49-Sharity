const router = require('express').Router();
const db = require('../database');

router.get('/', (req, res) => {
  // make db queries and res.json the data
  res.json({data:['dolphins', 'manatees', 'sea turles']})
})

module.exports = router;