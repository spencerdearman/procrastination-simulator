const FULL_ATTRIBUTES = {
  academics: 100,
  socialLife: 100,
  energy: 100,
  mentalHealth: 100,
};

export default class Player {
  constructor(name = "Lebron") {
    this.name = name;
    this.attributes = { ...FULL_ATTRIBUTES };
  }

  getAttributes() {
    return { ...this.attributes };
  }

  addPoints(attribute, amount) {
    if (this.attributes.hasOwnProperty(attribute)) {
      this.attributes[attribute] = Math.min(
        100,
        Math.max(0, this.attributes[attribute] + amount),
      );
    } else {
      console.warn(`Attribute "${attribute}" does not exist.`);
    }
    return this.getAttributes();
  }

  reducePoints(attribute, amount) {
    if (this.attributes.hasOwnProperty(attribute)) {
      this.attributes[attribute] = Math.min(
        100,
        Math.max(0, this.attributes[attribute] - amount),
      );
    } else {
      console.warn(`Attribute "${attribute}" does not exist.`);
    }
    return this.getAttributes();
  }

  decrementAttributes() {
    Object.keys(this.attributes).forEach((key) => {
      const decrement = Math.floor(Math.random() * 3) + 1;
      this.attributes[key] = Math.max(0, this.attributes[key] - decrement);
    });
    return this.getAttributes();
  }

  resetAttributes() {
    this.attributes = { ...FULL_ATTRIBUTES };
    return this.getAttributes();
  }
}
