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
  Select,
} from "antd";
import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import FormBodyView from "../../base/components/FormBodyView";
import TabPane from "antd/lib/tabs/TabPane";
import ButtonAddNewRowTable from "../../base/components/ButtonAddNewRowTable";
import { isEqual } from "lodash";
import { useSelector } from "react-redux";

const ObjectID = require("bson-objectid");

const FormHangBanTraLai = () => {
  //local state
  const [keyTabs, setKeyTabs] = useState("ctps");
  const [dataDongPhatSinh, setDataDongPhatSinh] = useState([]);
  const [readOnly, setReadOnly] = useState(false);
  const danhSachSanPham = useSelector(
    (state) => {
      return state.danhSachSanPham.danhSachSanPham;
    },
    (prev, next) => isEqual(prev, next)
  );

  //function submit form
  const createData = (values) => {
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
            readOnly={true}
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
      render: <Select options={[]} />,
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
            readOnly={true}
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
            readOnly={true}
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
    <Form layout="vertical" onFinish={createData}>
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
        <Row gutter={[10, 8]}>
          <Col span={24} style={{ marginBottom: "20px" }}>
            <React.Fragment>
              <Col span={8}>
                <Row
                  gutter={4}
                  style={{ alignItems: "center", paddingLeft: "10px" }}
                >
                  <Col span={8}>Tham chiếu: </Col>
                  <Col span={12}>
                    <Input readOnly={true} />
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
            <Form.Item label="Số chứng từ:" name="name">
              <Input style={{ width: "100%" }} readOnly={true} />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="Ký hiệu hóa đơn:" name="invoice_symbol">
              <Input style={{ width: "100%" }} readOnly={readOnly} />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="Số hóa đơn:" name="invoice_code">
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item label="Khách hàng:" name="partner_id">
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          {/** hàng 3 **/}
          <Col span={4} style={{ marginLeft: "10px" }}>
            <Form.Item label="Ngày chứng từ:" name="invoice_date">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="Ngày hoạch toán:" name="entry_date">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Loại tiền:"
              name="currency_id"
              initialValue={"VND"}
            >
              <Input
                readOnly={true}
                style={{ width: "100%" }}
                defaultValue="VND"
              />
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item label="Tỷ giá:" initialValue={"1.0"}>
              <Input
                readOnly={true}
                style={{ width: "100%" }}
                defaultValue="1.0"
              />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item label="Tham chiếu:">
              <Input readOnly={true} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={23} style={{ marginLeft: "10px" }}>
            <Form.Item label="Diễn giải:" name="description">
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
      </FormBodyView>
    </Form>
  );
};

export default FormHangBanTraLai;
