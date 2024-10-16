import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  username: { type: String,required: true,},
  email: {type: String,required: true,unique: true,},
  password: {type: String,required: true,},
  profilePicture: {type: String, default: 'https://www.freepik.com/free-psd/3d-illustration-human-avatar-profile_58509057.htm#query=profile%20avatar&position=3&from_view=keyword&track=ais_hybrid&uuid=8f38738a-f658-43eb-8596-6748bbf75b89'},
  createdAt: {type: Date,default: Date.now},
  isAdmin:{type:Boolean,default:false}
});


const User = mongoose.model('User', userSchema);

export default User;
