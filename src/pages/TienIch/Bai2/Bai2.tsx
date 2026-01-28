import { useEffect, useState } from "react";
import styles from "./Bai2.less";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

const TodoList: React.FC = () => {
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

  return (
    <div className={styles.container}>
      <div className={styles.todoCard}>
        <h1 className={styles.title}>📝 Danh sách công việc</h1>

        {/* Input thêm mới */}
        <div className={styles.inputGroup}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTodo()}
            placeholder="Nhập công việc cần làm..."
            className={styles.input}
          />
          <button onClick={addTodo} className={styles.btnAdd}>
            +
          </button>
        </div>

        {/* Stats */}
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.label}>Tổng:</span>
            <span className={styles.count}>{todos.length}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.label}>Đang làm:</span>
            <span className={styles.countActive}>{activeCount}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.label}>Hoàn thành:</span>
            <span className={styles.countCompleted}>{completedCount}</span>
          </div>
        </div>

        {/* Filter tabs */}
        <div className={styles.filterTabs}>
          <button
            className={`${styles.filterBtn} ${filter === "all" ? styles.active : ""}`}
            onClick={() => setFilter("all")}
          >
            Tất cả
          </button>
          <button
            className={`${styles.filterBtn} ${filter === "active" ? styles.active : ""}`}
            onClick={() => setFilter("active")}
          >
            Đang làm
          </button>
          <button
            className={`${styles.filterBtn} ${filter === "completed" ? styles.active : ""}`}
            onClick={() => setFilter("completed")}
          >
            Hoàn thành
          </button>
        </div>

        {/* Todo list */}
        <div className={styles.todoList}>
          {filteredTodos.length === 0 ? (
            <div className={styles.empty}>
              <p>😴 Không có công việc nào</p>
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <div key={todo.id} className={`${styles.todoItem} ${todo.completed ? styles.completed : ""}`}>
                <div className={styles.todoContent}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo.id)}
                    className={styles.checkbox}
                  />

                  {editingId === todo.id ? (
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") saveEdit(todo.id);
                        if (e.key === "Escape") setEditingId(null);
                      }}
                      onBlur={() => saveEdit(todo.id)}
                      autoFocus
                      className={styles.editInput}
                    />
                  ) : (
                    <div className={styles.todoText}>
                      <p className={styles.todoTitle}>{todo.title}</p>
                      <span className={styles.todoTime}>{todo.createdAt}</span>
                    </div>
                  )}
                </div>

                <div className={styles.todoActions}>
                  {editingId !== todo.id && (
                    <>
                      <button
                        onClick={() => startEdit(todo.id, todo.title)}
                        className={`${styles.btnAction} ${styles.btnEdit}`}
                        title="Chỉnh sửa"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className={`${styles.btnAction} ${styles.btnDelete}`}
                        title="Xóa"
                      >
                        🗑️
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Clear completed button */}
        {completedCount > 0 && (
          <button className={styles.btnClear} onClick={() => setTodos(todos.filter((t) => !t.completed))}>
            Xóa các công việc hoàn thành
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoList;