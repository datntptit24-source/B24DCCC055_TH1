import styles from "./Bai2.less";
import { useTodoList } from "@/models/tienich/useTodoList";

const TodoList: React.FC = () => {
  const {
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
    todos,
    clearCompleted,
  } = useTodoList();

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
          <button className={styles.btnClear} onClick={clearCompleted}>
            Xóa các công việc hoàn thành
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoList;