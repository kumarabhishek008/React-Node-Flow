import { v4 as uuidv4 } from 'uuid';

export const initialState = [
    {
      id: uuidv4(),
      expand: false,
      name: "Table 1",
      xpos:'',
      ypos:'',
      child: [
        { id: uuidv4(), left: false, right: false },
        { id: uuidv4(), left: false, right: false },
        { id: uuidv4(), left: false, right: false },
        { id: uuidv4(), left: false, right: false },
      ],
    },
    {
      id: uuidv4(),
      expand: false,
      name: "Table 2",
      xpos:200,
      ypos:'',
      child: [
        { id: uuidv4(), left: false, right: false },
        { id: uuidv4(), left: false, right: false },
        { id: uuidv4(), left: false, right: false },
        { id: uuidv4(), left: false, right: false },
      ],
    },
    {
      id: uuidv4(),
      expand: false,
      name: "Table 3",
      child: [
        { id: uuidv4(), left: false, right: false },
        { id: uuidv4(), left: false, right: false },
        { id: uuidv4(), left: false, right: false },
        { id: uuidv4(), left: false, right: false },
      ],
    },
    {
      id: uuidv4(),
      expand: false,
      name: "Table",
      child: [
        { id: uuidv4(), left: false, right: false },
        { id: uuidv4(), left: false, right: false },
        { id: uuidv4(), left: false, right: false },
        { id: uuidv4(), left: false, right: false },
      ],
    },
    {
      id: uuidv4(),
      expand: false,
      name: "Table",
      child: [
        { id: uuidv4(), left: false, right: false },
        { id: uuidv4(), left: false, right: false },
        { id: uuidv4(), left: false, right: false },
        { id: uuidv4(), left: false, right: false },
      ],
    },
    {
      id: uuidv4(),
      expand: false,
      name: "Table",
      child: [
        { id: uuidv4(), left: false, right: false },
        { id: uuidv4(), left: false, right: false },
        { id: uuidv4(), left: false, right: false },
        { id: uuidv4(), left: false, right: false },
      ],
    },
    {
      id: uuidv4(),
      expand: false,
      name: "Table",
      child: [
        { id: uuidv4(), left: false, right: false },
        { id: uuidv4(), left: false, right: false },
        { id: uuidv4(), left: false, right: false },
        { id: uuidv4(), left: false, right: false },
      ],
    },
    {
      id: uuidv4(),
      expand: false,
      name: "Table",
      child: [
        { id: uuidv4(), left: false, right: false },
        { id: uuidv4(), left: false, right: false },
        { id: uuidv4(), left: false, right: false },
        { id: uuidv4(), left: false, right: false },
      ],
    },
    {
      id: uuidv4(),
      expand: false,
      name: "Table",
      child: [
        { id: uuidv4(), left: false, right: false },
        { id: uuidv4(), left: false, right: false },
        { id: uuidv4(), left: false, right: false },
        { id: uuidv4(), left: false, right: false },
      ],
    },
    {
      id: uuidv4(),
      expand: false,
      name: "Table",
      child: [
        { id: uuidv4(), left: false, right: false },
        { id: uuidv4(), left: false, right: false },
        { id: uuidv4(), left: false, right: false },
        { id: uuidv4(), left: false, right: false },
      ],
    },
  ];