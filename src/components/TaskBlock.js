import { GameState } from "game-context/GameContext";
import TaskStats from "pages/gameplay/components/TaskStats";
import { useState, useRef } from "react";

export default function TaskBlock({ task, draggable, mode }) {
  const [topMargin, setTopMargin] = useState(0);
  const blockRef = useRef(null);
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

  const handleClick = (e) => {
    if (draggable) {
      const boundingRect = blockRef.current.getBoundingClientRect();
      const topMargin = e.clientY - boundingRect.top - boundingRect.height / 2;
      setTopMargin(Math.round(topMargin));
    }
  };

  return (
    // This outer div is necessary for styling the flashing animation
    <div
      className={`task-block-container transition-[top] duration-200 ease-out type-${task.category} mb-4 mx-4`}
      style={{ marginTop: `${topMargin}px` }}
      onMouseDown={handleClick}
      onMouseUp={() => setTopMargin(0)}
      onDragEnd={() => setTopMargin(0)}
      onDragStart={handleDragStart}
      ref={blockRef}
    >
      <div
        className={`task-block ${mode === GameState.PAUSED ? "flashing" : ""}`}
        id={task.id}
        draggable={draggable}
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
