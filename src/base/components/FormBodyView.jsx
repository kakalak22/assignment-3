import React from 'react';

const FormBodyView = ({ children, style, className, ...props }) => {
    return <div className={`FormBodyView ${className}`} style={style}>
        {children ? children : null}
    </div>;
}

export default FormBodyView;