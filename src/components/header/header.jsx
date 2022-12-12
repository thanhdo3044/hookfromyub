import React from "react";
import { Link } from "react-router-dom";

import { Menu } from "antd";
const items = [
  {
    label: <Link to="/">Tables Users</Link>,
    key: "tables",
  },
  {
    label: <Link to="/create">Create Users</Link>,
    key: "create",
  },
];
const Headers = () => {
  return <Menu mode="horizontal" items={items} />;
};
export default Headers;
