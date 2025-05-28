import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { Label } from '../../components/label';
import { Iconify } from '../../components/iconify';
import { Item } from './view';

// ----------------------------------------------------------------------

export type ItemProps = {
  _id: string;
  name: string;
  description: string;
  price: number;
};

type ItemTableRowProps = {
  row: ItemProps;
  selected: boolean;
  onSelectRow: () => void;
  handleEdit:(value: Item) => void;
  setAddDialogOpen: (status: boolean) => void;
  setDeleteDialogOpen: (status: boolean) => void;
  setSelectedItem: (value: Item) => void;
};

export function ItemTableRow({ row, selected, onSelectRow, handleEdit, setAddDialogOpen, setDeleteDialogOpen, setSelectedItem }: ItemTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const handleEditButton = (item: Item) => {
    setOpenPopover(null);
    setSelectedItem(item);
    handleEdit(item);
    setAddDialogOpen(true);
  }

  const handleDeleteButton = (item: Item) => {
    setOpenPopover(null);
    setSelectedItem(item);
    setDeleteDialogOpen(true);
  }

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell component="th" scope="row">
          <Box
            sx={{
              gap: 2,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {row.name}
          </Box>
        </TableCell>

        <TableCell>{row.description}</TableCell>

        <TableCell>{row.price}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          <MenuItem onClick={() =>handleEditButton(row)}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

          <MenuItem onClick={() => handleDeleteButton(row)} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
