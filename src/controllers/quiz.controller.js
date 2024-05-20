const db = require("../models");
const Quiz = db.quiz;
const Score = db.score;
const Point = db.point;
const AnswerPretest = db.answerPretest;
const AnswerPostest = db.answerPostest;

exports.createQuiz = async (req, res) => {
  const { title, description, questions } = req.body;

  try {
    const quiz = new Quiz({
      title,
      description,
      questions,
    });

    await quiz.save();
    res.send({ message: "Quiz was created successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getQuiz = async (req, res) => {
  try {
    // filter quiz title pretest dan postest agar tidak ditampilkan
    const quiz = await Quiz.find({ title: { $nin: ["pretest", "postest"] } });
    res.send(quiz);
  } catch (error) {
    cx;
    res.status(500).send({ message: error.message });
  }
};

exports.getAllQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.find();
    res.send(quiz);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getQuizByTitle = async (req, res) => {
  try {
    const title = req.params.title;
    const quiz = await Quiz.findOne({ title }).select(
      "-questions.options.isCorrect"
    );
    res.json({ quiz });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getQuizById = async (req, res) => {
  try {
    const id = req.params.id;
    const quiz = await Quiz.findById(id).select("-questions.options.isCorrect");
    res.json({ quiz });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateQuiz = async (req, res) => {
  const { title, description, questions } = req.body;

  try {
    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        questions,
      },
      { new: true }
    );
    res.send({ message: "Quiz was updated successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndRemove(req.params.id);
    res.send({ message: "Quiz was deleted successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.submitQuiz = async (req, res) => {
  const { id } = req.params;
  const { selectedAnswers } = req.body;

  try {
    const quiz = await Quiz.findById(id);
    const { title } = quiz;
    const { questions } = quiz;
    let score = 0;

    questions.forEach((question, index) => {
      const selectedOption = question.options.find(
        (option) => option._id.toString() === selectedAnswers[index]
      );

      if (selectedOption.isCorrect) {
        score += 1;
      }
    });

    //Hitung skor akhir
    const finalScore = score / questions.length * 100;

    const scoreExist = await Score.findOne({ user: req.userId });

    if (scoreExist) {
      // Temukan quizmaterial yang sesuai dengan title
      const quizMaterialIndex = scoreExist.quizmaterials.findIndex(
        (qm) => qm.title === title
      );

      if (quizMaterialIndex !== -1) {
        // Jika sudah ada quizmaterial dengan title yang sama, update score
        if (finalScore > scoreExist.quizmaterials[quizMaterialIndex].score) {
          scoreExist.quizmaterials[quizMaterialIndex].score = finalScore;
        }
      } else {
        // Jika belum ada quizmaterial dengan title yang sama, tambahkan baru
        scoreExist.quizmaterials.push({ title, finalScore });
      }

      await scoreExist.save();
    } else {
      const newScore = new Score({
        quizmaterials: [{ title, finalScore }],
        user: req.userId,
      });

      await newScore.save();
    }

    res.send({ finalScore });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.submitPretest = async (req, res) => {
  const { id } = req.params;
  const { selectedAnswers } = req.body;

  try {
    const quiz = await Quiz.findById(id);
    const { questions } = quiz;
    let score = 0;

    // Hitung skor dan simpan jawaban dalam satu objek AnswerPretest
    const answerPretest = {
      user: req.userId,
      answers: [],
    };

    questions.forEach((question, index) => {
      const selectedOptionId = selectedAnswers[index];
      const isCorrect = question.options.some(
        (option) =>
          option._id.toString() === selectedOptionId && option.isCorrect
      );

      answerPretest.answers.push({
        question: question._id,
        atp: question.atp,
        indicator: question.indicator,
        isCorrect,
      });

      if (isCorrect) {
        score += 1;
      }
      
    });

    //Hitung skor akhir
    const finalScore = score / questions.length * 100;

    // Cek apakah pengguna sudah memiliki skor pretest sebelumnya
    const existingAnswerPretest = await AnswerPretest.findOne({
      user: req.userId,
    });

    if (existingAnswerPretest) {
      return res
        .status(400)
        .send({ message: "Anda sudah mengerjakan pretest ini" });
    }

    // Simpan objek AnswerPretest
    await AnswerPretest.create(answerPretest);

    // Tambahkan poin
    const point =
      (await Point.findOne({ user: req.userId })) ||
      new Point({ user: req.userId });
    point.point += score * 5;
    await point.save();

    // Simpan skor pretest
    const scoreExist = await Score.findOne({ user: req.userId });

    
    if (scoreExist) {
      scoreExist.pretest = finalScore;
      await scoreExist.save();
    } else {
      const newScore = new Score({
        pretest: finalScore,
        user: req.userId,
      });
      await newScore.save();
    }

    res.send({ finalScore });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.submitPostest = async (req, res) => {
  const { id } = req.params;
  const { selectedAnswers } = req.body;

  //cek user sudah mengerjakan pretest
  const existingAnswerPretest = await AnswerPretest.findOne({
    user: req.userId,
  });
  if (!existingAnswerPretest) {
    return res.status(400).send({ message: "Anda belum mengerjakan pretest" });
  }

  try {
    const quiz = await Quiz.findById(id);
    const { questions } = quiz;
    let score = 0;

    // Hitung skor dan simpan jawaban dalam satu objek AnswerPostest
    const answerPostest = {
      user: req.userId,
      answers: [],
    };

    questions.forEach((question, index) => {
      const selectedOptionId = selectedAnswers[index];
      const isCorrect = question.options.some(
        (option) =>
          option._id.toString() === selectedOptionId && option.isCorrect
      );

      answerPostest.answers.push({
        question: question._id,
        atp: question.atp,
        indicator: question.indicator,
        isCorrect,
      });

      if (isCorrect) {
        score += 1;
      }
    });

    //Hitung skor akhir
    const finalScore = score / questions.length * 100;

    // Cek apakah pengguna sudah memiliki skor postest sebelumnya
    const existingAnswerPostest = await AnswerPostest.findOne({
      user: req.userId,
    });

    if (existingAnswerPostest) {
      return res
        .status(400)
        .send({ message: "Anda sudah mengerjakan postest ini" });
    }

    // Simpan objek AnswerPostest
    await AnswerPostest.create(answerPostest);

    // Tambahkan poin
    const point =
      (await Point.findOne({ user: req.userId })) ||
      new Point({ user: req.userId });
    point.point += score * 5;
    await point.save();

    // Simpan skor postest
    const scoreExist = await Score.findOne({ user: req.userId });

    if (scoreExist) {
      scoreExist.posttest = finalScore;
      await scoreExist.save();
    } else {
      const newScore = new Score({
        postest: finalScore,
        user: req.userId,
      });
      await newScore.save();
    }

    res.send({ finalScore });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.checkPretestByIdUser = async (req, res) => {
  try {
    const existingAnswerPretest = await AnswerPretest.findOne({
      user: req.userId,
    });
    if (existingAnswerPretest) {
      return res
        .status(200)
        .send({ message: "Anda sudah mengerjakan pretest" });
    } else {
      return res
        .status(200)
        .send({ message: "Anda belum mengerjakan pretest" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.checkPostestByIdUser = async (req, res) => {
  try {
    const existingAnswerPostest = await AnswerPostest.findOne({
      user: req.userId,
    });

    if (existingAnswerPostest) {
      return res
        .status(200)
        .send({ message: "Anda sudah mengerjakan postest" });
    } else {
      return res
        .status(200)
        .send({ message: "Anda belum mengerjakan postest" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
