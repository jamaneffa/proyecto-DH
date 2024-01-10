import { useState, useEffect } from 'react';

function Categories() {
  //usamos endpoint de productos
  const [categoriesData, setCategoriesData] = useState({ countByCategory: 0});

  useEffect(() => {
    fetch('http://localhost:3030/api/products')
    //fetch('https://bem-cvku.onrender.com/api/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setCategoriesData({
          countByCategory: data.countByCategory
        });
      })
      .catch((error) => {
        console.error('Error al cargar los productos:', error);
      });
  }, []);

  return (
      <div className="col-lg-6 mb-4">
              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">Cantidad de Productos por Categoria</h6>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-6 mb-4">
                      <div className="card bg-info text-white shadow">
                        <div className="card-body">Ambos : {categoriesData.countByCategory.ambos}</div>
                      </div>
                    </div>
                    <div className="col-lg-6 mb-4">
                      <div className="card bg-info text-white shadow">
                        <div className="card-body">Camisas : {categoriesData.countByCategory.camisas}</div>
                      </div>
                    </div>
                    <div className="col-lg-6 mb-4">
                      <div className="card bg-info text-white shadow">
                        <div className="card-body">Corbatas : {categoriesData.countByCategory.corbatas}</div>
                      </div>
                    </div>
                    <div className="col-lg-6 mb-4">
                      <div className="card bg-info text-white shadow">
                        <div className="card-body">Pantalones : {categoriesData.countByCategory.pantalones}</div>
                      </div>
                    </div>
                    <div className="col-lg-6 mb-4">
                      <div className="card bg-info text-white shadow">
                        <div className="card-body">Sacos : {categoriesData.countByCategory.sacos}</div>
                      </div>
                    </div>
                    <div className="col-lg-6 mb-4">
                      <div className="card bg-info text-white shadow">
                        <div className="card-body">Zapatos : {categoriesData.countByCategory.zapatos}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  )
}
   
export default Categories;