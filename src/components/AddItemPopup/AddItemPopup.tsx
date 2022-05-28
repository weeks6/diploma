import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  useMediaQuery,
  useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { itemShema } from '../../types/validation/ItemSchema';
import { setIn, ValidationErrors } from 'final-form';
import { ValidationError } from 'yup';
import { Field, Form } from 'react-final-form';
import {
  createItem,
  createItemType,
  ItemType,
  Room
} from '../../services/item.service';

import ImageInput from '../ImageInput/ImageInput';
import PropertiesInput from '../PropertiesInput/PropertiesInput';

type TProps = {
  itemTypes: ItemType[];
  rooms: Room[];
  opened: boolean;
  onClose: any;
  onUpdate: any;
};

const AddItemPopup = ({
  opened,
  onClose,
  onUpdate,
  itemTypes,
  rooms
}: TProps) => {
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const onCreate = async (formData: {
    title: string;
    type: string;
    room: string;
    guid: string;
    photos: any[];
    properties: any[];
  }) => {
    setLoading(true);
    try {
      console.log({ formData });

      const response = await createItem(formData);
      onClose();
      onUpdate();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const validate = async (values: { title: string }) => {
    try {
      await itemShema.validate(values, { abortEarly: false });
    } catch (e: any) {
      const errorsObject = e.inner.reduce(
        (errors: ValidationErrors, error: ValidationError) => {
          return setIn(errors as object, error.path!, error.message);
        },
        {}
      );

      return errorsObject;
    }
  };

  return (
    <>
      <Dialog
        open={opened}
        onClose={onClose}
        fullWidth={true}
        fullScreen={fullScreen}
        maxWidth='md'
        scroll='paper'
      >
        <DialogTitle>
          <Grid
            container
            width='100%'
            direction='row'
            justifyContent='space-between'
            alignItems='center'
          >
            <Grid item>Добавить оборудование</Grid>
            <Grid item>
              <IconButton aria-label='Закрыть' onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Box marginBottom={2}>
            <Form
              onSubmit={onCreate}
              validate={validate}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} noValidate>
                  <Stack spacing={2}>
                    <Field name='guid'>
                      {(props) => (
                        <TextField
                          fullWidth={true}
                          type='text'
                          variant='standard'
                          label='Учётный номер'
                          name={props.input.name}
                          value={props.input.value}
                          error={!!props.meta.error}
                          helperText={props.meta.error}
                          onChange={props.input.onChange}
                        />
                      )}
                    </Field>
                    <Field name='title'>
                      {(props) => (
                        <TextField
                          fullWidth={true}
                          type='text'
                          variant='standard'
                          label='Название'
                          name={props.input.name}
                          value={props.input.value}
                          error={!!props.meta.error}
                          helperText={props.meta.error}
                          onChange={props.input.onChange}
                        />
                      )}
                    </Field>
                    <Field name='room'>
                      {(props) => (
                        <FormControl
                          variant='standard'
                          sx={{ m: 1, minWidth: 120 }}
                          error={!!props.meta.error}
                        >
                          <InputLabel id='demo-simple-select-standard-label'>
                            Помещение
                          </InputLabel>
                          <Select
                            labelId='demo-simple-select-standard-label'
                            id='demo-simple-select-standard'
                            value={props.input.value}
                            onChange={props.input.onChange}
                            label='Помещение'
                          >
                            <MenuItem value={undefined} key='none'>
                              Не выбрано
                            </MenuItem>
                            {rooms.map((room) => (
                              <MenuItem value={room.id} key={room.id}>
                                {room.title}
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText>{props.meta.error}</FormHelperText>
                        </FormControl>
                      )}
                    </Field>
                    <Field name='type'>
                      {(props) => (
                        <FormControl
                          variant='standard'
                          sx={{ m: 1, minWidth: 120 }}
                          error={!!props.meta.error}
                        >
                          <InputLabel id='demo-simple-select-standard-label'>
                            Тип оборудования
                          </InputLabel>
                          <Select
                            labelId='demo-simple-select-standard-label'
                            id='demo-simple-select-standard'
                            value={props.input.value}
                            onChange={props.input.onChange}
                            label='Тип оборудования'
                          >
                            <MenuItem value={undefined} key='none'>
                              Не выбрано
                            </MenuItem>
                            {itemTypes.map((itemType) => (
                              <MenuItem value={itemType.id} key={itemType.id}>
                                {itemType.title}
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText>{props.meta.error}</FormHelperText>
                        </FormControl>
                      )}
                    </Field>
                    <Field<File[]> name='photos'>
                      {(props) => (
                        <ImageInput
                          name={props.input.name}
                          value={props.input.value}
                          error={!!props.meta.error}
                          helperText={props.meta.error}
                          onChange={props.input.onChange}
                        />
                      )}
                    </Field>
                    <Field name='properties'>
                      {(props) => (
                        <PropertiesInput
                          label='Свойства'
                          name={props.input.name}
                          error={!!props.meta.error}
                          helperText={props.meta.error}
                          onChange={props.input.onChange}
                          value={props.input.value}
                        ></PropertiesInput>
                      )}
                    </Field>
                    <Button
                      type='submit'
                      variant='contained'
                      disabled={loading}
                    >
                      Сохранить
                    </Button>
                  </Stack>
                </form>
              )}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddItemPopup;
