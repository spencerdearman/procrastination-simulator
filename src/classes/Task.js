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
    #dueDate; //Date
    #duration; //Date
    #completed; //bool
    #optional; //bool
    #movable; //bool
    #current; //bool
    #attributeImpacts = {"academics": 0, "socialLife": 0, "energy": 0, "mentalHealth": 0 };
    #difficulty; //scale of 1 - 4

    constructor(name){
        this.name = name;   
    }

    setStartTime(){

    }

    getStartTime(){

    }

    setEndTime() {

    }

    getEndTime() {

    }

    setDueDate() {

    }

    getDueDate() {

    }

    setDuration() {

    }

    getDuration() {

    }

    changeTime(){

    }

    abort(){

    }

    complete(){

    }

    getTask(){

    }

    setTask(){

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
