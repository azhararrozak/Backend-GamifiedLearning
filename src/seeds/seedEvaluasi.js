const db = require("../models");
const Evaluasi = db.evaluasi;

async function seedEvaluasi() {
  try {
    const count = await Evaluasi.estimatedDocumentCount();

    if (count === 0) {
      const initialEvaluasi = [
        {
          pertemuan: "Pertemuan 1",
          description: "Deskripsi Evaluasi 1",
          evaluasi: [] // Jika ada ID lesson yang ingin Anda hubungkan, Anda dapat menambahkannya di sini
        },
        {
          pertemuan: "Pertemuan 2",
          description: "Deskripsi Evaluasi 2",
          evaluasi: []
        },
        {
            pertemuan: "Pertemuan 3",
            description: "Deskripsi Evaluasi 3",
            evaluasi: []
          },
          {
            pertemuan: "Pertemuan 4",
            description: "Deskripsi Evaluasi 4",
            evaluasi: []
          },
        // Tambahkan data Evaluasi lainnya sesuai kebutuhan
      ];

      await Evaluasi.insertMany(initialEvaluasi);
      console.log("Added initial Evaluasi to the database");
    } else {
      console.log("Evaluasi collection already seeded.");
    }
  } catch (err) {
    console.error("Error:", err);
  }
}

// Jalankan fungsi untuk seeding data Evaluasi
seedEvaluasi();
