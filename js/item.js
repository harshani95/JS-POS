const database = firebase.firestore();

function createItem(description, unitPrice, qtyOnHand) {
    database.collection("item").add({
        description:description,
        unitPrice:unitPrice,
        qtyOnHand:qtyOnHand
    } )
    .then(result=> {
        console.log(result);   
    })
    .catch(error=> {
        console.log(error);
    })
}

const saveItem = () => {
    let description = document.getElementById("description").value;
    let unitPrice = document.getElementById("unitPrice").value;
    let qtyOnHand = document.getElementById("qtyOnHand").value;

    createItem(description, unitPrice, qtyOnHand);
    alert("Item Added Successfully");
}