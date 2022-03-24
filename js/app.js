const url = "https://opentdb.com/api.php?amount=10"
const $question = $('#question');
const $category = $('#category');
const $type = $('#type')


async function getQuestions() {
    let response = await fetch(url);
    let data = await response.json();
    console.log(url)
    return data
}

getQuestions().then(data => {
    let question = data.results[0].question;
    $question.html = data.results[0].question;
    $question.append(question)
    console.log(data)

    let category = data.results[0].category;
    $category.html = data.results[0].category;
    $category.append(category)

    let type = data.results[0].type;
    $type.html = data.results[0].type;
    $type.append(type)
})

