const getQuiz = () => {
    let data = $.ajax("https://opentdb.com/api.php?amount=10&category=17&type=multiple");
    return data;
}
function randomizeAnswers (array) {
    for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
        }
    } 

getQuiz().then(data => {
    // Gathers correct and incorrect answers into an array
    const possibleAnswers = [...data.results[0].incorrect_answers, data.results[0].correct_answer];
    // Calling the function to randomize answers
        randomizeAnswers(possibleAnswers);
    // Loops through possibleAnswers to connect to radio buttons
    for (let i = 0; i < possibleAnswers.length; i++) {
        let indexOf = i + 1;
        $(`#answer${indexOf}`).val(possibleAnswers[i]);
        $(`#answer${indexOf}label`).html(possibleAnswers[i]);
    }
    // Gathers necessary data from API and inserts its content as the last child of each element
    let question = data.results[0].question;
        $('#question').append(question);
    let category = data.results[0].category;
        $('#category').append(category);
    let type = data.results[0].type + " choice";
        $('#type').append(type);
    let difficulty = data.results[0].difficulty;
        $('#difficulty').append(difficulty);
    // Creates a reset button to skip questions
    $(':reset').on('click', () => {
        location.reload();
    })
    // Main submit button that allows the user to keep guessing until the question is answered correctly, which then resets the page
    $('button').on('click', (e) => {
        e.preventDefault();
        const $radioValue = $("input[name='answer']:checked");
        if ($radioValue.length === 0) {
            alert('You need to select an answer')
        } else {
            let correctAnswer = data.results[0].correct_answer;
                if ($radioValue.val() === correctAnswer) {
                    alert('correct')
                    location.reload()
                } else {
                    alert ('Wrong answer, try again!')
                }
            }
    })
})