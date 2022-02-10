import React, {  } from 'react';

import { Handle } from 'react-flow-renderer';
const CustomNodeSelector = ({ data, isConnectable }) => {
  return (
    <>
      <Handle
        type="target"
        position="top"
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <div dangerouslySetInnerHTML={{__html: data.label}} style={{backgroundColor:'white', padding:'0.4rem 1rem', borderRadius:'4px', fontSize:'10px'}}/>
      <Handle
        type="source"
        position="bottom"
        id="b"
        style={{ bottom: '-4px', top: 'auto', background: '#555' }}
        isConnectable={isConnectable}
      />
    </>
  );
};

export default CustomNodeSelector;