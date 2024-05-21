import connectDB from './db/index.js';
import dotenv from 'dotenv';
import { app }from './app.js';

dotenv.config(
    {
        path: './env'
    }
);

connectDB()
.then(() => app.listen(process.env.PORT, ()=> console.log('listening on port ' + process.env.PORT)))
.catch((error) => console.error("Error While Connecting With DB: ", error))