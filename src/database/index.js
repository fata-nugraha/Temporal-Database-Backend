require('dotenv').config()
const { MongoClient } = require("mongodb");
const databaseURI = process.env.DB_URI;

async function exec(func){
  const client = new MongoClient(databaseURI, {useUnifiedTopology: true});
  try{
    await client.connect();
    const database = client.db("pdl2020");
    const collection = database.collection("hotel");
    await func(collection);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}
/*
async function findOne(query, options){
	return await exec((collection) => collection.find(query, options).limit(1));
}

async function find(query, options){
  return await exec((collection) => collection.find(query, options));
}

async function insertOne(query){
  return await exec((collection) => collection.insertOne(query));
}

async function updateOne(id, set){
  return await exec((collection) => collection.updateOne(id, set));
}

async function max(firstStage, secondStage, thirdStage, fourthStage){
  return await exec((collection) => collection.aggregate(firstStage, secondStage, thirdStage, fourthStage).limit(1));
}

async function aggregate(firstStage, secondStage, thirdStage, fourthStage){
  return await exec((collection) => collection.aggregate(firstStage, secondStage, thirdStage, fourthStage));
}

async function preceed(firstStage, secondStage, thirdStage, fourthStage){
  return await exec((collection) => collection.aggregate(firstStage, secondStage, thirdStage, fourthStage));
}*/

module.exports = {
	exec, /*findOne, find, insertOne, updateOne, max, aggregate, preceed*/
}
