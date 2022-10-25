import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { SketchPicker } from "react-color";
import { BsPaintBucket } from "react-icons/bs";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
const ColorPicker = (props) => {
  const { colorChange, color = "" } = props;
  const [visible, setVisible] = useState(false);
  const [pickerColor, setPickerColor] = useState(color);
  const [boxColor, setBoxColor] = useState(color);
  const [active, setActive] = useState(false);

  const onHandleActive = () => {
    setActive(!active);
  };

  useEffect(() => {
    setBoxColor(color);
    setPickerColor(color);
  }, [color]);

  const onPickerDropdown = () => {
    setVisible(!visible);
  };

  const onColorChange = (value) => {
    const { rgb } = value;
    const rgba = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`;
    setBoxColor(rgba);
    setPickerColor(rgb);
    colorChange(value);
  };

  return (
    <div className="color-picker d-flex color-hover " onClick={onHandleActive}>
      <div className="color-picker-dropdown d-flex">
        <div
          className="text-center d-flex "
          style={{ paddingRight: 5, margin: "auto" }}
        >
          <BsPaintBucket
            size={25}
            className="text-center anticon"
            //   style={{ paddingRight: 5, margin: "auto" }}
          />
        </div>
        <div
          className="color d-flex"
          style={{ backgroundColor: boxColor ? boxColor : "#ffffff" }}
          onClick={onPickerDropdown}
        />{" "}
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
      {visible && (
        <>
          <div className="color-picker-backdrop " onClick={onPickerDropdown} />
          <SketchPicker color={pickerColor} onChange={onColorChange} />
        </>
      )}
    </div>
  );
};

ColorPicker.propTypes = {
  color: PropTypes.string,
  colorChange: PropTypes.func,
};

export default ColorPicker;
