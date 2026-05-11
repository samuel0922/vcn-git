const express = require("express");
const Todo = require("../models/Todo");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({ message: "content is required" });
    }

    const todo = await Todo.create({ content: content.trim() });
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content, completed } = req.body;
    const updateData = {};

    if (typeof content === "string") {
      if (!content.trim()) {
        return res.status(400).json({ message: "content cannot be empty" });
      }
      updateData.content = content.trim();
    }

    if (typeof completed === "boolean") {
      updateData.completed = completed;
    }

    if (Object.keys(updateData).length === 0) {
      return res
        .status(400)
        .json({ message: "At least one field is required to update" });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(updatedTodo);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
