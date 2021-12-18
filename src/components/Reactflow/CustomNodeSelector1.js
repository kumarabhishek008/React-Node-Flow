import React, {  } from 'react';

import { Handle } from 'react-flow-renderer';
const CustomNodeSelector = ({ data, isConnectable }) => {
  return (
    <>
      <Handle
        type="target"
        position="left"
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <div className="customNode-1">
        Custom Color Picker Node  1
      </div>
      <Handle
        type="source"
        position="right"
        id="a1"
        style={{ top: 10, background: '#555' }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position="right"
        id="b1"
        style={{ bottom: 10, top: 'auto', background: '#555' }}
        isConnectable={isConnectable}
      />
    </>
  );
};

export default CustomNodeSelector;