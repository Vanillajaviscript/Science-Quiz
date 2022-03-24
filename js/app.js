const url = "https://opentdb.com/api.php?amount=15&type=multiple";
const $question = $('#question');
const $category = $('#category');
const $type = $('#type');
const $difficulty = $('#difficulty');
const $submit = $('button');

const $input = $('input[name="choice"]');

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
        // let $choiceLabel = $(`#choice${index}label`)
        // $choiceLabel.html(possibleAnswers[i]);
        // let $choiceVal = $(`#choice${index}`)
        // $choiceVal.val(possibleAnswers[i]);
    document.getElementById(`choice${index}label`).innerHTML = possibleAnswers[i];
    document.getElementById(`answer${index}`).value = possibleAnswers[i];
    }

    $submit.on('click', () => {
    //    document.querySelector('button').addEventListener('click', () => {
        // e.preventDefault();
        let correctAnswer = data.results[0].correct_answer;
        document.querySelectorAll('input[name="choice"]').forEach((el) => {
            if(el.checked) {
                if(el.value === correctAnswer) {
                    alert('Correct!')
                } else {
                    alert('Wrong answer, try again!')
                }
            } 
        })
    })

})

