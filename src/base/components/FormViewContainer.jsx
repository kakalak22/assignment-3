import React from "react";
import { Form } from "antd";
// import FormViewLoading from './FormViewLoading';

const FormViewContainer = ({
  children,
  style,
  className,
  loading,
  styleLoading,
  ...props
}) => {
  return (
    <Form
      style={{
        background: "#f0f2f5",
        zIndex: 10,
        ...style,
      }}
      {...props}
      className={className}
    >
      {children ? children : null}
    </Form>
    // <Suspense fallback={''}>
    //     <React.Fragment>
    //     {
    //     !loading
    //         ?
    //         <Form style={{ background: '#f0f2f5', position: 'absolute', top: 0, zIndex: 10, ...style }} {...props} className={className}>
    //             {children ? children : null}
    //         </Form>
    //         :
    //         <FormViewLoading style={styleLoading} />
    //  }
    //  </React.Fragment>
    //  </Suspense>
  );
};

export default FormViewContainer;
