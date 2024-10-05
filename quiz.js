//array of questions and answers
//the first item in the ans array is set to be the right answer
const questionLst = [
    {'q1':'What\'s the first letter of the alphabet?','ans':['A','B','Z','F']},
    {'q2':'What\'s the sum of 2 + 2?','ans':['4','10','200','5']},
    {'q3':'How many wheels does a regular car have?','ans':['4','3','2','6']},
    {'q4':'What star is the brightest star in our solar system?','ans':['Sun','Moon','Mars','Venus']},
    {'q5':'What\'s the name of the fastest land animal?','ans':['Cheetah','Lion','Monkey','Horse']}
];

//displayLst deep copies the original list of questions to be later shuffled and displayed to the user
const displayLst = questionLst.map(question=>({
    ...question,ans:[...question.ans]
}));
const container = document.getElementById('container');

//accepts a object which has a question and an answer field. This object is returned from the front end after the user submits their answers.
//for example is the question was "1+1" and the user clicks 2, the object would store ['question':'1+1','answer':'2']
//this function finds the question in the question lst and compars the answer to the first index in the question list(which has the correct answer)
function compareObjs(obj){
    for ([question,answers] of questionLst.entries()){
        const keys = Object.keys(answers);
        if (keys[0] === obj.question){
            if (questionLst[index]['ans'][0] === obj.ans){
                return true;
            }
        }
    }
    return false;
}

//styles the border of the div based on the users answer, red for wrong and green for correct
function setDiv(div,answer,ansCount){
    if (answer){
        div.style.border = 'solid green 1px';
        ansCount++;
    }else{
        div.style.border = 'solid red 1px';
    }
}

//count to check the amount of correct answers selected from the user
let correctAnswers = 0;
//function to check answers
function checkAnswers(){
    //for loop to check all the answers on the page(questions 1-5)
    for (let i = 1;i < 6;i++){
        let checked = false;
        const divId = `q${i}`;
        const div = document.getElementById(divId);
        const inputs = div.querySelectorAll('input');

        inputs.forEach(input=>{
            if (input.checked){
                const arr = {'question':divId,'ans':input.value}
                const checkValue = compareObjs(arr)
                if (checkValue){
                    correctAnswers++;
                }
                setDiv(div,checkValue,correctAnswers);
                checked = true;
                return;
            }
        })
        //makes sure all answers are answered, if not, returns an error
        if (!checked){
            alert('Please all questions!')
            return;
        }
    }
    //displays success message depending on the amount of answers the user got correct
    const tally = document.getElementById('tally');
    if (correctAnswers === 5){
        tally.innerHTML = "Congratulations you got all answers correct.";
    }else{
        tally.innerHTML = `You got ${correctAnswers} answers correct you should try again`;
    };

    this.style.display = 'none';
    document.getElementById('refresh').style.display = 'block';
};

//function that shuffles the questions and answers displayed to the user
function shuffle(lst){
    const lstCopy = [...lst]
    let indexCount = 0;
    const len = lst.length;
    let arr = [];
    for(let i = 0;i<len;i++){
        arr.push(i);
    }
    while(arr.length!== 1){
        const num = Math.round(Math.random()*(arr.length-1))
        lst[indexCount] = lstCopy[arr[num]];
        indexCount++;
        arr.splice(num,1);
    };
    lst[indexCount] = lstCopy[arr[0]];
}

displayLst.forEach(arr=>{
    shuffle(arr['ans']);
});
shuffle(displayLst);

//button to check answers after answering the questions
const button1 = document.createElement('button');
button1.id = 'check-answers';
button1.innerHTML = 'Check Answers';
button1.addEventListener('click',checkAnswers);

//button to try again after getting the results
const button2 = document.createElement('button');
button2.id = 'refresh';
button2.innerHTML = 'Try again';
button2.addEventListener('click',function(){
    location.reload();
});
button2.style.display = 'none';

//displays the shuffled qeustions and answers from the copied and shuffled list
displayLst.forEach(arr=>{
    const keys = Object.keys(arr);
    const div = document.createElement('div');
    const p = document.createElement('p');
    let count = 1;

    p.innerHTML = arr[keys[0]]
    div.id = keys[0];
    div.className = 'question-div';
    div.appendChild(p);
    arr[keys[1]].forEach(answer=>{
        const label = document.createElement('label');
        const span = document.createElement('span');
        const input = document.createElement('input');
        
        span.innerHTML = answer;
        input.type = 'radio';
        input.name = `${keys[0]}-option`;
        input.id = `${keys[0]}-option${count}`;
        input.value = answer;
        label.for = 'answer-option';

        label.appendChild(input);
        label.appendChild(span);
        div.appendChild(label);
        count+=1
    container.appendChild(div); 
    })
})

//appends the both buttons to the div
container.appendChild(button1);
container.appendChild(button2);