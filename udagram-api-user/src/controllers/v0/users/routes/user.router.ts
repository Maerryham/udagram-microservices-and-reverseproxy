import {Router, Request, Response} from 'express';

import {User} from '../models/User';
import {AuthRouter} from './auth.router';

const router: Router = Router();

router.use('/auth', AuthRouter);

router.get('/');

router.get('/:id', async (req: Request, res: Response) => {
  // -- Logging --
  const logStartTime = new Date();
  const {id} = req.params;
  const item = await User.findByPk(id);
  
  console.info(
    'users/:id',
    JSON.stringify({
      input: req.body,
      output: {
        statusCode: 200,
        body: JSON.stringify(item),
      },
      requestType: 'POST',
      startTime: logStartTime.toISOString(),
      durationInMs: new Date().getTime() - logStartTime.getTime(),
    })
  );
  res.send(item);
});

export const UserRouter: Router = router;
