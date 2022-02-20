import React from 'react';
import {
  getBezierPath,
  getSmoothStepPath,
  getEdgeCenter,
  getMarkerEnd,
} from 'react-flow-renderer';

import './styles.css';

const foreignObjectSize = 20;

const onEdgeClick = (evt, id) => {
  evt.stopPropagation();
  alert(`remove ${id}`);
};

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  arrowHeadType,
  markerEndId,
}) {
  const edgePath = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);
  const [edgeCenterX, edgeCenterY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
        type="StraightEdge"
      />
      <foreignObject
        width={100}
        height={50}
        x={edgeCenterX - foreignObjectSize / 4}
        y={edgeCenterY - foreignObjectSize / 2}
        className="edgebutton-foreignobject"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <body>
            <div dangerouslySetInnerHTML={{__html: data.label}} style={{backgroundColor:'white', borderRadius:'4px', fontSize:'8px', cursor:'pointer', width:'fit-content'}}/>
        </body>
      </foreignObject>
    </>
  );
}