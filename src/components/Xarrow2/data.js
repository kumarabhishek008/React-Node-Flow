import { capitalize, uniqueId } from "lodash";

export const data = [
  {
    id: "ele1",
    name: "Ele 1",
    type: "simple",
    positions: {
      x: 0,
      y: 100,
    },
    situation: {
      child: ["ele2"],
      parent: [],
    },
    targetPosition: "top",
    sourcePosition: "bottom",
    childrens: [],
    position: {
      x: 500,
      y: 0,
    },
  },
  {
    id: "ele2",
    name: "Ele 2",
    type: "simple",
    positions: {
      x: 100,
      y: 200,
    },
    situation: {
      child: [],
      parent: ["ele1"],
    },
    targetPosition: "top",
    sourcePosition: "bottom",
    childrens: [],
    position: {
      x: 500,
      y: 100,
    },
  },
  {
    id: "ele3",
    name: "Ele 3",
    type: "simple",
    positions: {
      x: 300,
      y: 300,
    },
    situation: {
      child: [],
      parent: ["ele2"],
    },
    targetPosition: "top",
    sourcePosition: "bottom",
    childrens: [],
    position: {
      x: 500,
      y: 200,
    },
  },
  {
    id: "ele4",
    name: "Ele 4",
    type: "simple",
    positions: {
      x: 400,
      y: 400,
    },
    situation: {
      child: [],
      parent: ["ele3"],
    },
    targetPosition: "top",
    sourcePosition: "bottom",
    childrens: [],
    position: {
      x: 500,
      y: 300,
    },
  },
];

export const edgeConn = [
  {
    sId: "ele1",
    tId: "ele2",
  },
  {
    sId: "ele1",
    tId: "ele3",
  },
  {
    sId: "ele1",
    tId: "ele4",
  },
];

export const rawData = [
  {
    id: uniqueId("dcvghd"),
    name: capitalize(uniqueId("dcvghd")[(0, 4)]),
    parent: "ele4",
  },
  {
    id: uniqueId("dcvghd"),
    name: capitalize(uniqueId("dcvghd")[(0, 4)]),
    parent: "ele2",
  },
  {
    id: uniqueId("dcvghd"),
    name: capitalize(uniqueId("dcvghd")[(0, 4)]),
    parent: "ele3",
  },
  {
    id: uniqueId("dcvghd"),
    name: capitalize(uniqueId("dcvghd")[(0, 4)]),
    parent: "ele4",
  },
  {
    id: uniqueId("dcvghd"),
    name: capitalize(uniqueId("dcvghd")[(0, 4)]),
    parent: "ele4",
  },
  {
    id: uniqueId("dcvghd"),
    name: capitalize(uniqueId("dcvghd")[(0, 4)]),
    parent: "ele3",
  },
];
