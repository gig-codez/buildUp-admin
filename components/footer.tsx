import React from 'react';

const Footer = () => {
    let year = new Date();
    return (
        <footer className="main-footer">
            <strong>Copyright &copy; {year.getFullYear()} Build Up</strong>
            All rights reserved.
            <div className="float-right d-none d-sm-inline-block">
                <b>Version</b> 3.2.0
            </div>
        </footer>
    );
};
export default Footer;