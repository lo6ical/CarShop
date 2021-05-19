import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';

const Editcar = (props) => {  
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState({brand: '', model: '', 
    color: '', year: '', fuel: '', price: ''});

  const handleClickOpen = () => {
    setCar({brand: props.car.brand, model: props.car.model, color: props.car.color,
      year: props.car.year, fuel: props.car.fuel, price: props.car.price })
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleInputChange = (event) => {
    setCar({...car, [event.target.name]: event.target.value});
  }

  const saveCar = () => {
    const newCar = {brand: car.brand, model: car.model, color: car.color, fuel: car.fuel, year: car.year, price: car.price};
    props.editCar(props.link, newCar);
    handleClose();
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Car</DialogTitle>
        <DialogContent>
          <TextField autoFocus onChange={(e) => handleInputChange(e)} margin="dense" 
            name="brand" value={car.brand} label="Brand" fullWidth />
          <TextField onChange={(e) => handleInputChange(e)} margin="dense" 
            name="model" label="Model" value={car.model} fullWidth />
          <TextField onChange={(e) => handleInputChange(e)} margin="dense" 
            name="color" label="Color" value={car.color} fullWidth />
          <TextField onChange={(e) => handleInputChange(e)} margin="dense" 
            name="year" label="Year" value={car.year} fullWidth />
          <TextField onChange={(e) => handleInputChange(e)} margin="dense" 
            name="fuel" label="Fuel" value={car.fuel} fullWidth />
          <TextField onChange={(e) => handleInputChange(e)} margin="dense" 
            name="price" label="Price (€)" value={car.price} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button size="small" onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button size="small" onClick={saveCar} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Tooltip title="Edit">
        <IconButton color="primary" onClick={() => handleClickOpen()}>
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </div>
  );  
}

export default Editcar;