import axios from "axios";

export function getCards() {
    return axios.get("http://localhost:3001/cards");
}

export function addCard(card) {
    return axios.post("http://localhost:3001/cards/add", card);
}

export function updateCard(id, card) {
    return axios.put(`http://localhost:3001/cards/${id}`, card);
}
export function deleteCard(id) {
    return axios.delete(`http://localhost:3001/cards/${id}`);
}