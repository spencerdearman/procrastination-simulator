# [Table of Contents](#table-of-contents)

- [Getting Started with Create React App](#getting-started-with-create-react-app)
  - [Available Scripts](#available-scripts)
    - [`npm start`](#npm-start)
    - [`npm test`](#npm-test)
    - [`npm run build`](#npm-run-build)
    - [`npm run eject`](#npm-run-eject)
  - [Learn More](#learn-more)
    - [Code Splitting](#code-splitting)
    - [Analyzing the Bundle Size](#analyzing-the-bundle-size)
    - [Making a Progressive Web App](#making-a-progressive-web-app)
    - [Advanced Configuration](#advanced-configuration)
    - [Deployment](#deployment)
    - [`npm run build` fails to minify](#npm-run-build-fails-to-minify)
- [Classes](#classes)
  - [Task Class Documentation](#task-class-documentation)
  - [Categories](#categories)
    - [Constructor](#constructor)
      - [`constructor(name: string)`](#constructorname-string)
    - [Properties (Private)](#properties-private)
  - [Methods](#methods)
    - [Core Functionality](#core-functionality)
    - [Task Timing](#task-timing)
    - [Status Management](#status-management)
    - [Task Execution](#task-execution)
    - [Optional and Movable](#optional-and-movable)
    - [Attribute Impacts](#attribute-impacts)
    - [Utility](#utility)
  - [Example Usage](#example-usage)

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# Classes

### Task Class Documentation

The `Task` class manages tasks with various properties and methods to manipulate and interact with tasks effectively.

#### Categories

---

The following categories are available for tasks:

```javascript
Task.Category = {
  MANDATORY: "mandatory",
  ACADEMIC: "academic",
  SELFCARE: "selfCare",
  SOCIAL: "social",
  ENERGY: "energy",
  CLUBS: "clubs",
};
```

#### Constructor

---

##### `constructor(name: string)`

- **Description**: Creates a new `Task` instance with the given name.
- **Parameters**:
  - `name` (string): The name of the task.
- **Defaults**: Sets the category to `MANDATORY`.

#### Properties (Private)

---

- `#startTime` (Date): Start time of the task.
- `#endTime` (Date): End time of the task.
- `#completed` (boolean): Indicates whether the task is completed.
- `#status` (string): Current status (`PENDING`, `COMPLETE`, `IN_PROGRESS`, `ABORTED`).
- `#optional` (boolean): Indicates whether the task is optional (default: `false`).
- `#movable` (boolean): Indicates whether the task's time can be changed (default: `false`).
- `#current` (boolean): Indicates whether the task is running (default: `false`).
- `#duration` (number): Task duration in hours (default: `1`).
- `#attributeImpacts` (object): Impacts on attributes (`academics`, `socialLife`, `energy`, `mentalHealth`).
- `#difficulty` (number): Task difficulty on a scale of 1-4.
- `#category` (string): Task category.

### Methods

#### Core Functionality

- **`setStatus(status: string): void`**

  - Sets the task's status (`PENDING`, `COMPLETE`, `IN_PROGRESS`, `ABORTED`).

- **`getStatus(): string`**

  - Returns the task's current status.

- **`setCategory(value: string): void`**

  - Sets the task's category (must be one of the predefined categories).

- **`getCategory(): string`**

  - Returns the task's category.

#### Task Timing

- **`setStartTime(startTime: Date): void`**

  - Sets the start time of the task.

- **`getStartTime(): Date`**

  - Returns the start time of the task.

- **`setEndTime(endTime?: Date): void`**

  - Sets the end time of the task. Automatically calculates it if `startTime` and `duration` are set.

- **`getEndTime(): Date`**

  - Returns the end time of the task.

- **`setDuration(duration: number): void`**

  - Sets the duration of the task (must be between `1` and `24` hours).

- **`getDuration(): number`**

  - Returns the task's duration in hours.

- **`calculateEndTime(startTime: Date, duration: number): Date`**

  - Calculates the end time based on the start time and duration.

- **`changeTime(newStartTime: Date): void`**

  - Changes the start time and updates the end time (only if the task is movable).

#### Status Management

- **`setCurrent(isCurrent: boolean): void`**

  - Marks the task as currently running or stops it.

- **`getCurrent(): boolean`**

  - Returns whether the task is currently running.

- **`setCompleted(isCompleted: boolean): void`**

  - Sets the task as completed or not.

- **`getCompleted(): boolean`**

  - Returns whether the task is completed.

- **`resetCompleted(): void`**

  - Resets the completion status to `false`.

#### Task Execution

- **`startTask(): void`**

  - Starts the task and updates its status to `IN_PROGRESS`.

- **`abortTask(): void`**

  - Aborts the task and updates its status to `ABORTED` (only if not completed).

- **`completeTask(playerAttributes: object): void`**

  - Marks the task as completed and applies its impacts to the given player attributes.

- **`isOverdue(currentGameTime: Date): boolean`**

  - Checks if the task is overdue compared to the provided game time.

#### Optional and Movable

- **`setOptional(optional: boolean): void`**

  - Marks the task as optional or not.

- **`getOptional(): boolean`**

  - Returns whether the task is optional.

- **`setMovable(movable: boolean): void`**

  - Marks the task as movable or not.

- **`getMovable(): boolean`**

  - Returns whether the task is movable.

#### Attribute Impacts

- **`setAttributeImpacts(key: string, value: number): void`**

  - Sets the impact of the task on a specific attribute (must be between `-100` and `100`).

- **`getAttributeImpactsObject(): object`**

  - Returns the dictionary of all attribute impacts.

- **`getAttributeImpact(key: string): number`**

  - Returns the impact value of the specified attribute.

#### Utility

- **`overlapsWith(otherTask: Task): boolean`**

  - Checks if the task overlaps with another task.

- **`setDifficulty(difficulty: number): void`**

  - Sets the difficulty of the task (must be between `1` and `4`).

- **`getDifficulty(): number`**

  - Returns the difficulty of the task.

- **`toJSON(): object`**

  - Serializes the task into a JSON object for storage or transfer.

- **`debug(): void`**

  - Logs the serialized JSON representation of the task.

### Example Usage

```javascript
const task = new Task("Study JavaScript");
// Set task details
task.setCategory("ACADEMIC");
task.setDuration(2);
task.setStartTime(new Date());
// Start the task
task.startTask();
// Mark as completed and apply impacts
constplayerAttributes = {
  academics: 50,
  socialLife: 70,
  energy: 80,
  mentalHealth: 60,
};

task.completeTask(playerAttributes);

console.log(task.toJSON());
```
