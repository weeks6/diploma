import Delete from '@mui/icons-material/Delete';
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  Stack,
  TextField
} from '@mui/material';
import { useState } from 'react';

type Property = {
  id: string;
  key: string;
  value: string;
};

type TProps = {
  name: string;
  label: string;
  value: any[];
  onChange: any;
  error: boolean;
  helperText: string;
};

type TPropertyItemProps = {
  property: Property;
  onDelete: (id: string) => void;
  onChange: any;
};

const PropertyItem = ({ property, onDelete, onChange }: TPropertyItemProps) => {
  const _onChange = (evt: any) => {
    onChange(property.id, evt.target.name, evt.target.value);
  };

  return (
    <Grid container columnSpacing={1}>
      <Grid item>
        <TextField
          label='Свойство'
          size='small'
          name='key'
          value={property.key}
          onChange={_onChange}
        />
      </Grid>
      <Grid item>
        <TextField
          label='Значение'
          size='small'
          name='value'
          value={property.value}
          onChange={_onChange}
        />
      </Grid>
      <Grid item>
        <IconButton aria-label='Удалить' onClick={() => onDelete(property.id)}>
          <Delete />
        </IconButton>
      </Grid>
    </Grid>
  );
};

const PropertiesInput = ({
  label,
  error,
  helperText,
  onChange,
  value = []
}: TProps) => {
  const [properties, setProperties] = useState<Property[]>(value || []);

  const addProperty = () => {
    setProperties((state) => [
      ...state,
      { key: '', value: '', id: `prop_${Date.now()}` } as Property
    ]);
  };

  const removeProperty = (id: string) => {
    console.log({ id });

    setProperties((state) => {
      const props = properties.filter((prop) => prop.id !== id);

      onChange(props);
      return props;
    });
  };

  const changeProperty = (id: string, name: string, value: string) => {
    const index = properties.findIndex((el) => el.id === id);

    setProperties((state) => {
      const props = [
        ...properties.slice(0, index),
        { ...properties[index], [name]: value } as Property,
        ...properties.slice(index + 1)
      ];

      onChange(props);
      return props;
    });
  };

  return (
    <>
      <InputLabel error={error}>{label}</InputLabel>
      <FormControl variant='standard' error={!!error}>
        <Stack rowGap={2}>
          {properties.map((property, index) => (
            <PropertyItem
              key={`prop_${index}`}
              property={property}
              onDelete={removeProperty}
              onChange={changeProperty}
            ></PropertyItem>
          ))}
          <Button
            variant='outlined'
            onClick={addProperty}
            sx={{ width: '120px' }}
          >
            Добавить
          </Button>
        </Stack>
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    </>
  );
};

export default PropertiesInput;
