import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Delete from '@mui/icons-material/Delete';
import {
  Button,
  ButtonBase,
  FormHelperText,
  Grid,
  InputLabel,
  Paper,
  styled
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { getServerImage } from '../../utils/getServerImage';

const Input = styled('input')(() => ({
  display: 'none'
}));

const Label = styled('label')(() => ({
  cursor: 'pointer'
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  width: 128,
  height: 128
}));

const Image = styled('img')(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  objectFit: 'cover',
  width: '100%',
  height: '100%'
}));

const DeleteButton = styled(Button)(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  opacity: 0,
  transition: '250ms',
  zIndex: 10,
  '&:hover': {
    opacity: 1,
    '&:after': {
      opacity: 0.5
    }
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    transition: '250ms',
    backgroundColor: grey[900],
    opacity: 0
  }
}));

interface ResponseImage {
  id: number;
  filename: string;
  src: string;
  type: string;
  public: boolean;
  size: number;
}

type TProps = {
  name: string;
  value: File[];
  error: boolean;
  helperText: string;
  onChange: any;
};

const ImageInput = ({
  name,
  onChange,
  error,
  helperText,
  value = []
}: TProps) => {
  console.log({ value });

  const [images, setImages] = useState<File[]>(
    typeof value === 'string' ? [] : value
  );

  const imageInput = useRef<HTMLInputElement>(null);

  const _onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    console.log({ files: evt.target.files });
    if (evt.target.files) {
      setImages(Array.from(evt.target.files));
      onChange(Array.from(evt.target.files));
    } else {
      setImages([]);
      onChange([]);
    }
  };

  const getImageSrc = (image: ResponseImage | File): string => {
    // пошел нахуй юнион ебаный
    return (image as ResponseImage).src
      ? getServerImage((image as ResponseImage).src)
      : URL.createObjectURL(image as File);
  };

  const onDeleteImage = (filename: string) => {
    setImages((state) => {
      const data = state.filter((file) => file.name !== filename);
      onChange(data);
      return data;
    });
  };

  return (
    <>
      <InputLabel error={error}>Изображения</InputLabel>
      <Grid container columnGap={1}>
        <Grid item>
          <ButtonBase
            focusRipple
            sx={{
              width: 'min-content'
            }}
          >
            <Label>
              <Input
                type='file'
                accept='image/*'
                multiple
                name={name}
                ref={imageInput}
                onChange={_onChange}
              ></Input>
              <StyledPaper>
                <PhotoCamera />
              </StyledPaper>
            </Label>
          </ButtonBase>
        </Grid>

        {images.map((image, index) => (
          <Grid item key={index}>
            <StyledPaper>
              <DeleteButton onClick={() => onDeleteImage(image.name)}>
                <Delete />
              </DeleteButton>
              <Image src={getImageSrc(image)}></Image>
            </StyledPaper>
          </Grid>
        ))}
      </Grid>
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </>
  );
};

export default ImageInput;
