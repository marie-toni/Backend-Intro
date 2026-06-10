//importing mongoose (a node.js library) to activate the dbjs
//server-> <- mongoose-> <-database (intermediary)
//mongoose heps us structure the datatypes (which will be created in the models section)

import mongoose from "mongoose"; 

//connecting to the db

const connectDB = async ()  => {                                //async- declares a function that can handle waiting 

    try  {
        const connectionInstance = await mongoose.connect(      //await- waits for task to finish inside that function before starting another
        process.env.MONGODB_URI
        );                      //shows what we'll be using, .env, the uri
        console.log(`\n MongoDB connected!
            ${connectionInstance.connection.host}`);             //write your comment in line 14 //in line 15, this will tell the address of the connection instance

    } catch (error) {
        console.log("connection failed", error);    //displays the error if there's any
        process.exit(1)                   //to exit this task (waited on by await)

    }
}

export default connectDB;    //to export this file




