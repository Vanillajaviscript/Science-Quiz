//Declare variables to the DOM;
//Declare arrow function and within pull API data using AJAX
//Call function and declare variables pulling necessary data from API
//Apply the pulled data from API and turn into array
//Create a function to randomize possible answers

const url = "https://opentdb.com/api.php?amount=10&category=17&type=multiple"
const $question = $('#question');
const $category = $('#category');
const $type = $('#type');
const $difficulty = $('#difficulty');
const $submit = $('button');
const $reset = $(':reset')

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
    const possibleAnswers = [...data.results[0].incorrect_answers, data.results[0].correct_answer];

    randomizeAnswers(possibleAnswers);

    for (let i = 0; i < 4; i++) {
        let index = i + 1;
        $(`#answer${index}`).val(possibleAnswers[i]);
        $(`#answer${index}label`).html(possibleAnswers[i]);
    }
    //API data to pull 
    let question = data.results[0].question;
        $question.append(question);
    let category = data.results[0].category;
        $category.append(category);
    let type = data.results[0].type + " choice";
        $type.append(type);
    let difficulty = data.results[0].difficulty;
        $difficulty.append(difficulty);

    $reset.on('click', () => {
        location.reload();
    })

    $submit.on('click', (e) => {
        e.preventDefault();
        let correctAnswer = data.results[0].correct_answer;
        document.querySelectorAll('input[name="answer"]').forEach((el) => {
            if(el.checked) {
                if(el.value === correctAnswer) {
                    alert('Correct!')
                    location.reload();
                } else {
                    alert('Wrong answer, try again!')
                }
            } 
        })
    })
})