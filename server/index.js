const express = require('express')
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express()
app.use(cors(
//   {
//   origin: ["https://task-manager-client-one.vercel.app"],
//   methods: ["GET", "POST"],
//   credentials: true
// }
));
app.use(express.json()); 

// const verifyUser = (req, res, next) =>{
//   const token = req.cookies.token;
//   if(!token){
//     return res.json("The token was not available");
//   }else{
//     jwt.verify(token, "jwt-secret-key",(err, req)=>{
//       if(err){
//         return res.json("Token is Wrong");
//       }
//       next();
//     })
//   }
// }

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4nidofz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri,{serverApi: {version: ServerApiVersion.v1,strict: true,deprecationErrors: true,}});

async function run(){
  try{
    await client.connect();
    const userCollection = client.db("task_management").collection("users");
    const taskCollection = client.db("task_management").collection("task");

    // Get all users
    app.get('/api/users', async(req, res)=>{
      const query = {};
      const cursor = userCollection.find(query);
      const users = await cursor.toArray();

      res.send(users);
    })

    // Create a User Using: Post "api/users"
    app.post('/api/users', async(req, res)=>{
      const newUser = req.body;
      try{
        const user = await userCollection.findOne({email:newUser.email});
        if(user){
          return res.json({status: false, error: "Sorry a user with this email already exists"}); 
        }
        bcrypt.hash(newUser.password, 10)
        .then(hash=>{
          newUser.password = hash;
          userCollection.insertOne(newUser); 
          return res.json({status: true, success: "User Successfully Added!"})
        }).catch(err=>{
          console.log(err)
        })
      }
      catch(e){
        return res.json("Server Error!");  
      }
    });

    app.post('/api/user/login', async(req, res)=>{
      const{email, password} = req.body; 
      userCollection.findOne({email:email})
      .then(user=>{
          if(user){
            bcrypt.compare(password, user.password, (err, response)=>{
              if(response){
                const token = jwt.sign({id: user._id, email: user.email},  "jwt-secret-key", {expiresIn: "1d"})
                
                return res.json({token: token, login: true, user, success: "Successfully Login!"}); 
              }
              else{
                return res.json({login: false, error: "the password is incorrect!"})
              }
            });
          }else{
            return res.json({login: false, error: "No Record existed"});
          }
      })
    });

    // Task operation
    app.get('/api/task', async (req, res) => {
      const query = {};
      const task = await taskCollection.find(query).toArray();
      return res.send(task);
    });

    app.post('/api/task',  async (req, res) => {
      const newTask = req.body;
      try{
        await taskCollection.insertOne(newTask);
        res.json({status: "ok"});  
      }
      catch(e){
        res.json("Server Error");  
      }
    });
    app.get('/api/task/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}; 
      const task = await taskCollection.findOne(query); 
      res.send(task); 
    })

    app.delete('/api/task/:id', async(req, res)=>{
      const id = req.params.id; 
      const query = {_id: new ObjectId(id)};
      const result = await taskCollection.deleteOne(query);
      res.send(result);  
    });


   app.post( '/api/task/:id', async (req, res) => {
      const id = req.params.id;
      const updatedTask = req.body;
      
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          taskName: updatedTask.taskName,
          taskDescription: updatedTask.taskDescription
        },
      };
      taskCollection.updateOne(
        query,
        updatedDoc,
        options
      );
      res.send("Task updated");
    });

  }finally{
    // await client.close();
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Task management listening on port ${port}`)
}) 