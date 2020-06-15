import dotenv from 'dotenv';
import app from './app';


dotenv.config();

const port = process.env.PORT

const server = app();
server.listen(port, () => console.log(`listening in Port ${port}`))