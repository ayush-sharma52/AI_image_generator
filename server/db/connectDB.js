import mongoose, { connect } from "mongoose";

const connectDB=(uri)=>{

mongoose.set('strictQuery',true);

mongoose.connect(uri)
.then(() => console.log('MongoDb connected')  )
.catch(err=> console.log(err)  )
}
export default connectDB;