import React from 'react';

// chnaged data label in edge type
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
  { id: 'e1-2', type : "customedge", source: '1', target: '2', label: 'this is an edge label',arrowHeadType: 'arrowclosed', data : { type : 'edge', label: 'this is an edge label' }, },
];
