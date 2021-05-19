import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const Addcar = (props) => {  
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState({
    brand: '', model: '', color: '', year: '', fuel:'', price: ''
  });

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleInputChange = (event) => {
    setCar({...car, [event.target.name]: event.target.value});
  }

  const saveCar = () => {
    props.addCar(car);
    handleClose();
  }

  return (
    <div style={{marginTop: 10, marginBottom: 10}}>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Car</DialogTitle>
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
      <Button variant="contained" size="small" color="primary" onClick={() => handleClickOpen()}>
        <AddIcon />
        New Car
      </Button>
    </div>
  );  
}

export default Addcar;