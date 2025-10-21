import React, { useCallback, useMemo, useState } from 'react';
import './App.css';
import './index.css';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import { useLocalStorage } from './hooks/useLocalStorage';

// PUBLIC_INTERFACE
function App() {
  /**
   * App entry: Todo app with add, edit, delete, complete and filter tabs.
   * Persists tasks to localStorage.
   * Ocean Professional theme styling applied via App.css and index.css.
   */
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [filter, setFilter] = useState('all'); // all | active | completed

  // PUBLIC_INTERFACE
  const addTodo = useCallback((text) => {
    // Skip empty/whitespace-only entries
    const value = String(text ?? '').trim();
    if (!value) return;
    const newTodo = {
      id: Date.now(),
      text: value,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  }, [setTodos]);

  // PUBLIC_INTERFACE
  const toggleTodo = useCallback((id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, [setTodos]);

  // PUBLIC_INTERFACE
  const deleteTodo = useCallback((id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, [setTodos]);

  // PUBLIC_INTERFACE
  const updateTodoText = useCallback((id, newText) => {
    const value = String(newText ?? '').trim();
    if (!value) return;
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text: value } : t)));
  }, [setTodos]);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((t) => !t.completed);
      case 'completed':
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  return (
    <div className="app-wrapper" role="application" aria-label="Todo application">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">Tasks</h1>
          <p className="app-subtitle">Stay organized with your daily todos</p>
        </div>
      </header>

      <main className="container">
        <section className="card" aria-labelledby="add-task-title">
          <h2 id="add-task-title" className="visually-hidden">Add a new task</h2>
          <TodoInput onAdd={addTodo} />
        </section>

        <section className="card" aria-labelledby="tasks-title">
          <div className="list-header">
            <h2 id="tasks-title" className="section-title">Your Tasks</h2>
            <div className="filters" role="tablist" aria-label="Task filters">
              <button
                role="tab"
                aria-selected={filter === 'all'}
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button
                role="tab"
                aria-selected={filter === 'active'}
                className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
                onClick={() => setFilter('active')}
              >
                Active
              </button>
              <button
                role="tab"
                aria-selected={filter === 'completed'}
                className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                onClick={() => setFilter('completed')}
              >
                Completed
              </button>
            </div>
          </div>

          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={updateTodoText}
          />
        </section>
      </main>

      <footer className="app-footer" aria-label="Footer">
        <p className="footer-text">
          {todos.length} {todos.length === 1 ? 'task' : 'tasks'} total
          {', '}
          {todos.filter((t) => !t.completed).length} active
        </p>
      </footer>
    </div>
  );
}

export default App;
