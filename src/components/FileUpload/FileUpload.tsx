import { Box, ButtonBase, Input, Paper } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ImageIcon from '@mui/icons-material/Image';

type TProps = {
  icon: 'file' | 'image';
};

const FileUpload = ({ icon }: TProps) => {
  return (
    <ButtonBase>
      <Box
        sx={{
          p: 2
        }}
      >
        {icon === 'file' && <FileUploadIcon />}
        {icon === 'image' && <ImageIcon />}
      </Box>
    </ButtonBase>
  );
};

export default FileUpload;
