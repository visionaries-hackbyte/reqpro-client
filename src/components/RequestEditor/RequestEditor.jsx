import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import useStore from '../../stores/useRequestStore';

const RequestEditor = () => {
  const { request, setRequest, updateRequest, sendRequest } = useStore();

  const [value, setValue] = useState(null);
  const [key, setKey] = useState(null);
  const [tab, setTab] = useState(1);
  return request ? (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        padding: 2,
        boxSizing: 'border-box',
        backgroundColor: '#f0f0f0',
      }}>
      <h3>{request.name}</h3>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 2,
        }}>
        <FormControl
          sx={{
            minWidth: 120,
          }}>
          <InputLabel id='request-type-label'>Request Type</InputLabel>
          <Select
            labelId='request-type-label'
            id='request-type'
            value={request.method || 'GET'}
            label='Request Type'
            onChange={(e) => {
              updateRequest({
                ...request,
                method: e.target.value,
              });
            }}>
            <MenuItem value='GET'>GET</MenuItem>
            <MenuItem value='POST'>POST</MenuItem>
            <MenuItem value='PUT'>PUT</MenuItem>
            <MenuItem value='DELETE'>DELETE</MenuItem>
            <MenuItem value='PATCH'>PATCH</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label='address'
          variant='outlined'
          value={request.url || ''}
          onChange={(e) => {
            updateRequest({ ...request, url: e.target.value });
          }}
          sx={{
            marginRight: 2,
            flexGrow: 1,
          }}
        />
        <Button
          variant='contained'
          onClick={() => {
            sendRequest(request);
          }}>
          Send
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
          marginBottom: 2,
        }}>
        <Button variant='contained' onClick={() => setTab(1)}>
          Params
        </Button>
        <Button variant='contained' onClick={() => setTab(2)}>
          Headers
        </Button>
        <Button variant='contained' onClick={() => setTab(3)}>
          Body
        </Button>
        <Button variant='contained' onClick={() => setTab(4)}>
          Tests
        </Button>
      </div>
      {tab === 1 && (
        <div>
          <h4>Params</h4>
          <div
            style={{
              display: 'flex',
              gap: 2,
              marginBottom: 2,
            }}>
            <TextField
              label='Key'
              variant='outlined'
              value={key || ''}
              onChange={(e) => {
                setKey(e.target.value);
              }}
            />
            <TextField
              label='Value'
              value={value || ''}
              variant='outlined'
              disabled={key === '' || key === null || key === undefined}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
            <Button
              variant='contained'
              onClick={() => {
                updateRequest({
                  ...request,
                  params: {
                    ...(request.params || {}),
                    [key]: value,
                  },
                });
                setKey('');
                setValue('');
              }}>
              Add
            </Button>
          </div>
          {Object.entries(request.params || {}).map(([pkey, pvalue], index) => (
            <div key={`${pkey}`} style={{ display: 'flex', gap: 2 }}>
              <TextField
                label='Key'
                variant='outlined'
                defaultValue={pkey}
                onChange={(e) => {
                  const newKey = e.target.value;
                  const newParams = { ...request.params };

                  // Delete the old key and add the new key with the same value
                  delete newParams[pkey];
                  newParams[newKey] = pvalue;

                  updateRequest({ ...request, params: newParams });
                }}
              />
              <TextField
                label='Value'
                variant='outlined'
                disabled={pkey === '' || pkey === null || pkey === undefined}
                defaultValue={pvalue}
                onChange={(e) => {
                  const newValue = e.target.value;
                  const newParams = { ...request.params };

                  // Delete the old key and add the new key with the same value
                  newParams[pkey] = newValue;

                  updateRequest({ ...request, params: newParams });
                }}
              />
              <Button
                onClick={() => {
                  const newParams = { ...request.params };
                  delete newParams[pkey];
                  updateRequest({ ...request, params: newParams });
                }}
                variant='contained'
                color='error'>
                Delete
              </Button>
            </div>
          ))}
        </div>
      )}
      {tab === 2 && (
        <div>
          <h4>Headers</h4>
          <div
            style={{
              display: 'flex',
              gap: 2,
              marginBottom: 2,
            }}>
            <TextField
              label='Key'
              variant='outlined'
              value={key || ''}
              onChange={(e) => {
                setKey(e.target.value);
              }}
            />
            <TextField
              label='Value'
              value={value || ''}
              variant='outlined'
              disabled={key === '' || key === null || key === undefined}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
            <Button
              variant='contained'
              onClick={() => {
                updateRequest({
                  ...request,
                  headers: {
                    ...(request.headers || {}),
                    [key]: value,
                  },
                });
                setKey('');
                setValue('');
              }}>
              Add
            </Button>
          </div>
          {Object.entries(request.headers || {}).map(
            ([hkey, hvalue], index) => (
              <div key={`${hkey}-${index}`} style={{ display: 'flex', gap: 2 }}>
                <TextField
                  label='Key'
                  variant='outlined'
                  defaultValue={hkey}
                  onChange={(e) => {
                    const newKey = e.target.value;
                    const newHeaders = { ...request.headers };

                    // Delete the old key and add the new key with the same value
                    delete newHeaders[hkey];
                    newHeaders[newKey] = hvalue;

                    updateRequest({ ...request, params: newHeaders });
                  }}
                />
                <TextField
                  label='Value'
                  variant='outlined'
                  disabled={hkey === '' || hkey === null || hkey === undefined}
                  defaultValue={hvalue}
                  onChange={(e) => {
                    const newHeaders = { ...request.headers };
                    newHeaders[hkey] = e.target.value;
                    updateRequest({ ...request, headers: newHeaders });
                  }}
                />
                <Button
                  onClick={() => {
                    const newHeaders = { ...request.headers };
                    delete newHeaders[hkey];
                    updateRequest({ ...request, headers: newHeaders });
                  }}
                  variant='contained'
                  color='error'>
                  Delete
                </Button>
              </div>
            )
          )}
        </div>
      )}
      {tab === 3 && (
        <div>
          <h4>Body</h4>
          <TextField
            label='Body'
            variant='outlined'
            multiline
            rows={10}
            defaultValue={request.body}
            onChange={(e) => {
              updateRequest({ ...request, body: e.target.value });
            }}
          />
        </div>
      )}
      {tab === 4 && (
        <div>
          <h4>Tests coming soon!</h4>
        </div>
      )}
    </div>
  ) : (
    'select a request'
  );
};

export default RequestEditor;
