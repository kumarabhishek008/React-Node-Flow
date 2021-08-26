import React, { useState, useRef } from "react";
import Xarrow, { useXarrow, xarrowPropsType, Xwrapper } from "react-xarrows";
import Draggable from "react-draggable";
import "./style.css";

const boxStyle = {
  border: "1px #999 solid",
  borderRadius: "0px",
  textAlign: "center",
  width: "12.5rem",
  height: "30px",
  color: "black",
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
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

const initialState = [
  {
    id: "box1",
    expand: false,
    name: "Table 1",
    child: [
      { id: "box5", left: false, right: false },
      { id: "box6", left: false, right: false },
      { id: "box7", left: false, right: false },
      { id: "box8", left: false, right: false },
    ],
  },
  {
    id: "box2",
    expand: false,
    name: "Table 2",
    child: [
      { id: "box9", left: false, right: false },
      { id: "box10", left: false, right: false },
      { id: "box11", left: false, right: false },
      { id: "box12", left: false, right: false },
    ],
  },
  {
    id: "box3",
    expand: false,
    name: "Table 3",
    child: [
      { id: "box13", left: false, right: false },
      { id: "box14", left: false, right: false },
      { id: "box16", left: false, right: false },
      { id: "box17", left: false, right: false },
    ],
  },
  {
    id: "box4",
    expand: false,
    name: "Table 4",
    child: [
      { id: "box18", left: false, right: false },
      { id: "box19", left: false, right: false },
      { id: "box20", left: false, right: false },
      { id: "box23", left: false, right: false },
    ],
  },
];

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

const SimpleTemplate = () => {
  const a = useRef(0);

  const updateXarrow = useXarrow();
  const scrollFunc = () => {
    updateXarrow();
  };

  const [flag, setflag] = useState(false)

  const [boxArray, setBoxArray] = useState(initialState);

  const [actveEle, setActveEle] = useState(null);
  const [point, setPoint] = useState({
    start: null,
    end: null,
    parentStart: null,
    parentEnd: null,
  });
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

  // establish connection
  const setEndpoints = (e, id, parentId) => {console.log(id, parentId)
    e.stopPropagation();
    if (point.start && point.start !== id) {
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
        },
      ]);
      setPoint({
        start: null,
        end: null,
        parentStart: null,
        parentEnd: null,
      });
    } else {
      setPoint({
        ...point,
        start: id,
        parentStart: parentId,
      });
    }
  };

  //on mouse down start making connection
  const connectNode = (e, id, parentId) => {
    e.preventDefault();
    e.stopPropagation();
    var element = e.target;
    let boxCenter = {
      x:
        element.getBoundingClientRect().left +
        element.getBoundingClientRect().width / 2,
      y:
        element.getBoundingClientRect().top +
        element.getBoundingClientRect().height / 2,
    };
    var topPos = element.getBoundingClientRect().top + window.scrollY;
    var leftPos = element.getBoundingClientRect().left + window.scrollX;
    setEndpoints(e, id, parentId);
    console.log(topPos, leftPos);
    setposition({
      ...position,
      display: true,
      sX: e.pageX,
      sy: e.pageY,
      style: {
        position: "absolute",
        top: element.getBoundingClientRect().top,
        left: element.getBoundingClientRect().left,
      },
    });
    document.onmousemove = (event) => {
      let angle =
        Math.atan2(event.pageX - boxCenter.x, -(event.pageY - boxCenter.y)) *
        (180 / Math.PI);
      console.log(event.screenX, event.screenY, event.target);
      setposition({
        ...position,
        display: true,
        lx: Math.abs(event.screenX - leftPos),
        ly: Math.abs(event.screenY - topPos - 100),
        style: {
          position: "absolute",
          top: Math.abs(e.pageY - 2),
          left: Math.abs(e.pageX),
          width: Math.abs(event.screenX - leftPos),
          height: Math.abs(event.screenY - topPos - 100),
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
  const onMouseUp = (e, id, parentId) => {
    setEndpoints(e, id, parentId);
    stopConnection(e);
  };

  //remove connsction here
  const removeConnection = (item) => {
    const newarray = connection;
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
    updateXarrow()
    document.onclick = () =>{
      updateXarrow()
    }
    setflag(!flag)
  };

  const getIdandParentid = (items, key) => {
    if(key==='end'){
      return document.getElementById(items.end) ? items.end : items.parentEnd
    }else if(key==='start'){
       return (document.getElementById(items.start)) ? items.start : items.parentStart
    }
  }
  
  return (
    <>
      <div style={canvasStyle} id="canvas" onScroll={scrollFunc}>
        <Xwrapper>
          {position.display && (
            <svg style={position.style}>
              <marker
                id="arrow"
                markerWidth="4"
                markerHeight="20"
                refX="0"
                refY="4"
                orient="auto"
                markerUnits="strokeWidth"
                viewBox="0 0 50 50"
              >
                <path d="M0,0 L0,6 L9,3 z" fill="#f00"></path>
              </marker>
              <path
                className="line"
                // d={`M${position.sX},${position.sy} L${position.lx},${position.sy} `}
                fill="none"
                d={`M${position.sX},${position.sy}  h ${position.lx/2} v${position.ly} h ${position.lx/2}`}
              />
            </svg>
          )}
          {/* <svg>
              <path fill="none" className="line" d="M 100, 100 h 100 v 100 h 100 "/>
          </svg>

          <svg width="500px" height="320px"> 
  <path d="M200,10 h100 v100 h100 v100 h-100 v100 h-100 v-100 h-100 v-100 h100 Z" fill="none" stroke="black"/>
</svg> */}
              
          {boxArray.map((items) => (
            <Draggable
              handle=".handle"
              onDrag={updateXarrow}
              onStop={updateXarrow}
            >
              <div className="container-side" id={items.id} key={items.id}>
                <h3 className="handle">{items.name}</h3>
                <input
                  onChange={(e) => handleChange(e.target.value)}
                  placeholder="Input id ..."
                />
                <input
                  onChange={(e) => setAnchorPoints(e.target.value)}
                  ref={a}
                  placeholder="Input anchors ..."
                />
                <button onClick={() => onexpand(items.id)}>Expand</button>
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
                            (
                              <i
                                className="fa fa-plus"
                                onMouseDown={(e) =>
                                  connectNode(e, item.id, items.id)
                                }
                                onMouseUp={(e) => onMouseUp(e, item.id, items.id)}
                              ></i>
                            )}
                            <div id={item.id} style={{ ...boxStyle }}>
                              {item.id}
                            </div>
                            {
                            // item.right && 
                            (
                              <i
                                className="fa fa-plus"
                                onMouseDown={(e) =>
                                  connectNode(e, item.id, items.id)
                                }
                                onMouseUp={(e) => onMouseUp(e, item.id, items.id)}
                              ></i>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
              </div>
            </Draggable>
          ))}
          {connection.length
            ? connection.map((items) => (
                <Xarrow
                  path="grid"
                  strokeWidth={0.5}
                  zIndex={1000}
                  headSize={16}
                  color="black"
                  start={getIdandParentid(items,'start')}
                  end={ getIdandParentid(items,'end')}
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
        </Xwrapper>
      </div>
    </>
  );
};

export default SimpleTemplate;

// setEndpoints(id)
