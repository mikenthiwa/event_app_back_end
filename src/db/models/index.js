import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbURI = process.env.DBURI;

const dbConnection = () => {
    mongoose.connect(dbURI,
        {useUnifiedTopology: true,  useNewUrlParser: true })
        .then(() => console.log('Database has successfully connected'))
        .catch(error => console.log(error));
    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        })
    })
}
export default dbConnection