import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => {
  res.send('Product created');
});

router.get('/', (req, res) => {
  res.send('Product list');
});
router.get('/:id', (req, res) => {
  console.log(req.params);
  res.send('Product ID: ' + req.params.id);
});

export default router;