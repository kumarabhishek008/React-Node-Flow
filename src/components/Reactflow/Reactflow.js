import React, { useState, useEffect, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';
import elementsArr from './elements';
import { ContextMenu } from './contextMenu';
import './styles.css';

import ReactFlow, {
    isEdge,
    removeElements,
    addEdge,
    MiniMap,
    Controls,
  } from 'react-flow-renderer';

import '../../index.css';



const initBgColor = '#1A192B';

const connectionLineStyle = { stroke: '#fff' };
const snapGrid = [20, 20];

const Reactflow = () => {
    const [open, setOpen] = useState(false);
    const [reactflowInstance, setReactflowInstance] = useState(null);
    const [elements, setElements] = useState([]);  // main data elements for save
    const [bgColor, setBgColor] = useState(initBgColor);
    const [nodeData, setnodeData] = useState(null);
    const [inputChange, setinputChange] = useState("")
    const [selectedElement, setselectedElement] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [permission, setpermission] = useState(true)

    const updateNodedata = (text, node) => {
      const findElementindex = elements.findIndex((items)=>items.id===node.id);
      if(findElementindex>-1 && elements[findElementindex]?.data?.label){
        elements[findElementindex].data.label = text;
        setElements([...elements])
      }
    }

    const onNodeDragStop = (event, node) => {
      const findElementindex = elements.findIndex((items)=>items.id===node.id);
      if(findElementindex>-1){
        elements[findElementindex]= node;
        setElements([...elements])
      }
      console.log(node, elements)
    };
    
    const onElementClick = (event, node) => {
      handleClickOpen();
      setnodeData(node);
      const findElement = elements.find(items=>items.id===node.id);
      if(findElement){
        setinputChange(findElement?.data?.label||findElement?.label);
      }
    };
 
      useEffect(() => {
        setElements(elementsArr);
      }, [])

      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
        setElements([...elements])
      };

      useEffect(() => {
        if (reactflowInstance && elements.length > 0) {
          reactflowInstance.fitView();
        }
      }, [reactflowInstance, elements.length]);

      const onElementsRemove = useCallback(
        (elementsToRemove) =>
          setElements((els) => removeElements(elementsToRemove, els)),
        []
      );
      const onConnect = useCallback(
        (params) =>
          setElements((els) =>
            addEdge({ ...params, animated: true, style: { stroke: '#fff' },label:'dhvsdhvd',data:{ type:'edge'}, arrowHeadType: 'arrowclosed', }, els)
          ),
        []
      );

      const deleteNode = () => {
        setElements((elements) => elements.filter((element) => element.id != nodeData.id));
        setIsOpen(false);
      };

      const onLoad = useCallback(
        (rfi) => {
          if (!reactflowInstance) {
            setReactflowInstance(rfi);
            console.log('flow loaded:', rfi);
          }
        },
        [reactflowInstance]
      );

      let id = elements.length;
      const getId = () => `dndnode_${id++}`;

      const handleSave = () => {
        const findIndex = elements.findIndex(items=>items.id===nodeData.id);
        if(nodeData?.data?.type==="node"){
          if(findIndex>-1){
            elements[findIndex].data.label = inputChange;
            elements[findIndex].position.x = elements[findIndex].position.x + 1; 
            elements[findIndex].position.y = elements[findIndex].position.y + 1; 
            setElements([...elements])
          }
        }else if(nodeData?.data?.type==="edge"){
          if(findIndex>-1){
            elements[findIndex].label = inputChange;
            setElements([...elements])
          }
        }
        handleClose();
      }

      const createNew = () => {
        const newNode = {
          id: getId(),
          type: 'default',
          data: { label: 'An input node', type:"node" },
          position: { x: 20, y: 20 },
          sourcePosition: 'right',
        }
        setElements((es) => es.concat(newNode));
      }
      
      useEffect(() => {
        if(nodeData){
          setElements((els) =>
            els.map((el) => {
              if (el.id === nodeData.id) {
                // it's important that you create a new object here
                // in order to notify react flow about the change
                el.data = {
                  ...el.data,
                  label: inputChange,
                };
              }      
              return el;
            })
          );
        }
      }, [inputChange]);
      
      const onContextMenu = (e) => {
          e.preventDefault();
          setIsOpen(true);
          setPosition({ x: e.clientX - 20, y: e.clientY - 20 });
      }

      const handleSaveFlowData = () => {
      console.log(elements)
      }
      
      const handleMouseEnter = (e, node) => {console.log(node)
        setnodeData(node)
      }
      

    return (
        <div style={{width:'100%', height:'100vh', position:'relative'}}>
          {
            permission &&
            <>
                <Button onClick={createNew} variant="contained" color="secondary"
                  style={{position:'absolute', top:'0', zIndex:'100'}}
                >Create New Node</Button>
                <Button onClick={handleSaveFlowData} variant="contained" color="primary"
                  style={{position:'absolute', top:'0', right:0, zIndex:'100'}}
                >Save</Button>
            </>
          }
                <Dialog
                    open={open && nodeData && permission}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">{"Change Node Label"}</DialogTitle>
                    <DialogContent>
                      <TextField
                        label="Node Label"
                        onChange={(e)=>setinputChange(e.target.value)}
                        value={inputChange}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                        Cancel
                      </Button>
                      <Button onClick={handleSave} color="primary" autoFocus>
                        Save
                      </Button>
                    </DialogActions>
                  </Dialog>
                <ReactFlow
                    elements={elements}
                    onElementClick={onElementClick}
                    // onNodeMouseLeave={onNodeMouseLeave}
                    onElementsRemove={onElementsRemove}
                    onConnect={onConnect}
                    onNodeDragStop={onNodeDragStop}
                    style={{ background: bgColor }}
                    onLoad={onLoad}
                    // nodeTypes={nodeTypes}
                    onNodeContextMenu={onContextMenu}
                    connectionLineStyle={connectionLineStyle}
                    snapToGrid={true}
                    snapGrid={snapGrid}
                    defaultZoom={0.9}
                    onNodeMouseEnter={handleMouseEnter}
                    >
                    <ContextMenu
                      isOpen={isOpen}
                      position={position}
                      onMouseLeave={()=>setIsOpen(false)}
                      actions={[{label:'Delete', effect:deleteNode}]}
                    />
                    <MiniMap
                        nodeStrokeColor={(n) => {
                        if (n.type === 'input') return '#0041d0';
                        if (n.type === 'selectorNode') return bgColor;
                        if (n.type === 'output') return '#ff0072';
                        }}
                        nodeColor={(n) => {
                        if (n.type === 'selectorNode') return bgColor;
                        return '#fff';
                        }}
                    />
                    <Controls />
                    </ReactFlow>
        </div>
    )
}

export default Reactflow
