import {
  Button,
  Container,
  Grid,
  IconButton,
  Input,
  Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ChangeEvent, useEffect, useState } from 'react';
import AddItemPopup from '../components/AddItemPopup/AddItemPopup';
import InventoryCard from '../components/InventoryCard/InventoryCard';
import ItemTypesPopup from '../components/ItemTypesPopup/ItemTypesPopup';
import RoomPopup from '../components/RoomPopup/RoomPopup';
import {
  itemList,
  ItemType,
  itemTypesList,
  Room,
  roomList,
  TInventoryFilters,
  TInventoryItem
} from '../services/item.service';
import InventoryFilters from '../components/InventoryFilter/InventoryFilters';
import { useParams, useSearchParams } from 'react-router-dom';

const Inventory = () => {
  const [itemTypesPopupOpened, setItemTypesPopupOpened] = useState(false);
  const [addItemPopupOpened, setAddItemPopupOpenedOpened] = useState(false);
  const [roomPopupOpened, setRoomPopupOpened] = useState(false);
  const [fetchingItemTypes, setFetchingItemTypes] = useState(false);
  const [fetchingRooms, setFetchingRooms] = useState(false);
  const [fetchingItems, setFetchingItems] = useState(false);
  const [items, setItems] = useState<TInventoryItem[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [itemTypes, setItemTypes] = useState<ItemType[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const fetchRooms = async () => {
    try {
      setFetchingRooms(true);
      const result = await roomList();
      setRooms(result);
    } catch (error) {
      console.log(error);
    } finally {
      setFetchingRooms(false);
    }
  };

  const fetchItemTypes = async () => {
    try {
      setFetchingItemTypes(true);
      const result = await itemTypesList();
      setItemTypes(result);
    } catch (error) {
      console.log(error);
    } finally {
      setFetchingItemTypes(false);
    }
  };

  const fetchItems = async () => {
    try {
      setFetchingItems(true);

      const filters: TInventoryFilters = {};

      const roomFilters = searchParams.get('room');
      if (roomFilters) {
        filters.room = roomFilters;
      }

      const typeFilters = searchParams.get('type');
      if (typeFilters) {
        filters.type = typeFilters;
      }

      const result = await itemList(filters);
      setItems(result);
    } catch (error) {
      console.log(error);
    } finally {
      setFetchingItems(false);
    }
  };

  const init = async () => {
    fetchItemTypes();
    fetchRooms();
  };

  const openItemTypes = () => {
    setItemTypesPopupOpened(true);
  };

  const closeItemTypes = () => {
    setItemTypesPopupOpened(false);
  };

  const openRooms = () => {
    setRoomPopupOpened(true);
  };

  const closeRooms = () => {
    setRoomPopupOpened(false);
  };

  const onAddItemSuccess = () => {
    init();
    fetchItems();
  };

  const onRoomUpdate = () => {
    init();
    fetchItems();
  };

  const onItemTypesUpdate = () => {
    init();
    fetchItems();
  };

  useEffect(() => {
    fetchItems();
  }, [searchParams]);

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Container sx={{ marginTop: 2 }}>
        <Grid container spacing={{ xs: 1 }}>
          <Grid item>
            <Button
              variant='outlined'
              onClick={openItemTypes}
              disabled={fetchingItemTypes}
            >
              Типы оборудования
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant='outlined'
              onClick={openRooms}
              disabled={fetchingRooms}
            >
              Помещения
            </Button>
          </Grid>
        </Grid>
        <Grid container alignItems='center' marginBottom={1}>
          <Grid item marginRight={1}>
            <IconButton
              aria-label='Создать'
              size='large'
              color='primary'
              onClick={() => setAddItemPopupOpenedOpened(true)}
            >
              <AddIcon fontSize='inherit' />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant='h5'>Оборудование</Typography>
          </Grid>
        </Grid>
        <InventoryFilters
          roomOptions={rooms}
          itemTypeOptions={itemTypes}
        ></InventoryFilters>
        <Grid
          container
          spacing={{ xs: 2, md: 4 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {items.map((item, index) => (
            <Grid item key={index} xs={4} sm={4} md={4}>
              <InventoryCard item={item} />
            </Grid>
          ))}
        </Grid>

        <ItemTypesPopup
          opened={itemTypesPopupOpened}
          onClose={closeItemTypes}
          itemTypes={itemTypes}
          onUpdate={onItemTypesUpdate}
        ></ItemTypesPopup>

        <AddItemPopup
          itemTypes={itemTypes}
          rooms={rooms}
          opened={addItemPopupOpened}
          onClose={() => setAddItemPopupOpenedOpened(false)}
          onUpdate={onAddItemSuccess}
        ></AddItemPopup>

        <RoomPopup
          rooms={rooms}
          opened={roomPopupOpened}
          onClose={closeRooms}
          onUpdate={onRoomUpdate}
        ></RoomPopup>
      </Container>
    </>
  );
};

export default Inventory;
