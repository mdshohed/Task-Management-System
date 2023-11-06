const express = require('express')
const cors = require('cors');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors());
app.use(express.json()); 

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fvd5zsp.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri,{serverApi: {version: ServerApiVersion.v1,strict: true,deprecationErrors: true,}});


async function run(){
  try{
    await client.connect();
    const userCollection = client.db("task_management").collection("users");
    // const taskCollection = client.db("task_management").collection("task");

    // Get all users
    app.get('/api/users', async(req, res)=>{
      const query = {};
      const cursor = userCollection.find(query);
      const users = await cursor.toArray();
      console.log(users); 
      res.send(users);
    })

    // Post user
    app.post('/api/users', async(req, res)=>{
      const newUser = req.body;
      try{
        const check = await userCollection.findOne({email:newUser.email}); 
        if(check){
          res.json("exist"); 
        }
        else {
          await userCollection.insertOne(newUser); 
          res.json("notexist"); 
        }
      }
      catch(e){
        res.json("Server Error");  
      }
    });

    app.post('/api/users/login', async(req, res)=>{
      const{email, password} = req.body; 
      try{
        let check = await userCollection.findOne({email:email});   
        console.log(check); 
        if(check.email===email && password===check.password){
            // const token = await jwt.sign({email: email}, jwt_secret,{
            //   expiresIn: 10,
            // });
            res.json({status: "ok"});  
        }

        else if(check){
          res.json({status: "error"});
        }
        else{
          res.json({status: "error2" });
        }
         
      }
      catch(e){
        res.json("Invalid User");  
      }
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