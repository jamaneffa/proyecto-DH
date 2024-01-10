import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { FaHouseUser } from 'react-icons/fa';

import Sidebar from '../main/Sidebar';
import Heading from '../main/Heading';
import TopData from '../main/TopData';
import Footer from '../main/Footer';

function AllProducts() {
  // usamos endpoint de productos
  const [listProductsData, setListProductsData] = useState({ count: 0, countByCategory: 0, products: [] });

  //creamos variables y estado para la paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  useEffect(() => {
    fetch('http://localhost:3030/api/products')
    //fetch('https://bem-cvku.onrender.com/api/products')
      .then(response => response.json())
      .then(data => {
        // Actualizar el estado con los nuevos datos
        setListProductsData({
          count: data.count,
          countByCategory: data.countByCategory,
          products: data.products
        });
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
  });
   
  const titleStyle = { textAlign: 'center', marginBottom: '2%' };
  const pagButtonsStyle = { marginBottom: '2%' };

  return (
    <div id="wrapper">
      <Sidebar></Sidebar>
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <div className="container-fluid">
            <Heading />
            <TopData />
            <hr className="sidebar-divider" />
            <h3 style={titleStyle}>Listado de Productos</h3>
            <div className="row">
              {listProductsData.products ? (
                listProductsData.products
                .slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)
                .map(product => (
                  <div key={product.sku} className="col-md-4 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">                     
                            <div className="font-weight-bold text-warning text-uppercase mb-1">
                              SKU: {product.sku}
                            </div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                              {product.name}
                            </div><br></br>
                            <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                            <Link to={`/product/${product.sku}`}>Ver detalle</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>Cargando productos...</p>
              )}
            </div>
            {listProductsData.products.length > productsPerPage ? (
            <div className="paginationButtons" style={pagButtonsStyle}>
              <button
                onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                disabled={currentPage === 1}>Anterior</button>
              <button
                onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                disabled={currentPage * productsPerPage >= listProductsData.products.length}>Siguiente</button>
            </div>
            ): (<p></p>)}
            <hr className="sidebar-divider" />
            <h5 style={titleStyle}><Link to={`/`}><FaHouseUser/> Ir al Inicio</Link></h5>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default AllProducts;