import React from "react"
import {Slider} from "@material-ui/core"

interface Props{
   name?: string,
   defaultValue?: number | number[]
   step?: number | null,
   onChange?: () => void
}

export const ContainedSlider = ({defaultValue, step, onChange, name} : Props) : React.ReactElement => {
   return(
      <div>
         <Slider style={{width: '50%'}} defaultValue={defaultValue} step={step} onChange={onChange} name={name} /> 
      </div>
   )
}