import mongoose, { Schema } from "mongoose";
import  bcrypt  from "bcrypt";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,            //to remove white spaces e.g ma ry
            minLength: 1,            //to restrict the lenth of the words used
            maxLength: 20
        },

        password: {
            type: String,
            required: true,
            minLength: 6,
            maxLength: 20
        }, 

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,            
            
        }
    },

    {
        timestamps: true
    }
)

//before saving any password, we need to hash it (as they are visible in mongoDB which is a bad practice for security reasons)
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);     //hashing and salting

    next();

});
    
//to compare passwords
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model("User", userSchema);      //User here is the user requirements(i.e user model)