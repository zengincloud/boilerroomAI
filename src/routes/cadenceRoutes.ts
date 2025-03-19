import express from 'express';
import { CadenceController } from '../controllers/cadenceController';

const router = express.Router();
const cadenceController = new CadenceController();

router.get('/cadences', cadenceController.getAllCadences);
router.post('/cadences', cadenceController.createCadence);
router.get('/cadences/:id', cadenceController.getCadenceById);

export default router; 