import { useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
} from 'react-flow-renderer';

import initialNodes from './nodes.js';
import initialEdges from './edges.js';
import CustomeNodeParent from './CustomNode.js';
import CustomColumn from './CustomColumn.js';
import { MarkerType } from 'react-flow-renderer';
import { elements } from './elements.js';

const rfStyle = {
  backgroundColor: '#D0C0F7',
  height :'100vh'
};

const nodeTypes = { customParentnode: CustomeNodeParent, customColummn : CustomColumn };

function ReactFlowPoc(props) {
  const [nodes, setNodes] = useState(elements);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge({...connection, type:'step', markerStart:{type:MarkerType.Arrow}, markerEnd:{type:MarkerType.ArrowClosed}}, eds)),
    [setEdges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      style={rfStyle}
      nodeTypes={nodeTypes}
      attributionPosition="top-right"
      connectionLineType="step"
      // snapToGrid={false}
    >
      {/* <Background /> */}
    </ReactFlow>
  );
}

export default ReactFlowPoc;
