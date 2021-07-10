import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import logger from 'morgan';
import express, { NextFunction, Response, Request } from 'express';
import MongoRouter from './routes/mongo/mongo.router';
import MySqlRouter from './routes/mysql/mysql.router';
import CreateMySqlTable from './model/createMySqlTable';

class App {
    public app: express.Application;
    public apiV1Routes: express.Router;

    constructor() {
        this.app = express();
        this.apiV1Routes = express.Router();
        this.initializeMiddleware();
        this.routes();
    }

    private initializeMiddleware() {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.raw());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(logger('[:date[web]] :method :url :status :res[content-length] - :remote-addr - :response-time ms'));

    }

    public async createDefaultTables() {
        try {
            await CreateMySqlTable.createTables()
        } catch (error) {
            console.log(error)
        }
    }

    public listen() {
        this.app.listen(process.env.SERVER_PORT, () => {
            console.log(`App listening on the port ${process.env.SERVER_PORT}`);
        });
    }

    private routes() {
        this.app.get('/', (req: Request, res: Response, next: NextFunction) => {
            res.send('Book Shop');
        });
        this.app.use('/api', this.apiV1Routes);
        // this.apiV1Routes.use('/mongo', MongoRouter);
        this.apiV1Routes.use('/mysql', MySqlRouter);
    }
}

export default App;