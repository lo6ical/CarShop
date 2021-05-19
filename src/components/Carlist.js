import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';

import Addcar from './Addcar';
import Editcar from './Editcar';

export default function Carlist() {
  const API_URL = 'https://carstockrest.herokuapp.com/cars';

  const [cars, setCars] = useState([]);
  const [open, setOpen] = React.useState(false);

  const gridRef = useRef();

  useEffect(() => {
    getCars();
  }, [])

  const getCars = () => {
    fetch(API_URL)
    .then(response => response.json())
    .then(data => setCars(data._embedded.cars))
    .catch(err => console.error(err))
  }

  const deleteCar = (link) => {
    if (window.confirm('Are you sure?')) {
      fetch(link, {method: 'DELETE'})
      .then(response => {
        if (response.ok) {
          getCars();
          setOpen(true);
        }
        else {
          alert('Something went wrong');
        }
      })
      .catch(err => console.error(err))
    }
  }

  const addCar = (car) => {
    fetch(API_URL, 
    {   method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(car)
    })
    .then(_ => gridRef.current.redrawRows({ rowNodes: getCars()}))
    .catch(err => console.error(err))
  }

  const editCar = (link, car) => {
    fetch(link, 
      { method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
      },
        body: JSON.stringify(car)
      })
      .then(_ => gridRef.current.redrawRows({rowNodes: getCars()}))
      .catch( err => console.error(err))
  }

  const exportData = () => {
    gridRef.current.exportDataAsCsv({columnSeparator: ';', columnKeys: ['brand', 'model', 'color', 'year', 'fuel', 'price']});
  }

  const handleClose = () => {
    setOpen(false);
  };


  // colId is needed to filter exported columns (see exportData)
  const columns = [
    {
      colId: 'brand',
      headerName: 'Brand',
      field: 'brand',
      sort: 'asc',
      sortable: true,
      floatingFilter: true,
      filter: true,
    },
    {
      colId: 'model',
      headerName: 'Model',
      field: 'model',
      sortable: true,
      floatingFilter: true,
      filter: true,
    },
    {
      colId: 'color',
      headerName: 'Color',
      field: 'color',
      sortable: true,
      floatingFilter: true,
      filter: true,
    },
    {
      colId: 'fuel',
      headerName: 'Fuel',
      field: 'fuel',
      sortable: true,
      floatingFilter: true,
      filter: true,
    },
    {
      colId: 'year',
      headerName: 'Year',
      field: 'year',
      sortable: true,
      floatingFilter: true,
      filter: 'agNumberColumnFilter',
    },
    {
      colId: 'price',
      headerName: 'Price (€)',
      field: 'price',
      sortable: true,
      floatingFilter: true,
      width: 120,
      filter: 'agNumberColumnFilter',
    },
    {
      headerName: '',
      field: '_links.self.href',
      width: 80,
      cellRendererFramework: params => <Editcar car={params.data} link={params.value} editCar={editCar}/>
    },
    {
      headerName: '',
      field: '_links.self.href',
      width: 80,
      cellRendererFramework: params => <Tooltip title="Delete">
                                        <IconButton 
                                          color="secondary" 
                                          onClick={() => deleteCar(params.value)}>
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                      </Tooltip>
    }
  ]

  return(
    <div className="ag-theme-material" style={{height: '550px', width: '95%'}}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Addcar addCar={addCar} />
        </Grid>
        <Grid item xs={2}>
          <Tooltip title="Export to CSV">
            <Button onClick={exportData} style={{marginTop: 10, marginBottom: 10}}>Export</Button>
          </Tooltip>
        </Grid>
      </Grid>
      <AgGridReact 
        ref={gridRef}
        onGridReady={ params => { 
          gridRef.current = params.api;
          params.api.sizeColumnsToFit();
        }}
        pagination={true}
        suppressCellSelection={true} 
        paginationAutoPageSize={true} 
        animateRows={true}
        columnDefs={columns} 
        rowData={cars}>
      </AgGridReact>
      <Snackbar 
        open={open}
        autoHideDuration={2500}
        onClose={handleClose}
        message="Car deleted"
      />
    </div>
  );
}
