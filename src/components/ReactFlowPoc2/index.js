import { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  MiniMap,
} from "react-flow-renderer";

import initialNodes from "./nodes.js";
import initialEdges from "./edges.js";
import CustomeNodeParent from "./CustomNode.js";
import CustomColumn from "./CustomColumn.js";
import { MarkerType } from "react-flow-renderer";
import { elements } from "./elements.js";
import { ContextMenu } from "./contextMenu";

const rfStyle = {
  backgroundColor: "#D0C0F7",
  height: "100vh",
};

const bgColor = "#1A192B";

const nodeTypes = {
  customParentnode: CustomeNodeParent,
  customColummn: CustomColumn,
};

function ReactFlowPoc2(props) {
  const [nodes, setNodes] = useState(elements);
  const [edges, setEdges] = useState(initialEdges);
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [anchorEle, setAnchorEle] = useState(null);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            type: "step",
            markerStart: { type: MarkerType.Arrow },
            markerEnd: { type: MarkerType.ArrowClosed },
          },
          eds
        )
      ),
    [setEdges]
  );

  const deleteNode = () => {
    setNodes((elements) =>
      elements.filter((element) => element.id != nodes.id)
    );
    setIsOpen(false);
  };

  const onContextMenu = (e) => {
    e.preventDefault();
    setIsOpen(true);
    setAnchorEle(e.currentTarget);
  };

  const resetFunc = (e) => {
    // e.preventDefault();
    setIsOpen(false);
    // setAnchorEle(null);
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      style={rfStyle}
      // onNodeContextMenu={onContextMenu}
      // onNodeDoubleClick={onContextMenu}
      onNodeMouseEnter={onContextMenu}
      onNodeMouseLeave={resetFunc}
      nodeTypes={nodeTypes}
      attributionPosition="top-right"
      connectionLineType="step"
      // snapToGrid={false}
    >
      {/* <Background /> */}
      <ContextMenu
        isOpen={isOpen}
        position={position}
        anchorEle={anchorEle}
        onMouseLeave={() => setIsOpen(false)}
        actions={[
          { label: "Delete", effect: deleteNode },
          { label: "Edit", effect: deleteNode },
        ]}
      />
      <MiniMap
        nodeStrokeColor={(n) => {
          if (n.type === "input") return "#0041d0";
          if (n.type === "selectorNode") return bgColor;
          if (n.type === "output") return "#ff0072";
        }}
        nodeColor={(n) => {
          if (n.type === "selectorNode") return bgColor;
          return "#fff";
        }}
      />
    </ReactFlow>
  );
}

export default ReactFlowPoc2;
