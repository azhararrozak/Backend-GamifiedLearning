const db = require("../models");
const Refleksi = db.refleksi;

async function seedRefleksi() {
    try {
        const count = await Refleksi.estimatedDocumentCount();
    
        if (count === 0) {
          const initialRefleksi = [
            {
              pertemuan: "Pertemuan 1",
              description: "Berisi form refleksi yang perlu di isi peserta didik setelah selesai pertemuan",
              refleksi: []
            },
            {
              pertemuan: "Pertemuan 2",
              description: "Berisi form refleksi yang perlu di isi peserta didik setelah selesai pertemuan",
              refleksi: []
            },
            {
                pertemuan: "Pertemuan 3",
                description: "Berisi form refleksi yang perlu di isi peserta didik setelah selesai pertemuan",
                refleksi: []
              },
              
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