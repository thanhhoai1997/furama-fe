import logo from './logo.svg';
import './App.css';

import {BrowserRouter,Routes,Route} from 'react-router-dom'

import Layout from './components/layout/Layout';
import ListFacility from './components/facility/ListFacility';
import EditFacility from './components/facility/EditFacility';
import CreateFacility from './components/facility/CreateFacility';
import ListCustomer from './components/customer/ListCustomer';
import EditCustomer from './components/customer/EditCustomer';
import CreateCustomer from './components/customer/CreateCustomer';
import ListContact from './components/contact/ListContact';
import CreateContact from './components/contact/CreateContact';



function App() {
  return (
    <BrowserRouter>
    <Routes>
      
      <Route path='/' element = {<Layout/>}>

        <Route path='/listFacility' element= {<ListFacility/>}/>
        <Route path='/editFacility/:id' element= {<EditFacility/>}/>
        <Route path='/createFacility' element = {<CreateFacility/>}/>
        <Route path='/listCustomer' element = {<ListCustomer/>}/>
        <Route path='/editCustomer/:id' element = {<EditCustomer/>}/>
        <Route path='/createCustomer' element = {<CreateCustomer/>}/>
        <Route path='/listContacts' element = {<ListContact/>}/>
        <Route path='/createContact' element = {<CreateContact/>}/>

        </Route>


     
      
      
    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
