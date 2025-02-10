export default class Attributes {
    constructor(){
        this.academics = 100;
        this.socialLife = 100;
        this.energy = 100;
        this.mentalHealth = 100;
    }

    //Increases specified attribute by the given amount, within 0 - 100
    addPoints(attribute, amount) {
        if (this.hasOwnProperty(attribute)) {
            this[attribute] = Math.min(100, Math.max(0, this[attribute] + amount));
        }
    }

    //Decreases specified attribute by the given amount, within 0 - 100
    reducePoints(attribute, amount) {
        if (this.hasOwnProperty(attribute)) {
            this[attribute] = Math.min(100, Math.max(0, this[attribute] - amount));
        }
    }

    calculateSkillGraph() {
        //To be implemented
    }
}
