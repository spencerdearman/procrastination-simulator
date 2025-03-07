const FULL_ATTRIBUTES = {
  academics: 100,
  socialLife: 100,
  energy: 100,
  mentalHealth: 100,
};

export const ATTRIBUTE_BITS = {
  academics: 1, // 0001
  socialLife: 2, // 0010
  energy: 4, // 0100
  mentalHealth: 8, // 1000
};

export default class Player {
  constructor(name = "Lebron", testingMode = false) {
    this.name = name;
    this.attributes = { ...FULL_ATTRIBUTES };
    this.testingMode = testingMode; //to test the game
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

  decrementAttributes(updatedAttributesBitmap = 0) {
    // If in testing mode, skip decrementing attributes
    if (this.testingMode) {
      return this.getAttributes();
    }

    Object.keys(this.attributes).forEach((key) => {
      // Skip decrementing if the attribute was updated this tick
      if (!(updatedAttributesBitmap & ATTRIBUTE_BITS[key])) {
        const decrement = Math.floor(Math.random() * 3) + 1;
        this.attributes[key] = Math.max(0, this.attributes[key] - decrement);
      }
    });
    return this.getAttributes();
  }

  resetAttributes() {
    this.attributes = { ...FULL_ATTRIBUTES };
    return this.getAttributes();
  }
}
