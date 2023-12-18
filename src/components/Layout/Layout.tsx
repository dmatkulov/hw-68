import React, {PropsWithChildren} from 'react';
import Navbar from "../Navbar/Navbar";

const Layout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <>
      <Navbar/>
      <main className="container-md mx-auto">
        <div className="col-6 mx-auto text-bg-dark p-5 rounded-4">
          {children}
        </div>
      </main>
    </>
  );
};

export default Layout;