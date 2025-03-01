const FULL_ATTRIBUTES = {
  academics: 100,
  socialLife: 100,
  energy: 100,
  mentalHealth: 100,
};

export default class Player {
  constructor(name = "Lebron") {
    this.name = name;
  }

  static getInitialAttributes() {
    return { ...FULL_ATTRIBUTES };
  }

  static addPoints(attributes, attribute, amount) {
    if (attributes.hasOwnProperty(attribute)) {
      const newAttributes = { ...attributes };
      newAttributes[attribute] = Math.min(
        100,
        Math.max(0, attributes[attribute] + amount),
      );
      return newAttributes;
    } else {
      console.warn(`Attribute "${attribute}" does not exist.`);
      return attributes;
    }
  }

  static reducePoints(attributes, attribute, amount) {
    if (attributes.hasOwnProperty(attribute)) {
      const newAttributes = { ...attributes };
      newAttributes[attribute] = Math.min(
        100,
        Math.max(0, attributes[attribute] - amount),
      );
      return newAttributes;
    } else {
      console.warn(`Attribute "${attribute}" does not exist.`);
      return attributes;
    }
  }

  static decrementAttributes(attributes) {
    const newAttributes = { ...attributes };
    Object.keys(newAttributes).forEach((key) => {
      newAttributes[key] = Math.max(0, attributes[key] - 2);
    });
    return newAttributes;
  }

  static resetAttributes() {
    return { ...FULL_ATTRIBUTES };
  }
}
