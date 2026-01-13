# 🖤💗 BLINKStore – GraphQL Microservices System 💗🖤

**Revaldo A. Nainggolan**  
NIM: 102022330325  

**Alvina Sulistina**  
NIM: 102022300102  

---

BLINKStore adalah aplikasi pemesanan merchandise BLACKPINK berbasis web yang menggunakan arsitektur **microservices** dengan **GraphQL** dan **MySQL**.  
Aplikasi ini memungkinkan pengguna untuk melakukan pemesanan merchandise, memilih bias, serta melihat invoice pesanan secara terintegrasi.

Frontend dibangun menggunakan **HTML, CSS, dan JavaScript (Vanilla)** tanpa framework, sedangkan backend menggunakan **Node.js + GraphQL + MySQL**.

# 📚 Daftar Isi

1. 📌 Tentang Project  
2. 🏗️ Arsitektur Sistem  
3. 👥 Pembagian Tugas  
4. ⚙️ Tech Stack  
5. 🚀 Quick Start  
6. 🌐 API Endpoints  
7. 🧬 Schema GraphQL  
8. 🧪 Testing GraphQL  
9. 📂 Struktur Folder  
10. 👨‍💻 Tim Pengembang  
11. 📌 Kesimpulan  

# 🏗️ Arsitektur Sistem

BLINKStore menggunakan arsitektur **microservices** berbasis **GraphQL**, di mana setiap layanan berjalan secara terpisah namun tetap terhubung melalui API.  
Setiap service memiliki server Node.js, schema GraphQL, serta database MySQL sendiri.

Frontend berkomunikasi langsung dengan masing-masing service melalui endpoint GraphQL.

## 📐 Diagram Arsitektur (ASCII)

┌──────────────────────────────────────────────┐
│ BLINKStore API │
│ (Single Server) │
├───────────────┬───────────────┬─────────────┤
│ User Service │ Merchandise │ Order │
│ /graphql │ Service │ Service │
│ Port 4001 │ /graphql │ /graphql │
│ │ Port 4002 │ Port 4003 │
└───────────────┴───────────────┴─────────────┘
│
▼

Setiap service memiliki tanggung jawab sebagai berikut:
- **User Service**: Mengelola data pengguna  
- **Merchandise Service**: Mengelola produk merchandise  
- **Order Service**: Mengelola data pemesanan  

Dengan arsitektur ini, sistem menjadi lebih **fleksibel, scalable, dan mudah dirawat**.

# 👥 Pembagian Tugas

Pada proyek BLINKStore, setiap service dikerjakan oleh anggota tim sesuai dengan pembagian berikut:

| Service | Penanggung Jawab |
|--------|------------------|
| Merchandise Service | Revaldo |
| User Service | Alvina |
| Order Service | Revaldo & Alvina |

Pembagian tugas ini dilakukan agar setiap anggota dapat fokus pada pengembangan satu layanan utama, sehingga proses pengerjaan menjadi lebih terstruktur dan efisien.

# ⚙️ Tech Stack

BLINKStore dikembangkan menggunakan beberapa teknologi berikut:

| Layer | Teknologi |
|------|-----------|
| Frontend | HTML, CSS, JavaScript (Vanilla) |
| Backend | Node.js |
| API | GraphQL |
| Database | MySQL (XAMPP) |
| Server | Express + Apollo Server |
| Testing | GraphQL Playground |
| Deployment | Docker (Opsional) |

Penggunaan teknologi ini dipilih karena:
- Mudah dipelajari  
- Cocok untuk arsitektur microservices  
- Mendukung komunikasi API yang fleksibel melalui GraphQL  
- Terintegrasi dengan database MySQL secara langsung  

# 🚀 Quick Start

Berikut langkah-langkah untuk menjalankan project BLINKStore di komputer lokal:

1. Jalankan **XAMPP** dan aktifkan:
   - Apache  
   - MySQL  

2. Buat tiga database di phpMyAdmin:
   - `user_db`  
   - `merch_db`  
   - `order_db`  

3. Jalankan masing-masing service menggunakan Node.js:
   - **User Service** → Port `4001`  
   - **Merchandise Service** → Port `4002`  
   - **Order Service** → Port `4003`  

4. Pastikan GraphQL bisa diakses melalui browser:
   - http://localhost:4001/graphql  
   - http://localhost:4002/graphql  
   - http://localhost:4003/graphql  

5. Buka file `frontend/index.html` menggunakan browser.

6. Aplikasi BLINKStore siap digunakan 🎉  

Pastikan semua service backend berjalan dengan normal sebelum mengakses frontend agar proses pemesanan dapat berjalan dengan lancar.

# 🌐 API Endpoints

Setiap service pada BLINKStore memiliki endpoint GraphQL masing-masing yang digunakan oleh frontend untuk berkomunikasi dengan backend.

| Service | Port | Endpoint |
|--------|------|----------|
| User Service | 4001 | http://localhost:4001/graphql |
| Merchandise Service | 4002 | http://localhost:4002/graphql |
| Order Service | 4003 | http://localhost:4003/graphql |

Endpoint ini digunakan untuk melakukan operasi **Query** dan **Mutation** seperti:
- Menambahkan user  
- Mengambil data merchandise  
- Membuat pesanan  
- Mengubah status pesanan  
- Menghapus data  

Semua komunikasi data antara frontend dan database dilakukan melalui endpoint GraphQL ini.

# 🧬 Schema GraphQL

Bagian ini menjelaskan struktur data, query, dan mutation yang digunakan pada setiap service di BLINKStore.

---

## 1️⃣ User Service (Port 4001)

User Service berfungsi untuk mengelola data pengguna seperti nama, email, nomor telepon, dan alamat.

```graphql
type User {
  id: ID!
  name: String!
  email: String!
  phone: String!
  address: String
  createdAt: String
}

type Query {
  getUsers: [User]
  getUserById(id: ID!): User
  getUserByEmail(email: String!): User
}

type Mutation {
  addUser(
    name: String!
    email: String!
    phone: String!
    address: String
  ): User

  updateUser(
    id: ID!
    name: String
    email: String
    phone: String
    address: String
  ): User

  deleteUser(id: ID!): Boolean
}

type Merchandise {
  id: ID!
  name: String!
  category: String!
  price: Int!
  stock: Int!
  description: String
  createdAt: String
}

type Query {
  getMerchandises: [Merchandise]
  getMerchandiseById(id: ID!): Merchandise
  getMerchandisesByCategory(category: String!): [Merchandise]
  getAvailableMerchandises: [Merchandise]
}

type Mutation {
  addMerchandise(
    name: String!
    category: String!
    price: Int!
    stock: Int!
    description: String
  ): Merchandise

  updateMerchandise(
    id: ID!
    name: String
    category: String
    price: Int
    stock: Int
    description: String
  ): Merchandise

  deleteMerchandise(id: ID!): Boolean
}

type Merchandise {
  id: ID!
  name: String!
  category: String!
  price: Int!
  stock: Int!
  description: String
  createdAt: String
}

type Query {
  getMerchandises: [Merchandise]
  getMerchandiseById(id: ID!): Merchandise
  getMerchandisesByCategory(category: String!): [Merchandise]
  getAvailableMerchandises: [Merchandise]
}

type Mutation {
  addMerchandise(
    name: String!
    category: String!
    price: Int!
    stock: Int!
    description: String
  ): Merchandise

  updateMerchandise(
    id: ID!
    name: String
    category: String
    price: Int
    stock: Int
    description: String
  ): Merchandise

  deleteMerchandise(id: ID!): Boolean
}

type Order {
  id: ID!
  userId: ID!
  merchandiseId: ID!
  quantity: Int!
  totalPrice: Int!
  orderStatus: String!
  createdAt: String
}

type Query {
  getOrders: [Order]
  getOrderById(id: ID!): Order
  getOrdersByUser(userId: ID!): [Order]
  getOrdersByStatus(status: String!): [Order]
}

type Mutation {
  createOrder(
    userId: ID!
    merchandiseId: ID!
    quantity: Int!
    price: Int!
  ): Order

  updateOrderStatus(
    id: ID!
    orderStatus: String!
  ): Order

  cancelOrder(id: ID!): Boolean
}

type Order {
  id: ID!
  userId: ID!
  merchandiseId: ID!
  quantity: Int!
  totalPrice: Int!
  orderStatus: String!
  createdAt: String
}

type Query {
  getOrders: [Order]
  getOrderById(id: ID!): Order
  getOrdersByUser(userId: ID!): [Order]
  getOrdersByStatus(status: String!): [Order]
}

type Mutation {
  createOrder(
    userId: ID!
    merchandiseId: ID!
    quantity: Int!
    price: Int!
  ): Order

  updateOrderStatus(
    id: ID!
    orderStatus: String!
  ): Order

  cancelOrder(id: ID!): Boolean
}

# 🧪 Test GraphQL

Semua pengujian dilakukan menggunakan **GraphQL Playground / Postman** untuk memastikan bahwa setiap Query dan Mutation berjalan dengan baik serta terhubung ke database MySQL.

---

## 🔹 User Service – Port 4001

- Tambah User Jennie  
- Tambah User Lisa  
- Ambil semua user  
- Ambil user by ID  
- Ambil user by email  
- Update nama user  
- Update email user  
- Hapus user  
- Cek user setelah dihapus  
- Tambah banyak user sekaligus  

---

## 🔹 Merchandise Service – Port 4002

- Tambah Hoodie  
- Tambah Lightstick  
- Ambil semua merchandise  
- Ambil merchandise by ID  
- Ambil berdasarkan kategori  
- Ambil stok tersedia  
- Update stok  
- Update harga  
- Hapus merchandise  
- Tambah banyak merchandise  

---

## 🔹 Order Service – Port 4003

- Create Order  
- Bulk Order  
- Get all orders  
- Get order by user  
- Update status  
- Cancel order  
- Create order setelah cancel  

---

Semua test berhasil dijalankan dan menunjukkan bahwa sistem GraphQL terhubung dengan baik ke database MySQL.

# 📂 Struktur Folder

Berikut adalah struktur folder project **BLINKStore** sesuai dengan implementasi yang digunakan:

IAE-BLINKSTORE
│
├── frontend
│ ├── images
│ ├── old
│ └── index.html
│
├── merchandise-service
│ ├── node_modules
│ ├── Dockerfile.txt
│ ├── package.json
│ ├── package-lock.json
│ ├── schema.graphql
│ └── server.js
│
├── order-service
│ ├── node_modules
│ ├── Dockerfile.txt
│ ├── package.json
│ ├── package-lock.json
│ ├── schema.graphql
│ └── server.js
│
├── user-service
│ ├── node_modules
│ ├── Dockerfile
│ ├── package.json
│ ├── package-lock.json
│ ├── schema.graphql
│ └── server.js
│
└── README.md


Penjelasan singkat:

- **frontend/** → Berisi tampilan website (HTML, CSS, JS, dan gambar).  
- **user-service/** → Mengelola data pengguna.  
- **merchandise-service/** → Mengelola data merchandise.  
- **order-service/** → Mengelola data pesanan.  
- **schema.graphql** → Berisi struktur API GraphQL.  
- **server.js** → Menjalankan server masing-masing service.  
- **README.md** → Dokumentasi project.  

# 👨‍💻 Tim Pengembang

Project **BLINKStore** dikembangkan oleh dua mahasiswa sebagai bagian dari tugas besar mata kuliah integrasi sistem.

| Nama | NIM |
|------|-----|
| Revaldo A. Nainggolan | 102022330325 |
| Alvina Sulistina | 102022300102 |

Setiap anggota memiliki tanggung jawab pada service yang berbeda agar pengembangan sistem berjalan lebih terstruktur dan efisien.

# 📌 Kesimpulan & Saran

## Kesimpulan

Project **BLINKStore** berhasil mengimplementasikan sistem pemesanan merchandise berbasis web dengan arsitektur **microservices** menggunakan **GraphQL** dan **MySQL** sebagai database utama.  
Setiap service (User, Merchandise, dan Order) berjalan secara terpisah namun tetap saling terhubung melalui API GraphQL, sehingga sistem menjadi lebih terstruktur, modular, dan mudah dikembangkan.

Frontend yang dibangun menggunakan **HTML, CSS, dan JavaScript (Vanilla)** mampu terintegrasi dengan backend secara langsung untuk:
- Menyimpan data user  
- Mengambil data merchandise  
- Mengirim data pesanan  
- Menampilkan invoice  

Melalui project ini, pengembang memperoleh pemahaman tentang:
- Cara kerja GraphQL  
- Integrasi frontend dengan backend  
- Pengelolaan database MySQL  
- Konsep microservices  

Secara keseluruhan, BLINKStore sudah memenuhi tujuan pembelajaran dalam membangun sistem terdistribusi berbasis API.

---

## Saran

Agar sistem BLINKStore menjadi lebih baik di masa depan, beberapa pengembangan yang dapat dilakukan antara lain:

1. Menambahkan sistem **login dan autentikasi user**  
2. Menyediakan fitur **keranjang multi-item**  
3. Mengintegrasikan **pembayaran online**  
4. Menambahkan **tracking status pesanan**  
5. Mengoptimalkan deployment menggunakan **Docker Compose**  
6. Meningkatkan tampilan UI agar lebih responsif  

Dengan pengembangan lebih lanjut, BLINKStore dapat menjadi sistem e-commerce yang lebih lengkap, aman, dan siap digunakan secara nyata.
