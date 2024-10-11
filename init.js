const mongoose =require("mongoose");
const Chat = require("./models/chat.js");


main()
.then(()=>{
    console.log("connection is successful");

})
.catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/newwhatsapp");

  
}

let allchats = [
  
    {
        from: "nehha",
        to: "priya",
        msg: "hello",
        created_at: new Date(),
    },
    {
        from: "nesha",
        to: "priya",
        msg: "hello",
        created_at: new Date(),
    },   
];

  


Chat.insertMany(allchats); 