require('dotenv').config()
const { MongoClient } = require("mongodb");
const databaseURI = process.env.DB_URI;

async function exec(fungsi){
  const client = new MongoClient(databaseURI, {useUnifiedTopology: true});
  try{
    await client.connect();
    const database = client.db("pdl2020");
    const collection = database.collection("hotel");
    const cursor = await fungsi(collection);
    result = []
    await cursor.forEach((data) => result.push(data));
    if (result.length === 1) {
      return result[0];
    }
    return result;
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

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

async function aggregate(firstStage, secondStage, thirdStage, fourthStage){
  return await exec((collection) => collection.aggregate(firstStage, secondStage, thirdStage, fourthStage));
}

module.exports = {
	findOne, find, insertOne, updateOne, aggregate
}
