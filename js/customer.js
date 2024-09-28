const database = firebase.firestore();

function createCustomer(nic, name, address, phone) {
    database.collection("customers").add({
      nic: nic,
      name: name,
      address: address,
      phone: phone
    } )
    .then(result=> {
        console.log(result);   
    })
    .catch(error=> {
        console.log(error);
    })
}

const saveCustomer = () => {
    let nic = document.getElementById("nic").value;
    let name = document.getElementById("name").value;
    let address = document.getElementById("address").value;
    let phone = document.getElementById("phone").value;

    createCustomer(nic, name, address,phone);
    alert("Customer Added Successfully");
}