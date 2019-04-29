import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  // res.render("index", { title: "Express" });
  res.json({ message: 'azazaz' });
});

router.post('/login', (req, res) => {
  res.json({ message: 'azazaz' });
});

export default router;
