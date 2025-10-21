declare module 'aframe-react' {
  import * as React from 'react';
  import * as AFrame from 'aframe';

  export interface EntityProps extends React.HTMLAttributes<HTMLElement> {
    [key: string]: any;
  }

  export class Entity extends React.Component<EntityProps> {}
  
  export interface SceneProps extends React.HTMLAttributes<HTMLElement> {
    [key: string]: any;
  }
  
  export class Scene extends React.Component<SceneProps> {}
}
