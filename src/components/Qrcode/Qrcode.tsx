import { useEffect, useRef, useState } from 'react';
import QRious from 'qrious';

type QrcodeProps = {
  src: string;
  opened: boolean;
};

const Qrcode = ({ src, opened }: QrcodeProps) => {
  const qrCodeContainer = useRef<HTMLCanvasElement>(null);

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
        value: src,
        element: qrCodeContainer.current
      });
    }
  }, [opened]);

  return (
    <div className='qrcode__container'>
      <canvas className='qrcode__main' ref={qrCodeContainer}></canvas>
    </div>
  );
};

export default Qrcode;
