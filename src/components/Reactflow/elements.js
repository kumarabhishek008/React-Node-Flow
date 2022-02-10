import React from 'react';

export default [
  {
    id: '1',
    type: 'customnode',
    data: {
      label: 'welcome to react flow',
      type : 'node'
    },
    position: { x: 250, y: 0 },
  },
  {
    id: '2',
    type: "customnode",
    data: {
      label: 'This is default node',
      type : 'node'
    },
    position: { x: 100, y: 100 },
  },
//   {
//     id: '3',
//     data: {
//       label: 
//           'This one has a custom style',
//           type : 'node'
//     },
//     position: { x: 400, y: 100 },
//     style: {
//       background: '#D6D5E6',
//       color: '#333',
//       border: '1px solid #222138',
//       width: 180,
//     },
//   },
//   {
//     id: '4',
//     position: { x: 250, y: 200 },
//     data: {
//       label: 'Another default node',
//       type : 'node'
//     },
//   },
//   {
//     id: '5',
//     data: {
//       label: 'Node id: 5',
//       type : 'node'
//     },
//     position: { x: 250, y: 325 },
//   },
//   {
//     id: '6',
//     type: 'output',
//     data: {
//       label: 'An output node',
//       type : 'node'
//     },
//     position: { x: 100, y: 480 },
//   },
//   {
//     id: '7',
//     type: 'output',
//     data: { label: 'Another output node', type : 'node' },
//     position: { x: 400, y: 450 },
//   },
  { id: 'e1-2', type : "customedge", source: '1', target: '2', label: 'this is an edge label', data : { type : 'edge' }, },
  { id: 'e1-3', type : "customedge", source: '1', target: '3', data : { type : 'edge' }, },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    animated: true,
    label: 'animated edge',
    data : { type : 'edge' },
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    arrowHeadType: 'arrowclosed',
    label: 'edge with arrow head',
    data : { type : 'edge' },
  },
  {
    id: 'e5-6',
    source: '5',
    target: '6',
    type: 'smoothstep',
    rrowHeadType: 'arrowclosed',
    label: 'smooth step edge',
    data : { type : 'edge' },
  },
  {
    id: 'e5-7',
    source: '5',
    target: '7',
    type: 'step',
    style: { stroke: '#f6ab6c' },
    data : { type : 'edge' },
    label: 'a step edge',
    animated: true,
    labelStyle: { fill: '#f6ab6c', fontWeight: 700 },
  },
];