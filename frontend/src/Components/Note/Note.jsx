import React ,{useState,useEffect,useRef } from "react";
import { BiBellPlus } from "react-icons/bi";
import { IoColorPaletteOutline } from "react-icons/io5";
import { MdDelete, MdTaskAlt } from "react-icons/md";
import {FaDropletSlash} from 'react-icons/fa6';
import { IoMdDoneAll } from "react-icons/io";
import Reminder from "../Reminder/Reminder";
import "./Note.css";

function Card(props) {

  const [isColorClicked, setColorClicked] = useState(false);
  const [color,setColor] = useState(props.color);
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteClick = async () => {
    try {
      const response = await fetch("http://localhost:8000/delete-note", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: props.id
        }),
      });

      if (response.ok) {
        props.updateNotes();
        console.log("Note deleted successfully");
      } else {
        console.error("Failed to delete note");
      }
    } catch (error) {
      console.error("Error", error);
  }
}

  const handleColorClicked = () => {
    if(isColorClicked)
    {
      setColorClicked(false);
    }
    else
    {
      setColorClicked(true);
    }
  }

  const handleColorChoosed = async (e) => {
    const style = window.getComputedStyle(e.target);
    const backgroundColor = style.backgroundColor;
    setColor(backgroundColor);
    try {
      const response = await fetch("http://localhost:8000/update-note-color", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          color: backgroundColor,
          id: props.id
        }),
      });

      if (response.ok) {
        console.log("Color updated successfully");
      } else {
        console.error("Failed to update color of note");
      }
    } catch (error) {
      console.error("Error", error);
    }
  }
  
  const divEl = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (!divEl.current) {
        return;
      }

      if (!divEl.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handler, true);

    return () => {
      document.removeEventListener('click', handler);
    };
  }, []);

  

  return (
  
    <div className="note" style={{backgroundColor:color}}>
      <span className="note-tick">
        <MdTaskAlt size={26} />
      </span>
      <div className="note-text">
        <h2>{props.title}</h2>
        <div className="note-inner-text">
          <p>{props.note}</p>
        </div>
      </div>
      <div className="note-handle">
        <li onClick={()=>{setIsOpen(!isOpen)}}>
          <BiBellPlus />
        </li>
        <li 
        className="add-note-bar-icons-color"
        onClick={handleColorClicked}
        >
          <IoColorPaletteOutline />
          <div 
          className='add-note-bar-icons-color-chooser'
          style={{display:isColorClicked? 'flex':'none'}}>
              <ul>
                <li 
                className='add-note-bar-icons-color-chooser-white'
                onClick={handleColorChoosed}
                >
                <FaDropletSlash />
                </li>
                <li 
                className='add-note-bar-icons-color-chooser-red'
                onClick={handleColorChoosed}
                ></li>
                <li className='add-note-bar-icons-color-chooser-blue'
                onClick={handleColorChoosed}
                ></li>
                <li className='add-note-bar-icons-color-chooser-cyan'
                onClick={handleColorChoosed}
                ></li>
                <li className='add-note-bar-icons-color-chooser-yellow'
                onClick={handleColorChoosed}
                ></li>
                <li className='add-note-bar-icons-color-chooser-custom'
                onClick={handleColorChoosed}
                ></li>
              </ul>
          </div>
        </li>
        <li
          onClick={handleDeleteClick}
        >
          <MdDelete />
        </li>
        <li>
          <IoMdDoneAll />
        </li>
        <li>
          <IoMdDoneAll />
        </li>
      </div>
      <div ref={divEl} >
      {isOpen && (<Reminder />)}
      </div>
    </div>

    
    
  );
}

export default Card;
