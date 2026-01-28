import { useEffect, useState } from "react";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export const useTodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const STORAGE_KEY = "todolist";

  // Load từ localStorage khi component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem(STORAGE_KEY);
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (error) {
        console.error("Lỗi đọc localStorage:", error);
      }
    }
  }, []);

  // Lưu vào localStorage khi todos thay đổi
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  // Thêm todo mới
  const addTodo = () => {
    if (inputValue.trim() === "") return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      title: inputValue,
      completed: false,
      createdAt: new Date().toLocaleString("vi-VN"),
    };

    setTodos([newTodo, ...todos]);
    setInputValue("");
  };

  // Xóa todo
  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Bắt đầu chỉnh sửa
  const startEdit = (id: string, title: string) => {
    setEditingId(id);
    setEditValue(title);
  };

  // Lưu chỉnh sửa
  const saveEdit = (id: string) => {
    if (editValue.trim() === "") {
      deleteTodo(id);
    } else {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, title: editValue } : todo
        )
      );
    }
    setEditingId(null);
    setEditValue("");
  };

  // Đánh dấu hoàn thành
  const toggleComplete = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Lọc todos
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const completedCount = todos.filter((t) => t.completed).length;
  const activeCount = todos.length - completedCount;

  // Xóa các công việc hoàn thành
  const clearCompleted = () => {
    setTodos(todos.filter((t) => !t.completed));
  };

  return {
    todos,
    inputValue,
    setInputValue,
    editingId,
    editValue,
    setEditValue,
    filter,
    setFilter,
    addTodo,
    deleteTodo,
    startEdit,
    saveEdit,
    toggleComplete,
    filteredTodos,
    completedCount,
    activeCount,
    clearCompleted,
  };
};
