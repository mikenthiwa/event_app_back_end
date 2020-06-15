import mongoose from 'mongoose';

const dbConnection = () => {
    mongoose.connect('mongodb+srv://admin:Kenya2019@cluster0-9lrtb.mongodb.net/Event_DB?retryWrites=true&w=majority',
        {useUnifiedTopology: true,  useNewUrlParser: true })
        .then(() => console.log('Database has successfully connected'))
        .catch(error => console.log(error));
}
export default dbConnection