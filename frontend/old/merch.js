async function addMerch() {
  const name = document.getElementById("name").value;
  const category = document.getElementById("category").value;
  const price = document.getElementById("price").value;
  const stock = document.getElementById("stock").value;

  const query = `
    mutation {
      addMerchandise(
        name: "${name}",
        category: "${category}",
        price: ${price},
        stock: ${stock}
      ) {
        id
        name
      }
    }
  `;

  const res = await fetch("http://localhost:4002/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
  });

  const data = await res.json();
  alert("Merchandise berhasil ditambahkan!");
}
