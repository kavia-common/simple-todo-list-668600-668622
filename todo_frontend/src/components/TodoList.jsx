import TodoItem from './TodoItem';

/**
 * PUBLIC_INTERFACE
 * TodoList - Renders list of todos with actions.
 * Props:
 * - todos: Array<{id, text, completed}>
 * - onToggle(id): void
 * - onDelete(id): void
 * - onEdit(id, text): void
 */
export default function TodoList({ todos, onToggle, onDelete, onEdit }) {
  if (!todos || todos.length === 0) {
    return (
      <div role="status" aria-live="polite" style={{ padding: '8px', color: '#64748b' }}>
        No tasks yet. Add your first task above.
      </div>
    );
  }

  return (
    <ul className="todo-list" aria-live="polite">
      {todos.map((t) => (
        <TodoItem
          key={t.id}
          todo={t}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
