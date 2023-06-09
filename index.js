const express = require("express");
const { connection } = require("./config/db");
const {user_router}=require("./routes/user.routes");
const {authhenticate}=require("./middleware/authenticate.middleware");
const cors=require("cors");
const app = express();
app.use(express.json());
app.get("/api", (req, res) => {
    res.send("Welcome");
})
app.use(cors({
    origin: '*'
}));

app.use("/api",user_router); 
app.use(authhenticate);
//app.use("/api/chats",note_router);
app.listen(4500, async () => {
    try {
        await connection;
        console.log("Connected to Db");
    } catch (error) {
        console.log(error);
        console.log("Problem in db");
    }
    console.log("4500 running");
})

