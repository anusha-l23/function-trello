import "../styles/ListEditor.css";

import React from "react";

const ListEditor = ({title, handleChangeTitle, deleteList, saveList}) => {
  const ref = React.createRef();

  const onEnter = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      saveList();
    }
  };


    return (
      <div className="List-Title-Edit" ref={ref}>
        <input
          autoFocus
          className="List-Title-Textarea"
          placeholder="Enter list title..."
          value={title}
          onChange={handleChangeTitle}
          onKeyDown={onEnter}
          style={{ width: deleteList ? 220 : 245 }}
        />
        {deleteList && <ion-icon name="trash" onClick={deleteList} />}
      </div>
    );
  }


export default ListEditor;
