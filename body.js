import React, { useState } from "react";
//import PositionCarouselDemo from "./carousel";
import { Image, Input, Row, Col, Avatar, Popover } from "antd";
import ReactionBar from "./reactionBar";

import {
  HeartOutlined,
  ThunderboltOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  CarryOutOutlined,
  CommentOutlined,
  MailOutlined,
  SmallDashOutlined,
  AppstoreAddOutlined,
  HeartFilled,
} from "@ant-design/icons";
import "antd/dist/antd.css";

const Body = (props) => {
  const [input, setInput] = useState("");
  let [comments, setComments] = useState(props.data);
  let [length, setLength] = useState(props.data.length);
  let [idEdit, setIdEdit] = useState(0);
  let [isEdit, setIsEdit] = useState(false);
  let [isLiked, setIsLiked] = useState(false);
  let [likes, setLike] = useState(0);
  var Store = () => {
    localStorage.setItem("dataSave", JSON.stringify(comments));
  };
  let check = () => {
    for (let user of comments) {
      if (user.cmt === input) {
        return false;
      }
    }
    Store();
    return true;
  };

  let onDelete = (user) => {
    comments = comments.filter((tm) => tm.id !== user.id);
    console.log(comments);
    setComments([...comments]);
  };

  let onEdit = (user) => {
    if (user.user === "huong giang idol") {
      let tmp = comments.find((tm) => tm.id === user.id);
      onDelete(user);
      setInput(tmp.cmt);
      //setComments([...data]);
      //Store();
      setIdEdit(user.id);
      setIsEdit(true);
    }
  };

  let onPressEnter = () => {
    if (input.trim().length && check()) {
      if (isEdit) {
        comments.push({
          id: idEdit,
          user: "huong giang idol",
          cmt: input,
          edited: 1,
        });
        setIsEdit(false);
      } else {
        comments.push({
          id: length + 1,
          user: "huong giang idol",
          cmt: input,
          edited: 0,
        });
        setLength(length + 1);
      }
      comments.sort((a, b) => (a.id > b.id ? 1 : -1));
      console.log(comments);
      setInput("");
      setComments([...comments]);
      Store();
    }
  };

  const content = (e) => {
    return (
      <span>
        <DeleteOutlined onClick={() => onDelete(e)} style={{ color: "red" }} />
        <EditOutlined onClick={() => onEdit(e)} style={{ color: "green" }} />
      </span>
    );
  };

  const renderOption = (e) => {
    if (e.user === "huong giang idol") {
      if (e.edited === 1) {
        return (
          <span style={{ marginLeft: "5px" }}>
            <CarryOutOutlined />
            <Popover content={() => content(e)}>
              <MoreOutlined />
            </Popover>
          </span>
        );
      }
      return (
        <Popover content={() => content(e)}>
          <MoreOutlined />
        </Popover>
      );
    }
  };
  let changeStatus = () => {
    setIsLiked(!isLiked);
    console.log(isLiked);
    if (isLiked === true) {
      return (
        <span>
          <HeartFilled style={{ fontSize: "40px", color: "red" }} />
        </span>
      );
    }
  };

  return (
    <div style={{ paddingTop: "20px" }}>
      <Image width="100%" height={500} src={props.bodyImage} />
      <Row style={{ paddingTop: "20px", textAlign: "center" }}>
        <Col span={8}>
          <Row>
            <Col span={8}>
              <HeartOutlined
                onClick={() => changeStatus()}
                style={{ fontSize: "30px", color: isLiked?"white":"red" }}

              />
            </Col>
            <Col span={8}>
              <CommentOutlined style={{ fontSize: "30px", color: "white" }} />{" "}
            </Col>
            <Col span={8}>
              <MailOutlined style={{ fontSize: "30px", color: "white" }} />
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <SmallDashOutlined style={{ fontSize: "30px", color: "white" }} />
        </Col>
        <Col span={8} offset={0}>
          <AppstoreAddOutlined
            style={{ fontSize: "30px", color: "white", paddingLeft: "65px" }}
          />
        </Col>
      </Row>
      <p
        style={{
          paddingTop: "5px",
          paddingLeft: "15px",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        10000 lượt thích
      </p>
      <div>
        {comments.map((e) => {
          return (
            <p key={e.id}>
              <span style={{ fontWeight: "bold" }}>{e.user}</span>: {e.cmt}
              <span>{renderOption(e)}</span>
            </p>
          );
        })}
      </div>
      <div style={{ paddingTop: "20px", textAlign: "center" }}>
        <Row align="middle" justify="center">
          <Col span={2}>
            <Avatar size={35} src={props.ava} />
          </Col>
          <Col span={16}>
            <Input
              style={{ background: "black", color: "white" }}
              placeholder={"Them binh luan..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onPressEnter={onPressEnter}
            />
          </Col>
          <Col span={2}>
            <HeartOutlined style={{ fontSize: "16px", color: "#08c" }} />
          </Col>
          <Col span={2}>
            <ThunderboltOutlined style={{ fontSize: "16px", color: "#08c" }} />
          </Col>
          <Col span={2}>
            <PlusCircleOutlined style={{ fontSize: "16px", color: "#08c" }} />
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default Body;
