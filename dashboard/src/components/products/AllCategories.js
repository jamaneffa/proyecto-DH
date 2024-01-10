import { Link } from 'react-router-dom';

import { FaHouseUser } from 'react-icons/fa';

import Sidebar from '../main/Sidebar';
import Heading from '../main/Heading';
import TopData from '../main/TopData';
import Footer from '../main/Footer';
import Categories from './Categories';

function AllCategories() {
   
  const titleStyle = { textAlign: 'center', marginBottom: '2%' };

  return (
    <div id="wrapper">
      <Sidebar></Sidebar>
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <div className="container-fluid">
            <Heading />
            <TopData />
            <hr className="sidebar-divider" />
            <h3 style={titleStyle}>Listado de Categorias</h3>
            <div className="row">
             <Categories></Categories>
            </div>
            <hr className="sidebar-divider" />
            <h5 style={titleStyle}><Link to={`/`}><FaHouseUser/> Ir al Inicio</Link></h5>
          </div>
        </div>
        <Footer />
      </div>
    </div>

  );
}

export default AllCategories;