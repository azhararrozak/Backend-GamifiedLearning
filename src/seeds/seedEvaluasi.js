const db = require("../models");
const Evaluasi = db.evaluasi;

async function seedEvaluasi() {
  try {
    const count = await Evaluasi.estimatedDocumentCount();

    if (count === 0) {
      const initialEvaluasi = [
        {
          pertemuan: "Pertemuan 1",
          description: "Form ini digunakan untuk mengevaluasi peserta didik yang telah mepresentasikan hasil kelompoknya",
          evaluasi: [],
        },
        {
          pertemuan: "Pertemuan 2",
          description: "Form ini digunakan untuk mengevaluasi peserta didik yang telah mepresentasikan hasil kelompoknya",
          evaluasi: [],
        },
        {
          pertemuan: "Pertemuan 3",
          description: "Form ini digunakan untuk mengevaluasi peserta didik yang telah mepresentasikan hasil kelompoknya",
          evaluasi: [],
        },
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
