const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const logger = require('../services/logger')
const url = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;
const collection = 'todos';

async function saveTodo(todo) {
    try {
        const client = await MongoClient.connect(url, { useUnifiedTopology: true });
        const db = client.db(dbName);
        const todoCollection = db.collection(collection);
        await todoCollection.insertOne(todo);
        client.close();
        logger.logInformation('todo saved into database')
        return todo;
    }
    catch (e) {
        logger.logError('failed to enter todo into database: ', e);
        return throwError(e);
    }
}

async function getTodos(userId) {
    try {
        const client = await MongoClient.connect(url, { useUnifiedTopology: true });
        const db = client.db(dbName);
        const todoCollection = db.collection(collection);
        const result = await todoCollection.find({ userId }).toArray();
        client.close();
        result.forEach(res => {
            res.id = res._id;
            delete res._id;
        })
        logger.logInformation('fetched todos')
        return result;
    }
    catch (e) {
        logger.logError('failed fetch todos: ', e);
        return throwError(e);
    }
}

async function markTodoDone(todoId) {
    try {
        const client = await MongoClient.connect(url, { useUnifiedTopology: true });
        const db = client.db(dbName);
        const todoCollection = db.collection(collection);
        const result = await todoCollection.updateOne(
            { _id: ObjectId(todoId) },
            {
                $set: {
                    done: true,
                }
            }
        )
        client.close();
        logger.logInformation('todo marked done')
        return result;
    }
    catch (e) {
        logger.logError('failed to update todo item: ', e);
        return throwError(e);
    }
}

async function deleteTodo(todoId) {
    try {
        const client = await MongoClient.connect(url, { useUnifiedTopology: true });
        const db = client.db(dbName);
        const todoCollection = db.collection(collection);

        await todoCollection.deleteOne({ _id: ObjectId(todoId) })
        client.close();
        logger.logInformation('todo item deleted');
    }
    catch (e) {
        logger.logError('failed to delete todo item: ', e);
    }
}

module.exports = { saveTodo, getTodos, markTodoDone, deleteTodo };
