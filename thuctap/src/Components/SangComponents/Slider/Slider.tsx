import React from "react";
import { Slider as SliderComponent } from "@material-ui/core";
interface SliderProps {
    disabled?: boolean;
    defaultValue?: number | number[];
    onChange?: (event: any, newValue: number | number[])=>void;
    min?: number;
    max?: number;
    step?: number | null ;
    valueLabelDisplay?: "on" | "off" | "auto";
    getAriaValueText?: ((value: number, index: number) => string);
    marks?:any;
    
}
const Slider: React.FC <SliderProps>=(props)=>{
    return (
        <SliderComponent
            disabled={props.disabled}
            defaultValue={props.defaultValue}
            onChange={props.onChange}
            step={props.step}
            valueLabelDisplay={props.valueLabelDisplay}
            getAriaValueText={props.getAriaValueText}
            max={props.max}
            min={props.min}
            marks={props.marks}
            
        />
    )
}
export default Slider