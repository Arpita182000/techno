import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { visuallyHidden } from '@mui/utils';
import { Popover, MenuItem, Button } from '@mui/material';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import './table.css';
import { useState } from 'react';
import { formatDate } from '../../../utils/helperFunctions';



interface Data {
  id: number;
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
  averageSale: any;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}


function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface EnhancedTableProps {
  nonScroll?: any;
  headCells: any;
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  isCheckBox?: boolean;
  serialNumber?: boolean;
  tableName?: string;
  enableEdit?: boolean;
  filter?: boolean;
  setFilter?: Function;
  createFilterConfig?: Function;
  isButton?:boolean;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells, tableName, enableEdit, filter, setFilter, createFilterConfig, } =
    props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead sx={{ background: "#eee", color: "#aaa" ,}} >
      <TableRow>
        {
          props.isCheckBox && <TableCell padding="checkbox"
          // sx={props.nonScroll.includes('SL') && {
          //   whiteSpace: "nowrap",
          //   position: "sticky",
          //   left: "0",
          //   background: "#eee",
          //   zIndex: 100
          // }}
          >
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
        }
        {/* {
          props.serialNumber && <TableCell padding="normal" sx={props.nonScroll.includes('SL') && {
            whiteSpace: "nowrap",
            position: "sticky",
            left: "0",
            background: "#eee",
            zIndex: 100
          }}>
            SL
          </TableCell>
        } */}

        {headCells.map((headCell: any) => (
          <TableCell
            // width={${100 / headCells.length}%}
            // sx={props.nonScroll.includes[headCell.id] && {
            //   whiteSpace: "nowrap",
            //   position: "sticky",
            //   left: "0",
            //   background: "#eee",
            //   zIndex: 100
            // }}
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'center'}
            // align='center'
            padding={headCell.disablePadding ? 'none' : 'checkbox'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </div>
              {filter && <input onChange={(e: any) => createFilterConfig && createFilterConfig(headCell.id, e.target.value)} style={{ width: 'auto' }} />}
          </TableCell>
        ))}
        {
          enableEdit && <TableCell><FilterAltOffIcon onClick={() => setFilter && setFilter((filter: boolean) => !filter)} /></TableCell>
        }
      </TableRow>
      {/* {filter && headCells.map((cell: any) => <input />)} */}
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  tableName: string;
  numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, tableName } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {tableName}
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        // <Tooltip title="Filter list">
        //   <IconButton>
        //     <FilterListIcon />
        //   </IconButton>
        // </Tooltip>
        null
      )}
    </Toolbar>
  );
}
export default function EnhancedTable({ rows, headCells, 
  tableName, nonScroll = [], isCheckBox, serialNumber, enableEdit, handleViewDetails,handleEdit,handleDelete,
  createFilterConfig ,pageTotal,setPage,page,isButton, setSelectedRows, selectedRows, rowsPerPage, setRowsPerPage}: any) {
  console.log("calling rows", rows, headCells);

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<any>('store-region');
  const [selected, setSelected] = useState<readonly number[]>(selectedRows?.map((n: any) => n._id) ?? []);
  const [rowData,setRowData] = useState([]);
  const [dense, setDense] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(-1);
  const [filter, setFilter] = useState<boolean>(false);
  console.log("calling selectedRows", selectedRows);
  

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowIndex(index);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRowIndex(-1);
  };

  const open = Boolean(anchorEl);

  // const handleRequestSort = (
  //   event: React.MouseEvent<unknown>,
  //   property: keyof Data,
  // ) => {
  //   const isAsc = orderBy === property && order === 'asc';
  //   setOrder(isAsc ? 'desc' : 'asc');
  //   setOrderBy(property);
  // };
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n: any) => n._id);
      setSelected(newSelected);
      setSelectedRows(rows);
      return;
    }
    setSelected([]);
    setSelectedRows([])
  };

  const handleCheckBoxClick = (row: any) => {
    const id = row._id;
    const isSelected = selected.indexOf(row._id) === -1 ? false : true;
    let newSelected: readonly number[] = [];
    
    if (!isSelected) {
      newSelected = [...selected, id];
    } else {
      newSelected = selected.filter((item) => item !== id);
    }
    setSelected(newSelected);
    const storeId = row._id; 
    if (!isSelected) {
      setSelectedRows((selectedRows: any) => [...selectedRows, row]);
    } else {
      setSelectedRows((selectedRows: any) => selectedRows.filter((row:any) => row._id !== id));
    }
  };



  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: any) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;


  const visibleRows = React.useMemo(() => {
    return stableSort(rows, getComparator(order, orderBy))
  }, [order, orderBy, rowsPerPage, page, rows]); //page, rows

  // const visibleRows = React.useMemo(
  //   () =>
  //     stableSort(rows, getComparator(order, orderBy)).slice(
  //       page * rowsPerPage,
  //       page * rowsPerPage + rowsPerPage,
  //     ),
  //   [order, orderBy, page, rowsPerPage],
  // );

  // return (
  //   <Box sx={{ width: '100%' }}>
  //     <Paper sx={{ width: '100%', mb: 2 }}>
  //       <EnhancedTableToolbar numSelected={selected.length} tableName={tableName}/>
  //       <TableContainer>
  //         <Table
  //           sx={{ minWidth: 750 }}
  //           aria-labelledby="tableTitle"
  //           size={dense ? 'small' : 'medium'}
  //         >
  //           <EnhancedTableHead
  //             nonScroll={nonScroll}
  //             headCells={headCells}
  //             numSelected={selected.length}
  //             order={order}
  //             orderBy={orderBy}
  //             onSelectAllClick={handleSelectAllClick}
  //             onRequestSort={handleRequestSort}
  //             rowCount={rows.length}
  //             isCheckBox={isCheckBox}
  //             serialNumber={serialNumber}
  //             tableName={tableName}
  //           />
  //           <TableBody>
  //           {visibleRows.map((row: any, index) => { 
  //               const isItemSelected = isSelected(index);
  //               const labelId = enhanced-table-checkbox-${index};
  //               {console.log("calling row", row)}
  //               return (
  //                 <TableRow
  //                   hover
  //                   onClick={(event) => handleClick(event, index)}
  //                   role="checkbox"
  //                   aria-checked={isItemSelected}
  //                   tabIndex={-1}
  //                   key={index}
  //                   selected={isItemSelected}
  //                   sx={{ cursor: 'pointer' }}
  //                 > 
  //                 {
  //                   serialNumber && <TableCell padding="normal" sx={nonScroll.includes('SL') && {
  //                     whiteSpace: "nowrap",
  //                     position: "sticky",
  //                     left: "0",
  //                     background: "white",
  //                     zIndex: 100
  //                   }}>
  //                     {index+1}
  //                   </TableCell>
  //                 }
  //                 {
  //                   headCells.map((cell: any, index: number) => <TableCell align="left">
  //                     {cell.id === "pointOfContact" ? <div style={{display: 'flex', alignItems: 'center'}}>
  //                       <img src={row.profileImg} style={{height: '2rem', width: '2rem', borderRadius: '100%', border: 'solid black'}} />
  //                       <p>{row.firstName}</p>
  //                     </div> : row[cell.id]}
  //                   </TableCell>)
  //                 }
  //                 </TableRow>
  //               );
  //             })}
  //             {emptyRows > 0 && (
  //               <TableRow
  //                 style={{ 
  //                   height: (dense ? 33 : 53) * emptyRows,
  //                 }}
  //               >
  //                 <TableCell colSpan={6} />
  //               </TableRow>
  //             )}
  //           </TableBody>
  //         </Table>
  //       </TableContainer>
  //       <TablePagination
  //         rowsPerPageOptions={[5, 10, 25]}
  //         component="div"
  //         count={rows.length}
  //         rowsPerPage={rowsPerPage}
  //         page={page}
  //         onPageChange={handleChangePage}
  //         onRowsPerPageChange={handleChangeRowsPerPage}
  //       />
  //     </Paper>
  //     {/* <FormControlLabel
  //       control={<Switch checked={dense} onChange={handleChangeDense} />}
  //       label="Dense padding"
  //     /> */}
  //   </Box>
  // );

  return (
    <Box sx={{ width: '100%', }}>
      <Paper sx={{ width: '100%', boxShadow:"0" }}>
        <EnhancedTableToolbar numSelected={selected.length} tableName={tableName} />
        <TableContainer >
          <Table
            sx={{ minWidth: 750, marginX:"30px"}}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              nonScroll={nonScroll}
              headCells={headCells}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              isCheckBox={isCheckBox}
              serialNumber={serialNumber}
              tableName={tableName}
              enableEdit={enableEdit}
              setFilter={setFilter}
              createFilterConfig={createFilterConfig}
              filter={filter}
              // isButton={isButton}
            />
            <TableBody>
              {visibleRows.map((row: any, index:any) => {
                const isItemSelected = isSelected(index);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    // onClick={(event) => handleClick(event, index)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={index}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    {
                      isCheckBox && <TableCell padding="checkbox"
                      // sx={props.nonScroll.includes('SL') && {
                      //   whiteSpace: "nowrap",
                      //   position: "sticky",
                      //   left: "0",
                      //   background: "#eee",
                      //   zIndex: 100
                      // }}
                      >
                        <Checkbox
                          color="primary"
                          indeterminate={false} //true
                          checked={selected.indexOf(row._id) !== -1 ? true : false} //true
                          onChange={() => handleCheckBoxClick(row)}
                          inputProps={{
                            'aria-label': 'select all desserts',
                          }}
                        />
                      </TableCell>
                    }
                    {serialNumber && (
                      <TableCell padding="normal" sx={nonScroll.includes('SL') && {
                        whiteSpace: "nowrap",
                        position: "sticky",
                        left: "0",
                        background: "white",
                        zIndex: 100
                      }}>
                        {index + 1}
                      </TableCell>
                    )}
                    {headCells.map((cell: any, index: number) => (
                      <TableCell align="center" padding="normal" width={`${100 / headCells.length}%`}

                      // sx={nonScroll.includes(cell.id) && {
                      //   whiteSpace: "nowrap",
                      //   position: "sticky",
                      //   left: "0",
                      //   background: "red",
                      //   zIndex: 100
                      // }}
                      >
                      
                        
                        {cell.id === "pointOfContact" ? (
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={row.profileImg} style={{ height: '2rem', width: '2rem', borderRadius: '50%', border: ' 1px solid black' }} />
                            &nbsp;
                            <p>{row.firstName}{row.lastName}</p>
                          </div>
                        ) : cell.type === "date" ? formatDate(row[cell.id]) :
                        cell.type === "username" ? <p>{row.firstName}  {row.lastName}</p> :
                         row[cell.id]}
                      </TableCell>
                    ))}
                    {/* Adding edit and delete icons if enableEdit prop is provided */}
                    {enableEdit && (
                      <TableCell align="center">
                        <IconButton aria-label="more" aria-controls="long-menu" aria-haspopup="true" onClick={(event) => handleMenuOpen(event, index)}>
                          <MoreVertIcon />
                        </IconButton>
                        <Popover
                          open={open && selectedRowIndex === index}
                          anchorEl={anchorEl}
                          onClose={handleMenuClose}
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                        >
                          <MenuItem onClick={() => handleViewDetails(row)}>View Details</MenuItem>
                          <MenuItem onClick={() => handleEdit(row)}>Edit</MenuItem>
                          <MenuItem onClick={() => handleDelete(row)}>Delete</MenuItem>
                          
                        </Popover>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
              {/* Empty rows */}
              {/* {emptyRows > 0 && (
                <TableRow style={{
                  height: (dense ? 33 : 53) * emptyRows,
                }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[2, 5, 10, 25]}
          component="div"
          count={pageTotal}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
     {/* {isButton && <Button>Add Audience</Button>} */}
      </Paper>
    </Box>
  );
}