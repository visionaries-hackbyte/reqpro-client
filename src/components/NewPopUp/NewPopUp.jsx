import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import useStore, { viewStore } from '../../stores/useRequestStore';

const NewPopUp = () => {
  const { setViewNew } = viewStore();
  const [name, setName] = useState(null);
  const [isCollection, setIsCollection] = useState(false);
  const [collection, setCollection] = useState(null);
  const { addCollection, collections, addRequest } = useStore();

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#00000080',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 20,
      }}
      onClick={() => {
        setViewNew(false);
      }}>
      <Container
        sx={{
          width: '50%',
          height: '50%',
          backgroundColor: '#fff',
          borderRadius: 2,
          boxShadow: 3,
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}>
        <h1>New</h1>
        <TextField
          label='Name'
          variant='outlined'
          fullWidth
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <FormControlLabel
          control={<Checkbox />}
          label='is a collection'
          onChange={(e) => {
            setIsCollection(e.target.checked);
          }}
        />
        {!isCollection && collections.length > 0 && (
          <FormControl fullWidth>
            <InputLabel id='collection-label'>Collection</InputLabel>
            <Select
              labelId='collection-label'
              id='collection-select'
              value={collection}
              label='Collection'
              onChange={(e) => {
                setCollection(e.target.value);
              }}>
              {collections.map((collection) => (
                <MenuItem key={collection._id} value={collection._id}>
                  {collection.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <Button
          variant='contained'
          onClick={() => {
            isCollection
              ? addCollection({ name })
              : addRequest({ name, collectionId: collection || null });
            setName(null);
            setIsCollection(false);
            setCollection(null);
            setViewNew(false);
          }}>
          Create
        </Button>
      </Container>
    </div>
  );
};

export default NewPopUp;
