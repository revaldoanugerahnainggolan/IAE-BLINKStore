const result = document.getElementById("result");

// =========================
// TAMBAH USER
// =========================
function addUser() {
  const name = document.getElementById("userName").value;
  const email = document.getElementById("userEmail").value;
  const phone = document.getElementById("userPhone").value;
  const address = document.getElementById("userAddress").value;

  fetch("http://localhost:4001/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        mutation {
          addUser(
            name: "${name}"
            email: "${email}"
            phone: "${phone}"
            address: "${address}"
          ) {
            id
            name
            email
          }
        }
      `
    })
  })
  .then(res => res.json())
  .then(data => result.textContent = JSON.stringify(data, null, 2));
}

// =========================
// TAMBAH MERCHANDISE
// =========================
function addMerch() {
  const name = document.getElementById("merchName").value;
  const category = document.getElementById("merchCategory").value;
  const price = document.getElementById("merchPrice").value;
  const stock = document.getElementById("merchStock").value;

  fetch("http://localhost:4002/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        mutation {
          addMerchandise(
            name: "${name}"
            category: "${category}"
            price: ${price}
            stock: ${stock}
          ) {
            id
            name
            price
          }
        }
      `
    })
  })
  .then(res => res.json())
  .then(data => result.textContent = JSON.stringify(data, null, 2));
}

// =========================
// BUAT ORDER
// =========================
function createOrder() {
  const user = document.getElementById("orderUser").value;
  const merch = document.getElementById("orderMerch").value;
  const qty = document.getElementById("orderQty").value;

  fetch("http://localhost:4003/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        mutation {
          createOrder(
            userId: "${user}"
            merchandiseId: "${merch}"
            quantity: ${qty}
            price: 150000
          ) {
            id
            totalPrice
            orderStatus
          }
        }
      `
    })
  })
  .then(res => res.json())
  .then(data => result.textContent = JSON.stringify(data, null, 2));
}
