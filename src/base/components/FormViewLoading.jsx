import React from "react";
import { Row, Skeleton, Col } from "antd";
// const Row = lazy(() => import('antd/lib/row/index'))
// const Skeleton.Input = lazy(() => import('antd/lib/skeleton/Input'))
// const Col = lazy(() => import('antd/lib/col/index'))

const FormViewLoading = ({ style, ...props }) => {
  return (
    //   <Suspense fallback={''}>
    <div
      style={{
        background: "#f0f2f5",
        width: "100%",
        zIndex: 11,
        height: "100%",
        ...style,
      }}
    >
      <div style={{ height: 38, padding: "0 5px" }}>
        <Skeleton.Input
          style={{ width: "100%" }}
          active={true}
          size={"default"}
        />
      </div>
      <div style={{ height: 38, padding: "0 5px" }}>
        <Skeleton.Input
          style={{ width: "100%" }}
          active={true}
          size={"default"}
        />
      </div>
      <div style={{ background: "#fff", height: "100%", marginTop: 5 }}>
        <Row gutter={8} style={{ padding: 5, margin: 0, background: "#fff" }}>
          <Col span={12}>
            <Skeleton.Input
              style={{ height: 60, marginBottom: 10 }}
              active={true}
              size={"default"}
            />
          </Col>
          <Col span={12}>
            <Skeleton.Input
              style={{ height: 60, marginBottom: 10 }}
              active={true}
              size={"default"}
            />
          </Col>
          <Col span={12}>
            <Skeleton.Input
              style={{ height: 60, marginBottom: 10 }}
              active={true}
              size={"default"}
            />
          </Col>
          <Col span={12}>
            <Skeleton.Input
              style={{ height: 60, marginBottom: 10 }}
              active={true}
              size={"default"}
            />
          </Col>
          <Col span={24} style={{ marginTop: 10 }}>
            <Skeleton.Input
              style={{ height: 200 }}
              active={true}
              size={"default"}
            />
          </Col>
        </Row>
      </div>
    </div>
    //   </Suspense>
  );
};

export default FormViewLoading;
