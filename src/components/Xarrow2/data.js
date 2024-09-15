export const data = [
  {
    id: "ele1",
    name: "Ele 1",
    type: "normal",
    positions: {
      x: 0,
      y: 100,
    },
    situation: {
      child: ["ele2"],
      parent: [],
    },
  },
  {
    id: "ele2",
    name: "Ele 2",
    type: "normal",
    positions: {
      x: 100,
      y: 200,
    },
    situation: {
      child: ["ele3"],
      parent: ["ele1"],
    },
  },
  {
    id: "ele3",
    name: "Ele 3",
    type: "normal",
    positions: {
      x: 300,
      y: 300,
    },
    situation: {
      child: ["ele4"],
      parent: ["ele2"],
    },
  },
  {
    id: "ele4",
    name: "Ele 4",
    type: "normal",
    positions: {
      x: 400,
      y: 400,
    },
    situation: {
      child: [],
      parent: ["ele3"],
    },
  },
];
