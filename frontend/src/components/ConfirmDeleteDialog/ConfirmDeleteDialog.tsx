import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Cancel, Check } from "@mui/icons-material";

export type ConfirmDeleteDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  title: string;
};

export const ConfirmDeleteDialog = ({
  onClose,
  onConfirm,
  open,
  message,
  title,
}: ConfirmDeleteDialogProps) => {
  return (
    <Dialog open={open}>
      {title && <DialogTitle>{title}</DialogTitle>}

      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<Cancel />}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Check />}
          onClick={onConfirm}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
