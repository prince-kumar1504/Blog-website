import mongoose from "mongoose"


 const Connection = async (username,password) =>{

    const URL =`mongodb+srv://${username}:${password}@blog-app.ggq1oqi.mongodb.net/?retryWrites=true&w=majority`;
    try{

       await mongoose.connect(URL,{ useNewUrlParser:true });
       console.log('database connected succesfully')
    }catch(error){

        console.log('Error while connecting with the database',error)
    }
}

export default Connection;