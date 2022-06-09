import { Router } from 'express';
import urlRoute from '~/routes/url.route';

const router = Router();

router.use('/url', urlRoute);

export default router;
