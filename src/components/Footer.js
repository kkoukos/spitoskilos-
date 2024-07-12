"use client";
import * as React from "react";

import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Divider from "@mui/joy/Divider";
import Input from "@mui/joy/Input";
import List from "@mui/joy/List";
import ListSubheader from "@mui/joy/ListSubheader";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import SendIcon from "@mui/icons-material/Send";
import ColorLensRoundedIcon from "@mui/icons-material/ColorLensRounded";
import WhiteLogo from "../../public/spitoskilos_logo_img_white.svg";

export default function Footer() {
  const [color, setColor] = React.useState("neutral");
  return (
    <Sheet
      variant="solid"
      color={color}
      invertedColors
      sx={{
        ...(color !== "neutral" && {
          bgcolor: `${color}.800`,
        }),
        flexGrow: 1,
        p: 2,
        borderRadius: { xs: 0, sm: "sm" },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <IconButton variant="plain">
          <FacebookRoundedIcon />
        </IconButton>
        <Divider orientation="vertical" />
        <IconButton variant="plain">
          <a href={WhiteLogo.src} target="_blank" rel="noopener noreferrer">
            <GitHubIcon />
          </a>
        </IconButton>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { md: "flex-start" },
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <img
          alt="logo"
          src="http://localhost/_next/static/media/spitoskilos_logo_img_white.6073b402.svg"
          style={{ maxHeight: "100px", marginBottom: "16px" }}
        />
        <List
          size="sm"
          orientation="horizontal"
          wrap
          sx={{ flexGrow: 0, "--ListItem-radius": "8px" }}
        >
          <ListItem nested sx={{ width: { xs: "50%", md: 140 } }}>
            <ListSubheader sx={{ fontWeight: "xl" }}>Sitemap</ListSubheader>
            <List>
              <ListItem>
                <ListItemButton>About us</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>Contact us</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>FAQ</ListItemButton>
              </ListItem>
            </List>
          </ListItem>
          <ListItem nested sx={{ width: { xs: "50%", md: 180 } }}>
            <ListSubheader sx={{ fontWeight: "xl" }}>
              Packages Used
            </ListSubheader>
            <List>
              <ListItem>
                <ListItemButton>NextUI</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>MaterialUI</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>MongoDB</ListItemButton>
              </ListItem>
            </List>
          </ListItem>
        </List>
      </Box>
    </Sheet>
  );
}
