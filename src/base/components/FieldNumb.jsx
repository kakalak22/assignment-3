import { InputNumber } from "antd";
import React from "react";

const FieldNumb = ({
  readOnly,
  style,
  name,
  required,
  onChange,
  showMinus = false,
  ...props
}) => {
  return (
    <InputNumber
      readOnly={readOnly}
      style={style}
      name={name}
      required={required}
      min={1}
      onChange={onChange}
      formatter={(value) =>
        showMinus
          ? `(${`${Math.abs(value)}`
              .replace(/\./, ",")
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")})`
          : `${value}`.replace(/\./, ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      }
      parser={(x) =>
        parseInt(`${x}`.replace(/,/, "#").replace(/\./g, "").replace(/#/, ","))
      }
      {...props}
    />
  );
};

export default FieldNumb;
