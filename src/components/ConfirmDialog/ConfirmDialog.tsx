import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';

type TProps = {
  opened: boolean;
  handleClose: any;
  onCancel: any;
  onProceed: any;
  ctx: any;
};

const ConfirmDialog = ({
  opened,
  onCancel,
  onProceed,
  handleClose,
  ctx
}: TProps) => {
  return (
    <Dialog open={opened} onClose={handleClose}>
      <DialogTitle>Продолжить?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Вы уверены, что хотите продолжить? Действие нельзя будет отменить.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Отмена</Button>
        <Button color='error' onClick={() => onProceed(ctx)}>
          Ок
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
