import React, { useState } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import { componentStyle } from "./styles";
import { useSelector } from "react-redux";

import { selectUserData } from "../../store/authSlice";
import EditProfile from "./EditProfile";

const { detailsStyle, valueStyle, photoCameraIconStyle, avatarStyle } =
  componentStyle;

export default function Profile() {
  const [open, setOpen] = useState(false);
  const userData = useSelector(selectUserData);

  return (
    <Card variant="outlined">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item sx={{ p: "1.5rem 0rem", textAlign: "center" }}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={<PhotoCameraIcon {...photoCameraIconStyle} />}
          >
            <Avatar {...avatarStyle} src={userData?.imageUrl}></Avatar>
          </Badge>

          <Typography variant="h6">{userData?.firstName}</Typography>
          <Typography color="text.secondary">{userData?.lastName}</Typography>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <Typography {...detailsStyle}>Email</Typography>
            <Typography {...detailsStyle}>Phone</Typography>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: "end" }}>
            <Typography {...valueStyle}>{userData?.email}</Typography>
            <Typography {...valueStyle}>{userData?.phone}</Typography>
          </Grid>
        </Grid>
        <Grid item {...valueStyle}>
          <Button onClick={() => setOpen(true)} variant="contained">
            Edit
          </Button>
        </Grid>
      </Grid>
      {open ? (
        <EditProfile profile={userData} open={open} setOpen={setOpen} />
      ) : null}
    </Card>
  );
}
