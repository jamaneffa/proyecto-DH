import logo from '../../assets/img/logoFooter.png';

const logoStyle = {width: '25px'}

function Footer() {
 return (
    <footer className="sticky-footer bg-white">
    <div className="container my-auto">
      <div className="copyright text-center my-auto">
        <span><img style={logoStyle} src={logo} alt="Logo" /> Copyright &copy; Dashboard Be Elegant Men 2023</span>
      </div>
    </div>
  </footer>
  );
}

export default Footer;
