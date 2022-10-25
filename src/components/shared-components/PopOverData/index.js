import { React, useState, useEffect } from "react";
import {
  CheckOutlined,
  ColumnHeightOutlined,
  FontSizeOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

import { Popover } from "antd";

const PopOverData = (props) => {
  const { data, setData, type } = props;
  const [selectData, setSelectData] = useState(
    type == "lineHeight" ? data?.line_height : data?.font_size
  );
  console.log(data);
  const [active, setActive] = useState(false);

  const arrayLineHeight = [1, 1.2, 1.3, 1.5, 2];
  const arrayFontSize = ["XS", "S", "M", "L", "XL"];

  const handlePopOverClick = (e) => {
    console.log(e.key);
    setSelectData(e.key);
    let subData = data;
    if (type == "lineHeight") subData.line_height = e.key;
    if (type == "fontSize") subData.font_size = e.key;
    setData(subData);
  };
  const onHandleActive = () => {
    setActive(!active);
  };

  useEffect(() => {
    if (!data?.line_height && type == "lineHeight") setSelectData(1);
    if (!data?.font_size && type == "fontSize") setSelectData("S");
  }, [selectData]);
  const ContentArrayData = () => {
    try {
      return (
        <>
          <Menu>
            <Menu.Item key="1">
              {/* //eslint-disable-next-line */}
              <a href="#">
                <span className="d-flex justify-content-between align-items-center">
                  <div>
                    <span className=" font-weight-normal text-gray">1</span>
                  </div>

                  <CheckOutlined className="text-success" />
                </span>
              </a>
            </Menu.Item>
            <Menu.Item key="2">
              {/* //eslint-disable-next-line */}
              <a href="#/">
                <span className="d-flex justify-content-between align-items-center">
                  <div>
                    <span className=" font-weight-normal text-gray">1</span>
                  </div>

                  <CheckOutlined className="text-success" />
                </span>
              </a>
            </Menu.Item>
          </Menu>
        </>
      );
    } catch (error) {
      console.log(error);
    }
  };
  const ContentLineHeight = () => {
    try {
      return (
        <>
          {arrayLineHeight.map((item, i) => {
            return (
              <Menu key={i} onClick={handlePopOverClick}>
                <Menu.Item
                  key={item}
                  className={
                    selectData == item
                      ? "ant-dropdown-menu-item-active ant-menu-item"
                      : "nav-background-popover"
                  }
                >
                  {/* //eslint-disable-next-line */}
                  <div>
                    <span className="d-flex justify-content-between align-items-center">
                      <div>
                        <span className=" font-weight-normal text-gray">
                          {console.log(item)} {item}
                        </span>
                      </div>
                      {selectData == item ? (
                        <CheckOutlined className="text-success" />
                      ) : null}
                    </span>
                  </div>
                </Menu.Item>
              </Menu>
            );
          })}
        </>
      );
    } catch (error) {
      console.log(error);
    }
  };

  const ContentFontSize = () => {
    try {
      return (
        <>
          {arrayFontSize.map((item, i) => {
            return (
              <Menu key={i} onClick={handlePopOverClick}>
                <Menu.Item
                  key={item}
                  className={
                    selectData == item
                      ? "ant-dropdown-menu-item-active ant-menu-item"
                      : "nav-background-popover"
                  }
                >
                  {/* //eslint-disable-next-line */}
                  <div>
                    <span className="d-flex justify-content-between align-items-center">
                      <div>
                        <span className=" font-weight-normal text-gray">
                          {console.log(item)} {item}
                        </span>
                      </div>
                      {selectData == item ? (
                        <CheckOutlined className="text-success" />
                      ) : null}
                    </span>
                  </div>
                </Menu.Item>
              </Menu>
            );
          })}
        </>
      );
    } catch (error) {
      console.log(error);
    }
  };
  const PopOverMenu = (
    <>
      <div className="nav-popover nav-dropdown">
        <div className="nav-profile-header-n">
          <div>
            <div className="text-center ">
              <span className="">
                {type == "lineHeight" ? <>Line Height </> : <>Font Size</>}
              </span>
            </div>
          </div>
        </div>

        <div className="nav-profile-body">
          <div className="pl-1 padding-setting">
            {type == "lineHeight" ? <ContentLineHeight /> : <ContentFontSize />}
          </div>
        </div>
      </div>
    </>
  );
  return (
    <>
      <div
        className="color-picker d-flex color-hover "
        onClick={onHandleActive}
      >
        <Popover
          placement="bottom"
          content={PopOverMenu}
          trigger="click"
          className="test"
        >
          <div className="color-picker-dropdown d-flex">
            <div
              className="text-center d-flex "
              style={{ paddingRight: 5, margin: "auto", fontSize: "1.2rem" }}
            >
              {type == "lineHeight" ? (
                <ColumnHeightOutlined
                  size={30}
                  className="text-center "
                  style={{ paddingRight: 5, margin: "auto" }}
                />
              ) : (
                <FontSizeOutlined
                  size={30}
                  className="text-center "
                  style={{ paddingRight: 5, margin: "auto" }}
                />
              )}
            </div>
            <div style={{ margin: "auto", fontSize: "1.2rem" }}>
              {selectData}
            </div>
            <div
              className="text-center d-flex "
              style={{ paddingLeft: 5, margin: "auto", fontSize: "1rem" }}
            >
              {active ? (
                <CaretUpOutlined
                  size={30}
                  className="text-center "
                  style={{ paddingRight: 5, margin: "auto" }}
                />
              ) : (
                <CaretDownOutlined
                  size={30}
                  className="text-center "
                  style={{ paddingRight: 5, margin: "auto" }}
                />
              )}
            </div>
          </div>
        </Popover>
      </div>
    </>
  );
};

export default PopOverData;
