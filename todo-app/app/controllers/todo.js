const express = require('express');
const router = express.Router();
const { json } = require('body-parser')
const cors = require('cors')
const db = require('../services/db-handler')
const logger = require('../services/logger')

router.use(json())
router.use(cors())

router.get('/items/:userId', async (req, res) => {
    try {
        logger.logInformation('todo/items/', req.params.userId);
        if (req.params.userId && req.params.userId.length > 0) {
            const result = await db.getTodos(req.params.userId);
            res.json(result);
        } else {
            res.status(400).end();
        }
    } catch {
        res.status(500).end();
    }
});

router.post('/add', async (req, res) => {
    try {
        const body = req.body;
        logger.logInformation('todo/add', body);
        if (
            body.todo &&
            body.todo.title && body.todo.title.length > 0 && body.todo.title.length < 1000 &&
            body.todo.description && body.todo.description.length > 0 && body.todo.description.length < 1000 &&
            body.userId && body.userId.length > 0 && body.userId.length < 1000
        ) {

            const newTodo = {
                title: body.todo.title,
                description: body.todo.description,
                userId: body.userId,
                done: false
            }
            await db.saveTodo(newTodo);
            res.status(200).end();
        } else {
            res.status(400).end();
        }
    } catch {
        res.status(500).end();
    }
});

router.put('/done/:todoId', async (req, res) => {
    try {
        logger.logInformation('todo/done/', req.params.todoId);
        if (req.params.todoId && req.params.todoId.length > 0) {
            await db.markTodoDone(req.params.todoId);
            res.status(200).end();
        } else {
            res.status(400).end();
        }
    } catch {
        res.status(500).end();
        return;
    }
});

router.delete('/delete/:todoId', async (req, res) => {
    try {
        logger.logInformation('todo/delete/', req.params.todoId);
        if (req.params.todoId && req.params.todoId.length > 0) {
            await db.deleteTodo(req.params.todoId);
            res.status(200).end();
        } else {
            res.status(400).end();
        }
    } catch {
        res.status(500).end();
    }
});

module.exports = router;