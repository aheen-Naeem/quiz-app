import inquirer from "inquirer";
import chalk from "chalk";
const apiLink = "https://opentdb.com/api.php?amount=6&category=18&difficulty=easy&type=multiple";
let fetchData = async (data) => {
    let fetchQuiz = await fetch(data);
    let res = await fetchQuiz.json();
    return res.results;
};
let data = await fetchData(apiLink);
let startQuiz = async () => {
    let score = 0;
    // for user name
    let name = await inquirer.prompt({
        type: "input",
        name: "name",
        message: "What is your name?"
    });
    for (let i = 1; i <= data.length; i++) {
        if (data[i]) {
            let answers = [...data[i].incorrect_answers, data[i].correct_answer];
            let ans = await inquirer.prompt({
                type: "list",
                name: "quiz",
                message: data[i].question,
                choices: answers.map((val) => val)
            });
            if (ans.quiz == data[i].correct_answer) {
                ++score;
                console.log(chalk.bold.italic.green("correct"));
            }
            else {
                // Handle the case when the answer is incorrect
                console.log("Correct answer is ", chalk.bold.italic.red(data[i].correct_answer));
            }
        }
    }
    console.log(` Dear ${chalk.blue.bold(name.name)} and your score is ${chalk.yellow.bold(score)} out of ${chalk.red.bold('5')}`);
};
startQuiz();
// let data = await fetchData(apiLink);
// // console.log('API Response:', data); // Add this line to check the structure of the data
// let startQuiz = async () => {
//     let score = 0;
//     // for user name
//     let name = await inquirer.prompt({
//         type: "input",
//         name: "name",
//         message: "What is your name?"
//     });
//     for (let i = 0; i < data.length; i++) {
//         if (data[i]) {
//             let answers = [...data[i].incorrect_answers, data[i].correct_answer];
//             let ans = await inquirer.prompt({
//                 type: "list",
//                 name: "quiz",
//                 message: data[i].question,
//                 choices: answers.map((val) => val)
//             });
//             if (ans.quiz == data[i].correct_answer) {
//                 ++score;
//             }
//         }
//     }
//     console.log(` Dear ${chalk.green.bold(name.name)} and your score is ${chalk.red.bold(score)} out of ${chalk.red.bold('5')}`);
// };
// startQuiz();
