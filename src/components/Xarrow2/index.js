import React, { useEffect, useRef, useState } from "react";
import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";
import Draggable from "react-draggable";
import { data, edgeConn } from "./data";
import { AddOutlined, Close } from "@mui/icons-material";
import { Box, CylinderShape, EndNode, Simple } from "./shape";
import dagre from "dagre";
import { IconButton } from "@mui/material";
import { filter, get, has, includes, map, random, stubString } from "lodash";
import Draggablebox from "./draggablebox";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 50;

const getLayoutedElements = (nodes, edges, direction = "TB") => {
  let newNodes = [],
    newEdges = edges;
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
      item.situation.child = [...item?.situation?.child, addNode?.id];
      newEdges = [...newEdges, { sId: item?.id, tId: addNode.id }];
      acc.push(item);
      acc.push(addNode);
    } else {
      acc.push(item);
    }
    return acc;
  }, []);

  console.log(newNodes, newEdges);

  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  newNodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  newEdges.forEach((edge) => {
    dagreGraph.setEdge(edge.sId, edge.tId);
  });

  dagre.layout(dagreGraph);

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
  const [sourceId, setSourceId] = useState(null);
  const [movableEle, setmovableEle] = useState(null);
  const [dragEle, setDragEle] = useState(null);

  const [movePos, setmovePos] = useState({
    top: 0,
    left: 0,
  });

  let localNodes = localStorage.getItem("nodes"),
    localEdges = localStorage.getItem("edges");

  let n = localNodes ? JSON.parse(localNodes) : data,
    e = localEdges ? JSON.parse(localEdges) : edgeConn;

  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const [flag, setflag] = useState(false);

  useEffect(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      n,
      e
    );
    setNodes(layoutedNodes);
    setConnections(layoutedEdges);
  }, []);

  function addConnect(sId, tId) {
    handleSetNodesAndConnections(nodes, [...connections, { sId, tId }]);
  }

  function deleteMe(sid, tid) {
    const tgNodes = map(nodes, (item) => {
      if (item.id === sid && includes(item.situation.child, tid)) {
        if (item?.situation?.child?.length > 1) {
          item.situation.child = filter(
            item.situation.child,
            (ele) => ele !== tid
          );
        } else {
          item.situation.child = [];
        }
      }
      return item;
    });

    // let index = tgNodes.findIndex(
    //   (item) => item.id === tid && item?.type === "endnode"
    // );

    // if (index > -1) tgNodes.splice(index, 1);

    // change connetion
    const conn = connections.findIndex(
      (item) => item.sId === sid && item.tId === tid
    );

    connections.splice(conn, 1);

    handleSetNodesAndConnections([...tgNodes], [...connections]);
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

  function addNewNode(endNodeId) {
    const r = document.getElementById(endNodeId);
    let positions = r.getBoundingClientRect();
    const endNode = nodes.find((item) => item.id === endNodeId);
    let addNode = {
      id: String(random(999999, 99999999)),
      type: "simple",
      name: "New Ele",
      situation: {
        child: [endNode.id],
        parent: endNode.situation.parent,
      },
      position: {
        x: positions.x,
        y: positions.y,
      },
    };

    //
    handleSetNodesAndConnections(
      [
        ...nodes.map((item) => {
          if (item.id === endNodeId) {
            item.situation.parent = [addNode.id];
            item.position.y = positions.y + 2 * nodeHeight;
          }
          return item;
        }),
        addNode,
      ],
      [
        ...connections.map((item) => {
          if (item?.tId === endNodeId) {
            item.tId = addNode.id;
          }
          return item;
        }),
        { sId: addNode.id, tId: endNodeId },
      ]
    );
  }

  function handleSetNodesAndConnections(nodes, connections) {
    setNodes([...nodes]);
    setConnections([...connections]);
    setflag(!flag);
    localStorage.setItem("edges", JSON.stringify(connections));
    localStorage.setItem("nodes", JSON.stringify(nodes));
  }

  useEffect(() => {
    setflag(!flag);
  }, [connections, nodes]);

  return (
    <div
      style={{ display: "flex", justifyContent: "space-evenly", width: "100%" }}
    >
      <Xwrapper>
        {nodes.map((item, i) => (
          <Draggablebox
            id={item.id}
            name={item.name}
            addConnect={addConnect}
            sourceId={sourceId}
            setSourceId={setSourceId}
            setmovableEle={setmovableEle}
            setmovePos={setmovePos}
            shapeType={item.type}
            position={item?.position}
            addNewNode={addNewNode}
            dragEle={dragEle}
            setDragEle={setDragEle}
          />
        ))}
        {connections.map((item, i) => (
          <Xarrow
            start={item?.sId}
            end={item?.tId}
            showHead={true}
            strokeWidth={1}
            path="smooth"
            // animateDrawing={true}
            labels={<>{customLabel(item)}</>}
            dashness={{ strokeLen: 5, nonStrokeLen: 5, animation: true }}
          />
        ))}
        {sourceId && movableEle && (
          <Xarrow
            start={sourceId}
            end={movableEle}
            showHead={true}
            labels={<p style={{ fontSize: "10px" }}>Connect me</p>}
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

export default XarrowComponent;
