import React from "react";
import { Row, Col } from "antd";
// const Row = lazy(() => import('antd/lib/row/index'));
// const Col = lazy(() => import('antd/lib/col/index'));

const FormHeadView = ({
  labelForTitle,
  title,
  filter,
  formButtons,
  status,
  children,
  className,
  ...props
}) => {
  return (
    // <Suspense fallback={null}>
    <Row
      gutter={[0, 16]}
      className={`FormHeadView ${className}`}
      style={{ padding: "5px 10px" }}
    >
      <Col span={status ? 12 : 24} style={{ display: "flex" }}>
        <Row gutter={8} style={{ width: "100%" }}>
          {/* <Col span={labelForTitle ? 6 : 0}>
                    {labelForTitle ? <h2>{labelForTitle}</h2> : null}
                    <h1>{title}</h1>
                </Col> */}
          <Col span={filter ? 8 : 0}>{filter}</Col>
          <Col
            span={
              !labelForTitle && !filter
                ? 24
                : (filter && !labelForTitle) || (!filter && labelForTitle)
                ? 16
                : 10
            }
          >
            {formButtons}
          </Col>
        </Row>
      </Col>
      {status ? (
        <Col
          span={status ? 12 : 24}
          style={{
            textAlign: "right",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {status}
        </Col>
      ) : null}
    </Row>
    // </Suspense>
  );
};

export default FormHeadView;
