//import the info from dotenv file (npm i dotenv )
//dotenv not .env

import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./app.js";

dotenv.config({
    path: './.env'           //./. shows the path inside of the folder where the .env file is

});

//starting the server

const startServer= async () => {
    try {
        await connectDB();       //add the .js when line 5 is  automatically imported
          
        //switching on the server
        app.on("error", (error) => {
            console.log("ERROR", error);
            throw error;
        });

        //for app to listen to a port(where info comes in)
        app.listen(process.env.PORT || 4000, () => {
           console.log(`Server is running on port:
            ${process.env.PORT}`);
           
        });

    } catch (error) {
        console.log("MongoDB connection failed!", error);
        
    }
}

startServer();