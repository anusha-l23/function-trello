import "../styles/Card.css";

import React, { useState } from "react";
import { connect } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import CardEditor from "./CardEditor";
import axios from "axios";

const Card = ({dispatch, listId, index, card, cardId}) => {
  // state = {
  //   editing: false,
  // };

const [editing, setEditing] = useState(false);

  const startEditing = () =>
   setEditing(true);

  const endEditing = () => setEditing(false);

//   const editCard = async text => {
// endEditing();
//     dispatch({
//       type: "CHANGE_CARD_TEXT",
//       payload: { cardId: card?._id, cardText: text }
//     });
//   };


const editCard = async card => {
  console.log(cardId, "put")
  axios.put(`http://localhost:3001/cards/${cardId._id}`, {
    card
  })
    .then((res) => {
   console.log(res, "update card api");
   //setCard({card: ""});
    })
    .catch((error) => console.log(error));
}

  // const deleteCard = async () => {

  //     dispatch({
  //       type: "DELETE_CARD",
  //       payload: { cardId: card?._id, listId }
  //     });
  // };

  const deleteCard = async card => {
    console.log(cardId, "delete")
    axios.delete(`http://localhost:3001/cards/${cardId._id}`, {
      card
    })
      .then((res) => {
     console.log(res, "deleted card api");
     //setCard({card: ""});
      })
      .catch((error) => console.log(error));
  }

    if (!editing && cardId) {
      return (
        <Draggable draggableId={cardId?._id} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="Card"
              // onMouseEnter={this.startHover}
              // onMouseLeave={this.endHover}
            >
                <div className="Card-Icons">
                  <div className="Card-Icon" onClick={startEditing}>
                    <ion-icon name="create" />
                  </div>
                </div>
{cardId.card}
            </div>
          )}
        </Draggable>
      );
    } else {
      return (
        <CardEditor
          text={cardId?.text}
          onSave={editCard}
          onDelete={deleteCard}
          onCancel={endEditing}
        />
      );
    }
  }


const mapStateToProps = (state, ownProps) => ({
  card: state.cardsById[ownProps.cardId]
});

export default connect(mapStateToProps)(Card);
