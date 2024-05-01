import {Router, Request, Response, NextFunction} from 'express';
import {createVendor, getVendorById, getVendors} from '../controllers';

const router = Router();

router.post('/', createVendor);
router.get('/', getVendors);
router.get('/:id', getVendorById);

export {router as VendorRoute};
