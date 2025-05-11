import mongoose from 'mongoose';

export const connectDB = async () => {
    try{
        mongoose.connection.on('connected',() => console.log('MongoDB connected'));
        await mongoose.connect(`${process.env.MONGODB_URI}/cirqle`)
    }
    catch(error){
console.log('MongoDB connection error:');
    }
}