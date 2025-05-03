import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface Props {
  open: boolean;
  errorMessage: string;
  onClose: () => void;
}

export default function ErrorModal({ open, errorMessage, onClose }: Props) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Login Failed
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {errorMessage}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}