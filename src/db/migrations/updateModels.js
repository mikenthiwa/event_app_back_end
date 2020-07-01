import mongoose from 'mongoose';
import {eventSchema} from "../models/Event";

const dbURI = 'mongodb+srv://admin:Kenya2019@cluster0-9lrtb.mongodb.net/Event_DB?retryWrites=true&w=majority';
mongoose.connect(dbURI,
    {useUnifiedTopology: true,  useNewUrlParser: true })
    .then(() => console.log('Database has successfully connected'))
    .catch(error => console.log(error)
);

const Event = mongoose.model('Event', eventSchema)

export const updateTable = async(cb) => {
    try {
        const response = await Event.getIndexes();

        console.log('>>>>>>>>>>', response)
        return cb()
    }catch (e) {
        console.log('!!!!!!', {...e});
        return e
    }
}

updateTable(() => mongoose.disconnect()).then(res => console.log(res));




