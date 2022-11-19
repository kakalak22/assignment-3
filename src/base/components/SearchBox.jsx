import { Input, Space } from "antd";
import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../actionTypesSearch";
const { Search } = Input;

const SearchBox = ({ size, isSeclect, searchField }) => {
  const dispatch = useDispatch();
  const [searchVal, setSearchVal] = useState("");
  const [selectedValue, setSelectedValue] = useState("ten");
  const [isSearched, setIsSearched] = useState(false);

  const { danhSachSanPham } = useSelector((state) => state.reducerSanPham);

  const onSelect = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    const newSearch = [];
    dispatch({
      type: Actions.SEARCH_SAVE_RESULT,
      data: {
        searchResults: newSearch,
      },
    });
  }, []);

  useEffect(() => {
    if (isSearched) {
      dispatch({
        type: Actions.SEARCH_PROCESS,
        data: {
          searchValue: searchVal,
          ttype: selectedValue,
          searchField: searchField,
          isRecall: true,
        },
      });
    }
  }, [danhSachSanPham]);

  const onSearch = (value) => {
    setIsSearched(true);
    setSearchVal(value);
    dispatch({
      type: Actions.SEARCH_PROCESS,
      data: {
        searchValue: value,
        ttype: selectedValue,
        searchField: searchField,
        isRecall: false,
      },
    });
  };

  return (
    <Space.Compact size={size} direction="horizontal">
      {isSeclect ? (
        <Select
          showArrow={false}
          defaultValue="ten"
          style={{
            width: 220,
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
          onChange={onSelect}
        />
      ) : null}
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="middle"
        onSearch={onSearch}
      />
    </Space.Compact>
  );
};
export default SearchBox;
