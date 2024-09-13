import React, { useRef, useState } from "react";
import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";
import Draggable from "react-draggable";
import { data } from "./data";
import { AddOutlined } from "@mui/icons-material";
import { Box, CylinderShape } from "./shape";
import dagre from "dagre";

const boxStyle = {
  border: "grey solid 2px",
  borderRadius: "4px",
  padding: "5px",
  width: "5rem",
};

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 200;

const getLayoutedElements = (nodes, edges, direction = "LR") => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.sId, edge.tId);
  });

  dagre.layout(dagreGraph);

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const newNode = {
      ...node,
      targetPosition: isHorizontal ? "left" : "top",
      sourcePosition: isHorizontal ? "right" : "bottom",
      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      position: {
        x: 500 + nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };

    return newNode;
  });

  return { nodes: newNodes, edges };
};

const XarrowComponent = () => {
  const [connections, setConnections] = useState([
    {
      sId: "ele1_2_b",
      tId: "ele4_1_t",
    },
    {
      sId: "ele4_2_b",
      tId: "ele3_1_t",
    },
    {
      sId: "ele3_2_b",
      tId: "ele2_1_t",
    },
  ]);
  const [sourceId, setSourceId] = useState(null);
  const [movableEle, setmovableEle] = useState(null);
  const [movePos, setmovePos] = useState({
    top: 0,
    left: 0,
  });

  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    data,
    connections
  );

  function addConnect(sId, tId) {
    setConnections([...connections, { sId, tId }]);
  }

  function autoLayout() {}
  return (
    <div
      style={{ display: "flex", justifyContent: "space-evenly", width: "100%" }}
    >
      <Xwrapper>
        {layoutedNodes.map((item, i) => (
          <DraggableBox
            id={item.id}
            name={item.name}
            addConnect={addConnect}
            sourceId={sourceId}
            setSourceId={setSourceId}
            setmovableEle={setmovableEle}
            setmovePos={setmovePos}
            shapeType={i % 2 === 0 ? "cylinder" : "circle"}
            position={item?.position}
          />
        ))}
        {layoutedEdges.map((item, i) => (
          <Xarrow
            start={item?.sId}
            end={item?.tId}
            showHead={true}
            strokeWidth={1}
            path="smooth"
            // animateDrawing={true}
            dashness={{ strokeLen: 5, nonStrokeLen: 5, animation: true }}
          />
        ))}
        {sourceId && movableEle && (
          <Xarrow
            start={sourceId}
            end={movableEle}
            showHead={true}
            labels={"abcd"}
            color="green"
            strokeWidth={1}
            path="smooth"
            // animateDrawing={true}
            dashness={{ strokeLen: 5, nonStrokeLen: 5, animation: true }}
          />
        )}
        {sourceId && movableEle && (
          <div
            id="moveEle"
            style={{
              visibility: "hidden",
              width: "10px",
              height: "10px",
              background: "green",
              position: "absolute",
              top: movePos.top,
              left: movePos.left,
            }}
          ></div>
        )}
      </Xwrapper>
    </div>
  );
};

const shapes = {
  circle: (props) => <Box {...props} />,
  cylinder: (props) => <CylinderShape {...props} />,
};

const DraggableBox = ({
  id,
  name,
  addConnect,
  sourceId,
  setSourceId,
  setmovableEle,
  setmovePos,
  shapeType,
  position,
}) => {
  const updateXarrow = useXarrow();

  function onMouseDrag(e, id) {
    e.preventDefault();
    e.stopPropagation();
    setSourceId(id);
    document.onmousemove = onMousemove;
    document.onmouseup = onMouseDragStop;
  }

  function onMousemove(e) {
    setmovePos({
      top: e.clientY,
      left: e.clientX,
    });
    setmovableEle("moveEle");
  }

  function onMouseDragStop(e) {
    setmovableEle(null);
    document.onmousemove = null;
  }

  function onMouseStop(e, id) {
    addConnect(sourceId, id);
  }

  return (
    <Draggable onDrag={updateXarrow} onStop={updateXarrow}>
      <div
        style={{
          // textAlign: "center",
          position: "absolute",
          top: position?.y,
          left: position?.x,
        }}
      >
        <AddOutlined
          fontSize="small"
          id={`${id}_1_t`}
          onMouseDown={(e) => onMouseDrag(e, `${id}_1_t`)}
          onMouseUp={(e) => onMouseStop(e, `${id}_1_t`)}
          style={{
            fontSize: "10px",
            position: "absolute",
            top: 0,
            left: "45%",
          }}
        />
        <AddOutlined
          fontSize="small"
          id={`${id}_1_l`}
          onMouseDown={(e) => onMouseDrag(e, `${id}_1_l`)}
          onMouseUp={(e) => onMouseStop(e, `${id}_1_l`)}
          style={{
            fontSize: "10px",
            position: "absolute",
            top: "35%",
            left: 0,
          }}
        />
        {shapeType ? (
          shapes[shapeType]({ id })
        ) : (
          <div id={id} style={boxStyle}>
            {name}
          </div>
        )}
        <AddOutlined
          fontSize="small"
          id={`${id}_2_b`}
          onMouseDown={(e) => onMouseDrag(e, `${id}_2_b`)}
          onMouseUp={(e) => onMouseStop(e, `${id}_2_b`)}
          style={{
            fontSize: "10px",
            position: "absolute",
            bottom: 0,
            left: "45%",
          }}
        />
        <AddOutlined
          fontSize="small"
          id={`${id}_2_r`}
          onMouseDown={(e) => onMouseDrag(e, `${id}_2_r`)}
          onMouseUp={(e) => onMouseStop(e, `${id}_2_r`)}
          style={{
            fontSize: "10px",
            position: "absolute",
            top: "35%",
            right: 0,
          }}
        />
      </div>
    </Draggable>
  );
};

export default XarrowComponent;
