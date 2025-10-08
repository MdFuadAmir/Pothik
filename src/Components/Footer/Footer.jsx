import Pothik from "../../Shared/Pothik/Pothik";

const Footer = () => {
  return (
    <div>
      <footer className="footer sm:footer-horizontal text-white bg-gray-800 p-10">
        <aside>
         <Pothik></Pothik>
          <p>
            Pothik Industries Ltd.
            <br />
            Providing reliable tech since 2020
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
      <div className="footer sm:footer-horizontal footer-center p-4 text-white bg-gray-800">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            Pothik Industries Ltd
          </p>
        </aside>
      </div>
    </div>
  );
};

export default Footer;
