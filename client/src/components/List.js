import "../styles/List.css";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";
//import { getCards } from "../services/taskServices";
import Card from "./Card";
import CardEditor from "./CardEditor";
import ListEditor from "./ListEditor";
import shortid from "shortid";
import axios from "axios";
const List = ({ list, index, dispatch, listId }) => {
  // state = {
  //   editingTitle: false,
  //   title: props.list.title,
  //   addingCard: false,

  // };

  const [editingTitle, setEditingTitle] = useState(false);
  const [title, setTitle] = useState("");
  const [addingCard, setAddingCard] = useState(false);

  const toggleAddingCard = () => {
    setAddingCard((prev) => !prev);
  };

  const addCard = async cardText => {
    toggleAddingCard();
    const cardId = shortid.generate();
    dispatch({
      type: "ADD_CARD",
      payload: { cardText, cardId, listId },
    });
  };

  const toggleEditingTitle = () => setEditingTitle((prev) => !prev);

  const handleChangeTitle = (e) => setTitle(e.target.value);

  const editListTitle = async () => {
    toggleEditingTitle();
    dispatch({
      type: "CHANGE_LIST_TITLE",
      payload: { listId, listTitle: title },
    });
  };

  const deleteList = async () => {
    console.log(listId)
    dispatch({
      type: "DELETE_LIST",
      payload: { listId, cards: list.cards },
    });
  };

  // useEffect(() => {
  //   axios.get("http://localhost:3001/cards")
  //     .then((res) => {
  //       console.log(res.data);
  //       setCards(res.data);
  //     })
  //     .catch((error) => console.log(error));
  // }, [cards]);

  //   const handleAdd = async () => {
  //     //const {cards} = list.cards;

  // await addCard(cardText)
  //       .then((res) => {
  //         setState({card: state.card})
  //       })
  //       .catch((error) => console.log(error));
  //   }

  return (
    <Draggable draggableId={list._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="List"
        >
          {editingTitle ? (
            <ListEditor
              list={list}
              title={title}
              handleChangeTitle={handleChangeTitle}
              saveList={editListTitle}
              onClickOutside={editListTitle}
              deleteList={deleteList}
            />
          ) : (
            <div className="flex">
              <div className="List-Title" onClick={toggleEditingTitle}>
                {list.title}
              </div>
              <div>
                <svg
                  className="dots-color"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 14a2 2 0 1 0 0-4a2 2 0 0 0 0 4zm-6 0a2 2 0 1 0 0-4a2 2 0 0 0 0 4zm12 0a2 2 0 1 0 0-4a2 2 0 0 0 0 4z"
                  ></path>
                </svg>
              </div>
            </div>
          )}

          <Droppable droppableId={list._id}>
            {(provided, _snapshot) => (
              <div ref={provided.innerRef} className="Lists-Cards">
                {list.cards.length ?
                  list.cards.map((cardId, index) => (
                    <Card
                      key={cardId}
                      cardId={cardId}
                      index={index}
                      listId={list._id}
                    />
                  )) : null}

                {provided.placeholder}

                {addingCard ? (
                  <CardEditor
                    onSave={addCard}
                    onCancel={toggleAddingCard}
                    adding
                  />
                ) : (
                  <div className="flex">
                    <div className="Toggle-Add-Card" onClick={toggleAddingCard}>
                      <ion-icon name="add" /> Add a card
                    </div>
                    <div className="Add-Card-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M5 2h16v12h-2V4H5v16h8v2H3V2h2zm2 4h10v2H7V6zm10 4H7v2h10v-2zM7 14h7v2H7v-2zm13 5h3v2h-3v3h-2v-3h-3v-2h3v-3h2v3z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

const mapStateToProps = (state, ownProps) => ({
  list: state.listsById[ownProps.listId],
});

export default connect(mapStateToProps)(List);
