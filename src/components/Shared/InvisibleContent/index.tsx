import React from 'react';

// import { Container } from './styles';

interface IProps {
  visible: boolean;
}

const InvisibleContent: React.FC<IProps> = ({ visible, children }) => {
  return <>{visible && children}</>;
};

export default InvisibleContent;
