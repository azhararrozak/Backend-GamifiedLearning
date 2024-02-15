const db = require("../models");
const Quiz = db.quiz;
const Score = db.score;
const Point = db.point;
const AnswerPretest = db.answerPretest;

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
        score += 10;
      }
    });

    const scoreExist = await Score.findOne({ user: req.userId });

    if (scoreExist) {
      // Temukan quizmaterial yang sesuai dengan title
      const quizMaterialIndex = scoreExist.quizmaterials.findIndex(
        (qm) => qm.title === title
      );

      if (quizMaterialIndex !== -1) {
        // Jika sudah ada quizmaterial dengan title yang sama, update score
        if (score > scoreExist.quizmaterials[quizMaterialIndex].score) {
          scoreExist.quizmaterials[quizMaterialIndex].score = score;
        }
      } else {
        // Jika belum ada quizmaterial dengan title yang sama, tambahkan baru
        scoreExist.quizmaterials.push({ title, score });
      }

      await scoreExist.save();
    } else {
      const newScore = new Score({
        quizmaterials: [{ title, score }],
        user: req.userId,
      });

      await newScore.save();
    }

    res.send({ score });
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

    questions.forEach((question, index) => {
      //Bandingkan options yang dipilih dengan jawaban yang benar yang dikirim dari selectedAnswer adalah id per option
      //Jadi cari option yang id nya sama dengan selectedAnswer[index]
      const selectedOption = question.options.find(
        (option) => option._id.toString() === selectedAnswers[index]
      );

      //Jika option yang dipilih adalah jawaban yang benar, maka tambahkan score
      if (selectedOption.isCorrect) {
        score += 10;
      }
    });

    questions.forEach(async (question, index) => {
      const selectedOptionId = selectedAnswers[index]; // ID opsi yang dipilih oleh siswa
      const isCorrect = question.options.some(option => option._id.toString() === selectedOptionId && option.isCorrect);
    
      const newAnswer = new AnswerPretest({
        user: req.userId,
        answer: [{
          question: question._id,
          selectedOption: selectedOptionId,
          isCorrect,
        }]
      });
    
      await newAnswer.save();
    });

    const scoreExist = await Score.findOne({ user: req.userId });

    //Jika score sudah ada tidak bisa submit lagi
    if (scoreExist) {
      res.status(400).send({ message: "Anda Sudah Mengerjakan Pretest ini" });
    } else {
      //Add point 5 berdasarkan jumlah benar dan hanya sekali submit
      const point = await Point.findOne({ user: req.userId });

      if (point) {
        point.point += (score / 10) * 5;
        await point.save();
      } else {
        const newPoint = new Point({
          point: (score / 10) * 5,
          user: req.userId,
        });

        await newPoint.save();
      }

      const newScore = new Score({
        pretest: score,
        user: req.userId,
      });

      await newScore.save();

      res.send({ score });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.submitPostest = async (req, res) => {
  const { id } = req.params;
  const { selectedAnswers } = req.body;

  try {
    const quiz = await Quiz.findById(id);
    const { questions } = quiz;
    let score = 0;

    questions.forEach((question, index) => {
      //Bandingkan options yang dipilih dengan jawaban yang benar yang dikirim dari selectedAnswer adalah id per option
      //Jadi cari option yang id nya sama dengan selectedAnswer[index]
      const selectedOption = question.options.find(
        (option) => option._id.toString() === selectedAnswers[index]
      );

      //Jika option yang dipilih adalah jawaban yang benar, maka tambahkan score
      if (selectedOption.isCorrect) {
        score += 10;
      }
    });

    const scoreExist = await Score.findOne({ user: req.userId });

    //Jika score sudah melampaui user tidak dapat submit lagi
    if (scoreExist) {
      res.status(400).send({ message: "Anda Sudah Mengerjakan Postest ini" });
    } else {
      const newScore = new Score({
        posttest: score,
        user: req.userId,
      });

      await newScore.save();
      res.send({ score });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
