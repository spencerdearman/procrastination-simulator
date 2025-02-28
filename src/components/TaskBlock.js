export default function TaskBlock({ task, draggable }) {
  const handleDragStart = (e) => {
    // Make sure to include the id in the data being transferred
    const dragData = {
      id: task.id,
      name: task.name,
      category: task.category,
      duration: task.duration,
    };
    e.dataTransfer.setData("application/json", JSON.stringify(dragData));
  };

  return (
    <div
      className={`task-block type-${task.category}`}
      id={task.id}
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
