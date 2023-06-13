import "../styles/CardEditor.css";

import React, { useState } from "react";
import EditButtons from "./EditButtons";

const CardEditor = ({ onSave, onCancel, onDelete, adding }) => {
  // state = {
  //   text: this.props.text || ""
  // };
  const [text, setText] = useState("");

  const handleChangeText = (event) => setText(event.target.value);

  const onEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      onSave(text);
    }
  };

  return (
    <div className="Edit-Card">
      <div className="Card">
        <input
          autoFocus
          className="Edit-Card-Textarea"
          placeholder="Enter the text for this card..."
          value={text}
          onChange={handleChangeText}
          onKeyDown={onEnter}
        />
      </div>
      <EditButtons
        handleSave={() => onSave(text)}
        saveLabel={adding ? "Add card" : "Save"}
        handleDelete={onDelete}
        handleCancel={onCancel}
      />
    </div>
  );
};

export default CardEditor;
