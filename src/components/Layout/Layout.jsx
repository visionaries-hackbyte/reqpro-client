import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Panel, PanelGroup } from 'react-resizable-panels';
import { viewStore } from '../../stores/useRequestStore';
import HistoryView from '../HistoryView/HistoryView';
import NewPopUp from '../NewPopUp/NewPopUp';
import RequestEditor from '../RequestEditor/RequestEditor';
import ResizeHandle from '../ResizeHandle/ResizeHandle';
import ResponseView from '../ResponseView/ResponseView';
import Sidebar from '../Sidebar/Sidebar';

const Layout = () => {
  const view = viewStore((state) => state.viewNew);

  useEffect(() => {
    console.log('view changed to', view);
  }, [view]);

  const [viewRes, setViewRes] = useState(false);

  return (
    <>
      <PanelGroup direction='horizontal'>
        <Panel defaultSize={30} minSize={10} maxSize={30}>
          <Sidebar />
        </Panel>
        <ResizeHandle />
        <Panel defaultSize={70} minSize={70} maxSize={90}>
          <PanelGroup direction='vertical'>
            <Panel defaultSize={50} minSize={10} maxSize={90}>
              <RequestEditor />
            </Panel>
            <ResizeHandle direction='vertical' />
            <Panel
              defaultSize={50}
              minSize={10}
              maxSize={90}
              style={{ overflowY: 'auto' }}>
              <div
                style={{
                  display: 'flex',
                  gap: 2,
                  width: '100%',
                  justifyContent: 'start',
                }}>
                <Button
                  variant='contained'
                  onClick={() => {
                    setViewRes(true);
                  }}>
                  Response
                </Button>
                <Button
                  variant='contained'
                  onClick={() => {
                    setViewRes(false);
                  }}>
                  History
                </Button>
              </div>
              {viewRes ? <ResponseView /> : <HistoryView />}
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
      {view && <NewPopUp />}
    </>
  );
};

export default Layout;
