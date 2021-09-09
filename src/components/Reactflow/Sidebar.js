import React, { DragEvent } from 'react';

const onDragStart = (event, nodeType) => {
  event.stopPropagation();
  event.dataTransfer.setData('application/reactflow', nodeType);
  event.dataTransfer.effectAllowed = 'move';
};

const Sidebar = () => {
  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the left.</div>
      <div className="react-flow__node-input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
        Input Node
      </div>
      <div className="react-flow__node-default" onDragStart={(event) => onDragStart(event, 'default')} draggable>
        Default Node
      </div>
      <div className="react-flow__node-output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
        Output Node
      </div>
    </aside>
  );
};

export default Sidebar;