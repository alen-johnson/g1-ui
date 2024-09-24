import { useNavigate } from "react-router-dom";
import "./Modal.css";
import React, { useState } from "react";
import { Button, Select, Space, Spin } from "antd";
import Icon from "@ant-design/icons/lib/components/Icon";
import { CloseCircleOutlined } from "@ant-design/icons";

const Modal = ({ isOpen, closeModal }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [numberInput, setNumberInput] = useState(0)
  const handleplay = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/gamerun", {state:{num:numberInput}});
      closeModal();
    }, 2000);
  };
  const handleNumberChange = (value) => {
    setNumberInput(value)
  }
  const categories = [
    "Athletes",
    "World Leaders",
    "Living Things",
    "Household",
    "Historical Figures",
    "Countries",
    "Celebrities",
    "Movies & Fiction",
  ];
  return (
    <div>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-close_btn">
            <CloseCircleOutlined  

            
            onClick={closeModal} />
    </div>x
            <Space>
              <p>Select Number of players</p>
              <Select allowClear style={{ width: "100%" }}
              onChange={handleNumberChange}>
                <Select.Option value="4">4</Select.Option>
                <Select.Option value="5">5</Select.Option>
                <Select.Option value="6">6</Select.Option>
              </Select>
            </Space>

            {/* <Space> */}
            <p>Select Category</p>
            <Select
              mode="multiple"
              maxTagCount={3}
              allowClear
              placeholder="Category"
              style={{ width: "100%" }}
            >
              {categories.map((category, key) => {
                return (
                  <Select.Option key={key} value={category}>
                    {category}
                  </Select.Option>
                );
              })}
            </Select>
            {/* </Space> */}
            <p>random</p>
            <Spin spinning={loading}>
              <Button onClick={handleplay}>Start</Button>
            </Spin>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
