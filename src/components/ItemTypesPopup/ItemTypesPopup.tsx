import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Box,
  useMediaQuery,
  useTheme,
  IconButton,
  DialogContentText,
  DialogActions
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { setIn, ValidationErrors } from 'final-form';
import { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { ValidationError } from 'yup';
import {
  createItemType,
  deleteItemType,
  editItemType,
  ItemType
} from '../../services/item.service';
import { itemTypeSchema } from '../../types/validation/ItemSchema';

import ItemTypeItem from '../ItemTypeItem/ItemTypeItem';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';

type TProps = {
  opened: boolean;
  onClose: any;
  onUpdate: any;
  itemTypes: ItemType[];
};

const ItemTypesPopup = ({ opened, onClose, itemTypes, onUpdate }: TProps) => {
  const [loading, setLoading] = useState(false);
  const [confirmDialogOpened, setConfirmDialogOpened] = useState(false);
  const [confirmDialogContext, setConfirmDialogContext] = useState({});

  const [editDialogOpened, setEditDialogOpened] = useState(false);
  const [editDialogContext, setEditDialogContext] = useState({
    id: -1,
    title: ''
  });

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const onDelete = (id: number) => {
    setConfirmDialogOpened(true);
    setConfirmDialogContext(id);
  };

  const onEdit = async (id: number, title: string) => {
    setEditDialogOpened(true);
    setEditDialogContext({ id, title });
  };

  const onProceedEdit = async () => {
    const { id, title } = editDialogContext;

    setEditDialogOpened(false);
    setLoading(true);
    try {
      const response = await editItemType(id, title);
      onUpdate();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onProceedDelete = async (id: number) => {
    setConfirmDialogOpened(false);
    setLoading(true);
    try {
      const response = await deleteItemType(id);
      onUpdate();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onCreate = async (formData: { title: string }) => {
    setLoading(true);
    try {
      const response = await createItemType(formData);
      formData.title = '';
      onUpdate();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const validate = async (values: { title: string }) => {
    try {
      await itemTypeSchema.validate(values, { abortEarly: false });
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
        maxWidth='lg'
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
            <Grid item>Типы оборудования</Grid>
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
                  <Grid
                    container
                    direction='row'
                    alignItems='center'
                    spacing={2}
                  >
                    <Grid item xs={7} sm={10.5}>
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
                    </Grid>
                    <Grid item xs='auto'>
                      <Button type='submit' disabled={loading}>
                        Добавить
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            />
          </Box>
          <Stack>
            {itemTypes.map((itemType, index) => (
              <ItemTypeItem
                key={index}
                item={itemType}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </Stack>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        ctx={confirmDialogContext}
        opened={confirmDialogOpened}
        handleClose={() => setConfirmDialogOpened(false)}
        onCancel={() => setConfirmDialogOpened(false)}
        onProceed={onProceedDelete}
      />

      <Dialog
        open={editDialogOpened}
        onClose={() => setEditDialogOpened(false)}
      >
        <DialogTitle>Редактировать</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label='Название'
            type='text'
            fullWidth
            variant='standard'
            value={editDialogContext.title}
            onChange={(event) =>
              setEditDialogContext({
                ...editDialogContext,
                title: event.target.value
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpened(false)}>Отменить</Button>
          <Button onClick={onProceedEdit}>Сохранить</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ItemTypesPopup;
