import { Router } from "express";
import { createTodo, getAllTodos } from "../controllers/todo.controller.js";

const router = Router()

/**
 * GET /todos => getAllTodos
 * GET /todos/4 => getTodo
 * POST /todos => createTodo
 * PUT /todos/4 => updateTodo
 * DELETE /todos/4 => deleteTodo
 */

router.get('/todos', getAllTodos)
// router.get('/todos/:id', getTodo)
router.post('/todos', createTodo)
// router.put('/todos/:id', updateTodo)
// router.delete('/todos/:id', deleteTodo)

export default router