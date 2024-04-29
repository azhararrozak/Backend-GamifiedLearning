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
          description:
            "Pada pertemuan ini akan di pelajari mengenai perulangan for dan for in pada pemrograman Javascript",
          lessons: [], 
        },
        {
          title: "Pertemuan 2",
          description: "Pada pertemuan ini akan di pelajari mengenai perulangan for of dan metode perulangan array (map dan foreach)",
          lessons: [],
        },
        {
          title: "Pertemuan 3",
          description: "Pada pertemuan ini akan di pelajari mengenai perulangan while dan do while pada pemrograman Javascript",
          lessons: [],
        },
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
