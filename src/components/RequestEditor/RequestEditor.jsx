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
  const { request, setRequest } = useStore();

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
            value={request.type || 'GET'}
            label='Request Type'
            onChange={(e) => {
              setRequest({
                ...request,
                type: e.target.value,
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
          defaultValue={request.address}
          onChange={(e) => {
            setRequest({ ...request, address: e.target.value });
          }}
          sx={{
            marginRight: 2,
            flexGrow: 1,
          }}
        />
        <Button
          variant='contained'
          onClick={() => {
            console.log('sending');
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
                setRequest({
                  ...request,
                  params: [
                    ...(request.params || []),
                    { key: key || '', value: value || '' },
                  ],
                });
                setKey('');
                setValue('');
              }}>
              Add
            </Button>
          </div>
          {request.params?.map((param, index) => (
            <div
              key={`${param.key}-${index}`}
              style={{ display: 'flex', gap: 2 }}>
              <TextField
                label='Key'
                variant='outlined'
                defaultValue={param.key}
                onChange={(e) => {
                  const newParams = [...request.params];
                  newParams[index].key = e.target.value;
                  setRequest({ ...request, params: newParams });
                }}
              />
              <TextField
                label='Value'
                variant='outlined'
                disabled={
                  param.key === '' ||
                  param.key === null ||
                  param.key === undefined
                }
                defaultValue={param.value}
                onChange={(e) => {
                  const newParams = [...request.params];
                  newParams[index].value = e.target.value;
                  setRequest({ ...request, params: newParams });
                }}
              />
              <Button
                onClick={() => {
                  const newParams = request.params.filter(
                    (_, i) => i !== index
                  );
                  setRequest({ ...request, params: newParams });
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
                setRequest({
                  ...request,
                  headers: [
                    ...(request.headers || []),
                    { key: key || '', value: value || '' },
                  ],
                });
                setKey('');
                setValue('');
              }}>
              Add
            </Button>
          </div>
          {request.headers?.map((header, index) => (
            <div
              key={`${header.key}-${index}`}
              style={{ display: 'flex', gap: 2 }}>
              <TextField
                label='Key'
                variant='outlined'
                defaultValue={header.key}
                onChange={(e) => {
                  const newHeaders = [...request.headers];
                  newHeaders[index].key = e.target.value;
                  setRequest({ ...request, headers: newHeaders });
                }}
              />
              <TextField
                label='Value'
                variant='outlined'
                disabled={
                  header.key === '' ||
                  header.key === null ||
                  header.key === undefined
                }
                defaultValue={header.value}
                onChange={(e) => {
                  const newHeaders = [...request.headers];
                  newHeaders[index].value = e.target.value;
                  setRequest({ ...request, headers: newHeaders });
                }}
              />
              <Button
                onClick={() => {
                  const newHeaders = request.headers.filter(
                    (_, i) => i !== index
                  );
                  setRequest({ ...request, headers: newHeaders });
                }}
                variant='contained'
                color='error'>
                Delete
              </Button>
            </div>
          ))}
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
              setRequest({ ...request, body: e.target.value });
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
