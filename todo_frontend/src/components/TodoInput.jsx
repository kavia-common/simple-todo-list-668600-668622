import { useCallback, useRef, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * TodoInput - Controlled input for adding tasks.
 * Props:
 * - onAdd(text: string): void
 */
export default function TodoInput({ onAdd }) {
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  const handleAdd = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setValue('');
    // Keep focus on input for faster entry
    inputRef.current?.focus();
  }, [onAdd, value]);

  const onKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  }, [handleAdd]);

  return (
    <div className="input-row">
      <label htmlFor="new-task" className="visually-hidden">New task</label>
      <input
        id="new-task"
        ref={inputRef}
        className="input"
        type="text"
        placeholder="Add a new task..."
        aria-label="Task name"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleAdd}
        aria-label="Add Task"
      >
        Add Task
      </button>
    </div>
  );
}
