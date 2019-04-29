import { MongoClient } from 'mongodb';

const mongoConnect = ({
  connection, host, port, dbName
}) => {
  let db = null;

  const connectUrl = `${connection}://${host}:${port}/${dbName}`;

  MongoClient.connect(
    connectUrl,
    (err, client) => {
      if (err) {
        console.error('MongoDB conntect error');
        throw err;
      }

      db = client.db('chat_vue');

      console.log('Client');

      db.collection('Users')
        .find()
        .toArray((err, result) => {
          if (err) throw err;

          console.log('Users', result);
        });
    }
  );

  return db;
};

export default mongoConnect;
