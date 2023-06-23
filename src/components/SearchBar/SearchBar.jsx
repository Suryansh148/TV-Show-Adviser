import { useState } from "react";
import s from "./style.module.css";
import {Search as SearchIcon} from "react-bootstrap-icons";

export function SearchBar({onSubmit}){
    const [value, setvalue]=useState("");
    function submit(e){
        if(e.key==="Enter"&&e.target.value!="")
        {
            onSubmit(e.target.value);
            setvalue("");
        }
    }
    function handleChange(e){
        setvalue(e.target.value);
    }
    return (
        <>
            <SearchIcon size={27} className={s.icon} />
            <input 
                onChange={handleChange}
                onKeyUp={submit}
                className={s.input}
                type="text"
                value={value}
                placeholder={"Search a tv show you may like"}
            />
        </>
    )
}