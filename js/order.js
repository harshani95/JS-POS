const database = firebase.firestore();

const loadCustomerData = () => {
    const CustomerData = document.getElementById("nic");
    let nic = CustomerData.value;
    database.collection("customer")
    .where("nic", "==", nic)
    .get()
    .then((response) => {
        response.forEach((dataOption) => {
            if(dataOption.data()){
                document.getElementById("nic").value = dataOption.data().nic;
                document.getElementById("name").value = dataOption.data().name;
                document.getElementById("address").value = dataOption.data().address;
                document.getElementById("phone").value = dataOption.data().phone;
            }
        });
    }).catch((error) => {
        console.log(error);
    });
}

const CustomerData = document.getElementById("nic");
CustomerData.addEventListener("keypress", (event) => {
    if(event.key === "Enter"){
        loadCustomerData();
}
});


const loadItemData = () => {
    const ItemData = document.getElementById("description");
    let description = ItemData.value;
    database.collection("item")
    .where("description", "==", description)
    .get()
    .then((response) => {
        response.forEach((dataOption) => {
            if(dataOption.data()){
                document.getElementById("description").value = dataOption.data().description;
                document.getElementById("unitPrice").value = dataOption.data().unitPrice;
                document.getElementById("qtyOnHand").value = dataOption.data().qtyOnHand;
            }
        });
    }).catch((error) => {
        console.log(error);
    });
}

const ItemData = document.getElementById("description");
ItemData.addEventListener("keypress", (event) => {
    if(event.key === "Enter"){
        loadItemData();
}
});