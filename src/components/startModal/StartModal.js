import { useNavigate } from "react-router-dom";
import "./StartModal.css";
import React, { useState } from "react";
import { Button, Input, Select, Space, Spin } from "antd";
import { CloseCircleOutlined, SyncOutlined } from "@ant-design/icons";

const StartModal = ({ isOpen, closeModal }) => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [numberInput, setNumberInput] = useState(0);
  const [playerNames, setPlayerNames] = useState([]);

  const handleplay = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/gamerun", { state: { num: numberInput, players: playerNames } }); // passing no. of players to gameRun
      closeModal();
    }, 2000);
  };

  const handleNumberChange = (value) => {
    setNumberInput(value);
    // Set player names to default values when the number changes
    setPlayerNames(Array.from({ length: value }, (_, index) => `Player ${index + 1}`));
  };
  
  /* Used to update player names from user */
  const handlePlayerNameChange = (index, event) => {
    const updatedNames = [...playerNames];
    const newName = event.target.value;
  
    // Update the player's name based on user input
    updatedNames[index] = newName;
  
    setPlayerNames(updatedNames);
  };
  

  const categories = [
    "All",
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
              <CloseCircleOutlined onClick={closeModal} />
            </div>
            <Space>
              <p>Select Number of players</p>
              <Select
                allowClear
                style={{ width: "100%" }}
                onChange={handleNumberChange}
              >
                <Select.Option value="4">4</Select.Option>
                <Select.Option value="5">5</Select.Option>
                <Select.Option value="6">6</Select.Option>
              </Select>
            </Space>

            <div>
              {Array.from({ length: numberInput }, (_, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                  <Input
                    allowClear
                    placeholder={`Player ${index + 1} Name`}
                    value={playerNames[index]}
                    onChange={(event) => handlePlayerNameChange(index, event)}
                  />
                </div>
              ))}
            </div>
            {/* <Space> */}
            <p>Select Category</p>
            <Select
              mode="multiple"
              maxTagCount={5}
              allowClear
              placeholder="Category"
              style={{ width: "100%" }}
              // disabled
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
            <p>
            <SyncOutlined spin/>
            </p>
            <Spin spinning={loading}>
              <Button onClick={handleplay}>Start</Button>
            </Spin>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartModal;
