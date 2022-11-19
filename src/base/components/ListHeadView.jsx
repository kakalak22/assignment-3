import React from "react";
import { Row, Col } from "antd";

const ListHeadView = ({
  title,
  icon,
  pagination,
  search,
  filter,
  buttons,
  style = {},
  className,
}) => {
  return (
    <Row
      gutter={[0, 16]}
      style={{ padding: "10px 5px" }}
      className={className ? className : `ListHeadView`}
    >
      <Col span={buttons ? 8 : 24}>
        <div style={{ display: "flex", alignItems: "center" }}>{buttons}</div>
      </Col>
      <Col span={buttons ? 16 : 0}>
        <Row gutter={16} style={style}>
          <Col
            span={
              title
                ? !search && !filter
                  ? 24
                  : !search || !filter
                  ? 6
                  : 11
                : 0
            }
          >
            {icon ? (
              <div>
                {icon} {title}
              </div>
            ) : (
              <div>{title}</div>
            )}
          </Col>
          <Col
            span={
              search ? (!title && !filter ? 24 : !title || !filter ? 18 : 7) : 0
            }
          >
            {search}
          </Col>
          <Col
            span={
              filter ? (!title && !search ? 24 : !title || !search ? 18 : 6) : 0
            }
          >
            {" "}
            {filter}{" "}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ListHeadView;
