import React, { useState, useRef, useEffect } from "react";
import Xarrow, { useXarrow, xarrowPropsType, Xwrapper } from "react-xarrows";
import LinkIcon from '@material-ui/icons/Link';
import Draggable from "react-draggable";
import "./style.css";
import LineCompo from "./LineCompo";

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
    xpos:'',
    ypos:'',
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
    xpos:200,
    ypos:'',
    child: [
      { id: "box9", left: false, right: false },
      { id: "box10", left: false, right: false },
      { id: "box11", left: false, right: false },
      { id: "box12", left: false, right: false },
    ],
  },
  // {
  //   id: "box3",
  //   expand: false,
  //   name: "Table 3",
  //   child: [
  //     { id: "box13", left: false, right: false },
  //     { id: "box14", left: false, right: false },
  //     { id: "box16", left: false, right: false },
  //     { id: "box17", left: false, right: false },
  //   ],
  // },
  // {
  //   id: "box4",
  //   expand: false,
  //   name: "Table 4",
  //   child: [
  //     { id: "box18", left: false, right: false },
  //     { id: "box19", left: false, right: false },
  //     { id: "box20", left: false, right: false },
  //     { id: "box23", left: false, right: false },
  //   ],
  // },
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

const SimpleTemplate = ({updateXarrow}) => {
  const a = useRef(0);

  // const updateXarrow = useXarrow();
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
  const [parentConnection, setParentConnection] = useState([])
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

  const [pos, setpos] = useState()
  const [dragPos, setDragPos] = useState({
      x:'',
      y:''
  })

  const handleDragPosition = (e, id) => {
    
      console.log(e.pageX, e.pageY)
      setDragPos({
          x:e.pageX-50,
          y:e.pageY-50
      })
      setBoxArray([...boxArray.map((item)=>{
        if(item.id===id){
          item.xpos = e.pageX-50,
          item.ypos = e.pageY-50
        }
        return item
      })])
  }

  const onDragEnd = (e, id) => {

      console.log(e.pageX, e.pageY)
      setDragPos({
          x:e.pageX-50,
          y:e.pageY-50
      })
      setBoxArray([...boxArray.map((item)=>{
        if(item.id===id){
          item.xpos = e.pageX-50,
          item.ypos = e.pageY-50
        }
        return item
      })])
  }

  // establish connection
  const setEndpoints = (e, id, parentId, key) => {console.log(id, parentId)
    e.stopPropagation();
    if (point.start && point.start !== id && key === 'end') {
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
          position:position
        },
      ]);console.log(parentConnection)
      if(!parentConnection.some(items=>items.end===parentId)){
        setParentConnection([...parentConnection,{start:point.parentStart, end: parentId}])
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
    console.log(connection)
  }, [connection])

  //on mouse down start making connection
  const connectNode = (e, id, parentId, key) => {
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
    setEndpoints(e, id, parentId, key);
    console.log(e.pageX, e.pageY);
    setposition({
      ...position,
      display: true,
      sX: e.pageX,
      sy: e.pageY,
      lX: e.pageX,
      ly: e.pageY,
      style: {
        position: "absolute",
        top: element.getBoundingClientRect().top,
        left: element.getBoundingClientRect().left,
      },
    });
    document.onmousemove = (event) => {console.log(event.pageX, event.pageY)
      let angle =
        Math.atan2(event.pageX - boxCenter.x, -(event.pageY - boxCenter.y)) *
        (180 / Math.PI);
      console.log(event.screenX, event.screenY, event.target.offsetTop);
      const posVal = event.target.getBoundingClientRect();
      console.log(posVal)
      setposition({
        ...position,
        display: true,
        lx: Math.abs(event.pageX - e.pageX),
        ly: Math.abs(event.pageY - e.pageY),
        style: {
          position: "absolute",
          top: Math.abs(e.pageY + (posVal.top) - 2),
          left: Math.abs(e.pageX),
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
    // setposition({
    //   display: false,
    //   sX: "0",
    //   sy: "0",
    //   lx: "",
    //   ly: "",
    //   style: {
    //     top: "",
    //     left: "",
    //     position: "absolute",
    //   },
    // });
  };

  //on mouse up
  const onMouseUp = (e, id, parentId, key) => {
    setEndpoints(e, id, parentId, key);
    stopConnection(e);
  };

  //remove connsction here
  const removeConnection = (item) => {
    const newarray = connection;
    const filteredElements = newarray.filter(items=>(items.parentStart===item.parentStart && items.parentEnd === item.parentEnd));
    if(filteredElements.length<2){
      const parentIndex = parentConnection.findIndex(ele=>(ele.start === item.parentStart && ele.end === item.parentEnd))
      parentConnection.splice(parentIndex,1);
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
    updateXarrow()
    document.onclick = () =>{
      updateXarrow()
    }
    setflag(!flag)
  };

  const getIdandParentid = (items, key) => {
    if(key==='end'){
      return document.getElementById(items.end) ? items.end : document.getElementById(items.start) ? items.parentEnd :null;
    }else if(key==='start'){
       return (document.getElementById(items.start)) ? items.start : (document.getElementById(items.end)) ? items.parentStart :null;
    }
  }
  
  return (
    <>
      <div style={canvasStyle} id="canvas" onScroll={scrollFunc}>
        {/* <Xwrapper> */}
          {position.display && (
            <svg style={position.style}>
              <path
                className="line"
                // d={`M ${position.sX}, ${position.sy} L ${position.lx}, ${position.sy} `}
                fill="none"
                d={`M${position.sX},${position.sy} 
                 h${position.lx/2} 
                 v${position.ly} 
                 h${position.lx/2}`}
              />
            </svg>
          )}
          {
            connection.map((items)=>{
              <svg style={items.position.style}>
              <path
                className="line"
                // d={`M ${position.sX}, ${position.sy} L ${position.lx}, ${position.sy} `}
                fill="none"
                d={`M${items.position.sX},${items.position.sy} 
                 h${items.position.lx/2} 
                 v${items.position.ly} 
                 h${items.position.lx/2}`}
              />
            </svg>
            })
          }
          {/* <svg>
              <path fill="none" className="line" d="M 100, 100 h100 v100 h100 "/>
          </svg> */}

          {/* <svg width="500px" height="320px"> 
  <path d="M200,10 h100 v100 h100 v100 h-100 v100 h-100 v-100 h-100 v-100 h100 Z" fill="none" stroke="black"/>
</svg> */}
              
          {boxArray.map((items) => (
              <div className="container-side" id={items.id} draggable={true} key={items.id} onDrag={(e)=>handleDragPosition(e,items.id)} onDragEnd={(e)=>onDragEnd(e,items.id)} style={{position:'absolute',left:items.xpos, top:items.ypos}}>
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
                                  connectNode(e, item.id, items.id,'start')
                                }
                                onMouseUp={(e) => onMouseUp(e, item.id, items.id,'end')}
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
                                  connectNode(e, item.id, items.id,'start')
                                }
                                onMouseUp={(e) => onMouseUp(e, item.id, items.id,'end')}
                              ></i>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
              </div>
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
                  // gridBreak="20%"
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
