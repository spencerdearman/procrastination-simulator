import Attributes from './attributes.js';

export default class Player {
    constructor(name){
        this.name = name;
        this.attributes = new Attributes();
    }
}