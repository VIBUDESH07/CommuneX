import React from 'react';
 // Import your CSS file

const Cube3D = () => {
  return (
    <div className="cube-container">
      <div className="cube">
        <div className="face front">
          <img src="https://media.geeksforgeeks.org/wp-content/uploads/20210223233400/gfg4.jpg" alt="Front" />
        </div>
        <div className="face back">
          <img src="https://media.geeksforgeeks.org/wp-content/uploads/20210223232947/gfg2.jpg" alt="Back" />
        </div>
        <div className="face left">
          <img src="https://media.geeksforgeeks.org/wp-content/uploads/20210223232853/gfg1.png" alt="Left" />
        </div>
        <div className="face right">
          <img src="https://media.geeksforgeeks.org/wp-content/uploads/20210223233046/gfg3.png" alt="Right" />
        </div>
        <div className="face top">
          <img src="https://media.geeksforgeeks.org/wp-content/uploads/20210223233400/gfg4.jpg" alt="Top" />
        </div>
        <div className="face bottom">
          <img src="https://media.geeksforgeeks.org/wp-content/uploads/20210223232947/gfg2.jpg" alt="Bottom" />
        </div>
      </div>
    </div>
  );
}

export default Cube3D;
