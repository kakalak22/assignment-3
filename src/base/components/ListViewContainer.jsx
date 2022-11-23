import React from "react";
import { Form } from "antd";
// const Form = lazy(() => import('antd/lib/form'))

const ListViewContainer = ({ children, style, className, ...props }) => {
  return (
    <div style={{ style }} className={className} {...props}>
      {children ? children : null}
    </div>
  );
};

export default ListViewContainer;
