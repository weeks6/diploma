import QRious from 'qrious';
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import './Qrcode.css';

type QrcodeProps = {
  src: string;
  opened: boolean;
};

const Qrcode = ({ src, opened }: QrcodeProps) => {
  const qrCodeContainer = useRef<HTMLImageElement>(null);
  const [qrCodeImage, setQrCodeImage] = useState(null);

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));
  console.log({ isSmall });

  useEffect(() => {
    if (opened) {
      console.log(qrCodeContainer.current);

      const qr = new QRious({
        background: 'white',
        backgroundAlpha: 0.8,
        foreground: 'black',
        foregroundAlpha: 0.8,
        level: 'H',
        padding: 0,
        size: 300,
        value: src
        // element: qrCodeContainer.current
      });

      setQrCodeImage(qr.toDataURL());
    }
  }, [opened]);

  return (
    <div className='qrcode__container'>
      {qrCodeImage && (
        <img
          src={qrCodeImage}
          className='qrcode__main'
          ref={qrCodeContainer}
        ></img>
      )}
    </div>
  );
};

export default Qrcode;
