const db = require("../models");
const Unit = db.unit;

// Fungsi untuk seeding data unit
async function seedUnits() {
  try {
    const count = await Unit.estimatedDocumentCount();

    if (count === 0) {
      // Masukkan data unit pertama kali di sini
      const initialUnits = [
        {
          title: "Pertemuan 1",
          description: "Deskripsi Unit 1",
          lessons: [] // Jika ada ID lesson yang ingin Anda hubungkan, Anda dapat menambahkannya di sini
        },
        {
          title: "Pertemuan 2",
          description: "Deskripsi Unit 2",
          lessons: []
        },
        {
            title: "Pertemuan 3",
            description: "Deskripsi Unit 3",
            lessons: []
          },
          {
            title: "Pertemuan 4",
            description: "Deskripsi Unit 4",
            lessons: []
          },
        // Tambahkan data unit lainnya sesuai kebutuhan
      ];

      await Unit.insertMany(initialUnits);
      console.log("Added initial units to the database");
    } else {
      console.log("Units collection already seeded.");
    }
  } catch (err) {
    console.error("Error:", err);
  }
}

// Jalankan fungsi untuk seeding data unit
seedUnits();
