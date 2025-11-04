'use client';

import * as React from 'react';
import {
    Box, Table, TableBody, TableCell, TableContainer, TableHead,
    TablePagination, TableRow, TableSortLabel, Toolbar, Typography,
    Paper, Checkbox, IconButton, Tooltip
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';

// Data interface
interface Data {
    id: number;
    product: string;
    SKU: number;
    unavailable: number;
    committed: number;
    available: number;
    onHand: number;
}

// Sort logic
type Order = 'asc' | 'desc';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T): number {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
}

function getComparator<T, Key extends keyof T>(
    order: Order,
    orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Head cells for table
interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    { id: 'product', numeric: false, disablePadding: true, label: 'Product' },
    { id: 'SKU', numeric: true, disablePadding: false, label: 'SKU' },
    { id: 'unavailable', numeric: true, disablePadding: false, label: 'Unavailable' },
    { id: 'committed', numeric: true, disablePadding: false, label: 'Committed' },
    { id: 'available', numeric: true, disablePadding: false, label: 'Available' },
    { id: 'onHand', numeric: true, disablePadding: false, label: 'On Hand' },
];

// Enhanced table head
interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: keyof Data;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;

    const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all rows' }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id && (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            )}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

// Toolbar
interface EnhancedTableToolbarProps {
    numSelected: number;
}

function EnhancedTableToolbar({ numSelected }: EnhancedTableToolbarProps) {
    return (
        <Toolbar
            sx={[
                { pl: { sm: 2 }, pr: { xs: 1, sm: 1 } },
                numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                },
            ]}
        >
            {numSelected > 0 ? (
                <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography sx={{ flex: '1 1 100%' }} variant="h6" component="div">
                    Inventory
                </Typography>
            )}
            <Tooltip title={numSelected > 0 ? 'Delete' : 'Filter list'}>
                <IconButton>
                    {numSelected > 0 ? <DeleteIcon /> : <FilterListIcon />}
                </IconButton>
            </Tooltip>
        </Toolbar>
    );
}

// Main table component
interface InventoryTableProps {
    rows: Data[];
}

export function InventoryTable({ rows: initialRows }: InventoryTableProps) {
    const [rows, setRows] = React.useState<Data[]>(initialRows);
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('SKU');
    const [selected, setSelected] = React.useState<readonly number[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(12);

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelected(rows.map((n) => n.id));
        } else {
            setSelected([]);
        }
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleAvailableChange = (id: number, value: number) => {
        const updatedRows = rows.map((row) =>
            row.id === id
                ? {
                    ...row,
                    available: value,
                    onHand: row.committed + value - row.unavailable,
                }
                : row
        );
        setRows(updatedRows);
    };

    const visibleRows = React.useMemo(() => {
        return rows
            .slice()
            .sort(getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [rows, order, orderBy, page, rowsPerPage]);

    const emptyRows = Math.max(0, (1 + page) * rowsPerPage - rows.length);

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                    <Table size="medium">
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const isSelected = selected.includes(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                const handleRowCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                                    event.stopPropagation();
                                    if (event.target.checked) {
                                        setSelected(prev => [...prev, row.id]);
                                    } else {
                                        setSelected(prev => prev.filter((id) => id !== row.id));
                                    }
                                };

                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        aria-checked={isSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isSelected}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isSelected}
                                                onChange={handleRowCheckboxChange}
                                                inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                        >
                                            {row.product}
                                        </TableCell>
                                        <TableCell align="right">{row.SKU}</TableCell>
                                        <TableCell align="right">{row.unavailable}</TableCell>
                                        <TableCell align="right">{row.committed}</TableCell>
                                        <TableCell align="right">
                                            <input
                                                type="number"
                                                value={row.available}
                                                onChange={(e) => handleAvailableChange(row.id, Number(e.target.value))}
                                                style={{
                                                    width: 60,
                                                    textAlign: 'right',
                                                    background: 'transparent',
                                                    border: 'none',
                                                    borderBottom: '1px solid #ccc',
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="right">{row.onHand}</TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={7} />
                                </TableRow>
                            )}
                        </TableBody>

                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[rowsPerPage]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}

