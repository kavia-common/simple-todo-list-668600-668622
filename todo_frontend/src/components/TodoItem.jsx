import React, { memo, useCallback, useEffect, useRef, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * TodoItem - Displays a single todo with complete toggle, inline edit, and delete.
 * Props:
 * - todo: {id:number, text:string, completed:boolean}
 * - onToggle(id:number): void
 * - onDelete(id:number): void
 * - onEdit(id:number, text:string): void
 */
function TodoItemBase({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  const startEdit = useCallback(() => {
    setDraft(todo.text);
    setIsEditing(true);
  }, [todo.text]);

  const cancelEdit = useCallback(() => {
    setDraft(todo.text);
    setIsEditing(false);
  }, [todo.text]);

  const saveEdit = useCallback(() => {
    const trimmed = draft.trim();
    if (!trimmed) {
      // If emptied, cancel edit without saving
      setDraft(todo.text);
      setIsEditing(false);
      return;
    }
    if (trimmed !== todo.text) onEdit(todo.id, trimmed);
    setIsEditing(false);
  }, [draft, onEdit, todo.id, todo.text]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveEdit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancelEdit();
    }
  }, [cancelEdit, saveEdit]);

  return (
    <li className="todo-item" role="listitem">
      <div className="todo-left">
        <input
          id={`check-${todo.id}`}
          className="checkbox"
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          aria-label={todo.completed ? 'Mark as active' : 'Mark as completed'}
        />
        <div className={`todo-text ${todo.completed ? 'completed' : ''}`}>
          {!isEditing ? (
            <p id={`todo-text-${todo.id}`} aria-live="polite">{todo.text}</p>
          ) : (
            <input
              ref={inputRef}
              className="inline-input"
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Edit task"
            />
          )}
        </div>
      </div>
      <div className="todo-actions">
        {!isEditing ? (
          <>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={startEdit}
              aria-label="Edit Task"
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => onDelete(todo.id)}
              aria-label="Delete Task"
            >
              Delete
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="btn btn-primary"
              onClick={saveEdit}
              aria-label="Save Task"
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={cancelEdit}
              aria-label="Cancel Edit"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </li>
  );
}

const areEqual = (prev, next) =>
  prev.todo.id === next.todo.id &&
  prev.todo.text === next.todo.text &&
  prev.todo.completed === next.todo.completed;

const TodoItem = memo(TodoItemBase, areEqual);
export default TodoItem;
