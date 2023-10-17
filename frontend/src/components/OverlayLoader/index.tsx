import React, { useContext } from "react";
import { Backdrop } from "@mui/material";
import AppContext from "../../AppContext";
import { ScaleLoader } from "react-spinners";

const OverlayLoader = () => {
  const { showOverlayLoader } = useContext(AppContext);

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.modal + 1 }}
      open={showOverlayLoader}
    >
      <ScaleLoader color="#fff" loading={showOverlayLoader} />
    </Backdrop>
  );
};
export default OverlayLoader;
