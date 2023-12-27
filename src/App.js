import React, { useEffect, useState } from 'react'
import { firestoreService } from './firebaseServices';

const App = () => {
    const [todoList, setTodoList] = useState([]);
    const [todo, setTodo] = useState({});

    useEffect(() => {
        // get all todo
        const getAllTodo = firestoreService.snapshotDocuments("todo-collection", (response) => {
            setTodoList(response);
        });

        // get todo by uid
        let todoQuery = { field: "uid", operator: "==", value: "B7nORkGGFuChVFsYysRk" };
        const getTodoByUid = firestoreService.snapshotDocument("todo-collection", todoQuery, async (todo) => {
            setTodo(todo[0]);
        });

        return () => {
            getAllTodo();
            getTodoByUid();
        };
    }, []);

    return (
        <div>
            <div>
                <h1>Todo List</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Sr.</th>
                            <th>Title</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todoList.map((task, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <h1>Todo Details</h1>
            <div>
                <div className="">Uid: {todo.uid}</div>
                <div className="">Title: {todo.title}</div>
                <div className="">Description: {todo.description}</div>
            </div>
        </div>
    )
}

export default App