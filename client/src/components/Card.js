import "../styles/Card.css";

import React, { useState } from "react";
import { connect } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import CardEditor from "./CardEditor";

const Card = ({dispatch, listId, index, card, cardId}) => {
  // state = {
  //   editing: false,
  // };

const [editing, setEditing] = useState(false);

  const startEditing = () =>
   setEditing(true);

  const endEditing = () => setEditing(false);

  const editCard = async text => {
endEditing();

    dispatch({
      type: "CHANGE_CARD_TEXT",
      payload: { cardId: card?._id, cardText: text }
    });
  };

  const deleteCard = async () => {

      dispatch({
        type: "DELETE_CARD",
        payload: { cardId: card?._id, listId }
      });
  };

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
