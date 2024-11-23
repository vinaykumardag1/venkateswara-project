const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const NewModel=require("./model/User")
const { MongoClient } = require('mongodb');
const EventModel=require("./model/Admin");
const HolidayModel = require('./model/Holiday');

app.use(bodyParser.urlencoded({extended:false}));
app.use(cors())
app.use(express.json())
let uri='mongodb://localhost:27017/register'
mongoose.connect(uri)
         .then(()=>console.log("mongodb is connected"))
         .catch(err=>console.log(err))

app.post('/register',async (req, res) => {
    await NewModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.status(400).json("Error: " + err));
});
// 
app.get("/",(req,res)=>{
    res.send("backend works")
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find the user by email
        const user = await NewModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "Invalid email or password" });
        }

        // Compare passwords directly (no hashing)
        if (user.password !== password) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Login successful
        res.status(200).json({ message: "Login successful" });
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/adminlogin", async (req, res) => {
    const { username, password } = req.body;

    const client = new MongoClient(uri);

    try {
      // Connect to the MongoDB server
      await client.connect();
      console.log("Connected to MongoDB");
  
      // Get the database and collection
      const db = client.db("register");
      const collection = db.collection("adminlogin");
  
      // Find all documents in the collection
      const user = await collection.findOne({username:username})
      if(!user){
        res.json({message:"usernot found"})
      }
      
     if(user.password!==password){
        res.json({message:"invalid credentails"})
     }else{
        res.json({message:"suucess login"})
     }
    } catch (err) {
      console.error("Error:", err);
    }
});


  
// 
app.post('/api/save-date', async (req, res) => {
  const { date, event } = req.body;

  if (!date || !event) {
    return res.status(400).json({ error: 'Date and event are required.' });
  }

  try {
    const newEvent = new EventModel({ date, event }); // Adjust to match your model
    await newEvent.save();
    res.status(200).json({ message: 'Date and event saved successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save date and event.' });
  }
});

// 
app.get("/api/event",async (req,res)=>{
  try{
    const data = await EventModel.find({});

     res.json(data)
  }catch(error){
    res.json("error")
  }
})
app.delete("/api/event/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await EventModel.findByIdAndDelete(id);
  
    if (user) {
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// 
app.put("/api/event/update/:id", async (req, res) => {
  const { id } = req.params;
  const { date, event } = req.body;

  try {
    const updatedEvent = await EventModel.findByIdAndUpdate(
      id,
      { date, event },
      { new: true }
    );
    if (updatedEvent) {
      res.json({ message: "Event updated successfully", updatedEvent });
    } else {
      res.status(404).json({ error: "Event not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// holiday crud operations

app.post('/api/holiday', async (req, res) => {
  const { date, holiday } = req.body;

  if (!date || !holiday) {
    return res.status(400).json({ error: 'Date and event are required.' });
  }

  try {
    const newEvent = new HolidayModel({ date, holiday }); // Adjust to match your model
    await newEvent.save();
    res.status(200).json({ message: 'Date and event saved successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save date and event.' });
  }
});

// 
app.get("/api/holiday",async (req,res)=>{
  try{
    const data = await HolidayModel.find({});

     res.json(data)
  }catch(error){
    res.json("error")
  }
})
app.delete("/api/holiday/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await HolidayModel.findByIdAndDelete(id);
  
    if (user) {
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// 
app.put("/api/holiday/update/:id", async (req, res) => {
  const { id } = req.params;
  const { date, holiday } = req.body;

  try {
    const updatedEvent = await HolidayModel.findByIdAndUpdate(
      id,
      { date, holiday },
      { new: true }
    );
    if (updatedEvent) {
      res.json({ message: "Event updated successfully", updatedEvent });
    } else {
      res.status(404).json({ error: "Event not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});