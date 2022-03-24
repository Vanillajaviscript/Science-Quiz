const url = "https://opentdb.com/api.php?amount=15&type=multiple";
const $question = $('#question');
const $category = $('#category');
const $type = $('#type');
const $difficulty = $('#difficulty');
const $button = $('button');
const $choice1 = $('')
const array = [];


const getQuiz = () => {
    let data = $.ajax(url);
    return data;
}

function randomizeAnswers (array) {
    for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
    console.log(i);
    console.log(j);
    console.log(array)
        }
    }

getQuiz().then(data => {
    let question = data.results[0].question;
    $question.append(question)
    console.log(data)

    let category = data.results[0].category;
    $category.append(category)

    let type = data.results[0].type + " choice";
    $type.append(type)

    let difficulty = data.results[0].difficulty;
    $difficulty.append(difficulty)

    const possibleAnswers = [...data.results[0].incorrect_answers, data.results[0].correct_answer];
    randomizeAnswers(possibleAnswers);

    for (let i = 0; i < 4; i++) {
        let index = i + 1;

    }

})

