import React, { useState } from "react";
import FormHeadView from "../../base/components/FormHeadView";
import FormViewContainer from "../../base/components/FormViewContainer";
import {
  Button,
  Col,
  Row,
  Form,
  Input,
  Divider,
  DatePicker,
  Tabs,
  InputNumber,
  Table,
} from "antd";
import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import FormBodyView from "../../base/components/FormBodyView";
import TabPane from "antd/lib/tabs/TabPane";
import ButtonAddNewRowTable from "../../base/components/ButtonAddNewRowTable";

const ObjectID = require("bson-objectid");

const FormHangBanTraLai = () => {
  //local state
  const [keyTabs, setKeyTabs] = useState("ctps");
  const [dataDongPhatSinh, setDataDongPhatSinh] = useState([]);

  // function handle input
  const handleOnFieldsChange = (_, values) => {
    console.log(values);
  };

  //function submit form
  const createData = (_, values) => {
    console.log(values);
  };

  //function add row to table
  const addRow = () => {
    let n = {};
    column.forEach((c) => {
      if (c.recordKey) {
        n[c.recordKey] = "";
      }
    });
    n._id = ObjectID().toString();
    n.product_id = { _id: "", name: "" };
    // n.khoanmuc = { _id: '', name: '' }
    n.warehouse_id = { _id: "", name: "" };
    n.uom_id = { _id: "", name: "" };
    n.debit_account_id = { _id: "", full_name: "" };
    n.credit_account_id = { _id: "", full_name: "" };
    n.tax_debit_account_id = { _id: "", full_name: "" };
    n.tax_credit_account_id = { _id: "", full_name: "" };
    n.tax_name = "";
    let noiDl = dataDongPhatSinh.concat(n);
    setDataDongPhatSinh(noiDl);
  };
  //column dong phat sinh
  const column = [
    {
      title: "#",
      recordKey: "index",
      width: 30,
      fixed: "left",
      align: "center",
      render: (record, data, index) => {
        if (!record) {
          return "";
        }
        return (
          <Input
            name={"index"}
            value={index + 1}
            readonly={true}
            style={{ width: "100%", textAlign: "center" }}
          />
        );
      },
    },
    {
      title: "Mã sản phẩm",
      recordKey: "product_id",
      fixed: "left",
      width: 80,
    },
    {
      title: "Sản phẩm",
      recordKey: "name",
      width: 100,
      render: (record, data, index) => {
        if (!record) {
          return null;
        }
        return (
          <Input
            name="name"
            // dataId={record._id}
            // onChange={onChangeItem}
            // value={record.name}
            readonly={true}
            style={{ width: "100%", textOverflow: "initial" }}
          />
        );
      },
    },
    {
      title: "Đơn giá",
      recordKey: "price",
      width: 80,
      render: (record, data, index) => {
        if (!record) {
          return null;
        }
        return (
          <InputNumber
            readonly={true}
            style={{ width: "100%", textOverflow: "initial" }}
          />
        );
      },
    },
    {
      title: "SL",
      recordKey: "quantity",
      width: 40,
    },
    {
      title: "ĐVT",
      recordKey: "uom_id",
      width: 50,
    },
    {
      title: "Thành tiền ",
      recordKey: "amount",
      width: 80,
    },
    {
      title: "TK nợ",
      recordKey: "debit_account_id",
      width: 50,
    },
    {
      title: "TK có",
      recordKey: "credit_account_id",
      width: 50,
    },
    {
      title: "Kho",
      // recordKey: 'warehouse_id',
      width: 100,
    },
    {
      title: "Khoản mục", // mới thêm
      dataIndex: "khoanmuc",
      width: 100,
    },
  ];
  return (
    <FormViewContainer>
      <FormHeadView
        formButtons={
          <Row gutter={16}>
            <Col span={24} style={{ display: "flex" }}>
              <React.Fragment>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginRight: 10 }}
                  //   loading={loading}
                  icon={<PlusCircleOutlined />}
                >
                  Tạo
                </Button>
                <Button
                  type="default"
                  //   onClick={openFormBanHang}
                  icon={<CloseOutlined />}
                >
                  Hủy tạo
                </Button>
              </React.Fragment>
            </Col>
          </Row>
        }
      />
      <Divider />
      <FormBodyView>
        <Form layout="vertical" onFieldsChange={handleOnFieldsChange}>
          <Row gutter={[10, 8]}>
            <Col span={24}>
              <React.Fragment>
                <Col span={8}>
                  <Row
                    gutter={4}
                    style={{ alignItems: "center", paddingLeft: "10px" }}
                  >
                    <Col span={8}>Tham chiếu: </Col>
                    <Col span={12}>
                      <Input />
                    </Col>
                    <Col span={2}>
                      <Button>Chọn</Button>
                    </Col>
                  </Row>
                </Col>
                <Col span={12}></Col>
              </React.Fragment>
            </Col>
            <Col span={8} style={{ marginLeft: "10px" }}>
              <Form.Item label="Số chứng từ:" name="soChungTu">
                <Input style={{ width: "100%" }} readOnly={true} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Ký hiệu hóa đơn:" name="kyHieuHoaDon">
                <Input style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Số hóa đơn:">
                <Input style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item label="Khách hàng:">
                <Input style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            {/** hàng 3 **/}
            <Col span={4} style={{ marginLeft: "10px" }}>
              <Form.Item label="Ngày chứng từ:">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Ngày hoạch toán:">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Loại tiền:">
                <Input readOnly style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item label="Loại tiền:">
                <Input readOnly style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item label="Tham chiếu:">
                <Input readOnly style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={23} style={{ marginLeft: "10px" }}>
              <Form.Item label="Diễn giải:">
                <Input style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={24} style={{ marginLeft: "10px" }}>
              <Tabs
                activeKey={keyTabs}
                style={{ width: "100%" }}
                // onChange={(tabs) => setKeyTabs(tabs)}
              >
                <TabPane tab="Chi tiết phát sinh" key="ctps">
                  <Row gutter={10}>
                    <Col span={23}>
                      <Table
                        size="small"
                        // className="form_table"
                        bordered={true}
                        columns={column}
                        dataSource={dataDongPhatSinh}
                        rowKey={"_id"}
                        scroll={{ y: 230, x: 1200 }}
                        rowClassName={"scroll-row"}
                        pagination={{
                          total: dataDongPhatSinh.length,
                          pageSize: 5,
                        }}
                        // pagination={{
                        //   current: currentPage,
                        //   onChange: onChangePage,
                        // }}
                      />
                      <Col span={23} style={{ margin: "20px 0" }}>
                        <ButtonAddNewRowTable addNewItem={addRow} />
                      </Col>
                    </Col>
                  </Row>
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </Form>
      </FormBodyView>
    </FormViewContainer>
  );
};

export default FormHangBanTraLai;
