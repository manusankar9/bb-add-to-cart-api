const myExpress = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const bodyparser = require('body-parser');

const corsConfig = require('./cors-config');

const app = myExpress();

const PORT = process.env.PORT  || 9090;


const url = `mongodb+srv://${process.env.USER_NAME_DB}:${process.env.PASSWORD_DB}@cluster0-5ahtq.mongodb.net`;


app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.listen(PORT, ()=> {

    console.log(`hmm listeneing ${PORT}`);

});

app.get("/", (req, res) => {	
  res.status(200).send("Welcome to Events API");	 
});


app.get('/addItems',cors(corsConfig),(request,response)=>{
		console.log(">>>>>>>:::::::::::")

console.log(">>>>>>>>>>>priority-events>>>>>>>>>");
MongoClient.connect(url,(err,db)=>{
	const collection = db.db("bb_add_to_cart").collection("addItems");
		collection.find().toArray((err,result)=>{
			if(err)throw err;
			response.json(result || []);
		});
	db.close();
	});

});

