import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const loader = require('../../loader.gif');

export const Loader: React.FC<{ mini?: boolean }> = ({ mini }) => (
  <img
    src={loader}
    alt="Loader"
    style={
      !mini
        ? {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }
        : {
            position: 'fixed',
            bottom: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            height: '64px',
          }
    }
  />
);
