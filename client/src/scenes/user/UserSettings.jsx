import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import ModifiedTextfield from "../../component/modifiedTextField";
import { Box } from "@mui/material";
import { UpdateUserSetting } from "./handle";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function UserSettings({
  openDialogue = false,
  setOpenDialogue = () => {},
  dialogueTitle = "",
}) {
  const [ userDetails , setUserDetails] = useState({
    name : '',
    email:'',
    city:'',
    state:'',
    country:'',
    occupation:'',
    phone:''
  })
  const handleClickOpen = () => {
    setOpenDialogue(true);
  };
  const handleClose = () => {
    setOpenDialogue(false);
  };

  const handleSubmit = ()=>{
    UpdateUserSetting(userDetails);
  }

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openDialogue}
      >
        <DialogTitle sx={{ m: 0, p: 3 }} id="customized-dialog-title">
          {dialogueTitle}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box
            component="form"
            noValidate
            // onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <ModifiedTextfield
              label="Name"
              placeholder="Enter Name"
              value={userDetails?.name || ""}
              onChange={(e) => {
                setUserDetails({ ...userDetails, name: e.target.value });
              }}
              options={{ horizontalLabel: true }}
              required={true}
            />
            <ModifiedTextfield
              label="Email"
              placeholder="Enter Email"
              value={userDetails?.email || ""}
              onChange={(e) => {
                setUserDetails({ ...userDetails, email: e.target.value });
              }}
              options={{ horizontalLabel: true }}
              required={true}
            />
            <ModifiedTextfield
              label="City"
              placeholder="Enter City"
              value={userDetails?.city || ""}
              onChange={(e) => {
                setUserDetails({ ...userDetails, city: e.target.value });
              }}
              options={{ horizontalLabel: true }}
              required={true}
            />
            <ModifiedTextfield
              label="State"
              placeholder="Enter State"
              value={userDetails?.state || ""}
              onChange={(e) => {
                setUserDetails({ ...userDetails, state: e.target.value });
              }}
              options={{ horizontalLabel: true }}
              required={true}
            />
            <ModifiedTextfield
              label="Country"
              placeholder="Enter Country"
              value={userDetails?.country || ""}
              onChange={(e) => {
                setUserDetails({ ...userDetails, country: e.target.value });
              }}
              options={{ horizontalLabel: true }}
              required={true}
            />
            <ModifiedTextfield
              label="Occupation"
              placeholder="Enter Occupation"
              value={userDetails?.occupation || ""}
              onChange={(e) => {
                setUserDetails({ ...userDetails, occupation: e.target.value });
              }}
              options={{ horizontalLabel: true }}
              required={true}
            />
            <ModifiedTextfield
              label="Phone"
              placeholder="Enter Phone Number"
              value={userDetails?.phone || ""}
              onChange={(e) => {
                setUserDetails({ ...userDetails, phone: e.target.value });
              }}
              options={{ horizontalLabel: true }}
              required={true}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined"  autoFocus onClick={handleSubmit}>
            Save changes
          </Button>
          <Button variant="outlined"  autoFocus onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
