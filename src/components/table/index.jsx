import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Space, Table, Button, Typography, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserById } from "../reducer/reducer";
import { getAll } from "../reducer/selection";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import { green, orange, red } from "@ant-design/colors";
import Highlighter from "react-highlight-words";

import Delete from "../../components/delete/delete";
import Details from "../../components/detail/index";

const { Text } = Typography;

function Tables() {
  const getAllData = useSelector(getAll);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserById());
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 50,
              background: green[6],
              color: "white",
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            style={{
              width: 50,
              background: orange[6],
              color: "white",
            }}
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            style={{
              width: 50,
              background: red[6],
              color: "white",
            }}
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "FirstName",
      dataIndex: "firstName",
      key: "firstName",
      width: "30%",
      ...getColumnSearchProps("firstName"),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "30%",
      ...getColumnSearchProps("address"),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: "30%",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "IsGraduate",
      dataIndex: "isGraduate",
      key: "isGraduate",
      render: (record) => (
        <p>
          {record ? (
            <Text type="success">Graduated</Text>
          ) : (
            <Text type="danger">Not Graduated</Text>
          )}
        </p>
      ),
    },
    {
      dataIndex: "id",
      key: "id",
      render: (record) => (
        <Space size="middle">
          <Link to={`edit/${record}`}>
            <Button>
              <EditOutlined />
            </Button>
          </Link>
          <Delete id={record} />
          <Details id={record} />
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={getAllData}
      rowKey={(getAllData) => getAllData.id}
    />
  );
}

export default Tables;
