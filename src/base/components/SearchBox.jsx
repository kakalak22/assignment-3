import { SearchOutlined, UndoOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as ActionsSearch from "../../controllers/action-types/actionTypesSearch";

const SearchBox = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  //local state
  const [selectedValue, setSelectedValue] = useState("all");

  const submitSearch = (values) => {
    // console.log(values);
    dispatch({
      type: ActionsSearch.SEARCH_PROCESS,
      data: {
        searchValue: values.searchValue,
        status: selectedValue,
        isReset: false,
      },
    });
  };

  const handleSelect = (value) => {
    // console.log(value);
    setSelectedValue(value);
  };

  const handleReset = () => {
    dispatch({
      type: ActionsSearch.SEARCH_PROCESS,
      data: { searchValue: "", status: "all", isReset: true },
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: "5px",
      }}
    >
      <Select
        // showArrow={false}
        defaultValue="all"
        style={{
          width: 100,
          borderRadius: "10px",
        }}
        dropdownMatchSelectWidth={true}
        placement="bottomLeft"
        options={[
          {
            value: "all",
            label: "Tất cả",
          },
          {
            value: "post",
            label: "Ghi Sổ",
          },
          {
            value: "unpost",
            label: "Chưa ghi sổ",
          },
          {
            value: "cancel",
            label: "Hủy chứng từ",
          },
        ]}
        onChange={handleSelect}
      />
      <Form
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "5px",
        }}
        form={form}
        onFinish={submitSearch}
      >
        <Form.Item
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            margin: 0,
          }}
          name="searchValue"
        >
          <Input style={{ width: 200 }} />
        </Form.Item>
        <Button
          htmlType="reset"
          onClick={handleReset}
          icon={<UndoOutlined />}
        ></Button>
        <Button
          htmlType="submit"
          type="primary"
          icon={<SearchOutlined />}
        ></Button>
      </Form>
    </div>
  );
};

export default SearchBox;
