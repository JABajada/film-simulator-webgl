import React from "react";
import { Modal, Box, Button } from "@mui/material";

export default function PremiumModal({ open, onClose, onPurchase }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box className="bg-white p-6 m-auto mt-20 max-w-sm rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Unlock Premium Presets</h2>
        <p>Get access to all Fujifilm simulations and high-res download.</p>
        <Button
          variant="contained"
          color="primary"
          onClick={onPurchase}
          className="mt-4"
        >
          Purchase via Stripe
        </Button>
      </Box>
    </Modal>
  );
}
