'use client';

import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';

const mainListItems = [
  { text: 'ホーム', icon: <HomeRoundedIcon /> },
  { text: 'ブログ', icon: <AssignmentRoundedIcon /> },
  { text: 'ユーザー', icon: <PeopleRoundedIcon /> },
];

export default function MenuContent() {
  return (
    <Stack
      sx={{
        flexGrow: 1,
        p: 1,
        justifyContent: 'space-between',
        backgroundColor:
          'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
      }}
    >
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton selected={index === 0}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* サブのリストアイテムはコメントアウトされていますが、必要に応じて有効化できます。 */}
      {/* <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Stack>
  );
}
