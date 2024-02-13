const db = require("../models");
const Refleksi = db.refleksi;

async function seedRefleksi() {
    try {
        const count = await Refleksi.estimatedDocumentCount();
    
        if (count === 0) {
          const initialRefleksi = [
            {
              pertemuan: "Pertemuan 1",
              description: "Deskripsi Refleksi 1",
              refleksi: [] // Jika ada ID lesson yang ingin Anda hubungkan, Anda dapat menambahkannya di sini
            },
            {
              pertemuan: "Pertemuan 2",
              description: "Deskripsi Refleksi 2",
              refleksi: []
            },
            {
                pertemuan: "Pertemuan 3",
                description: "Deskripsi Refleksi 3",
                refleksi: []
              },
              {
                pertemuan: "Pertemuan 4",
                description: "Deskripsi Refleksi 4",
                refleksi: []
              },
            // Tambahkan data Refleksi lainnya sesuai kebutuhan
          ];
    
          await Refleksi.insertMany(initialRefleksi);
          console.log("Added initial Refleksi to the database");
        } else {
          console.log("Refleksi collection already seeded.");
        }
      } catch (err) {
        console.error("Error:", err);
      }
}

seedRefleksi();