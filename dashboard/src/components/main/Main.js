import Heading from './Heading';
import TopData from './TopData'
import LastProduct from '../products/LastProduct';
import Categories from '../products/Categories';
import Footer from './Footer';

function Main() {
    return (
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <div className="container-fluid">
            <Heading />
            <TopData />
            <hr className="sidebar-divider" />
            <br></br>
            <div className="row">
              <LastProduct />
              <Categories />
            </div>
          </div>
        </div>
        <Footer />
      </div>
     );
   }
   
export default Main;