import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Loader from '../shared/Loader';

interface Props {
    open: boolean;
}

export default function LoadingModal({ open }: Props) {
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">
        <div className="flex justify-center items-center">
            <Loader />
        </div>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
            <p>Please Wait...</p>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}