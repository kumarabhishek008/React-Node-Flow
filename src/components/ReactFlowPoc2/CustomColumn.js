import { useCallback } from 'react';
import { Handle, Position } from 'react-flow-renderer';

const handleStyle = { left: 10 };

function CustomColumn({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="custom_column_node">
      {/* <Handle type="target" position={Position.Top} /> */}
      <Handle type="target" position={Position.Left} />
      <div style={{padding:'2px 1rem'}}>
      {data?.label}
      </div>
      {/* <Handle type="target" position={Position.Bottom} id="a"/> */}
      <Handle type="source" position={Position.Right} id="a"/>
    </div>
  );
}

export default CustomColumn;
