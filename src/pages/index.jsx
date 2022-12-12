import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";

import Tables from "../components/table/index";
import Create from "../components/create/index";
import Headers from "../components/header/header";
import Edits from "../components/edit/index";

function Pages() {
  const { Content } = Layout;
  return (
    <Layout>
      <Headers />
      <Content>
        <Routes>
          <Route path="/" element={<Tables />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edits />} />
        </Routes>
      </Content>
    </Layout>
  );
}

export default Pages;
