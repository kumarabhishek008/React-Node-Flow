
  const nodes = [
    {
      id: 'A',
      type: 'customParentnode',
      position: { x: 0, y: 0 },
      className:"custom_node_parent",
    },
    {
      id: 'A-1',
      type:'customColummn',
      className:'custom_column_child',
      data: { label: 'Column 1' },
      position: { x: 0, y: 0 },
      draggable:false,
      parentNode: 'A',
      extent: 'parent',
    },
    {
      id: 'A-2',
      type:'customColummn',
      data: { label: 'Column 2' },
      className:'custom_column_child',
      position: { x: 0, y: 20},
      draggable:false,
      parentNode: 'A',
      extent: 'parent',
    },
    {
      id: 'B',
      type: 'customParentnode',
      position: { x: 100, y: 0 },
      className:"custom_node_parent",
    },
    {
      id: 'B-1',
      type:'customColummn',
      className:'custom_column_child',
      data: { label: 'Column 1' },
      position: { x: 0, y: 0 },
      draggable:false,
      parentNode: 'B',
      extent: 'parent',
    },
    {
      id: 'B-2',
      type:'customColummn',
      data: { label: 'Column 2' },
      className:'custom_column_child',
      position: { x: 0, y: 20},
      draggable:false,
      parentNode: 'B',
      extent: 'parent',
    },
  ];
  
  export default nodes;