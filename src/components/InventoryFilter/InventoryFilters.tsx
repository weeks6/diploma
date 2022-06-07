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

const InventoryFilters = ({ roomOptions }: TProps) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedRooms, setSelectedRooms] = useState<string[]>(() => {
    const rooms = searchParams.get('room');
    if (rooms?.length) {
      return rooms.split(',');
    }

    return [];
  });

  const onRoomChange = (event: SelectChangeEvent<typeof selectedRooms>) => {
    const {
      target: { value }
    } = event;
    setSelectedRooms(() => {
      const newSelectedRooms =
        typeof value === 'string' ? value.split(',') : value;

      const params: any = {};

      if (newSelectedRooms.length) {
        params.room = newSelectedRooms.join(',');
      }

      setSearchParams(params);

      return newSelectedRooms;
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
          {roomOptions.map((room) => (
            <MenuItem key={room.id} value={`${room.id}`}>
              <Checkbox checked={selectedRooms.includes(`${room.id}`)} />
              <ListItemText primary={room.title} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default InventoryFilters;
