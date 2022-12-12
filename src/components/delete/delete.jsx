import React, { useState } from "react";
import { Modal, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import axiosUser from "../../api/axiosUser";

function Delete({ id }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    try {
      axiosUser.deleteFirst(id);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log("Failed to:" + error.message);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        <DeleteOutlined />
      </Button>
      <Modal
        title="Delete"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        Click ok to confirm deletion
      </Modal>
    </div>
  );
}

export default Delete;
