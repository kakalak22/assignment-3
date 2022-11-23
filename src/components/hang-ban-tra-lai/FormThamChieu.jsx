import {
  Button,
  Divider,
  Input,
  Modal,
  notification,
  Select,
  Space,
  Table,
  Typography,
} from "antd";
import { cloneDeep, debounce, find } from "lodash";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FieldNumb from "../../base/components/FieldNumb";
import moment from "moment/moment";
const FormThamChieu = ({
  isModalOpen,
  handleOk,
  handleCancel,
  setDataDongPhatSinh,
  setFieldValue,
}) => {
  const { Title } = Typography;
  const donBanHang = useSelector((state) => state.donBanHang.donBanHang);
  //   console.log(donBanHang);
  const dongPhatSinhDonBanHang = useSelector(
    (state) => state.donBanHang.dongPhatSinhDonBanHang
  );
  //   console.log(dongPhatSinhDonBanHang);

  //local state
  const [selectedValue, setSelectedValue] = useState();
  const [dataTable, setDataTable] = useState([]);
  //   const [returnQuantity, setReturnQuantity] = useState([]);
  //   console.log(dataTable);
  const readOnly = true;

  const selectOptions = donBanHang.map((row) => {
    return {
      label: row.name,
      value: row.id,
    };
  });

  const handleChangeReturnQuantity = (value, record, index) => {
    let temp = cloneDeep(dataTable);
    console.log(value);
    // if (value > record.quantity) {
    //   temp[index].returnQty = value;
    //   setDataTable(temp);
    //   return;
    // }
    // console.log("object");
    temp[index].returnQty = value;
    setDataTable(temp);
  };

  const handleSelect = (value) => {
    setSelectedValue(value);
  };

  //submit form tham chieu

  const submitThamChieu = () => {
    let isError = false;
    let temp = cloneDeep(dataTable);
    temp.forEach((row) => {
      if (row.returnQty === null) {
        isError = true;
        return;
      }
      row.quantity = row.returnQty;
    });
    if (isError) {
      notification.error({
        message: "Vui lòng nhập số lượng trả về",
      });
      return;
    }
    console.log(temp);
    setDataDongPhatSinh(temp);

    handleOk();
  };

  useEffect(() => {
    if (selectedValue) {
      const temp = cloneDeep(
        dongPhatSinhDonBanHang.filter(
          (row) => row.donBanHangId === selectedValue
        )
      );
      temp.forEach((el) => Object.assign(el, { returnQty: null }));
      const selectedDonBanHang = find(donBanHang, { id: selectedValue });
      setFieldValue("partner_id", selectedDonBanHang.partner_id);
      setFieldValue("invoice_date", moment(selectedDonBanHang.invoice_date));
      setFieldValue("entry_date", moment(selectedDonBanHang.entry_date));
      setFieldValue(
        "description",
        `Hàng trả lại của ${selectedDonBanHang.partner_id}`
      );
      setDataTable(temp);
    }
  }, [selectedValue]);

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
          />
        );
      },
    },
    {
      title: "SL Trả về",
      recordKey: "returnQuantity",
      width: 80,
      render: (record, data, index) => {
        return (
          <FieldNumb
            style={{ width: "100%", textOverflow: "initial" }}
            name="returnQuantity"
            required
            min={1}
            max={record.quantity}
            onChange={(value) =>
              handleChangeReturnQuantity(value, record, index)
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
            value={record.warehouse_id}
            showSearch={true}
            disabled={readOnly}
          />
        );
      },
    },
  ];

  return (
    <React.Fragment>
      <Modal
        width={950}
        title="Chọn chứng từ bán hàng"
        open={isModalOpen}
        onOk={submitThamChieu}
        onCancel={handleCancel}
      >
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <Title style={{ margin: 0 }} level={5}>
            Đơn bán hàng
          </Title>
          <Select
            onChange={handleSelect}
            style={{ width: 200 }}
            options={selectOptions}
          />
        </div>
        <Divider />
        <Table
          // loading={isLoading}
          size="small"
          // className="form_table"
          bordered={true}
          columns={column}
          dataSource={dataTable}
          rowKey={(record) => record._id}
          scroll={{ y: 230, x: 1200 }}
          pagination={{
            total: dataTable.length,
            pageSize: 5,
          }}
        />
      </Modal>
    </React.Fragment>
  );
};
export default FormThamChieu;
