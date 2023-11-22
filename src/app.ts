import express, { Application, Request, Response } from 'express';
import cors from 'cors';
const app: Application = express();

//parser----
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
 res.status(200).json({
      status:'success',
      message:'welcome To Order Management server'
 })
});

export default app;
