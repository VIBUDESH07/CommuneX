import React from 'react';
import useScrollAnimations from './useScroll';
import Head from './Head';
import Main from './Main';

const Layout = () => {
  useScrollAnimations(); // Activate scroll animations

  return (
    <div>
      <Head className="fixed-header" />
      <div>
        <Main />
      </div>
    </div>
  );
};

export default Layout;
