import { useCallback } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import './style.scss'

const handleStyle = { left: 10 };

function CustomeNodeParent({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Top} />
      <div className='custom_node_1'>
      </div>
      <Handle type="source" position={Position.Bottom}/>
    </div>
  );
}

export default CustomeNodeParent;
