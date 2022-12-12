import React from "react";
import { Modal, Button, Descriptions, Typography } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import moment from "moment";

import axiosUser from "../../api/axiosUser";

function Detail({ id }) {
  const { Text } = Typography;
  const info = async () => {
    try {
      const fetchUser = await axiosUser.getFirst(id);
      Modal.info({
        title: "Detail",
        content: (
          <Descriptions>
            <Descriptions.Item label="FirstName">
              {fetchUser.data.firstName}
            </Descriptions.Item>
            <Descriptions.Item label="LastName">
              {fetchUser.data.lastName}
            </Descriptions.Item>
            <Descriptions.Item label="Gender">
              {fetchUser.data.gender}
            </Descriptions.Item>
            <Descriptions.Item label="Phone">
              {fetchUser.data.phone}
            </Descriptions.Item>
            <Descriptions.Item label="Graduate">
              {fetchUser.data.isGraduate ? (
                <Text type="success">Graduated</Text>
              ) : (
                <Text type="danger">Not Graduated</Text>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Date Of Birth">
              {moment.unix(fetchUser.data.dateOfBirth).format("DD-MM-yyyy")}
            </Descriptions.Item>
            <Descriptions.Item label="School">
              {fetchUser.data.school}
            </Descriptions.Item>
            <Descriptions.Item label="Address">
              {fetchUser.data.address}
            </Descriptions.Item>
          </Descriptions>
        ),
        onOk() {},
        width: 1000,
      });
    } catch (error) {
      console.log("Failed to false users", error);
    }
  };
  return (
    <div>
      <Button type="primary" onClick={info}>
        <InfoCircleOutlined />
      </Button>
    </div>
  );
}

export default Detail;
