//Define Card object with high correlation to the card Object on the server-side
function Card(card) {
    for (var fld in card) {
        this[fld] = card[fld];
    }
}