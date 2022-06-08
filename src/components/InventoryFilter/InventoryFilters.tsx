import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ItemType, Room } from '../../services/item.service';

type TProps = {
  roomOptions: Room[];
  itemTypeOptions: ItemType[];
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const InventoryFilters = ({ roomOptions, itemTypeOptions }: TProps) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedRooms, setSelectedRooms] = useState<string[]>(() => {
    const rooms = searchParams.get('room');
    if (rooms?.length) {
      return rooms.split(',');
    }

    return [];
  });

  const [selectedTypes, setSelectedTypes] = useState<string[]>(() => {
    const types = searchParams.get('type');
    if (types?.length) {
      return types.split(',');
    }

    return [];
  });

  const onRoomChange = (event: SelectChangeEvent<typeof selectedRooms>) => {
    const {
      target: { value }
    } = event;
    setSelectedRooms(() => {
      if (
        typeof value === 'string'
          ? value.indexOf('all') > -1
          : value.includes('all')
      ) {
        searchParams.delete('room');
        setSearchParams(searchParams);
        return [];
      }

      const newSelectedRooms =
        typeof value === 'string' ? value.split(',') : value;

      const params: any = {};

      if (newSelectedRooms.length) {
        searchParams.set('room', newSelectedRooms.join(','));
      }

      setSearchParams(searchParams);

      return newSelectedRooms;
    });
  };

  const onTypeChange = (event: SelectChangeEvent<typeof selectedTypes>) => {
    const {
      target: { value }
    } = event;
    setSelectedTypes(() => {
      if (
        typeof value === 'string'
          ? value.indexOf('all') > -1
          : value.includes('all')
      ) {
        searchParams.delete('type');
        setSearchParams(searchParams);
        return [];
      }

      const newSelectedTypes =
        typeof value === 'string' ? value.split(',') : value;

      if (newSelectedTypes.length) {
        searchParams.set('type', newSelectedTypes.join(','));
      }

      setSearchParams(searchParams);

      return newSelectedTypes;
    });
  };

  return (
    <>
      <FormControl sx={{ m: 1, width: 300 }} size='small'>
        <InputLabel id='inventory-room-filter'>Помещения</InputLabel>
        <Select
          labelId='inventory-room-filter'
          id='demo-multiple-checkbox'
          multiple
          value={selectedRooms}
          onChange={onRoomChange}
          input={<OutlinedInput label='Помещения' />}
          renderValue={(selected) =>
            selected
              .map(
                (id) =>
                  roomOptions.find((room) => room.id === Number(id))?.title
              )
              .filter((v) => v)
              .join(', ')
          }
          MenuProps={MenuProps}
        >
          <MenuItem key='all' value='all'>
            <Checkbox checked={!selectedRooms.length} />
            <ListItemText primary='Все' />
          </MenuItem>
          {roomOptions.map((room) => (
            <MenuItem key={room.id} value={`${room.id}`}>
              <Checkbox checked={selectedRooms.includes(`${room.id}`)} />
              <ListItemText primary={room.title} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: 300 }} size='small'>
        <InputLabel id='inventory-type-filter'>Типы инвентаря</InputLabel>
        <Select
          labelId='inventory-type-filter'
          id='demo-multiple-checkbox'
          multiple
          value={selectedTypes}
          onChange={onTypeChange}
          input={<OutlinedInput label='Типы инвентаря' />}
          renderValue={(selected) =>
            selected
              .map(
                (id) =>
                  itemTypeOptions.find((type) => type.id === Number(id))?.title
              )
              .filter((v) => v)
              .join(', ')
          }
          MenuProps={MenuProps}
        >
          <MenuItem key='all' value='all'>
            <Checkbox checked={!selectedTypes.length} />
            <ListItemText primary='Все' />
          </MenuItem>
          {itemTypeOptions.map((type) => (
            <MenuItem key={type.id} value={`${type.id}`}>
              <Checkbox checked={selectedTypes.includes(`${type.id}`)} />
              <ListItemText primary={type.title} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default InventoryFilters;
