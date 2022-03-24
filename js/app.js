const url = "https://opentdb.com/api.php?amount=15&type=multiple";
const $question = $('#question');
const $category = $('#category');
const $type = $('#type');
const $difficulty = $('#difficulty');
const $submit = $('button');
// const $input = $('input[name="choice"]');

const getQuiz = () => {
    let data = $.ajax(url);
    return data;
}

function randomizeAnswers (array) {
    for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
        }
    } 

getQuiz().then(data => {
    let question = data.results[0].question;
    $question.append(question)

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
        const $choice = $(`#choice${index}label`)
        $choice.html(possibleAnswers[i]);
        $choice.val(possibleAnswers[i]);
    }

    $submit.on('click', (e) => {
        e.preventDefault();
        let correctAnswer = data.results[0].correct_answer;
        let incorrectAnswers = data.results[0].incorrect_answers;
        document.querySelectorAll('input[name="choice"]').forEach((el) => {
            if(el.checked) {
            }
        })
    })

})

