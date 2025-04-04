import React from 'react';
import { PanelResizeHandle } from 'react-resizable-panels';

const ResizeHandle = ({ direction = 'horizontal' }) => {
  return (
    <PanelResizeHandle
      className='resize-handle'
      style={{
        backgroundColor: '#ccc',
        cursor: direction === 'horizontal' ? 'ew-resize' : 'ns-resize',
        zIndex: 1,
        width: direction === 'horizontal' ? '2px' : '100%',
        height: direction === 'horizontal' ? '100%' : '2px',
        margin: direction === 'horizontal' ? '0 5px' : '5px 0',
        boxSizing: 'border-box',
      }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#ccc',
          opacity: 0.5,
        }}
      />
    </PanelResizeHandle>
  );
};

export default ResizeHandle;
