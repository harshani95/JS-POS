let selectedCustomer = null;
let selectedItem = null;
let cart = [];

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
                selectedCustomer = dataOption.data();
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
    selectedItem = null;
    const ItemData = document.getElementById("description");
    let description = ItemData.value;
    database.collection("item")
    .where("description", "==", description)
    .get()
    .then((response) => {
        response.forEach((dataOption) => {
            if(dataOption.data()){
                selectedItem = dataOption.data();
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

const addToCart = () => {
    let qty = parseInt(document.getElementById("qty").value);
    let unitPrice = document.getElementById("unitPrice").value;
    let total = qty * unitPrice;

    cart.push({
        item : selectedItem,
        qty : qty,
        total : total
    });

    let tBody = $('tBody');
    tBody.empty();
    let rowData = '';
    cart.forEach((data) => {
        rowData += `<tr>
                        <td>${data.item.description}</td>
                        <td>${data.item.unitPrice}</td>
                        <td>${data.qty}</td>
                        <td>${data.total}</td>
                    </tr>`;
                    tBody.html(rowData);
    })
}

const placeOrder = () => {
    //items not defined
    if(!selectedCustomer && !items){
        alert("Please select a customer and add items to the cart");
        return;
    }

    let data = {
        items: [],
        customer: null,
        date: new Date().toISOString().split("T")[0],
        total: 0
    }

    cart.forEach((item) => {
        data.items.push(item);
        data.total += item.total;
    });
    data.customer = selectedCustomer;

    database.collection("order").add(data)
      .then(result=> {
        alert("Order placed successfully");
          console.log(result);   
      })
      .catch(error=> {
          console.log(error);
      })
}

    
