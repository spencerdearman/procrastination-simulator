jest
  .spyOn(window.HTMLMediaElement.prototype, "play")
  .mockImplementation(() => Promise.resolve());

const defaultTask = {
  id: "study-art-history",
  name: "Make Art History Note Cards",
  category: "academic",
  description:
    "Who thought a class about memorizing thousands of artworks was a good idea?",
  icon: "📖",
  startTime: null,
  endTime: null,
  completed: false,
  locked: false,
  current: false,
  duration: 1,
  attributeImpacts: {
    academics: 10,
    socialLife: 0,
    energy: -5,
    mentalHealth: 0,
  },
};

export { defaultTask };
