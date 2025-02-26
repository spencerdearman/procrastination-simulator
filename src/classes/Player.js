const FULL_ATTRIBUTES = {
  academics: 100,
  socialLife: 100,
  energy: 100,
  mentalHealth: 100,
};

export default class Player {
  constructor(player) {
    this.name = player?.name ?? "Lebron";
    this.attributes = player?.attributes ?? FULL_ATTRIBUTES;
  }

  // Increases specified attribute by the given amount, ensuring it's within 0-100
  addPoints(attribute, amount) {
    if (this.attributes.hasOwnProperty(attribute)) {
      this.attributes[attribute] = Math.min(
        100,
        Math.max(0, this.attributes[attribute] + amount),
      );
    } else {
      console.warn(`Attribute "${attribute}" does not exist.`);
    }

    return new Player(this);
  }

  // Decreases specified attribute by the given amount, ensuring it's within 0-100
  reducePoints(attribute, amount) {
    if (this.attributes.hasOwnProperty(attribute)) {
      this.attributes[attribute] = Math.min(
        100,
        Math.max(0, this.attributes[attribute] - amount),
      );
    } else {
      console.warn(`Attribute "${attribute}" does not exist.`);
    }

    return new Player(this);
  }

  // Decrements all attributes
  //
  // This is intended to be used in the game update cycle
  decrementAttributes() {
    this.attributes.academics -= 2;
    this.attributes.socialLife -= 2;
    this.attributes.energy -= 2;
    this.attributes.mentalHealth -= 2;
    return new Player(this);
  }

  // Resets all attributes to their default values
  resetAttributes() {
    this.attributes = {
      academics: 100,
      socialLife: 100,
      energy: 100,
      mentalHealth: 100,
    };
  }

  // Gets the value of a specific attribute
  getAttribute(attribute) {
    if (this.attributes.hasOwnProperty(attribute)) {
      return this.attributes[attribute];
    }
    console.warn(`Attribute "${attribute}" does not exist.`);
    return null;
  }

  // Returns all attributes as an object
  getAllAttributes() {
    return { ...this.attributes };
  }
}
