import React from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
// const PlusCircleOutlined = lazy(() =>
//   import('@ant-design/icons/PlusCircleOutlined')
// );

const ButtonAddNewRowTable = ({ addNewItem }) => {
  return (
    // <Suspense fallback={''}>
    <a onClick={addNewItem}>
      <span
        style={{
          // paddingLeft: 5,
          // paddingTop: 5,
          height: 32,
          width: 200,
        }}
      >
        <PlusCircleOutlined style={{ marginRight: 3 }} /> Thêm dòng mới
      </span>
    </a>
    // </Suspense>
  );
};

export default ButtonAddNewRowTable;
