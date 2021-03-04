import React, { SyntheticEvent } from "react";
import Snackbar from "@material-ui/core/Snackbar";

import { useDispatch, useSelector } from "react-redux";
import { selectSnackbar } from "../store/selectors";
import { clearAlert } from "../features/snackbar/geese";

export default function PuebloSnackBar() {
  const dispatch = useDispatch();
  const snackbar = useSelector(selectSnackbar);

  const handleClose = (event: SyntheticEvent, reason?: string) => {
    dispatch(clearAlert());
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={snackbar.isOpen}
      autoHideDuration={snackbar.type === "info" ? null : 4000}
      onClose={handleClose}
      message={snackbar.message}
    ></Snackbar>
  );
}
