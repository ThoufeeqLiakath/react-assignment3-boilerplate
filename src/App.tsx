import React from 'react';
import Header from './Components/header/Header';
import Footer from './Components/footer/Footer';
import Login from './Components/login/Login';
import Filter from './Components/filter/Filter';
import Register from './Components/register/Register';
import Dashboard from './Components/dashboard/Dashboard';
import ReadNow from './Components/readNow/ReadNow';


import { Grid } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Redirect,
  Route
} from 'react-router-dom'


export default function App(prop:any) {

  // const [token,setToken]=React.useState(localStorage.getItem("token"));
  const [displayFilterComponent,setDisplayFilterComponent]=React.useState(false);
  const [filtermodel,setFiltermodel]=React.useState(null);
  // constructor(prop) {
    // super(prop);
    // this.token = localStorage.getItem("token");
    // this.state={
    //   displayFilterComponent:false,
    //   filtermodel:null
    // };
    let getFilterDetailsCallBack=(filterData:any)=>
    {
      console.info('filterdata',filterData);
      // this.setState({
      //   displayFilterComponent:this.state.display,
      //   filtermodel:filterData
      //   },()=>{console.info('filtermodel',this.state.filtermodel);});
        setFiltermodel(filterData);
        
        
    };
    let determineFilterClickedFromChild=(display:any)=>
    {
      // console.info(display);
      // this.setState({
      // displayFilterComponent:display,
      // filtermodel:this.state.filtermodel
      // });           
      setDisplayFilterComponent(display);
    }
  // } 
  
  
  
    
    return <div className="App">
      <Grid>        
        <Header filterButtonDisplayCallback={determineFilterClickedFromChild} displayFilterComponent={displayFilterComponent}></Header>        
        {displayFilterComponent===true?<Filter getFilterDetailsCallBack={getFilterDetailsCallBack} filterButtonDisplayCallback={determineFilterClickedFromChild}></Filter>:null}
        <Router>
          <Route exact path='/' component={() => <Redirect to='/login'></Redirect>} />
          <Route exact path='/login' component={() => <Login />} />
          <Route exact path='/register' component={() => <Register />} />
          {/* <Route exact path='/createnews' component={() => <CreateNews />} /> */}
          <Route exact path='/dashboard' component={() => <Dashboard filtermodel={filtermodel}/>} />
          <Route exact path='/readnow' component={() => <ReadNow />} />
        </Router>
        <Footer></Footer>
      </Grid>
    </div>// please add your code  

}
// export default App;
