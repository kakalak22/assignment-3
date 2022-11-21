import { Button, Input, Select, Space, Table, Tag } from "antd";
import Search from "antd/lib/input/Search";
import { isEqual } from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import FieldNumb from "../../base/components/FieldNumb";
import ListHeadView from "../../base/components/ListHeadView";
import ListViewContainer from "../../base/components/ListViewContainer";

const ListHangBanTraLai = ({ openForm, getId }) => {
  const hangBanTraLai = useSelector(
    (state) => {
      return state.hangBanTraLai.hangBanTraLai;
    },
    (prev, next) => isEqual(prev, next)
  );
  console.log(hangBanTraLai);
  //table column
  const column = [
    {
      title: "#",
      key: "index",
      dataIndex: "index",
      fixed: "left",
      width: 50,
      align: "center",
      render: (record, key, index) => {
        return index + 1;
      },
    },
    {
      title: "Số chứng từ",
      fixed: "left",
      key: "name",
      dataIndex: "name",
      width: 150,
      render: (record) => {
        return (
          <Input value={record} readOnly={true} style={{ width: "100%" }} />
        );
      },
    },
    {
      title: "Số hóa đơn",
      fixed: "left",
      key: "invoice_code",
      dataIndex: "invoice_code",
      width: 150,
      render: (record) => {
        return (
          <Input
            value={record}
            readOnly={true}
            style={{ width: "100%", textOverflow: "ellipsis" }}
          />
        );
      },
    },
    {
      title: "Diễn giải",
      key: "description",
      dataIndex: "description",
      width: 250,
      render: (record) => {
        return (
          <Input
            value={record}
            readOnly={true}
            style={{ width: "100%", textOverflow: "ellipsis" }}
          />
        );
      },
    },
    {
      title: "Khách hàng",
      key: "partner_id",
      dataIndex: "partner_id",
      width: 250,
      render: (record) => {
        return (
          <Input
            value={record}
            readOnly={true}
            style={{ width: "100%", textOverflow: "ellipsis" }}
          />
        );
      },
    },
    {
      title: "Ngày chứng từ",
      key: "invoice_date",
      dataIndex: "invoice_date",
      width: 150,
      render: (record) => {
        const date = new Date(record);
        return (
          <Input
            value={`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}
            readOnly={true}
            style={{ width: "100%" }}
          />
        );
      },
    },
    {
      title: "Ngày hạch toán",
      key: "entry_date",
      dataIndex: "entry_date",
      width: 150,
      render: (record) => {
        const date = new Date(record);
        return (
          <Input
            value={`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}
            readOnly={true}
            style={{ width: "100%" }}
          />
        );
      },
    },

    {
      title: "Tổng tiền",
      key: "tot_amount",
      dataIndex: "tot_amount",
      width: 130,
      render: (record) => {
        return (
          <FieldNumb
            value={record}
            readOnly={true}
            style={{ width: "100%", textAlign: "right" }}
          />
        );
      },
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      width: 130,
      render: (record) => {
        return record === "post" ? (
          <Tag style={{ marginLeft: 5 }} color="#87d068">
            {" "}
            Ghi sổ
          </Tag>
        ) : record === "unpost" ? (
          <Tag style={{ marginLeft: 5 }} color="#848484">
            {" "}
            Chưa ghi sổ
          </Tag>
        ) : record === "cancel" ? (
          <Tag style={{ marginLeft: 5 }} color="#cd201f">
            {" "}
            Hủy chứng từ
          </Tag>
        ) : null;
      },
    },
  ];

  return (
    <ListViewContainer>
      <ListHeadView
        buttons={
          <React.Fragment>
            <Button
              onClick={() => {
                openForm();
                getId("");
              }}
            >
              Thêm mới
            </Button>
          </React.Fragment>
        }
        filter={
          <React.Fragment>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Select
                // showArrow={false}
                defaultValue="ten"
                style={{
                  width: 100,
                }}
                dropdownMatchSelectWidth={true}
                placement="bottomLeft"
                options={[
                  {
                    value: "soLuongLonHon",
                    label: "Số lượng lớn hơn hoặc bằng",
                  },
                  {
                    value: "soLuongNhoHon",
                    label: "Số lượng nhỏ hơn hoặc bằng",
                  },
                  {
                    value: "ten",
                    label: "Tên",
                  },
                ]}
                //   onChange={onSelect}
              />
              <Input style={{ width: 300 }} />
              <Button>reset</Button>
              <Button>Search</Button>
            </div>
          </React.Fragment>
        }
      />
      <Table
        className="fast_table"
        columns={column}
        dataSource={hangBanTraLai}
        bordered
        //   loading={}
        pagination={false}
        style={{ height: "auto" }}
        scroll={{ y: "calc(98vh - 271px)", x: 1400 }}
        size="small"
        rowKey="_id"
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              getId(record._id);
              openForm();
            },
          };
        }}
      />
    </ListViewContainer>
  );
};

export default ListHangBanTraLai;
