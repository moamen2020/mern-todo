const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Todo = require('./model/Todo')

const app = express();

app.use(express.json());
app.use(cors());


// Connection DataBase
const conectionString = 'mongodb://localhost/todo-app'
mongoose.connect(conectionString, {useNewUrlParser: true, useUnifiedTopology: true})
.then(res => console.log('connection Done'));

app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
})

app.post('/todo/new', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });
    todo.save();
    res.json(todo);
})

app.delete('/todo/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);
    res.json(result);
})

app.get('/todo/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id)

    todo.complete = !todo.complete;

    todo.save()

    res.json(todo);
})

app.listen(5500, () => {
    console.log('Running on Port 5500');
})