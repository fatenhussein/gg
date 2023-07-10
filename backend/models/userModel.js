import mongoose from 'mongoose';

//defines a Mongoose schema for the User 
//The schema is used to create a Mongoose model named 'User' using mongoose.model.
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
      isAdmin: { type: Boolean, default: false, required: true },
     
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
export default User;