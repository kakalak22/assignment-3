import React, { useEffect, useState } from "react";
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
  Segmented,
  notification,
} from "antd";
import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusCircleOutlined,
  RollbackOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import FormBodyView from "../../base/components/FormBodyView";
import TabPane from "antd/lib/tabs/TabPane";
import ButtonAddNewRowTable from "../../base/components/ButtonAddNewRowTable";
import { cloneDeep, find, findIndex, isEqual, merge } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import merge2ObjectWithSameKeys from "../../utils/merge2ObjectWithSameKeys";
import FieldNumb from "../../base/components/FieldNumb";
import * as HangBanTraLaiActions from "../../controllers/action-types/actionTypesHangBanTraLai";
import moment from "moment";
import FormFooterComponent from "../../base/components/FormFooterComponent";
import FormViewLoading from "../../base/components/FormViewLoading";
import FormThamChieu from "./FormThamChieu";

const ObjectID = require("bson-objectid");

const FormHangBanTraLai = ({ closeForm, activeId, getId }) => {
  const [form] = Form.useForm();

  const danhSachSanPham = useSelector(
    (state) => {
      return state.danhSachSanPham.danhSachSanPham;
    },
    (prev, next) => isEqual(prev, next)
  );

  const hangBanTraLai = useSelector(
    (state) => {
      return state.hangBanTraLai.hangBanTraLai;
    },
    (prev, next) => isEqual(prev, next)
  );

  const dongPhatSinh = useSelector(
    (state) => {
      return state.hangBanTraLai.dongPhatSinh;
    },
    (prev, next) => isEqual(prev, next)
  );

  // console.log(dongPhatSinh);

  const dispatch = useDispatch();

  //local state
  // const today = new Date();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(true);
  const [keyTabs, setKeyTabs] = useState("ctps");
  const [dataDongPhatSinh, setDataDongPhatSinh] = useState([]);
  // console.log(dataDongPhatSinh);
  const [readOnly, setReadOnly] = useState(false);
  const [currHangBanTraLai, setCurrHangBanTraLai] = useState({});
  const [tong, setTong] = useState(0);
  const [status, setStatus] = useState("unpost");
  const [isLoading, setIsLoading] = useState(false);
  const [isFormThamChieuOpen, setIsFormThamChieuOpen] = useState(false);

  //========================================//

  const showModal = () => {
    setIsFormThamChieuOpen(true);
  };
  const handleOk = () => {
    setIsFormThamChieuOpen(false);
  };
  const handleCancel = () => {
    setIsFormThamChieuOpen(false);
  };

  useEffect(() => {
    if (activeId) {
      setReadOnly(true);
      const copyHangBanTraLai = cloneDeep(hangBanTraLai);
      const temp = find(copyHangBanTraLai, { _id: activeId });
      setCurrHangBanTraLai(temp);
      temp.entry_date = moment(temp.entry_date);
      temp.invoice_date = moment(temp.invoice_date);
      setStatus(temp.status);
      form.setFieldsValue(temp);
      const tempDongPhatSinh = dongPhatSinh.filter((row) => {
        return row.hangBanTraLaiId === activeId;
      });
      setDataDongPhatSinh(tempDongPhatSinh);
      setIsCreateMode(false);
    }
  }, [activeId]);

  useEffect(() => {
    const tong = dataDongPhatSinh.reduce(
      (prev, curr) => prev + curr.price * curr.quantity,
      0
    );
    setTong(tong);
    form.setFieldValue("tot_amount", tong);
  }, [dataDongPhatSinh]);

  //func change status invoice

  const handleChangeInvoiceStatus = (status) => {
    dispatch({
      type: HangBanTraLaiActions.HANG_BAN_TRA_LAI_UPDATE_STATUS,
      data: {
        status: status,
        _id: activeId,
      },
      setFieldValue: form.setFieldValue,
      setStatus: setStatus,
    });
  };

  //function select san pham
  const handleSelectSanPham = (value, _, record) => {
    let copyDataDongPhatSinh = cloneDeep(dataDongPhatSinh);
    let copyDanhSachSanPham = cloneDeep(danhSachSanPham);
    const index = findIndex(copyDataDongPhatSinh, { _id: record._id });
    //data from select
    const temp = find(copyDanhSachSanPham, { product_id: value });

    let newRow = merge2ObjectWithSameKeys(copyDataDongPhatSinh[index], temp);
    copyDataDongPhatSinh[index] = newRow;
    // copyDataDongPhatSinh[index].index = rowIndex;
    setDataDongPhatSinh(copyDataDongPhatSinh);
  };

  //function onChange
  const handleChangeDongPhatSinhCell = (value, record, propertyName) => {
    let copyDataDongPhatSinh = cloneDeep(dataDongPhatSinh);
    const index = findIndex(copyDataDongPhatSinh, { _id: record._id });
    copyDataDongPhatSinh[index][propertyName] = value;
    setDataDongPhatSinh(copyDataDongPhatSinh);
  };

  //function submit form
  const createData = (values) => {
    // console.log("submit form");
    if (isCreateMode) {
      let isError = false;
      if (dataDongPhatSinh < 1) {
        notification.error({
          message: "Vui lòng nhập dòng phát sinh",
          placement: "topRight",
        });
        return;
      }
      dataDongPhatSinh.forEach((row) => {
        if (!row.quantity) {
          notification.error({
            message: "Vui lòng nhập số lượng ở dòng phát sinh",
            placement: "topRight",
          });
          isError = true;
          return;
        }
      });
      if (!isError) {
        dispatch({
          type: HangBanTraLaiActions.HANG_BAN_TRA_LAI_CREATE_NEW,
          data: {
            hangBanTraLai: values,
            dongPhatSinh: dataDongPhatSinh,
          },
          getId: getId,
          setIsLoading: setIsLoading,
        });
        setReadOnly(true);
        setIsLoading(true);
        return;
      }
    }
    if (isEditMode) {
      dispatch({
        type: HangBanTraLaiActions.HANG_BAN_TRA_LAI_UPDATE,
        data: {
          hangBanTraLai: { _id: activeId, ...values, status: status },
          dongPhatSinh: dataDongPhatSinh,
        },
        setIsLoading: setIsLoading,
        setReadOnly: setReadOnly,
      });
      setIsLoading(true);
    }
    // closeForm();
    // setIsCreateMode(false);
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
    n.product_id = "";
    // n.khoanmuc = { _id: '', name: '' }
    n.warehouse_id = "";
    n.uom_id = "";
    n.debit_account_id = "";
    n.credit_account_id = "";
    n.tax_debit_account_id = "";
    n.tax_credit_account_id = "";
    n.tax_name = "";
    let noiDl = dataDongPhatSinh.concat(n);
    setDataDongPhatSinh(noiDl);
  };

  //fucntion delete row from table
  const removeRow = (record) => {
    const copyDataDongPhatSinh = cloneDeep(dataDongPhatSinh);
    const index = findIndex(copyDataDongPhatSinh, { _id: record._id });
    if (index > -1) {
      copyDataDongPhatSinh.splice(index, 1);
      setDataDongPhatSinh(copyDataDongPhatSinh);
    }
  };

  /*=============================DATA TABLE======================================*/

  //options warehouse

  const warehouseOptions = [
    {
      value: "WareHouse01",
      label: "Kho 01",
      key: "WareHouse01",
    },
    {
      value: "WareHouse02",
      label: "Kho 02",
      key: "WareHouse02",
    },
  ];

  //options account
  const accountOptions = [
    {
      value: 1111,
      label: "[1111] Tiền Việt Nam",
      key: 1111,
    },
    {
      value: 1112,
      label: "[1112] Tiền Ngoại Tệ",
      key: 1112,
    },
    {
      value: 1113,
      label: "[1113] Vàng Tiền Tệ",
      key: 1113,
    },
  ];

  //options san pham
  const options = danhSachSanPham.map((sanPham) => {
    return {
      value: sanPham.product_id,
      label: `[${sanPham.product_id}]${sanPham.name}`,
      key: sanPham.product_id,
    };
  });

  //column dong phat sinh
  const column = [
    {
      title: "#",
      width: 30,
      fixed: "left",
      align: "center",
      render: (record, data, index) => index,
      // {
      //   return (
      //     <Input
      //       value={index + 1}
      //       disabled={true}
      //       style={{ width: "100%", textAlign: "center" }}
      //     />
      //   );
      // },
    },
    {
      title: "Mã sản phẩm",
      recordKey: "product_id",
      fixed: "left",
      width: 120,
      render: (record, data, index) => (
        <Select
          style={{ width: "100%" }}
          options={options}
          onSelect={(value, _) => handleSelectSanPham(value, _, record, index)}
          value={record.product_id}
          disabled={readOnly}
        />
      ),
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
            value={record.name}
            disabled={true}
            style={{ width: "100%", textOverflow: "initial" }}
          />
        );
      },
    },
    {
      title: "Đơn giá",
      recordKey: "price",
      width: 120,
      render: (record, data, index) => {
        if (!record) {
          return null;
        }
        return (
          <FieldNumb
            name="price"
            // dataId={record._id}
            // onChange={onChangeItem}
            value={record.price}
            disabled={readOnly}
            style={{ width: "100%", textOverflow: "initial" }}
            onChange={(value) =>
              handleChangeDongPhatSinhCell(value, record, "price")
            }
            min={0}
          />
        );
      },
    },
    {
      title: "SL",
      recordKey: "quantity",
      width: 80,
      render: (record, data, index) => {
        return (
          <FieldNumb
            value={record ? record.quantity : ""}
            style={{ width: "100%", textOverflow: "initial" }}
            name="quantity"
            required
            disabled={readOnly}
            min={1}
            onChange={(value) =>
              handleChangeDongPhatSinhCell(value, record, "quantity")
            }
          />
        );
      },
    },
    {
      title: "ĐVT",
      recordKey: "uom_id",
      width: 80,
      render: (record, data, index) => (
        <Input disabled={readOnly} value={record.uom_id} />
      ),
    },
    {
      title: "Thành tiền ",
      recordKey: "amount",
      width: 120,
      render: (record) => (
        <FieldNumb
          style={{ width: "100%", textOverflow: "initial" }}
          disabled={true}
          value={record.quantity > 0 ? record.quantity * record.price : null}
        />
      ),
    },
    {
      title: "TK nợ",
      recordKey: "debit_account_id",
      width: 100,
      render: (record, data, index) => {
        return (
          <Select
            disabled={readOnly}
            dropdownMatchSelectWidth={false}
            style={{ width: 100 }}
            options={accountOptions}
            onSelect={(value) =>
              handleChangeDongPhatSinhCell(value, record, "debit_account_id")
            }
            value={{
              label: record.debit_account_id,
              value: record.debit_account_id,
            }}
            showSearch={true}
          />
        );
      },
    },
    {
      title: "TK có",
      recordKey: "credit_account_id",
      width: 100,
      render: (record, data, index) => {
        return (
          <Select
            disabled={readOnly}
            dropdownMatchSelectWidth={false}
            style={{ width: 100 }}
            options={accountOptions}
            onSelect={(value) =>
              handleChangeDongPhatSinhCell(value, record, "credit_account_id")
            }
            value={{
              label: record.credit_account_id,
              value: record.credit_account_id,
            }}
            showSearch={true}
          />
        );
      },
    },
    {
      title: "Kho",
      recordKey: "warehouse_id",
      width: 100,
      render: (record) => {
        return (
          <Select
            dropdownMatchSelectWidth={false}
            style={{ width: 100 }}
            options={warehouseOptions}
            onSelect={(value) =>
              handleChangeDongPhatSinhCell(value, record, "warehouse_id")
            }
            value={record.warehouse_id}
            showSearch={true}
            disabled={readOnly}
          />
        );
      },
    },
    {
      title: "Khoản mục", // mới thêm
      dataIndex: "khoanmuc",
      width: 100,
    },
    {
      width: 40,
      render: (record) => (
        <Button
          onClick={() => removeRow(record)}
          danger
          icon={<DeleteOutlined />}
          disabled={readOnly}
        ></Button>
      ),
    },
  ];
  /*============================= END OF DATA TABLE======================================*/

  return (
    <React.Fragment>
      <FormThamChieu
        isModalOpen={isFormThamChieuOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
        setDataDongPhatSinh={setDataDongPhatSinh}
        setFieldValue={form.setFieldValue}
      />
      <Form form={form} layout="vertical" onFinish={createData}>
        <React.Fragment>
          <FormHeadView
            status={
              !isCreateMode ? (
                <Segmented
                  size="middle"
                  options={[
                    { label: "Chưa ghi sổ", value: "unpost" },
                    { label: "Ghi sổ", value: "post" },
                    { label: "Hủy", value: "cancel" },
                  ]}
                  value={status}
                />
              ) : null
            }
            formButtons={
              <Row gutter={16}>
                <Col span={24} style={{ display: "flex" }}>
                  {isCreateMode ? (
                    <React.Fragment>
                      <Button
                        type="primary"
                        style={{ marginRight: 10 }}
                        //   loading={loading}
                        icon={<PlusCircleOutlined />}
                        loading={isLoading}
                        onClick={form.submit}
                      >
                        Tạo
                      </Button>
                      <Button
                        type="default"
                        //   onClick={openFormBanHang}
                        icon={<CloseOutlined />}
                        onClick={closeForm}
                      >
                        Hủy tạo
                      </Button>
                    </React.Fragment>
                  ) : !readOnly ? (
                    <React.Fragment>
                      <Button
                        type="primary"
                        style={{ marginRight: 10 }}
                        loading={isLoading}
                        icon={<SaveOutlined />}
                        onClick={form.submit}
                      >
                        Lưu
                      </Button>
                      <Button
                        type="default"
                        //   onClick={openFormBanHang}
                        icon={<CloseOutlined />}
                        onClick={() => {
                          setReadOnly(true);
                          setIsEditMode(false);
                        }}
                      >
                        Hủy
                      </Button>
                    </React.Fragment>
                  ) : status === "post" && !isLoading ? (
                    <React.Fragment>
                      <Button
                        type="default"
                        style={{ marginRight: 10 }}
                        icon={<CloseCircleOutlined style={{ color: "red" }} />}
                        onClick={() => {
                          handleChangeInvoiceStatus("unpost");
                        }}
                      >
                        Bỏ ghi sổ
                      </Button>
                      <Button
                        type="primary"
                        style={{ marginRight: 10 }}
                        icon={<EyeOutlined />}
                      >
                        Xem
                      </Button>
                      <Button
                        style={{ marginRight: 10 }}
                        icon={<EditOutlined />}
                      >
                        Nhập kho
                      </Button>
                    </React.Fragment>
                  ) : status === "cancel" && !isLoading ? (
                    <React.Fragment>
                      <Button
                        type="default"
                        style={{ marginRight: 10 }}
                        icon={
                          <CheckCircleOutlined style={{ color: "green" }} />
                        }
                        onClick={() => {
                          handleChangeInvoiceStatus("unpost");
                        }}
                      >
                        Kích hoạt chứng từ
                      </Button>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Button
                        htmlType="button"
                        type="primary"
                        style={{ marginRight: 10 }}
                        //   loading={loading}
                        onClick={() => {
                          setReadOnly(false);
                          setIsEditMode(true);
                        }}
                        icon={<EditOutlined />}
                      >
                        Sửa
                      </Button>

                      <Button
                        style={{ marginRight: 10 }}
                        //   loading={loading}
                        onClick={() => {
                          handleChangeInvoiceStatus("post");
                        }}
                        icon={<CheckCircleOutlined />}
                      >
                        Ghi sổ
                      </Button>

                      <Button
                        type="default"
                        //   onClick={openFormBanHang}
                        icon={<CloseOutlined />}
                        onClick={() => {
                          handleChangeInvoiceStatus("cancel");
                        }}
                      >
                        Hủy chứng từ
                      </Button>
                    </React.Fragment>
                  )}

                  {!isCreateMode ? (
                    <React.Fragment>
                      <Button
                        style={{ marginLeft: 10 }}
                        icon={<ArrowLeftOutlined />}
                        onClick={() => closeForm()}
                      >
                        Quay lại
                      </Button>
                    </React.Fragment>
                  ) : null}
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
                        <Input disabled={true} />
                      </Col>
                      <Col span={2}>
                        <Button
                          type="primary"
                          disabled={!isCreateMode}
                          onClick={showModal}
                        >
                          Chọn
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={12}></Col>
                </React.Fragment>
              </Col>
              <Col span={8} style={{ marginLeft: "10px" }}>
                <Form.Item label="Số chứng từ:" name="name">
                  <Input
                    style={{ width: "100%" }}
                    value={currHangBanTraLai.name ? currHangBanTraLai.name : ""}
                    disabled={true}
                  />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label="Ký hiệu hóa đơn:"
                  name="invoice_symbol"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập kí hiệu hóa đơn",
                    },
                  ]}
                >
                  <Input
                    style={{ width: "100%" }}
                    value={
                      currHangBanTraLai.invoice_symbol
                        ? currHangBanTraLai.invoice_symbol
                        : ""
                    }
                    disabled={readOnly}
                  />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập số hóa đơn",
                    },
                  ]}
                  label="Số hóa đơn:"
                  name="invoice_code"
                >
                  <Input
                    style={{ width: "100%" }}
                    disabled={readOnly}
                    value={
                      currHangBanTraLai.invoice_code
                        ? currHangBanTraLai.invoice_code
                        : ""
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên khách hàng",
                    },
                  ]}
                  label="Khách hàng:"
                  name="partner_id"
                >
                  <Input
                    disabled={readOnly}
                    style={{ width: "100%" }}
                    value={
                      currHangBanTraLai.partner_id
                        ? currHangBanTraLai.partner_id
                        : ""
                    }
                  />
                </Form.Item>
              </Col>
              {/** hàng 3 **/}
              <Col span={4} style={{ marginLeft: "10px" }}>
                <Form.Item
                  initialValue={moment()}
                  label="Ngày chứng từ:"
                  name="invoice_date"
                >
                  <DatePicker
                    // defaultValue={moment(today, "DD/MM/YYYY")}
                    disabled={readOnly}
                    format={"DD/MM/YYYY"}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  initialValue={moment()}
                  label="Ngày hoạch toán:"
                  name="entry_date"
                >
                  <DatePicker
                    // defaultValue={moment(today, "DD/MM/YYYY")}
                    disabled={readOnly}
                    format={"DD/MM/YYYY"}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Loại tiền:"
                  name="currency_id"
                  initialValue={"VND"}
                >
                  <Input disabled={true} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item label="Tỷ giá:" initialValue={"1.0"}>
                  <Input disabled={true} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item label="Tham chiếu:">
                  <Input disabled={true} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={23} style={{ marginLeft: "10px" }}>
                <Form.Item label="Diễn giải:" name="description">
                  <Input
                    style={{ width: "100%" }}
                    value={currHangBanTraLai.description}
                    disabled={readOnly}
                  />
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
                          loading={isLoading}
                          size="small"
                          // className="form_table"
                          bordered={true}
                          columns={column}
                          dataSource={dataDongPhatSinh}
                          rowKey={(record) => record._id}
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
                          {!readOnly ? (
                            <ButtonAddNewRowTable addNewItem={addRow} />
                          ) : null}
                        </Col>
                      </Col>
                    </Row>
                  </TabPane>
                </Tabs>
              </Col>
            </Row>
          </FormBodyView>
          <FormFooterComponent
            datas={[
              {
                title: "Tổng trước thuế",
                children: (
                  <Form.Item style={{ margin: 0 }}>
                    <FieldNumb
                      value={tong ? tong : 0}
                      readOnly={true}
                      bordered={false}
                      style={{
                        width: "100%",
                        backgroundColor: "transparent",
                        textAlign: "right",
                      }}
                    />
                  </Form.Item>
                ),
              },
              {
                title: "Thuế",
                children: (
                  <Form.Item style={{ margin: 0 }}>
                    <FieldNumb
                      value={0}
                      readOnly={true}
                      bordered={false}
                      style={{
                        width: "100%",
                        backgroundColor: "transparent",
                        textAlign: "right",
                      }}
                    />
                  </Form.Item>
                ),
              },
              {
                title: "Tổng",
                children: (
                  <Form.Item name="tot_amount" style={{ margin: 0 }}>
                    <FieldNumb
                      value={tong ? tong : 0}
                      readOnly={true}
                      bordered={false}
                      style={{
                        width: "100%",
                        backgroundColor: "transparent",
                        textAlign: "right",
                      }}
                    />
                  </Form.Item>
                ),
              },
            ]}
          />
        </React.Fragment>
      </Form>
    </React.Fragment>
  );
};

export default FormHangBanTraLai;
