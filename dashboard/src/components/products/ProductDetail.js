import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { FaProductHunt } from 'react-icons/fa';

import Sidebar from '../main/Sidebar';
import TopData from '../main/TopData';
import Heading from '../main/Heading';
import Footer from '../main/Footer';

function ProductDetail() {
  const { sku } = useParams();
  //usamos endpoint de detalle de producto
  const [productDetailData, setProductDetailData] = useState({product: []});

  useEffect(() => {

    fetch(`http://localhost:3030/api/products/${sku}`)
    //fetch('https://bem-cvku.onrender.com/api/products/4')
      .then((response) => response.json())
      .then((data) => {
        setProductDetailData({
            product : data.product
        })
      })
      .catch((error) => {
        console.error('Error al obtener el detalle de producto:', error);
      });
    });

    if (productDetailData === undefined) {
      return <p>Cargando</p>;
    }

    return (
      <div id="wrapper">
      <Sidebar></Sidebar>
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <div className="container-fluid">
            <Heading />
            <TopData />
            <hr className="sidebar-divider" />
            <br></br>
            <div className="row">
              <div className="col-lg-6 mb-4">
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                      <h6 className="m-0 font-weight-bold text-primary"><FaProductHunt/> Detalle de Producto</h6>
                  </div>
                  <div className="card-body">
                      <div className="text-center">
                          <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" src={productDetailData.product.image_url} alt="product"/>
                      </div>
                      <h2>{productDetailData.product.name}</h2>
                      <h6>Descripcion: {productDetailData.product.description}</h6>
                      <h6>Categoria: {productDetailData.product.category}</h6>
                      <h6>Marca: {productDetailData.product.brand}</h6>
                      <h6>Precio: $ {productDetailData.product.price}</h6>
                      {productDetailData.product.stockInfo && productDetailData.product.stockInfo.length > 0 ? 
                        (
                          <div>
                            <h6>Stock por Talle:</h6>
                            {productDetailData.product.stockInfo.map((productStockSize, i) => (
                              <h6 key={i + 1}>Talle: {productStockSize.size} - Cantidad: {productStockSize.stock}</h6>
                            ))}
                          </div>
                        ) : (
                          <h6>Stock: No tiene</h6>
                        )
                      }
                      {productDetailData.product.discount === 0 ? (
                        <h6>Descuento: Este producto no tiene descuento</h6>
                      ) : (
                        <h6>Descuento: {productDetailData.product.discount} %</h6>
                      )}  
                      <Link to={`/allproducts`}>Volver</Link>                      
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        </div>
      </div>
    );
   }
   
export default ProductDetail;