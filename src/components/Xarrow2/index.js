import React, { useRef, useState } from "react";
import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";
import Draggable from "react-draggable";
import { data } from "./data";
import { AddOutlined } from "@mui/icons-material";

const boxStyle = {
  border: "grey solid 2px",
  borderRadius: "10px",
  padding: "5px",
};

const XarrowComponent = () => {
  const [connections, setConnections] = useState([]);

  const [sourceId, setSourceId] = useState(null);

  function addConnect(sId, tId) {
    setConnections([...connections, { sId, tId }]);
  }
  return (
    <div
      style={{ display: "flex", justifyContent: "space-evenly", width: "100%" }}
    >
      <Xwrapper>
        {data.map((item) => (
          <DraggableBox
            id={item.id}
            name={item.name}
            addConnect={addConnect}
            sourceId={sourceId}
            setSourceId={setSourceId}
          />
        ))}
        {connections.map((item, i) => (
          <Xarrow start={item?.sId} end={item?.tId} showHead={true} />
        ))}
      </Xwrapper>
    </div>
  );
};

const DraggableBox = ({ id, name, addConnect, sourceId, setSourceId }) => {
  const updateXarrow = useXarrow();

  function onMouseDrag(e, id) {
    e.preventDefault();
    e.stopPropagation();
    setSourceId(id);
    console.log(e.target, id);
  }
  function onMouseStop(e, id) {
    console.log(sourceId, id);
    addConnect(sourceId, id);
  }
  return (
    <Draggable onDrag={updateXarrow} onStop={updateXarrow}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <AddOutlined
          fontSize="small"
          id={`${id}_1`}
          onMouseDown={(e) => onMouseDrag(e, `${id}_1`)}
          onMouseUp={(e) => onMouseStop(e, `${id}_1`)}
        />
        <div id={id} style={boxStyle}>
          {name}
        </div>
        <AddOutlined
          fontSize="small"
          id={`${id}_2`}
          onMouseDown={(e) => onMouseDrag(e, `${id}_2`)}
          onMouseUp={(e) => onMouseStop(e, `${id}_2`)}
        />
      </div>
    </Draggable>
  );
};

export default XarrowComponent;
