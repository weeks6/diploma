import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Grid, IconButton } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Room } from '../../services/item.service';

type TProps = {
  item: Room;
  onDelete: any;
  onEdit: any;
};

const RoomItem = ({ item, onDelete, onEdit }: TProps) => {
  return (
    <Grid
      container
      alignItems='center'
      paddingBottom={0.25}
      paddingTop={0.25}
      className='item-type-item'
      sx={{
        transition: '300ms ease',
        '&:hover': {
          backgroundColor: grey[300]
        }
      }}
    >
      <Grid item paddingLeft={1} sx={{ flexGrow: 1 }}>
        {item.title}
      </Grid>
      <Grid item xs='auto'>
        <IconButton
          aria-label='Редактировать'
          onClick={() => onEdit(item.id, item.title)}
          type='button'
        >
          <EditIcon />
        </IconButton>
      </Grid>
      <Grid item xs='auto'>
        <IconButton
          aria-label='Закрыть'
          onClick={() => onDelete(item.id)}
          type='button'
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default RoomItem;
