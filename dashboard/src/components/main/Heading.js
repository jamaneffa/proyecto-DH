import logo from '../../assets/img/logoHeader.png';


function Heading() {
    const style = { marginTop: '1%' };
    const logoStyle = {width: '100px'}
    return (
        <div style={style} className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800"> <img style={logoStyle} src={logo} alt="Logo" />Dashboard Be Elegant Men</h1>
        </div>
     );
   }
   
export default Heading;