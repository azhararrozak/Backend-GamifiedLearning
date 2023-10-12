const db = require("../models");
const Lesson = db.lesson;
const Point = db.point;
const PointHistory = db.pointHistory;

exports.addPoint = async (req, res) => {
  const userId = req.params.userId;
  const lessonId = req.body.lessonId; // Anda harus mengirimkan lessonId dari frontend
  const pointsToAdd = 10;

  try {
    // Periksa apakah pengguna sudah menambahkan poin ke pelajaran ini sebelumnya
    const existingPointRecord = await PointHistory.findOne({
      userId: userId,
      lessonId: lessonId,
    });

    if (existingPointRecord) {
      // Jika ada catatan, berarti pengguna sudah menambahkan poin ke pelajaran ini sebelumnya
      return res
        .status(400)
        .json({ message: "Anda sudah menambahkan poin ke pelajaran ini." });
    }

    // Lanjutkan dengan menambahkan poin
    let userPoints = await Point.findOne({ user: userId });

    if (!userPoints) {
      userPoints = new Point({ user: userId, point: pointsToAdd });
    } else {
      userPoints.point += pointsToAdd;
    }

    await userPoints.save();

    const FindLesson = await Lesson.findById(lessonId);
    if (!FindLesson) {
      return res.status(404).json({ message: "Lesson not found." });
    }

    // Periksa apakah user ada di dalam completedByUsers array
    const completedByUser = FindLesson.completedByUsers.find(
      (user) => user.userId === userId
    );

    if (completedByUser) {
      completedByUser.completed = true;
    } else {
      // Tambahkan pengguna ke dalam completedByUsers array jika tidak ditemukan
      FindLesson.completedByUsers.push({
        userId: userId,
        completed: true,
      });
    }

    await FindLesson.save(); // Simpan perubahan pada instance FindLesson

    // Buat catatan dalam PointHistory
    const pointHistory = new PointHistory({
      userId: userId,
      lessonId: lessonId,
    });
    await pointHistory.save();

    return res.status(200).json({ message: "Poin berhasil ditambahkan." });
  } catch (error) {
    console.log(error);
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
      return res
        .status(404)
        .json({ message: "Poin pengguna tidak ditemukan. Selesaikan Materi" });
    }

    return res.status(200).json({ point: userPoints.point });
  } catch (error) {
    console.error("Gagal mengambil poin pengguna:", error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan dalam mengambil poin pengguna." });
  }
};

exports.getAllUserPoint = async (req, res) => {
  try {
    const userPoints = await Point.find().populate("user", "username");

    if (!userPoints) {
      return res.status(404).json({ message: "Poin pengguna tidak ditemukan." });
    }

    return res.status(200).json(userPoints);
  } catch (error) {
    console.error("Gagal mengambil poin pengguna:", error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan dalam mengambil poin pengguna." });
  }
}
