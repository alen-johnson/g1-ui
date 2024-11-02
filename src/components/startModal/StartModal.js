import { useNavigate } from "react-router-dom";
import "./StartModal.css";
import React, { useState } from "react";
import { Button, Input, Select, Space, Spin, Form } from "antd";
import { CloseCircleOutlined, SyncOutlined } from "@ant-design/icons";

const StartModal = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [numberInput, setNumberInput] = useState(0);
  const [playerNames, setPlayerNames] = useState([]);
  const [category, setCategory] = useState("All");

  const handlePlay = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/gamerun", {
        state: {
          num: numberInput,
          participants: playerNames,
          category: category,
        },
      }); // passing no. of players to gameRun
    }, 2000);
  };

  const handleNumberChange = (value) => {
    setNumberInput(value);
    // Set player names to default values when the number changes
    setPlayerNames(
      Array.from({ length: value }, (_, index) => `Player ${index + 1}`)
    );
  };

  /* Used to update player names from user */
  const handlePlayerNameChange = (index, event) => {
    const updatedNames = [...playerNames];
    const newName = event.target.value;

    // Update the player's name based on user input
    updatedNames[index] = newName;
    setPlayerNames(updatedNames);
  };
  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const categories = [
    "All",
    "Sports & Athletes",
    "World Leaders",
    "Household",
    "Celebrities",
    "Fiction",
  ];

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <Form layout="vertical">
        <Form.Item label="Select Number of Players">
          <Select
            allowClear
            placeholder="Choose number of players"
            onChange={handleNumberChange}
            style={{ width: "100%" }}
          >
            {[4, 5, 6].map((num) => (
              <Select.Option key={num} value={num}>
                {num}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Player Names">
          <Space direction="vertical" style={{ width: "100%" }}>
            {Array.from({ length: numberInput }, (_, index) => (
              <Input
                key={index}
                allowClear
                placeholder={`Player ${index + 1} Name`}
                value={playerNames[index]}
                onChange={(event) => handlePlayerNameChange(index, event)}
              />
            ))}
          </Space>
        </Form.Item>

        <Form.Item label="Select Category">
          <Select
            allowClear
            placeholder="Choose a category"
            onChange={handleCategoryChange}
            style={{ width: "100%" }}
          >
            {categories.map((category, index) => (
              <Select.Option key={index} value={category}>
                {category}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Spin spinning={loading}>
              <Button type="primary" onClick={handlePlay} style={{ width: "120px" }}>
                Start
              </Button>
            </Spin>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default StartModal;
