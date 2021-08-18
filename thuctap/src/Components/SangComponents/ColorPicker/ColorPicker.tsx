import React from 'react';
import { ColorChangeHandler, SketchPicker } from 'react-color';
interface ColorPickerProps {
	color?: string;
	onChange?: ColorChangeHandler;
}
const ColorPicker: React.FC<ColorPickerProps> = (props) => {
	return <SketchPicker color={props.color} onChange={props.onChange} />;
};
export default ColorPicker;
