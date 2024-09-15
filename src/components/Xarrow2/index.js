import React, { useRef, useState } from "react";
import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";
import Draggable from "react-draggable";
import { data } from "./data";
import { AddOutlined, Close } from "@mui/icons-material";
import { Box, CylinderShape, EndNode } from "./shape";
import dagre from "dagre";
import { IconButton } from "@mui/material";
import { get, has, random, stubString } from "lodash";

const boxStyle = {
  border: "grey solid 2px",
  borderRadius: "4px",
  padding: "5px",
  width: "5rem",
};

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 50;

const getLayoutedElements = (nodes, edges, direction = "LR") => {
  let newNodes = [];
  let newEdges = edges;

  function addEndNode() {
    const iniNodes = nodes;

    newNodes = iniNodes.reduce((acc, item, i) => {
      const cihd = !item?.situation?.child?.length && item?.type !== "endnode";
      if (cihd) {
        let addNode = {
          id: String(random(999999, 99999999)),
          type: "endnode",
          name: "Add",
          situation: {
            child: [],
            parent: [item.id],
          },
          positions: {
            x: 400,
            y: 400,
          },
        };
        console.log(addNode);
        item.situation.child = [...item?.situation?.child, addNode?.id];
        newEdges = [...newEdges, { sId: item?.id, tId: addNode.id }];
        acc.push(item);
        acc.push(addNode);
      } else {
        acc.push(item);
      }
      return acc;
    }, []);
    return newNodes;
  }
  addEndNode();
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  newNodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  newEdges.forEach((edge) => {
    dagreGraph.setEdge(edge.sId, edge.tId);
  });

  dagre.layout(dagreGraph);

  console.log(newNodes);

  newNodes = newNodes.map((node) => {
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

  return { nodes: newNodes, edges: newEdges };
};

const XarrowComponent = () => {
  const [connections, setConnections] = useState([
    {
      sId: "ele1_2_b",
      tId: "ele2_1_t",
    },
    {
      sId: "ele2_2_b",
      tId: "ele3_1_t",
    },
    {
      sId: "ele3_2_b",
      tId: "ele4_1_t",
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

  function deleteMe(sid, tid) {
    const conn = connections.findIndex(
      (item) => item.sId === sid && item.tId === tid
    );
    connections.splice(conn, 1);
    setConnections([...connections]);
  }

  function customLabel(conn) {
    return (
      <IconButton
        onClick={() => deleteMe(conn?.sId, conn?.tId)}
        sx={{
          background: "lightgray",
          padding: "2px",
          boxShadow: "0px 3px 4px #b2b2b2",
        }}
      >
        <Close fontSize="small" color="error" sx={{ fontSize: "12px" }} />
      </IconButton>
    );
  }
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
            shapeType={item.type}
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
            animateDrawing={true}
            labels={<>{customLabel(item)}</>}
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
  endnode: (props) => <EndNode {...props} />,
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
        {shapeType && has(shapes, shapeType) ? (
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
