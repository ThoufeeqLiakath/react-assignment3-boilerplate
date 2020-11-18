import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Slider from '@material-ui/core/Slider';
import { Typography, Grid } from '@material-ui/core';
// import Pagination from '@material-ui/lab/Pagination';
import FilterModel from '../../model/FilterModel';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    }
    },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  
}));

const PrettoSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

export default function Filter(props:any) {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);  
  const [open, setOpen] = React.useState(true);
  const [endPoint, setEndPoint] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [keyword,setKeyword]=React.useState('a');
  const [sources,setSources]=React.useState('');
  const [slider,setSlider]=React.useState(20);

  const handleOnChangeSlider= (event:any, value:any) => {
    setSlider(value);
  };
  const handleChangePagination = (event:any) => {
    setPage(event.target.value);
  };
  const handleChangeEndpoint=(e:any)=>
  {
    setEndPoint(e.target.value);
  };
  const handleChangeCatogory=(e:any)=>
  {
    setCategory(e.target.value);
  };
  const handleChangeCountry=(e:any)=>
  {
    setCountry(e.target.value);
  };
  const handleOnChangeKeyword=(e:any)=>
  {
    setKeyword(e.target.value);
  };

  const handleOnChangeSources=(e:any)=>
  {
    setSources(e.target.value);
  };

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
    props.filterButtonDisplayCallback(false);
  };

  const handleSave=()=>{
    let filterModel=new FilterModel(endPoint,sources,keyword,category,country,page,slider);
    
    props.getFilterDetailsCallBack(filterModel);
    // console.log(filterModel);
    handleClose();
  };

  return (
    <div style={{marginTop:80}}>
      {/* <Button onClick={handleClickOpen}>Open select dialog</Button> */}
      <Dialog id="filterdialog" disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Select the filters</DialogTitle>
        <DialogContent>
        <Grid container>
            <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-dialog-native">Endpoints</InputLabel>
              <Select
                native
                value={endPoint}
                onChange={handleChangeEndpoint}
                input={<Input id="demo-dialog-native" />}
              >
                {/* <option value="" /> */}
                <option value={"Everything"}>Everything</option>
                <option value={"Top"}>Top headlines</option>                
                <option value={"Sources"}>Sources</option>
              </Select>
            </FormControl>
            </Grid></Grid>
            {(sources===""&&endPoint!=="Everything")?           
            
            <Grid container><Grid item xs={12}><FormControl className={classes.formControl}>
              <InputLabel id="demo-dialog-select-label">Country</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={country}
                onChange={handleChangeCountry}
                input={<Input />}
              >
                
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="ae">ae</MenuItem>
                <MenuItem value="ar">ar</MenuItem>
                <MenuItem value="at">at</MenuItem>
                <MenuItem value="au">au</MenuItem>
                <MenuItem value="be">be</MenuItem>
                <MenuItem value="bg">bg</MenuItem>
                <MenuItem value="br">br</MenuItem>
                <MenuItem value="ca">ca</MenuItem>
                <MenuItem value="ch">ch</MenuItem>
                <MenuItem value="cn">cn</MenuItem>
                <MenuItem value="co">co</MenuItem>
                <MenuItem value="cu">cu</MenuItem>
                <MenuItem value="de">de</MenuItem>
                <MenuItem value="eg">eg</MenuItem>                
                <MenuItem value="gb">gb</MenuItem>
                <MenuItem value="gr">gr</MenuItem>
                <MenuItem value="hk">hk</MenuItem>
                <MenuItem value="hu">hu</MenuItem>
                <MenuItem value="id">id</MenuItem>
                <MenuItem value="ie">ie</MenuItem>
                <MenuItem value="il">il</MenuItem>
                <MenuItem value="in">in</MenuItem>
                <MenuItem value="it">it</MenuItem>
                <MenuItem value="jp">jp</MenuItem>
                <MenuItem value="kr">kr</MenuItem>
                <MenuItem value="lt">lt</MenuItem>
                <MenuItem value="lv">lv</MenuItem>
                <MenuItem value="ma">ma</MenuItem>
                <MenuItem value="mx">mx</MenuItem>
                <MenuItem value="my">my</MenuItem>
                <MenuItem value="ng">ng</MenuItem>
                <MenuItem value="nl">nl</MenuItem>
                <MenuItem value="no">no</MenuItem>
                <MenuItem value="nz">nz</MenuItem>
                <MenuItem value="ph">ph</MenuItem>
                <MenuItem value="pl">pl</MenuItem>
                <MenuItem value="pt">pt</MenuItem>                
                <MenuItem value="ro">ro</MenuItem>
                <MenuItem value="rs">rs</MenuItem>
                <MenuItem value="ru">ru</MenuItem>
                <MenuItem value="sa">sa</MenuItem>
                <MenuItem value="se">se</MenuItem>
                <MenuItem value="sg">sg</MenuItem>
                <MenuItem value="si">si</MenuItem>
                <MenuItem value="sk">sk</MenuItem>
                <MenuItem value="th">th</MenuItem>
                <MenuItem value="tr">tr</MenuItem>
                <MenuItem value="tw">tw</MenuItem>
                <MenuItem value="ua">ua</MenuItem>
                <MenuItem value="us">us</MenuItem>
                <MenuItem value="ve">ve</MenuItem>
                <MenuItem value="za">za</MenuItem>
              </Select>
            </FormControl></Grid></Grid>
            :null}
            {(sources===""&&endPoint!=="Everything")?
            <Grid container><Grid item xs={12}> <FormControl className={classes.formControl}>
              <InputLabel id="demo-dialog-select-label">Category</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={category}
                onChange={handleChangeCatogory}
                input={<Input />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"business"}>business</MenuItem>
                <MenuItem value={"entertainment"}>entertainment</MenuItem>
                <MenuItem value={"general"}>general</MenuItem>
                <MenuItem value={"health"}>health</MenuItem>
                <MenuItem value={"science"}>science</MenuItem>
                <MenuItem value={"sports"}>sports</MenuItem>
                <MenuItem value={"technology"}>technology</MenuItem>
              </Select>
            </FormControl></Grid></Grid>
            :null}
            <Grid container><Grid item xs={12}><FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-dialog-native">Keywords</InputLabel>
              <Input type="text"
                id="keywords"
                onChange={handleOnChangeKeyword}
                value={keyword}></Input>
            </FormControl></Grid></Grid>
            {(country==="" && category==="")?
            <Grid container><Grid item xs={12}><FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-dialog-native">Sources</InputLabel>
              <Input type="text"
              onChange={handleOnChangeSources}
              value={sources}></Input>
            </FormControl></Grid></Grid>
            :null}
            <Grid container><Grid item xs={12}><FormControl className={classes.formControl}>
                <Typography gutterBottom>Pagesize </Typography>
                <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" min={1} max={100} defaultValue={20} onChange={handleOnChangeSlider} id="pageslider" />
            </FormControl></Grid></Grid>
            <Grid container> <Grid item xs={12}><FormControl className={classes.formControl}>
                <Typography>Page: {page}</Typography>
                {/* <Pagination count={10} page={page} onChange={handleChangePagination} /> */}
                <Input type="number"                
                id="pagenumber"
                value={page}
                onChange={handleChangePagination}></Input>
            </FormControl></Grid></Grid>            
        </DialogContent>
        <DialogActions>
          <Button id="cancel" onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button id="save" onClick={handleSave} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
