import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

type Props = {}

const DrawerList = (props: Props) => {
  return (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <ListItem key={"Minhas Metas"} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
            </ListItemIcon>
            <ListItemText primary={"Minhas Metas"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Box>
  )
}

export default DrawerList