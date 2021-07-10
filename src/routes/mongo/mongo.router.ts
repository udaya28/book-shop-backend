import * as express from "express";

class Mongo {
    public router: express.Router;
    constructor() {
        this.router = express.Router();
        this.configRoutes();
    }

    private configRoutes() {
        console.log("MongoDb routes")
    }
}

const MongoRouter = new Mongo().router;
export default MongoRouter;