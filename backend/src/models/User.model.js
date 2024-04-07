import mongoose, {Schema} from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
            index: true,
        },
        email:{
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
        avatar: {
            type: String,
            required:false,
        },
        password:{
            type:String,
            requred:true
        },
        refreshToken:{
            type: String
        }
    },
    {
        timestamps:true
    }
)

export const User = mongoose.model("User",userSchema);