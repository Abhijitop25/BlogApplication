import React, { useEffect, useState } from 'react'
import "../index.css"
const InputField = ({name, type, placeholder,img , value}) => {
    const [changeIcon, setChangeIcon] = useState(true);

    
        const handleChange = () => {
            setChangeIcon((prev) => (!prev));
        }
    
  return (
    <div className="relative w-[100%] mb-4">
        <input 
            name = {name}
            type={changeIcon && name === "password"? "password" : "text"}
            placeholder = {placeholder}
            defaultValue={value}
            className='input-box '
        />
        <i className={"fi " + img + "  input-icon"}></i>

        {
            type == "password" ? changeIcon? <i onClick={handleChange} className="fi fi-rr-eye-crossed absolute top-[25%] right-[8%] text-lg"></i>:<i onClick={handleChange} className="fi fi-rs-eye absolute top-[25%] right-[8%] text-lg"></i>:""
            
        }
    </div>
  )
}

export default InputField