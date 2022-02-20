import React from 'react';

// chnaged data label in edge type
// export default [
//   {
//     id: '1',
//     type: 'customnode',
//     data: {
//       label: 'welcome to react flow',
//       type : 'node'
//     },
//     position: { x: 250, y: 0 },
//   },
//   {
//     id: '2',
//     type: "customnode",
//     data: {
//       label: 'This is default node',
//       type : 'node'
//     },
//     position: { x: 100, y: 100 },
//   },
//   { id: 'e1-2', type : "customedge", source: '1', target: '2', label: 'this is an edge label',arrowHeadType: 'arrowclosed', data : { type : 'edge', label: 'this is an edge label' }, },
// ];

export default [
  {
      "id": "1",
      "type": "customnode",
      "position": {
          "x": 252,
          "y": -58
      },
      "data": {
          "label": "<p><strong>Animal bite</strong></p>",
          "type": "node"
      }
  },
  {
      "id": "2",
      "type": "customnode",
      "position": {
          "x": -19,
          "y": 61
      },
      "data": {
          "label": "<p>Domestic animal bite (cat, dog etc.)</p><p>Does animal have any sign of rabies infection</p><p>(i.e excessive salivation and violence aggressive behaviour)?<sup>a</sup></p>",
          "type": "node"
      }
  },
  {
      "id": "e1-2",
      "type": "customedge",
      "source": "1",
      "target": "2",
      "label": "<p><br></p>",
      "arrowHeadType": "arrowclosed",
      "data": {
          "type": "edge",
          "label": "<p><br></p>"
      }
  },
  {
      "id": "e1-3",
      "type": "customedge",
      "source": "1",
      "target": "3",
      "data": {
          "type": "edge"
      }
  },
  {
      "id": "e3-4",
      "source": "3",
      "target": "4",
      "animated": true,
      "label": "animated edge",
      "data": {
          "type": "edge"
      }
  },
  {
      "id": "e4-5",
      "source": "4",
      "target": "5",
      "arrowHeadType": "arrowclosed",
      "label": "edge with arrow head",
      "data": {
          "type": "edge"
      }
  },
  {
      "id": "e5-6",
      "source": "5",
      "target": "6",
      "type": "smoothstep",
      "rrowHeadType": "arrowclosed",
      "label": "smooth step edge",
      "data": {
          "type": "edge"
      }
  },
  {
      "id": "e5-7",
      "source": "5",
      "target": "7",
      "type": "step",
      "style": {
          "stroke": "#f6ab6c"
      },
      "data": {
          "type": "edge"
      },
      "label": "a step edge",
      "animated": true,
      "labelStyle": {
          "fill": "#f6ab6c",
          "fontWeight": 700
      }
  },
  {
      "id": "dndnode_8",
      "type": "customnode",
      "position": {
          "x": 625,
          "y": 65
      },
      "data": {
          "label": "<p><strong><br></strong></p><p><strong>Wild animal bite</strong></p><p><strong><br></strong></p>",
          "type": "node"
      }
  },
  {
      "source": "1",
      "sourceHandle": "b",
      "target": "dndnode_8",
      "targetHandle": null,
      "animated": false,
      "type": "customedge",
      "style": {
          "stroke": "#fff"
      },
      "label": "<p><br></p>",
      "data": {
          "type": "edge",
          "label": "<p><br></p>"
      },
      "arrowHeadType": "arrowclosed",
      "id": "reactflow__edge-1b-dndnode_8null"
  },
  {
      "id": "dndnode_10",
      "type": "customnode",
      "position": {
          "x": -179,
          "y": 181
      },
      "data": {
          "label": "<p><strong>Yes</strong></p><p>Start prophylaxis with both active and passive immunization</p><p>NSIM - kill the animal and send its brain for pathology examination</p>",
          "type": "node"
      }
  },
  {
      "source": "2",
      "sourceHandle": "b",
      "target": "dndnode_10",
      "targetHandle": null,
      "animated": false,
      "type": "customedge",
      "style": {
          "stroke": "#fff"
      },
      "label": "<p><br></p>",
      "data": {
          "type": "edge",
          "label": "<p><br></p>"
      },
      "arrowHeadType": "arrowclosed",
      "id": "reactflow__edge-2b-dndnode_10null"
  },
  {
      "id": "dndnode_17",
      "type": "customnode",
      "position": {
          "x": 241.00000000000003,
          "y": 181
      },
      "data": {
          "label": "<p><strong>NO</strong></p><p>Observe the animal for 10 days. <sup>b&nbsp;&nbsp;</sup></p><p>Does the animal develop signs of rabies</p>",
          "type": "node"
      }
  },
  {
      "source": "2",
      "sourceHandle": "b",
      "target": "dndnode_17",
      "targetHandle": null,
      "animated": false,
      "type": "customedge",
      "style": {
          "stroke": "#fff"
      },
      "label": "<p><br></p>",
      "data": {
          "type": "edge",
          "label": "<p><br></p>"
      },
      "arrowHeadType": "arrowclosed",
      "id": "reactflow__edge-2b-dndnode_17null"
  },
  {
      "source": "dndnode_10",
      "sourceHandle": "b",
      "target": "dndnode_16",
      "targetHandle": null,
      "animated": false,
      "type": "customedge",
      "style": {
          "stroke": "#fff"
      },
      "label": "<p><br></p>",
      "data": {
          "type": "edge",
          "label": "<p><br></p>"
      },
      "arrowHeadType": "arrowclosed",
      "id": "reactflow__edge-dndnode_10b-dndnode_16jhchvdsvcvsdhcgs"
  },
  {
      "source": "dndnode_2",
      "sourceHandle": "b",
      "target": "dndnode_16",
      "targetHandle": null,
      "animated": false,
      "type": "customedge",
      "style": {
          "stroke": "#fff"
      },
      "label": "<p><br></p>",
      "data": {
          "type": "edge",
          "label": "<p><br></p>"
      },
      "arrowHeadType": "arrowclosed",
      "id": "reactflow__edge-dndnode_10b-dndnode_16null"
  },
  {
      "id": "node_17",
      "type": "customnode",
      "position": {
          "x": -179,
          "y": 281
      },
      "data": {
          "label": "<p><strong>Pathology report is negative</strong></p>",
          "type": "node"
      }
  },
  {
      "source": "dndnode_10",
      "sourceHandle": "b",
      "target": "node_17",
      "targetHandle": null,
      "id": "edge_1",
      "animated": false,
      "type": "customedge",
      "style": {
          "stroke": "#fff"
      },
      "label": "<p><br></p>",
      "data": {
          "type": "edge",
          "label": "<p><br></p>"
      },
      "arrowHeadType": "arrowclosed"
  },
  {
      "id": "node_19",
      "type": "customnode",
      "position": {
          "x": 41,
          "y": 281
      },
      "data": {
          "label": "<p><strong>Pathology report is positive</strong></p>",
          "type": "node"
      }
  },
  {
      "source": "dndnode_10",
      "sourceHandle": "b",
      "target": "node_19",
      "targetHandle": null,
      "id": "edge_1",
      "animated": false,
      "type": "customedge",
      "style": {
          "stroke": "#fff"
      },
      "label": "dhvsdhvd",
      "data": {
          "type": "edge",
          "label": "<p><br></p>"
      },
      "arrowHeadType": "arrowclosed"
  },
  {
      "id": "node_21",
      "type": "customnode",
      "position": {
          "x": 241,
          "y": 281
      },
      "data": {
          "label": "<p><strong>Yes</strong></p>",
          "type": "node"
      }
  },
  {
      "source": "dndnode_17",
      "sourceHandle": "b",
      "target": "node_21",
      "targetHandle": null,
      "id": "edge_1",
      "animated": false,
      "type": "customedge",
      "style": {
          "stroke": "#fff"
      },
      "label": "dhvsdhvd",
      "data": {
          "type": "edge",
          "label": "<p><br></p>"
      },
      "arrowHeadType": "arrowclosed"
  },
  {
      "source": "dndnode_10",
      "sourceHandle": "b",
      "target": "node_21",
      "targetHandle": null,
      "id": "edge_1",
      "animated": false,
      "type": "customedge",
      "style": {
          "stroke": "#fff"
      },
      "label": "dhvsdhvd",
      "data": {
          "type": "edge",
          "label": "<p><br></p>"
      },
      "arrowHeadType": "arrowclosed"
  },
  {
      "id": "node_24",
      "type": "customnode",
      "position": {
          "x": 381,
          "y": 281
      },
      "data": {
          "label": "<p><strong>No</strong></p>",
          "type": "node"
      }
  },
  {
      "source": "dndnode_17",
      "sourceHandle": "b",
      "target": "node_24",
      "targetHandle": null,
      "id": "edge_1",
      "animated": false,
      "type": "customedge",
      "style": {
          "stroke": "#fff"
      },
      "label": "dhvsdhvd",
      "data": {
          "type": "edge",
          "label": "<p><br></p>"
      },
      "arrowHeadType": "arrowclosed"
  },
  {
      "id": "node_26",
      "type": "customnode",
      "position": {
          "x": 501,
          "y": 181
      },
      "data": {
          "label": "<p><strong>High risk wild animal bite</strong></p>",
          "type": "node"
      }
  },
  {
      "source": "dndnode_8",
      "sourceHandle": "b",
      "target": "node_26",
      "targetHandle": null,
      "id": "edge_1",
      "animated": false,
      "type": "customedge",
      "style": {
          "stroke": "#fff"
      },
      "label": "dhvsdhvd",
      "data": {
          "type": "edge",
          "label": "<p><br></p>"
      },
      "arrowHeadType": "arrowclosed"
  },
  {
      "id": "node_28",
      "type": "customnode",
      "position": {
          "x": 721,
          "y": 181
      },
      "data": {
          "label": "<p><strong>Low risk wild animal bite</strong></p>",
          "type": "node"
      }
  },
  {
      "source": "dndnode_8",
      "sourceHandle": "b",
      "target": "node_28",
      "targetHandle": null,
      "id": "edge_1",
      "animated": false,
      "type": "customedge",
      "style": {
          "stroke": "#fff"
      },
      "label": "dhvsdhvd",
      "data": {
          "type": "edge",
          "label": "<p><br></p>"
      },
      "arrowHeadType": "arrowclosed"
  },
  {
      "id": "node_30",
      "type": "customnode",
      "position": {
          "x": 541,
          "y": 281
      },
      "data": {
          "label": "<p>Start prophylaxis</p>",
          "type": "node"
      }
  },
  {
      "source": "node_26",
      "sourceHandle": "b",
      "target": "node_30",
      "targetHandle": null,
      "id": "edge_1",
      "animated": false,
      "type": "customedge",
      "style": {
          "stroke": "#fff"
      },
      "label": "dhvsdhvd",
      "data": {
          "type": "edge",
          "label": "<p><br></p>"
      },
      "arrowHeadType": "arrowclosed"
  },
  {
      "id": "node_32",
      "type": "customnode",
      "position": {
          "x": 701,
          "y": 281
      },
      "data": {
          "label": "<p>No need prophylaxis</p>",
          "type": "node"
      }
  },
  {
      "source": "node_28",
      "sourceHandle": "b",
      "target": "node_32",
      "targetHandle": null,
      "id": "edge_1",
      "animated": false,
      "type": "customedge",
      "style": {
          "stroke": "#fff"
      },
      "label": "dhvsdhvd",
      "data": {
          "type": "edge",
          "label": "<p><br></p>"
      },
      "arrowHeadType": "arrowclosed"
  }
]