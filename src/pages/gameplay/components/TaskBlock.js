import { GameState } from "game-context/GameContext";
import TaskStats from "pages/gameplay/components/TaskStats";
import { useState, useRef, useEffect } from "react";

// Necessary for animating the dragged task
var img = document.createElement("img");
img.src =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

export default function TaskBlock({
  task,
  draggable,
  mode,
  draggedTaskGhostRef,
}) {
  const [topMargin, setTopMargin] = useState(0);
  const blockRef = useRef(null);
  const [styles, setStyles] = useState(`type-${task.category.toLowerCase()}`);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (styles.includes("disabled")) return;

    if (task.completed || task.current) {
      setIsDisabled(true);
      setStyles((prev) => prev + " disabled");
    }
  }, [task.completed, task.current, styles]);

  const handleDragStart = (e) => {
    if (!blockRef.current || isDisabled) return;

    // Make sure to include the id in the data being transferred
    const dragEl = blockRef.current;
    const dragData = {
      id: task.id,
      name: task.name,
      category: task.category,
      duration: task.duration,
    };
    e.dataTransfer.setData("application/json", JSON.stringify(dragData));

    const ghostEl = dragEl.cloneNode(true);
    ghostEl.classList.add("dragging");
    ghostEl.classList.remove("flashing");
    document.body.appendChild(ghostEl);

    const nodeRect = dragEl.getBoundingClientRect();
    ghostEl.style.width = `${nodeRect.width}px`;
    ghostEl.style.marginTop = 0;

    // Set initial position
    ghostEl.style.left = `${e.clientX - nodeRect.width / 2}px`;
    ghostEl.style.top = `${e.clientY - nodeRect.height / 2}px`;
    ghostEl.style.boxShadow =
      "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)";

    // Add drag event listener to update ghost position
    const handleDrag = (dragEvent) => {
      if (!ghostEl) return;
      ghostEl.style.left = `${dragEvent.clientX - nodeRect.width / 2}px`;
      ghostEl.style.top = `${dragEvent.clientY - nodeRect.height / 2}px`;
    };

    document.addEventListener("drag", handleDrag);

    // Store the handler reference for cleanup
    ghostEl.dragHandler = handleDrag;

    e.dataTransfer.setDragImage(img, 0, 0); // Hide the default drag image
    draggedTaskGhostRef.current = ghostEl;
  };

  const handleClick = (e) => {
    const isPlannedTask =
      task.startTime !== null && task.startTime !== undefined;
    if (draggable && !isDisabled && !isPlannedTask) {
      const boundingRect = blockRef.current.getBoundingClientRect();
      const topMargin = e.clientY - boundingRect.top - boundingRect.height / 2;
      setTopMargin(Math.max(Math.round(topMargin), 0));
    }
  };

  const handleDragEnd = () => {
    const ghostEl = draggedTaskGhostRef.current;
    setTopMargin(0);

    if (ghostEl) {
      // Remove the drag event listener
      if (ghostEl.dragHandler) {
        document.removeEventListener("drag", ghostEl.dragHandler);
      }
      ghostEl.remove();
      // Clear the reference
      draggedTaskGhostRef.current = null;
    }
  };

  return (
    // This outer div is necessary for styling the flashing animation
    <div
      className={`task-block-container transition-[top] duration-200 ease-out ${styles} mb-4 mx-4`}
      style={{ marginTop: `${topMargin}px` }}
      onMouseDown={handleClick}
      onMouseUp={() => setTopMargin(0)}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      ref={blockRef}
    >
      <div
        className={`task-block ${mode === GameState.PAUSED ? "flashing" : ""}`}
        id={task.id}
        draggable={draggable && !isDisabled}
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
