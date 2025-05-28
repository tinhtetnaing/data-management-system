import { useState, useCallback, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import {
  TextField,
  IconButton,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Close as CloseIcon,
  Inventory as ItemIcon,
} from '@mui/icons-material';
//import { _items } from '../../../_mock';
import { DashboardContent } from '../../../layouts/dashboard';
import { Iconify } from '../../../components/iconify';
import { Scrollbar } from '../../../components/scrollbar';
import { TableNoData } from '../table-no-data';
import { ItemTableRow } from '../item-table-row';
import { ItemTableHead } from '../item-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { ItemTableToolbar } from '../item-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import type { ItemProps } from '../item-table-row';
import { useRouter } from 'next/router';
import axios from 'axios';
import { SvgColor } from '../../../components/svg-color';
import { inherits } from 'util';

// ----------------------------------------------------------------------
export type Item = {
    _id: string;
    name: string;
    description: string;
    price: number;
  };
export function ItemView() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  //const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} />;
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const table = useTable();

  const [filterName, setFilterName] = useState('');

  const dataFiltered: ItemProps[] = applyFilter({
    inputData: items,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
      return;
    }

    const fetchItems = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/items`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setItems(res.data);
      } catch (err) {
        setError('Failed to fetch items');
      }
    };
    fetchItems();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      if (editId) {
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/items/${editId}`,
          { name, description, price: Number(price) },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setItems(items.map((item) => (item._id === editId ? res.data : item)));
        setEditId(null);
      } else {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/items`,
          { name, description, price: Number(price) },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setItems([...items, res.data]);
      }
      setName('');
      setDescription('');
      setPrice('');
      setAddDialogOpen(false);
    } catch (err) {
      setError(err.response?.data.message || 'Operation failed');
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setName(item.name);
    setDescription(item.description);
    setPrice(item.price);
  };

  const handleAddDialogOpen = () => {
    setName('');
    setDescription('');
    setPrice('');
    setEditId(null);
    setError('');
    setAddDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    if (submitting) return; 
    setAddDialogOpen(false);
    setTimeout(() => {
      setName('');
      setDescription('');
      setPrice('');
      setEditId(null);
      setError('');
      setSubmitting(false);
    }, 100);
  };

  const handleDeleteConfirm = async () => {
    console.log(selectedItem);
    if (!selectedItem) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/items/${selectedItem._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(items.filter((item) => item._id !== selectedItem._id));
      setDeleteDialogOpen(false);
      setSelectedItem(null);
    } catch (err) {
      setError(err.response?.data.message || 'Delete failed');
    }
  };

  return (
    <DashboardContent>
      <Box
        sx={{
          mb: 5,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Items
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleAddDialogOpen}
        >
          New Item
        </Button>
      </Box>

      <Card>
        <ItemTableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterName(event.target.value);
            table.onResetPage();
          }}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <ItemTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={items.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    items.map((item) => item._id)
                  )
                }
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'description', label: 'Description' },
                  { id: 'price', label: 'Price' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <ItemTableRow
                      key={row._id}
                      row={row}
                      selected={table.selected.includes(row._id)}
                      onSelectRow={() => table.onSelectRow(row._id)}
                      setAddDialogOpen={setAddDialogOpen}
                      handleEdit={handleEdit}
                      setDeleteDialogOpen={setDeleteDialogOpen}
                      setSelectedItem={setSelectedItem}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, items.length)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={items.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
      {/* Add/Edit Item Dialog */}
      <Dialog
        open={addDialogOpen}
        onClose={handleAddDialogClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3
          }
        }}
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle sx={{
            m: 0,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                flex: 1,
              }}
            >
              {editId ? <EditIcon /> : icon('ic-cart')}
              <Typography variant="h5">
                {editId ? 'Edit Item' : 'Add New Item'}
              </Typography>
            </Box>

            <IconButton
              aria-label="close"
              onClick={handleAddDialogClose}
              sx={{
                position: 'absolute',
                right: 8,
                color: 'grey.500'
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <TextField
              autoFocus
              margin="dense"
              label="Item Name"
              fullWidth
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Price"
              type="number"
              fullWidth
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              inputProps={{
                step: "0.01",
                min: "0"
              }}
            />
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={handleAddDialogClose} color="inherit" disabled={submitting}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="inherit"
              disabled={submitting}
            >
              {submitting ? 'Saving...' : editId ? 'Update Item' : 'Add Item'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 3
          }
        }}
      >
        <DialogTitle>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1
          }}>
            <DeleteIcon color="error" />
            <Typography>Delete Item</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
    (inputValue: string) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}
