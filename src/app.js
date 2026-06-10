import express from "express";

const app = express();   //creates an express app

app.use(express.json());  //so the server can pass the json req from the client side

//import routes
import userRouter from "./routes/user.route.js";


//declare routes (using the express application)
app.use("/api/v1/users", userRouter);

//example route: http://localhost:1998/api/v1/users/register



//will be used in another file so we need to export it
export default app;
