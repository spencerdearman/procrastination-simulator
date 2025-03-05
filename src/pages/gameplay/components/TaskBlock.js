import { GameState } from "game-context/GameContext";

export default function TaskBlock({ task, draggable, mode }) {
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
    // This outer div is necessary for styling the flashing animation
    <div className={`task-block-container type-${task.category}`}>
      <div
        className={`task-block ${mode === GameState.PAUSED ? "flashing" : ""}`}
        id={task.id}
        draggable={draggable}
        onDragStart={handleDragStart}
      >
        <h2>
          {task.icon} {task.name}
        </h2>
        <p>{task.description}</p>
      </div>
    </div>
  );
}
