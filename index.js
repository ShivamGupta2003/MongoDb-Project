const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

const methodOverride =require("method-override");

const Chat = require("./models/chat");
app.set("views", path.join(__dirname,"views"));
app.set("view engine ", "ejs");

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, 'public')));



main()
.then(()=>{console.log("connection successfull")})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/newwhatsapp');
    console.log("Connected to MongoDB");
}

//  let Chat1 = new Chat({
//     from:"neha",
//     to :"priya",
//     msg:"send me a message",
//     created_at:new Date(),

//  });
//   Chat1.save().then((res)=>{
//     console.log(res);
//   });


app.get("/", (req, res) => {
    res.send("Hello");
});

app.get("/chats",async (req, res)=>{
  let chats = await Chat.find();
//    console.log(chats);
//    res.send("root  is working");

 res.render("index.ejs",{chats});
 


});

 app.get("/chats/new",(req, res)=>{
    res.render("new.ejs");

 });

 app.post("/chats", (req, res)=>{
     let {from , to ,msg}=req.body;
     let newChat = new Chat({
        from: from ,
        to: to,
        msg : msg,
        created_at: new Date(),

     });
     newChat
     .save()
     .then((err)=>{
        console.log("chat is saved ");

     })
     .catch((err)=>{
        console.log(err);

     });



    res.redirect("/chats");

 });

//  edit route 

app.get("/chats/:id/edit",(req, res)=>{
     let {id} = req.params;
     Chat.findById(id)
     .then(chat => {
        if (chat) {
            console.log("Chat found:", chat);
            res.render("edit.ejs", {chat});
        } else {
            console.log("No chat found with that ID");
        }
    })
    .catch(err => {
        console.log("Error finding chat:", err);
    });

   

});


app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let { newMsg } = req.body;

    try {
        
        let updatedChat = await Chat.findByIdAndUpdate(
            id, 
            { msg: newMsg }, 
            { runValidators: true, new: true } 
        );

      
        if (!updatedChat) {
            return res.status(404).send("Chat not found");
        }

        console.log("Updated chat:", updatedChat);

        res.redirect("/chats");
    } catch (err) {
        console.log("Error updating chat:", err);
        res.status(500).send("Error updating chat");
    }
});


// delete
app.delete("/chats/:id", async (req, res) => {
    let { id } = req.params;

    try {
    
        let deletedChat = await Chat.findByIdAndDelete(id);

        if (!deletedChat) {
            return res.status(404).send("Chat not found");
        }

        console.log("Deleted chat:", deletedChat);

        res.redirect("/chats");
    } catch (err) {
        console.log("Error deleting chat:", err);
        res.status(500).send("Error deleting chat");
    }
});





app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
