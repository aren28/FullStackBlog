'use client';

import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import Link from 'next/link';

const mainListItems = [
  { text: 'ブログ一覧', icon: <AssignmentRoundedIcon />, href: '/blog' },
  { text: 'ブログ追加', icon: <AddIcon />, href: '/blog/add' },
];

export default function MenuContent() {
  return (
    <Stack
      sx={{
        flexGrow: 1,
        p: 1,
        justifyContent: 'space-between',
      }}
    >
      <List dense>
        {mainListItems.map((item, index) => (
          <Link key={index} href={item.href || '#'}>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton selected={index === 0}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Stack>
  );
}
