import React from 'react';
import 'aframe';
import { Entity, Scene } from 'aframe-react';

const ARTour: React.FC = () => {
  return (
    <div className="ar-tour-container p-4">
      <h1 className="text-2xl font-bold mb-4">AR Virtual Tour</h1>
      <Scene>
        <Entity geometry={{ primitive: 'box' }} material={{ color: 'red' }} position={{ x: 0, y: 0, z: -5 }} />
        <Entity text={{ value: 'Welcome to Kenyan History AR Tour' }} position={{ x: 0, y: 2, z: -5 }} />
      </Scene>
    </div>
  );
};

export default ARTour;
