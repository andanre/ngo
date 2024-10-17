import React from 'react';
import { Breadcrumb as BSBreadcrumb } from 'react-bootstrap';

const Breadcrumb: React.FC = () => {
  return (
    <BSBreadcrumb>
      <BSBreadcrumb.Item href="#">Home</BSBreadcrumb.Item>
      <BSBreadcrumb.Item active>Posts</BSBreadcrumb.Item>
    </BSBreadcrumb>
  );
};

export default Breadcrumb;
