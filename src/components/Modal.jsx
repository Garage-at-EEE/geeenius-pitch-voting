import React from "react";
import { Modal, Box, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import properties from "../config/prop-config.json";

const CustomModal = styled(Box)(({ theme, bg, clan }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "fit-content",
  maxWidth: "100vw",
  minWidth: "90vw",
  maxHeight: "90vh",
  background: bg
    ? `${bg}`
    : `linear-gradient(248deg, #0a0014c6 32%, ${alpha(
        properties[clan]?.color,
        0.3
      )})`,
  backdropFilter: "blur(50px)",
  outline: "0.1em solid",
  outlineColor: properties[clan] ? `${properties[clan]["color"]}` : "purple",
  boxShadow: 24,
  backgroundColor: "rgba(0,0,0,0.9)",
  borderRadius: 12,
  display: "flex",
  alignItems: "center",
  p: 4,
}));

const BaseModal = styled(Box)(({ theme, bg }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "fit-content",
  maxWidth: "80vw",
  maxHeight: "80vh",
  backdropFilter: "blur(50px)",
  borderRadius: 12,
  display: "flex",
  outline: "none",
  alignItems: "center",
  p: 4,
  zIndex: 2,
}));

export default function ClanModalPopup({ open, setOpen, children, clan }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{ backdropFilter: "blur(8px)" }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CustomModal clan={clan}>{children}</CustomModal>
      </Modal>
    </>
  );
}

export function BaseModalPopup({ open, setOpen, children }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        sx={{ backdropFilter: "blur(8px)" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <BaseModal>{children}</BaseModal>
      </Modal>
    </>
  );
}
