import React from 'react';
import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { visuallyHidden } from './utils';

// ----------------------------------------------------------------------

type UserTableHeadProps = {
  orderBy: string;
  rowCount: number;
  numSelected: number;
  order: 'asc' | 'desc';
  onSort: (id: string) => void;
  headLabel: Record<string, any>[];
  onSelectAllRows: (checked: boolean) => void;
};

export function ItemTableHead({
  order,
  onSort,
  orderBy,
  rowCount,
  headLabel,
  numSelected,
  onSelectAllRows,
}: UserTableHeadProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onSelectAllRows(event.target.checked)
            }
          />
        </TableCell>

        {headLabel.map((headCell) => {
          if (isMobile && headCell.hideOnMobile) {
            return null;
          }
          
          return (
            <TableCell
              key={headCell.id}
              align={headCell.align || 'left'}
              sortDirection={orderBy === headCell.id ? order : false}
              sx={{
                width: headCell.width,
                minWidth: headCell.minWidth,
                '@media (max-width: 600px)': {
                  ...(headCell.id === 'name' && {
                    minWidth: '150px',
                  }),
                  ...(headCell.id === 'price' && {
                    minWidth: '80px',
                  }),
                  ...(headCell.id === 'actions' && {
                    minWidth: '50px',
                  }),
                },
              }}
            >
              <TableSortLabel
                hideSortIcon
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={() => onSort(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box sx={{ ...visuallyHidden }}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}
