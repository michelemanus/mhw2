function objectLength(obj)
{
    let l = 0;
    for(let key in obj)
    {
        l++;
    }
    return l;
}

function selectAnswer(event)
{
    
    event.currentTarget.classList.add("selected");
    event.currentTarget.classList.remove("deselected");
    event.currentTarget.querySelector(".checkbox").src = "images/checked.png";
    const selected_answer = event.currentTarget.dataset.choiceId;
    const other_answers = event.currentTarget.parentNode.querySelectorAll("div");
    for(let other_answer of other_answers)
    {
        if(other_answer.dataset.choiceId !== selected_answer)
        {
            other_answer.classList.add("deselected");
            other_answer.classList.remove("selected");
            other_answer.querySelector(".checkbox").src = "images/unchecked.png";
        }
    }
    selected_answers[event.currentTarget.dataset.questionId] = selected_answer;
    if(objectLength(selected_answers) == 3)
    {
        const answers = document.querySelectorAll(".choice-grid div");
        for(answer of answers)
        {
            answer.removeEventListener("click", selectAnswer);
        }
        const counter = {}
        for(question in selected_answers)
        {
            const answer = selected_answers[question]; 
            if(!counter[answer])
            {
                counter[answer] = 0;
            }
            counter[answer]++;
        }
        let max_answer = null;
        let max_answer_count = 0;
        for(answer in counter)
        {
            if(counter[answer] > max_answer_count)
            {
                max_answer = answer;
                max_answer_count = counter[answer];
            }
        }
        const title = RESULTS_MAP[max_answer].title;
        const content = RESULTS_MAP[max_answer].contents;
        const results = document.querySelector("#results");
        results.querySelector("h1").textContent = title;
        results.querySelector("p").textContent = content;
        results.classList.remove("hidden");
    }
}

function resetQuiz()
{
    selected_answers = {};
    const answers = document.querySelectorAll(".choice-grid div");
    for(answer of answers)
    {
        answer.addEventListener("click", selectAnswer);
        answer.classList.remove("selected");
        answer.classList.remove("deselected");
        answer.querySelector(".checkbox").src = "images/unchecked.png";
    }
    
    results.classList.add("hidden");
}

let selected_answers = {};
resetQuiz();

const button = document.querySelector("div.button");
button.addEventListener("click", resetQuiz)