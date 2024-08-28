import React, { useState, useRef, useEffect } from "react";
import Line from "./index";
import LinkIcon from "@material-ui/icons/Link";
import Draggable from "react-draggable";
import "../style.css";
import LineCompo from "../LineCompo";
import { getSmoothStepPath } from "./edgeStyle";
import { initialState } from "./elements";

const boxStyle = {
  border: "1px #999 solid",
  borderRadius: "0px",
  textAlign: "center",
  width: "12.5rem",
  height: "30px",
  color: "black",
  alignItems: "center",
  display: "flex",
  justifyContent: "start",
};

const canvasStyle = {
  width: "100%",
  height: "100vh",
  background: "white",
  overflow: "auto",
  display: "flex",
  color: "black",
  cursor: "pointer",
};

const returnRotateFlow = (moveX, posX, moveY, posY) => {
  if (moveX - posX > 1 && moveY - posY > 1) {
    return "rotateX(0deg)";
  }
  if (moveX - posX < 1 && moveY - posY > 1) {
    return "rotateY(180deg)";
  }
  if (moveX - posX > 1 && moveY - posY < 1) {
    return "rotateX(180deg)";
  }
  if (moveX - posX < 1 && moveY - posY < 1) {
    return "rotate(180deg)";
  }
};

const SimpleTemplate = ({ updateXarrow }) => {
  const a = useRef(0);

  // const updateXarrow = useXarrow();
  const scrollFunc = () => {
    updateXarrow();
  };

  const [flag, setflag] = useState(false);

  const [boxArray, setBoxArray] = useState(initialState);

  const [actveEle, setActveEle] = useState(null);
  const [point, setPoint] = useState({
    start: null,
    end: null,
    parentStart: null,
    parentEnd: null,
  });
  const [parentConnection, setParentConnection] = useState([]);
  const [connection, setConnection] = useState([]);
  const [position, setposition] = useState({
    display: false,
    sX: "0",
    sy: "0",
    lx: "",
    ly: "",
    style: {
      top: "",
      left: "",
      position: "absolute",
    },
  });

  const [pos, setpos] = useState();
  const [dragPos, setDragPos] = useState({
    x: "",
    y: "",
  });

  const handleDragPosition = (e, id) => {
    // updateXarrow()
    console.log(e.pageX, e.pageY);
    setDragPos({
      x: e.pageX - 50,
      y: e.pageY - 50,
    });
    setBoxArray([
      ...boxArray.map((item) => {
        if (item.id === id) {
          (item.xpos = e.pageX - 50), (item.ypos = e.pageY - 50);
        }
        return item;
      }),
    ]);
  };

  const onDragEnd = (e, id) => {
    console.log(e.pageX, e.pageY);
    setDragPos({
      x: e.pageX - 50,
      y: e.pageY - 50,
    });
    setBoxArray([
      ...boxArray.map((item) => {
        if (item.id === id) {
          (item.xpos = e.pageX - 50), (item.ypos = e.pageY - 50);
        }
        return item;
      }),
    ]);
  };

  // establish connection
  const setEndpoints = (e, id, parentId, key) => {
    console.log(id, parentId);
    e.stopPropagation();
    if (point.start && point.start !== id && key === "end") {
      setPoint({
        ...point,
        end: id,
        parentEnd: parentId,
      });
      setConnection([
        ...connection,
        {
          start: point.start,
          end: id,
          parentStart: point.parentStart,
          parentEnd: parentId,
          position: position,
        },
      ]);
      console.log(parentConnection);
      if (!parentConnection.some((items) => items.end === parentId)) {
        setParentConnection([
          ...parentConnection,
          { start: point.parentStart, end: parentId },
        ]);
      }
      setPoint({
        start: null,
        end: null,
        parentStart: null,
        parentEnd: null,
      });
    } else {
      setPoint({
        start: null,
        end: null,
        parentStart: null,
        parentEnd: null,
      });
      setPoint({
        ...point,
        start: id,
        parentStart: parentId,
      });
    }
  };

  useEffect(() => {
    console.log(connection);
  }, [connection]);

  //on mouse down start making connection
  const connectNode = (e, id, parentId, key) => {
    e.preventDefault();
    e.stopPropagation();
    var element = e.target;
    let boxCenter = {
      x: element.getBoundingClientRect().left,
      y: element.getBoundingClientRect().top - 5,
    };
    var topPos = element.getBoundingClientRect().top + window.scrollY;
    var leftPos = element.getBoundingClientRect().left + window.scrollX;
    setEndpoints(e, id, parentId, key);
    console.log(e.pageX, e.pageY, boxCenter.x, boxCenter.y);
    setposition({
      ...position,
      display: true,
      sX: boxCenter.x,
      sy: boxCenter.y,
      lX: e.pageX,
      ly: e.pageY,
      style: {
        position: "absolute",
        top: boxCenter.y,
        left: boxCenter.x,
      },
    });
    document.onmousemove = (event) => {
      console.log(event.pageX, event.pageY, event.target.id);
      event.preventDefault();
      let angle =
        Math.atan2(event.pageX - boxCenter.x, -(event.pageY - boxCenter.y)) *
        (180 / Math.PI);
      console.log(event.screenX, event.screenY, event.target.offsetTop);
      const posVal = event.target.getBoundingClientRect();
      console.log(posVal);
      setposition({
        ...position,
        display: true,
        lx: Math.abs(event.pageX - e.pageX),
        ly: Math.abs(event.pageY - e.pageY),
        style: {
          position: "absolute",
          top: Math.abs(boxCenter.y + 10),
          left: Math.abs(boxCenter.x),
          width: Math.abs(event.pageX - e.pageX),
          height: Math.abs(event.pageY - e.pageY),
          transformOrigin: "0% 0%",
          transform: returnRotateFlow(
            event.pageX,
            e.pageX,
            event.pageY,
            e.pageY
          ),
        },
      });
    };
    document.onmouseup = stopConnection;
  };
  /// stop connection
  const stopConnection = (e) => {
    document.onmousemove = null;
    document.onMouseDown = null;
    setposition({
      display: false,
      sX: "0",
      sy: "0",
      lx: "",
      ly: "",
      style: {
        top: "",
        left: "",
        position: "absolute",
      },
    });
  };

  //on mouse up
  const onMouseUp = (e, id, parentId, key) => {
    setEndpoints(e, id, parentId, key);
    stopConnection(e);
  };

  //remove connsction here
  const removeConnection = (item) => {
    const newarray = connection;
    const filteredElements = newarray.filter(
      (items) =>
        items.parentStart === item.parentStart &&
        items.parentEnd === item.parentEnd
    );
    if (filteredElements.length < 2) {
      const parentIndex = parentConnection.findIndex(
        (ele) => ele.start === item.parentStart && ele.end === item.parentEnd
      );
      parentConnection.splice(parentIndex, 1);
      setParentConnection([...parentConnection]);
    }
    const index = newarray.findIndex((items) => items === item);
    newarray.splice(index, 1);
    setConnection([...newarray]);
  };

  const handleChange = (elementId) => {
    setActveEle(elementId);
    a.current.clear();
  };

  const setAnchorPoints = (value) => {
    const nVlaue = value.split(",");
    if (actveEle) {
      setBoxArray([
        ...boxArray.map((items) => {
          items.child.map((item) => {
            if (actveEle === item.id) {
              if (nVlaue.includes("left")) {
                item.left = true;
              }
              if (nVlaue.includes("right")) {
                item.right = true;
              }
            }
          });
          return items;
        }),
      ]);
    }
  };

  const onexpand = (id) => {
    setBoxArray([
      ...boxArray.map((items) => {
        if (items.id === id) {
          items.expand = !items.expand;
        }
        return items;
      }),
    ]);
    updateXarrow();
    document.onclick = () => {
      updateXarrow();
    };
    setflag(!flag);
  };

  const getIdandParentid = (items, key) => {
    if (key === "end") {
      return document.getElementById(items.end)
        ? items.end
        : document.getElementById(items.start)
        ? items.parentEnd
        : null;
    } else if (key === "start") {
      return document.getElementById(items.start)
        ? items.start
        : document.getElementById(items.end)
        ? items.parentStart
        : null;
    }
  };

  return (
    <>
      <div style={canvasStyle} id="canvas" onScroll={scrollFunc}>
        {/* <Xwrapper> */}
        {position.display && (
          <svg style={position.style}>
            <g>
              <path
                className="line"
                // d={`M ${position.sX}, ${position.sy} L ${position.lx}, ${position.sy} `}
                fill="none"
                d={`M${position.sX},${position.sy} 
                  h${position.lx / 2} 
                  v${position.ly} 
                  h${position.lx / 2}
                  `}
                // d={getSmoothStepPath(position.sX, position.sy, 'top', position.lX, position.ly, 'top')}
              />
            </g>
          </svg>
        )}
        {connection.map((items) => {
          <svg style={items.position.style}>
            <path
              className="line"
              // d={`M ${position.sX}, ${position.sy} L ${position.lx}, ${position.sy} `}
              fill="none"
              d={`M${items.position.sX},${items.position.sy} 
                 h${items.position.lx / 2} 
                 v${items.position.ly} 
                 h${items.position.lx / 2}`}
            />
          </svg>;
        })}
        {/* <svg>
              <path fill="none" className="line" d="M 100, 100 h100 v100 h100 "/>
          </svg> */}

        {/* <svg width="500px" height="320px"> 
            <path d="M200,10 h100 v100 h100 v100 h-100 v100 h-100 v-100 h-100 v-100 h100" fill="none" stroke="black"/>
          </svg> */}

        {boxArray.map((items) => (
          <Draggable
            handle=".handle"
            key={items.id}
            onDrag={(e) => handleDragPosition(e, items.id)}
            onDragEnd={(e) => onDragEnd(e, items.id)}
            style={{ position: "absolute", left: items.xpos, top: items.ypos }}
          >
            <div
              className="container-side"
              id={items.id}
              style={{ width: "200px", height: "fit-content" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  position: "relative",
                }}
              >
                {
                  // item.left &&
                  <i
                    className="fa fa-plus"
                    style={{
                      width: "20px",
                      height: "10px",
                      position: "absolute",
                      left: "-5px",
                    }}
                    onMouseDown={(e) =>
                      connectNode(e, items.id + items.name, null, "start")
                    }
                    onMouseUp={(e) =>
                      onMouseUp(e, items.id + items.name, null, "end")
                    }
                  ></i>
                }
                <h3
                  style={{ width: "100%", textAlign: "center" }}
                  onStart={true}
                  className="handle"
                  id={items.id + items.name}
                >
                  {items.name}
                </h3>
                {
                  // item.right &&
                  <i
                    className="fa fa-plus"
                    style={{
                      width: "20px",
                      height: "10px",
                      position: "absolute",
                      right: "-5px",
                    }}
                    onMouseDown={(e) =>
                      connectNode(e, items.id + items.name, null, "start")
                    }
                    onMouseUp={(e) =>
                      onMouseUp(e, items.id + items.name, null, "end")
                    }
                  ></i>
                }
              </div>
              <button
                onClick={() => onexpand(items.id)}
                className="expandButton"
              >
                +
              </button>
              <div>
                {items.expand &&
                  items.child.map((item) => (
                    <>
                      <div>
                        <div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            {
                              // item.left &&
                              <i
                                className="fa fa-plus"
                                style={{ width: "10px", height: "10px" }}
                                onMouseDown={(e) =>
                                  connectNode(e, item.id, items.id, "start")
                                }
                                onMouseUp={(e) =>
                                  onMouseUp(e, item.id, items.id, "end")
                                }
                              ></i>
                            }
                            <div
                              id={item.id}
                              style={{ ...boxStyle }}
                              onMouseUp={(e) =>
                                onMouseUp(e, item.id, items.id, "end")
                              }
                            >
                              <input type="checkbox" /> <p>Column</p>
                            </div>
                            {
                              // item.right &&
                              <i
                                className="fa fa-plus"
                                style={{ width: "10px", height: "10px" }}
                                onMouseDown={(e) =>
                                  connectNode(e, item.id, items.id, "start")
                                }
                                onMouseUp={(e) =>
                                  onMouseUp(e, item.id, items.id, "end")
                                }
                              ></i>
                            }
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
              </div>
            </div>
          </Draggable>
        ))}
        {/* {
            parentConnection.length &&
            parentConnection.map((items)=>            
            <Xarrow
              path="grid"
              strokeWidth={0.5}
              zIndex={1000}
              headSize={16}
              color="black"
              start={ items.start }
              end={ items.end}
              labels={
                <LinkIcon/>
              }
              startAnchor="auto"
              endAnchor="auto"
            />
            )
          } */}

        {connection.length
          ? connection.map((items) => (
              <Line
                path="grid"
                strokeWidth={0.5}
                zIndex={1000}
                headSize={16}
                color="black"
                start={getIdandParentid(items, "start")}
                end={getIdandParentid(items, "end")}
                labels={
                  <i
                    className="fas fa-times"
                    style={{ cursor: "pointer" }}
                    onClick={() => removeConnection(items)}
                  ></i>
                }
                startAnchor="auto"
                endAnchor="auto"
              />
            ))
          : ""}
        {/* </Xwrapper> */}
      </div>
    </>
  );
};

export default SimpleTemplate;

// setEndpoints(id)
