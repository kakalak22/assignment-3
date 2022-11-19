import React from "react";
import { Form } from "antd";
// const Form = lazy(() => import('antd/lib/form'))

const ListViewContainer = ({ children, style, className, ...props }) => {
  return (
    <Form style={{ style }} className={className} {...props}>
      {children ? children : null}
    </Form>
  );
};

export default ListViewContainer;
