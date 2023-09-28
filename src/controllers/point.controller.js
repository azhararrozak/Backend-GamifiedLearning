const db = require("../models");
const Point = db.point;

exports.addPoint = async (req, res) => {
  const userId = req.params.userId;
  const pointsToAdd = 10;

  try {
    let userPoints = await Point.findOne({ user: userId });

    if (!userPoints) {
      // Jika pengguna belum memiliki poin, buat entri baru
      userPoints = new Point({ user: userId, points: pointsToAdd });
    } else {
      // Jika pengguna sudah memiliki poin, tambahkan poin ke total
      userPoints.point += pointsToAdd;
    }

    await userPoints.save();

    return res.status(200).json({ message: "Poin berhasil ditambahkan." });
  } catch (error) {
    console.error("Gagal menambahkan poin ke pengguna:", error);
    res.status(500).json({
      message: "Terjadi kesalahan dalam menambahkan poin ke pengguna.",
    });
  }
};

exports.getUserPoint = async (req, res) => {
  const userId = req.params.userId;

  try {
    const userPoints = await Point.findOne({ user: userId });

    if (!userPoints) {
        return res.status(404).json({ message: 'Poin pengguna tidak ditemukan.' });
    }

    return res.status(200).json({ point: userPoints.point });
  } catch (error) {
    console.error("Gagal mengambil poin pengguna:", error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan dalam mengambil poin pengguna." });
  }
};
