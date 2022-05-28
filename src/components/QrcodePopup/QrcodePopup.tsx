import { Dialog, DialogContent } from '@mui/material';
import Qrcode from '../Qrcode/Qrcode';

type QrcodePopupProps = {
  opened: boolean;
  onClose: () => void;
  src: string;
};

const QrcodePopup = ({ onClose, opened, src }: QrcodePopupProps) => {
  return (
    <Dialog open={opened} onClose={onClose} scroll='paper'>
      <DialogContent>
        <Qrcode src={src} opened={opened}></Qrcode>
      </DialogContent>
    </Dialog>
  );
};

export default QrcodePopup;
