const db = require("../models");
const Score = db.score;


//Get All score hanya menampilkan nama dan sore pretest
exports.getAllScore = async (req, res) => {
    try {
        const scores = await Score.find().populate("user", "-__v");
        res.send(scores);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

//create group team dengan ketentuan sorted lalu hasil sorted dibagi 2 kelas atas dan bawah kemudian diacak masing masing minimal 3 orang perkelompok
exports.createGroup = async (req, res) => {
    try {
        const countGroup  = 2;
        const scores = await Score.find().populate("user", "-__v").sort({ pretest: 1 });
        const scoresLength = scores.length;
        const groupLength = scoresLength / 2;
        const groupA = scores.slice(0, groupLength);
        const groupB = scores.slice(groupLength, scoresLength);
        // buatkan grup bberdasarkan jumlah group yang diinginkan
        const group = [];
        for (let i = 0; i < countGroup; i++) {
            group.push({
                name: `Group ${i + 1}`,
                members: []
            })
        }
        // masukkan member ke grup secara bergantian
        let index = 0;
        for (let i = 0; i < groupA.length; i++) {
            group[index].members.push(groupA[i].user);
            index++;
            if (index >= countGroup) {
                index = 0;
            }
        }
        
        for (let i = 0; i < groupB.length; i++) {
            group[index].members.push(groupB[i].user);
            index++;
            if (index >= countGroup) {
                index = 0;
            }
        }

        res.send(group);

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}





