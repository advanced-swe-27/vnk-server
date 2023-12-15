import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ErrorHandler, NotFound } from './middlewares';
import { IMessageResponse } from './interfaces';
import { AuthRoute, PorterRoute, ChiefPorterRoute, HallTutorRoute } from './routes';


require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(cookieParser());

app.get<{}, IMessageResponse>('/api', (req, res) => {
  res.json({
    message: 'VNK Server',
  });
});


// Routes

app.use('/api/porter', PorterRoute);
app.use('/api/chief-porter', ChiefPorterRoute);
app.use('/api/hall-tutor', HallTutorRoute);
app.use('/api/auth', AuthRoute);


// Middlewares
app.use(NotFound);
app.use(ErrorHandler);

export default app;
