const db = require("../models");
const Badge = db.badge;

exports.addBadge = async (req, res) => {
  const userId = req.params.userId;
  const badgeName = req.body.badgeName;
  try {
    // Cek apakah pengguna sudah memiliki badge dengan nama yang sama
    const existingBadge = await Badge.findOne({ user: userId, name: badgeName });

    if (existingBadge) {
      return res.status(400).json({ message: "Anda sudah menyelesaikannya" });
    }

    if (badgeName === "Kursus Selesai") {
      const badge = new Badge({
        user: userId,
        name: badgeName,
        description: "Anda telah menyelesaikan kursus",
        image: "https://res.cloudinary.com/dqzp5nrox/image/upload/v1705545720/badges/bgs_fnsmaterial_bzhstx.png",
      });
      await badge.save();
      return res.status(201).json({ message: "Anda Mendapatkan Badge" });
    } else {
      return res
        .status(400)
        .json({ message: "Kriteria tidak memenuhi untuk badge ini" });
    }
  } catch (error) {
    console.error("Gagal menambahkan badge ke pengguna:", error);
    res.status(500).json({
      message: "Terjadi kesalahan dalam menambahkan badge ke pengguna.",
    });
  }
};

exports.getUserBadge = async (req, res) => {
    const userId = req.params.userId;
    
    try {
        const userBadges = await Badge.find({ user: userId });
    
        if (!userBadges) {
        return res
            .status(404)
            .json({ message: "Badge pengguna tidak ditemukan." });
        }
    
        return res.status(200).json(userBadges);
    } catch (error) {
        console.error("Gagal mendapatkan badge pengguna:", error);
        res.status(500).json({
        message: "Terjadi kesalahan dalam mendapatkan badge pengguna.",
        });
    }
    
}
