const db = require("../models");
const Score = db.score;
const Group = db.group;

//create group team dengan ketentuan sorted lalu hasil sorted dibagi 2 kelas atas dan bawah kemudian diacak masing masing minimal 3 orang perkelompok
exports.createGroup = async (req, res) => {
    try {

        // cek apakah group sudah di buat
        const groupCheck = await Group.find();
        if (groupCheck.length > 0) {
            return res.status(400).send({ message: "Group already exists" });
        }

        const countGroup  = req.body.countGroup;
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

        //create lead form members data
        for (let i = 0; i < group.length; i++) {
            group[i].lead = group[i].members[0];
        }

        // masukkan ke db
        await Group.insertMany(group);
        res.send({ message: "Group created successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

exports.getGroup = async (req, res) => {
    try {
        const group = await Group.find().populate("members", "-__v").populate("lead", "-__v");
        res.send(group);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

exports.deleteGroup = async (req, res) => {
    try {
        await Group.deleteMany();
        res.send({ message: "Group deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

exports.updateProblem = async (req, res) => {
    const { title, description } = req.body;

    try{
        const group = await Group.findByIdAndUpdate(req.params.id, {
            $set: {
                "problem.title": title,
                "problem.description": description,
            }
        });
        res.send({ message: "Problem updated successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}









