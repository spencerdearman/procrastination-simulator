import Time from './Time';
export default class Task {
    static Category = Object.freeze({
        MANDATORY: "mandatory",
        ACADEMIC: "academic",
        SELFCARE: "selfCare",
        SOCIAL: "social",
        ENERGY: "energy",
        CLUBS: "clubs",
    });

    #startTime; //Date
    #endTime; //Date
    #completed = false;
    #optional; //bool
    #movable; //bool
    #current; //bool
    #duration = 1 //each task is 1 in-game hour
    #attributeImpacts = {"academics": 0, "socialLife": 0, "energy": 0, "mentalHealth": 0 };
    #difficulty; //scale of 1 - 4

    constructor(name){
        this.name = name;
    }

    setStartTime(){
        //to implement
    }

    getStartTime(){
        //to implement
    }

    setEndTime() {
        //to implement
    }

    getEndTime() {
        //to implement
    }

    setDueDate() {
        //to implement
    }

    getDueDate() {
        //to implement
    }

    setDuration() {
        //to implement
    }

    getDuration() {
        //to implement
    }

    changeTime(){
        //to implement
    }

    abort(){
        //to implement
    }

    completeTask(){
        //confirm if I need this function
    }

    resetCompleted(){
        this.#completed = false;
    }

    getTask(){
        //to implement
    }

    setTask(){
        //to implement
    }

    setOptional(optional) {
       if (typeof optional === "boolean") {
            this.#optional = optional;
       } else {
        console.error(`Incorrect data type. Required type: boolean. Provided type: ${typeof(optional)}`);
       }
    }

    getOptional() {
        return this.#optional;
    }

    setMovable(movable) {
        if (typeof movable === 'boolean') {
            this.#movable === movable;
        } else {
        console.error(`Incorrect data type. Required type: boolean. Provided type: ${typeof(movable)}`);
       }
    }

    setAttributeImpact(key, value) {
        if (this.#attributeImpacts.hasOwnProperty[key] && value >= - 100 && value <= 100) {
            this.#attributeImpacts[key] = value;
        }
        else {
            console.error(`Attribute impact values should be between -100 and +100.\nAttribute keys should be 'academics', 'socialLife', 'energy', or 'mentalHealth'`);
        }  
    }

    getAttributeImpact(key) {
        if (this.#attributeImpacts.hasOwnProperty[key]){
            return this.#attributeImpacts[key];
        } else{
            console.error(`Key: ${key} does not exist in the attributeImpact dictionary`);
        }
    }

    setDifficulty(difficulty){
        if (difficulty >= 1 && difficulty <= 4) {
            this.#difficulty = difficulty;
        }
        else {
            console.error(`Difficulty should be between 1 - 4`);
        }
    }

    getDifficulty(){
        return this.#difficulty;
    }
}
