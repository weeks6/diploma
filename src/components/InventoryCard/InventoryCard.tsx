import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_ENDPOINT } from '../../services/constants';
import { TInventoryItem } from '../../services/item.service';
import { getServerImage } from '../../utils/getServerImage';

type TProps = {
  item: TInventoryItem;
};

const InventoryCard = ({ item }: TProps) => {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/inventory/${item.id}`)}>
      <CardActionArea>
        <CardMedia
          component='img'
          height='160'
          image={getServerImage(item.images[0].src)}
          alt={item.title}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {item.title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {item.guid}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {item.type.title}
          </Typography>

          {item.room && (
            <Typography variant='body2' color='text.secondary'>
              Помещение {item.room.title}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default InventoryCard;
