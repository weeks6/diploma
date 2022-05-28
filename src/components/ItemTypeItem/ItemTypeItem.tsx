import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Grid, IconButton } from '@mui/material';
import { grey } from '@mui/material/colors';
import { ItemType } from '../../services/item.service';

import './ItemTypeItem.css';

type TProps = {
  item: ItemType;
  onDelete: any;
  onEdit: any;
};

const ItemTypeItem = ({ item, onDelete, onEdit }: TProps) => {
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
      <Grid item xs={8} md={10} paddingLeft={1}>
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

export default ItemTypeItem;
