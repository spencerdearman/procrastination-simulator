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

### **Notification Class**

The `Notification` class extends the `Task` class to represent in-game notifications that require the player's decision. These notifications present the player with **two options**, each impacting different attributes. Some notifications may be **forced interactions**, overriding the current activity.

#### **Key Features**

- **Decision-Based Interactions**: Players choose between two options, each affecting attributes differently.
- **Follow-Up System**: After making a choice, a **narrative follow-up** provides feedback on the decision's outcome.
- **Forced Interactions**: Some notifications **override ongoing tasks** when they occur.
- **Impact System**: Notifications modify **player attributes** based on the decision.
- **Encapsulation & Safety**: Uses **private fields** with **getters and setters** to ensure data integrity.

##### **Methods**

| Method                                       | Description                                                           |
| -------------------------------------------- | --------------------------------------------------------------------- |
| `setOptions(option1, option2)`               | Sets the two available choices.                                       |
| `getOptions()`                               | Returns the available choices.                                        |
| `setImpacts(option1Impact, option2Impact)`   | Defines the impact of each choice on attributes.                      |
| `getImpacts()`                               | Returns the impacts for both options.                                 |
| `setNarrative(narrative)`                    | Sets a narrative follow-up message after a decision.                  |
| `getNarrative()`                             | Retrieves the narrative follow-up.                                    |
| `handleDecision(decision, playerAttributes)` | Applies the impact of the chosen decision and displays the narrative. |
| `resetOptions()`                             | Clears stored options and impacts after a decision is made.           |
| `overrideActivity(currentActivity)`          | If forced, overrides the ongoing task.                                |
| `setFollowUp(followUp)`                      | Sets a follow-up activity.                                            |
| `getFollowUp()`                              | Retrieves the follow-up activity.                                     |
| `setAccepted(accepted)`                      | Sets whether the notification was accepted.                           |
| `getAccepted()`                              | Retrieves the acceptance status.                                      |
| `setNotificationTime(notificationTime)`      | Sets when the notification occurs.                                    |
| `getNotificationTime()`                      | Gets the notification time.                                           |
| `setNotificationDuration(duration)`          | Sets how long the notification lasts.                                 |
| `getNotificationDuration()`                  | Retrieves the duration of the notification.                           |
| `getForced()`                                | Returns whether the notification is a **forced interaction**.         |
| `replaceActivity(activity)`                  | Replaces an activity with the notification's follow-up.               |

#### Example usage:

```javascript
const notification = new Notification("Study Break", 30);

notification.setOptions("Take a Break", "Continue Studying");

notification.setImpacts(
  { energy: +10, academics: -5 },
  { energy: -5, academics: +10 },
);

notification.setNarrative(
  "You took a break and felt refreshed, but you missed key material.",
);

notification.handleDecision("Take a Break", playerAttributes);
```
