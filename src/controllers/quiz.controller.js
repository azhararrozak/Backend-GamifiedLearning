const db = require("../models");
const Quiz = db.quiz;
const Score = db.score;

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
    const quiz = await Quiz.findById(req.params.id).select(
      "-questions.options.isCorrect"
    );
    res.send(quiz);
  } catch (error) {
    res.status(500).send({ message: error.message });
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

    if (scoreExist) {
        if (score > scoreExist.pretest) {
            scoreExist.pretest = score;
            await scoreExist.save();
        }
    }else{
        const newScore = new Score({
            pretest: score,
            user: req.userId,
        });

        await newScore.save();
        res.send({ score, message: `Score Anda ${score}` });
    }
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

    const scoreExist = await Score.findOne({ user: req.userId });

    //Jika score sudah melampaui user tidak dapat submit lagi
    if (scoreExist) {
      if (scoreExist.pretest < 80) {
        scoreExist.pretest = score;
        await scoreExist.save();
        res.send({ score, message: `Score Anda ${score}` });
      } else {
        res.status(400).send({ message: "Already submitted the quiz!" });
      }
    } else {
      const newScore = new Score({
        pretest: score,
        user: req.userId,
      });

      await newScore.save();
      res.send({ score, message: `Score Anda ${score}` });
    }

    // if (scoreExist) {
    //     if (score > scoreExist.pretest) {
    //         scoreExist.pretest = score;
    //         await scoreExist.save();
    //     }
    // }else{
    //     const newScore = new Score({
    //         pretest: score,
    //         user: req.userId,
    //     });

    //     await newScore.save();
    // }

    // res.send({ score });
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
      if (scoreExist.posttest < 80) {
        scoreExist.posttest = score;
        await scoreExist.save();
        res.send({ score, message: `Score Anda ${score}` });
      } else {
        res.status(400).send({ message: "Already submitted the quiz!" });
      }
    } else {
      const newScore = new Score({
        posttest: score,
        user: req.userId,
      });

      await newScore.save();
      res.send({ score, message: `Score Anda ${score}` });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
