import React from 'react';

export interface IMyComponentProps {
  children?: React.ReactNode;
}

export function MyComponent({ children }: IMyComponentProps): React.ReactElement {
  return <div>{children}</div>;
}
