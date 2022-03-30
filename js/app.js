const getQuiz = () => {
    let data = $.ajax("https://opentdb.com/api.php?amount=10&category=17&type=multiple");
    return data;
}
function randomizeAnswers (array) {
    for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
    console.log(j)
        }
    } 

getQuiz().then(data => {
    const possibleAnswers = [...data.results[0].incorrect_answers, data.results[0].correct_answer];
        randomizeAnswers(possibleAnswers);
    for (let i = 0; i < possibleAnswers.length; i++) {
        let indexOf = i + 1;
        $(`#answer${indexOf}`).val(possibleAnswers[i]);
        $(`#answer${indexOf}label`).html(possibleAnswers[i]);
    }
    let question = data.results[0].question;
        $('#question').append(question);
    let category = data.results[0].category;
        $('#category').append(category);
    let type = data.results[0].type;
        $('#type').append(type);
    let difficulty = data.results[0].difficulty;
        $('#difficulty').append(difficulty);
    $(':reset').on('click', () => {
        location.reload();
    })
    $('button').on('click', (e) => {
        e.preventDefault();
        const $radioValue = $("input[name='answer']:checked");
        if ($radioValue.length === 0) {
            alert('You need to select an answer')
        } else {
            let correctAnswer = data.results[0].correct_answer;
                if ($radioValue.val() === correctAnswer) {
                    alert('correct!')
                    location.reload()
                } else {
                    alert ('Wrong answer, try again!')
                }
            }
    })
})