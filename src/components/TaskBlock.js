export default function TaskBlock({ task, draggable }) {
  const handleDragStart = (e) => {
    // Preserve any existing drag handling
  };

  return (
    <div
      className={`task-block type-${task.category}`}
      id={task.name}
      draggable={draggable}
      onDragStart={handleDragStart}
    >
      <h2>
        {task.icon} {task.name}
      </h2>
      <p>{task.description}</p>
    </div>
  );
} 