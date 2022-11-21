import React from "react";
import { Col } from "antd";

const FormFooterComponent = ({ style, datas, ...props }) => {
  return (
    <Col
      span={24}
      style={{
        ...style,
        display: "flex",
        justifyContent: "flex-end",
        marginTop: 10,
      }}
    >
      <table className="form_footer">
        <tbody>
          {datas && datas.length > 0
            ? datas.map((d, i) => {
                return (
                  <tr key={i}>
                    <td className="title">{d.title}</td>
                    <td style={{ textAlign: "right" }}>{d.children}</td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </Col>
  );
};

export default FormFooterComponent;
