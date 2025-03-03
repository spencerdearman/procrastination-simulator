import { GameState } from "game-context/GameContext";
import TaskStats from "pages/gameplay/components/TaskStats";

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
        <h2 className="mb-4">
          {task.icon} {task.name}
        </h2>
        <div className="hideable">
          <p className="mb-2">{task.description}</p>
          <TaskStats attributes={task.attributeImpacts} />
        </div>
      </div>
    </div>
  );
}
