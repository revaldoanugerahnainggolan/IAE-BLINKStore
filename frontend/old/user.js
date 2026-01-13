async function addUser() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;

  const query = `
    mutation {
      addUser(name: "${name}", email: "${email}", phone: "${phone}", address: "${address}") {
        id
        name
      }
    }
  `;

  const response = await fetch("http://localhost:4001/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
  });

  const data = await response.json();

  document.getElementById("result").innerText =
    "User berhasil dibuat: " + data.data.addUser.name;
}
