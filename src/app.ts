import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './app/modules/user/user.router';
const app: Application = express();

//parser----
app.use(express.json());
app.use(cors());
app.use('/api/users', userRoutes)


app.get('/', (req: Request, res: Response) => {
 res.status(200).json({
      status:'success',
      message:'welcome To Order Management server'
 })
});

export default app;
