const mongoose=require("mongoose");
// const connection =mongoose.connect("mongodb+srv://atuldwivedi859:AtulDwivedi@cluster0.ohvwnav.mongodb.net/airline?retryWrites=true&w=majority");
const connection =mongoose.connect("mongodb+srv://atuldwivedi859:AtulDwivedi@cluster0.ffci8bd.mongodb.net/chatapplication?retryWrites=true&w=majority");
module.exports={
    connection
}