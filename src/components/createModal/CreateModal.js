import { CloseCircleOutlined } from "@ant-design/icons";
import "./CreateModal.css";
import { Button, Form, Select } from "antd";
import React from "react";
import { generateCode } from "../../helpers/generateCode";

const CreateModal = ({ isOpen, closeModal }) => {
  let code = generateCode();
  return (
    <div>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-close_btn">
              <CloseCircleOutlined onClick={closeModal} />
            </div>
            <div className="modal-div">
              <div className="modal-div_left">
                <p>Room Code : {code}</p>
                <p>Players In Room</p>
                <ol>
                  <li>sdad</li>
                  <li>sdaa</li>
                  <li>sdaa</li>

                  <li>sdaa</li>
                  <li>sdaa</li>
                  <li>sdaa</li>
                </ol>
              </div>
              <div className="modal-div_right">
                <Form>
                  <Form.Item label="Imposters">
                    {/*need to add function where it checks number of players and then only allow to select number of imposters*/}
                    <Select allowClear>
                      {[1, 2].map((num) => (
                        <Select.Option key={num} value={num}></Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item label="Time Limit">
                    <Select disabled></Select>
                  </Form.Item>
                </Form>
              </div>
            </div>
            <div className="modal-button">
              <Button style={{ width: "20%" }}>Start</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateModal;
