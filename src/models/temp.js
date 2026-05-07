import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
  {
    $match: {
      product: new ObjectId("69fb182fe488e2bfe8e31e84"),
    },
  },
  {
    $group: {
      _id: null,
      averageRating: {
        $avg: "$rating",
      },
      numOfReviews: {
        $sum: 1,
      },
    },
  },
];

const client = await MongoClient.connect(
  "mongodb://ac-mi3cnip-shard-00-01.alqas3g.mongodb.net,ac-mi3cnip-shard-00-00.alqas3g.mongodb.net,ac-mi3cnip-shard-00-02.alqas3g.mongodb.net/?tls=true&authMechanism=MONGODB-X509&authSource=%24external&serverMonitoringMode=poll&maxIdleTimeMS=30000&minPoolSize=0&maxPoolSize=5&maxConnecting=6&replicaSet=atlas-c0k5z3-shard-0&appName=Data+Explorer--66cd9f5636fc6210f909500a",
);
const coll = client.db("e-commerce").collection("reviews");
const cursor = coll.aggregate(agg);
const result = await cursor.toArray();
await client.close();
