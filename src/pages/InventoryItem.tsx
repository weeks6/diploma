import {
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Typography
} from '@mui/material';
import QrIcon from '@mui/icons-material/QrCode';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  deleteItem,
  getItem,
  ItemType,
  itemTypesList,
  Room,
  roomList,
  TInventoryItem
} from '../services/item.service';
import { getServerImage } from '../utils/getServerImage';
import QrcodePopup from '../components/QrcodePopup/QrcodePopup';
import { ROOT_URL } from '../services/constants';
import EditItemPopup from '../components/EditItemPopup/EditItemPopup';
import ConfirmDialog from '../components/ConfirmDialog/ConfirmDialog';

export type ItemProperty = {
  key: string;
  value: string;
  id: string;
};

const InventoryItem = () => {
  const { id } = useParams();
  const [item, setItem] = useState({} as TInventoryItem);
  const [loading, setLoading] = useState(false);
  const [fetchingRooms, setFetchingRooms] = useState(false);
  const [fetchingItemTypes, setFetchingItemTypes] = useState(false);
  const [qrcodePopupOpened, setQrcodePopupOpened] = useState(false);
  const [editPopupOpened, setEditPopupOpened] = useState(false);
  const [confirmDialogOpened, setConfirmDialogOpened] = useState(false);

  const [rooms, setRooms] = useState<Room[]>([]);
  const [itemTypes, setItemTypes] = useState<ItemType[]>([]);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const navigate = useNavigate();

  const init = async () => {
    try {
      setLoading(true);

      fetchItemTypes();
      fetchRooms();
      const item = await getItem({ id: Number(id) });
      setItem(item as TInventoryItem);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = () => setConfirmDialogOpened(true);

  const onProceedDelete = async () => {
    try {
      setLoading(true);
      await deleteItem(item.id);
      navigate('/inventory');
    } catch (error) {
      setSnackbarMessage('?????? ???????????????? ??????-???? ?????????? ???? ??????');
      setSnackbar(true);
      setLoading(false);
    }
  };

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

  const onItemEdit = () => {
    setEditPopupOpened(true);
  };

  const closeQrcodePopup = () => {
    setQrcodePopupOpened(false);
  };

  const parseItemProperties = (): ItemProperty[] => {
    try {
      const data = JSON.parse(item.properties || '[]');
      return data;
    } catch (error) {
      return [];
    }
  };

  const displayDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString();
  };

  const setQrcodeSrc = () => {
    return `${ROOT_URL}/inventory/${item.id}`;
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Container>
        <Typography marginTop={1} variant='h5' component='div'>
          {item.title}
        </Typography>
        <IconButton
          color='primary'
          aria-label='QR ??????'
          sx={{ marginRight: 1 }}
          onClick={() => setQrcodePopupOpened(true)}
        >
          <QrIcon />
        </IconButton>
        <Button
          onClick={onItemEdit}
          variant='contained'
          color='primary'
          sx={{ marginRight: 1 }}
        >
          ??????????????????????????
        </Button>
        <Button onClick={onDelete} variant='outlined' color='error'>
          ??????????????
        </Button>
        <Grid container columnGap={4}>
          <Grid item xs={12} md={5}>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              <ListItem alignItems='flex-start'>
                <ListItemText primary='?????????????? ??????????' secondary={item.guid} />
              </ListItem>
              {item.room && (
                <>
                  <Divider component='li' />
                  <ListItem alignItems='flex-start'>
                    <ListItemText
                      primary='??????????????????'
                      secondary={item.room.title}
                    />
                  </ListItem>
                </>
              )}
              <Divider component='li' />
              <ListItem alignItems='flex-start'>
                <ListItemText
                  primary='?????? ????????????????????????'
                  secondary={item.type?.title}
                />
              </ListItem>
              <Divider component='li' />
              <Typography variant='h6' marginTop={2}>
                ????????????????
              </Typography>

              {parseItemProperties().map((item) => (
                <div key={item.id}>
                  <ListItem alignItems='flex-start'>
                    <ListItemText primary={item.key} secondary={item.value} />
                  </ListItem>
                  <Divider component='li' />
                </div>
              ))}
              <Typography variant='h6' marginTop={2}>
                ?????????????? ????????????????????
              </Typography>

              {item.movementHistory
                ?.sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .map((movementHistoryItem) => (
                  <div key={movementHistoryItem.id}>
                    <ListItem alignItems='flex-start'>
                      <ListItemText
                        primary={movementHistoryItem.room.title}
                        secondary={displayDate(movementHistoryItem.createdAt)}
                      />
                    </ListItem>
                    <Divider component='li' />
                  </div>
                ))}
            </List>
          </Grid>
          <Grid item xs={12} md={5}>
            <ImageList cols={3}>
              {(item.images || []).map((img, index) => (
                <ImageListItem key={index}>
                  <img
                    src={getServerImage(img.src)}
                    alt={item.title}
                    loading='lazy'
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
        </Grid>

        <EditItemPopup
          itemTypes={itemTypes}
          rooms={rooms}
          opened={editPopupOpened}
          onClose={() => setEditPopupOpened(false)}
          onUpdate={init}
          initialData={{
            id: item.id,
            guid: item.guid,
            photos: item.images,
            properties: parseItemProperties(),
            room: item.room?.id,
            title: item.title,
            type: item.type?.id
          }}
        ></EditItemPopup>

        <ConfirmDialog
          opened={confirmDialogOpened}
          handleClose={() => setConfirmDialogOpened(false)}
          onCancel={() => setConfirmDialogOpened(false)}
          onProceed={onProceedDelete}
        />

        <QrcodePopup
          opened={qrcodePopupOpened}
          onClose={closeQrcodePopup}
          src={setQrcodeSrc()}
        ></QrcodePopup>

        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={snackbar}
          onClose={() => setSnackbar(false)}
          message={snackbarMessage}
        />
      </Container>
    </>
  );
};

export default InventoryItem;
