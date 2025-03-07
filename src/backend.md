# Backend Documentation

## Core Components

### 1. **Time.js**

- Manages in-game time progression.
- Converts real-time seconds into in-game hours.
- Allows setting, stopping, and modifying game speed.
- Synchronizes time across all game components.

#### **Functions**

- `setCurrentGameTime(newTime)`: Manually sets the game time.
- `getCurrentGameTime()`: Returns the current in-game time.
- `xSpeed(speed)`: Adjusts the speed of time progression.
- `stopTimer()`: Stops time progression.
- `startTimer()`: Resumes time progression.

### 2. **Task.js**

- Represents a task or event in the game.
- Stores task attributes such as category, duration, completion status, and attribute impacts.
- Handles task completion, scheduling, and validation.

#### **Functions**

- `setCategory(value)`: Assigns a category to the task.
- `getCategory()`: Returns the category of the task.
- `setCurrent(isCurrent)`: Marks the task as currently active.
- `setCompleted(isCompleted)`: Marks the task as completed.
- `calculateEndTime(startTime, duration)`: Computes the task’s end time.
- `setStartTime(startTime)`: Assigns a start time to the task.
- `setEndTime(endTime)`: Sets the task’s end time.
- `setDuration(duration)`: Defines the duration of the task.
- `completeTask(playerAttributes)`: Completes the task and applies attribute effects.
- `isOverdue(currentGameTime)`: Checks if the task is overdue.
- `overlapsWith(otherTask)`: Determines if the task conflicts with another task.

### 3. **Player.js**

- Represents the player and their attributes.
- Manages changes in player stats (academics, social life, energy, and mental health).
- Allows increasing, decreasing, and resetting attributes.

#### **Functions**

- `addPoints(attribute, amount)`: Increases the value of an attribute.
- `reducePoints(attribute, amount)`: Decreases the value of an attribute.
- `resetAttributes()`: Resets all attributes to default values.
- `getAttribute(attribute)`: Retrieves the value of a specific attribute.
- `getAllAttributes()`: Returns all attributes as an object.

### 4. **Day.js**

- Represents a single day in the game.
- Maintains a schedule with planned and unplanned tasks.
- Tracks completed and rollover tasks.
- Provides methods for task scheduling and execution.

#### **Functions**

- `addNotification(notification)`: Adds a notification to the day's queue.
- `getCurrentGameHour(time)`: Returns the hour from a given game time.
- `addTask(task)`: Adds a task to the day’s schedule.
- `planTask(task, index, date)`: Plans a task at a specified time slot. **NOTE DO NOT USE THIS METHOD USE THE ONE IN LOGIC.JS**
- `deleteTask(taskName)`: Removes a task from the schedule.
- `updateCompleted()`: Updates the list of completed tasks.
- `updateRollover()`: Updates rollover tasks for the next day.

### 5. **Logic.js**

- Manages the overall game flow and decision-making.
- Handles task progression, attribute changes, and notifications.
- Controls the game loop, ensuring smooth progression through tasks and days.

#### **Functions**

- `seedPlayer(playerAttributes)`: Initializes player attributes.
- `parseTasks(taskDataArray)`: Converts raw task data into `Task` objects.
- `isWithinTimeWindow(task, currentGameTime)`: Checks if a task is scheduled within the current time window.
- `startGame(taskDataArray)`: Initializes the game with predefined tasks.
- `planTask(task, index)`: Moves tasks from unplanned to planned.
- `logicMovePlannedTask(task, index)`: Moves a planned task to another time slot.
- `startGameLoop()`: Manages the core game loop.
- `applyAttributeChanges(changes)`: Applies changes to player attributes.
- `completeDay()`: Ends the current day and transitions to the next.
- `completeTask(taskName)`: Completes a task and updates the game state.
- `loadNotifications(notificationDataArray)`: Loads game notifications.
- `checkAndTriggerNotification(currentGameTime)`: Checks for and triggers notifications.
- `triggerNotification(notification)`: Manages the effects of triggered notifications.
- `acceptNotification()`: Processes an accepted notification.
- `rejectNotification()`: Processes a rejected notification.
- `resolveNotification()`: Resolves the current notification and resumes gameplay.

## Game Flow

1. **Initialization**

   - `App.js` initializes core components (`Time`, `Player`, `Day`, `Logic`).
   - The `Logic` instance starts the game and populates the first day’s tasks.

2. **Time Progression**

   - The game time updates every second in real-time.
   - `Time.js` calculates in-game time based on elapsed real-world seconds.
   - `Logic.js` checks if any tasks need to start or end based on time.

3. **Task Execution**

   - `Logic.js` ensures that tasks run at their scheduled times.
   - Once a task starts, it modifies player attributes accordingly.
   - Upon completion, tasks are marked as completed, and their effects are applied.

4. **Notifications**

   - `Logic.js` triggers notifications when required.
   - Notifications may pause ongoing tasks (if forced) and offer choices that affect the player’s attributes.
   - Once resolved, the game resumes its normal flow.

5. **End of Day**
   - When the game time reaches the end of the day, `Logic.js` finalizes the current day.
   - Completed tasks are recorded, and any remaining movable tasks roll over.
   - The next day is loaded, and the game loop restarts.

## Interaction Between Components

- `App.js` creates instances of `Player`, `Day`, and `Logic`, ensuring that all components share the same `Time` instance.
- `Logic.js` orchestrates interactions between `Time`, `Player`, `Day`, and `Task`.
- `Day.js` schedules tasks and ensures they are executed at the correct time.
- `Task.js` manages individual task properties, validation, and completion logic.
- `Time.js` keeps track of in-game time, affecting when tasks trigger.
- `Player.js` updates attributes based on task impacts and player choices.

## Example Workflow

1. The player starts the game.
2. `Logic.js` loads tasks into the current day.
3. `Time.js` advances game time in real-time.
4. When a task’s start time is reached, `Logic.js` activates it.
5. The task modifies player attributes.
6. Once completed, the task is marked as done.
7. Notifications may interrupt gameplay.
8. At the end of the day, all completed tasks are recorded, and the next day begins.
