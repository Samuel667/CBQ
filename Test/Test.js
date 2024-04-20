const capusleProgression = document.querySelector('#capsuleProgress');
const Questions =  document.querySelector('#questions');
const QuestionInfo = document.querySelector('#questionInfo');
const optionText = Array.from(document.querySelectorAll('.option-text'));
const mark = document.querySelector('#score');
const countTime = document.getElementById('timing')

let givenQuestions = [];
let currentQuestion = {};
let score = 100;
let questionNumber = 0;
let acceptingAnswer = true

arrayQuestion = [
    {
    
        question: 'which of the folowing ia an example of mixture',
        choice1: 'common salt',
        choice2: 'blood',
        choice3: 'sand',
        choice4: 'washing soda',
        answer: 2
    },
    {
        question: 'The father of computer is?',
        choice1: 'Albert Einstein',
        choice2: 'Thomas Edison',
        choice3: 'Charles Babbage',
        choice4: 'Isaac Newton',
        answer:  3
    },
    {
        question: 'How many contient do we have in the world?',
        choice1: '6',
        choice2: '7',
        choice3: '8',
        choice4: '9',
        answer:  2
    },
    {   
        question: 'How many local goverment do we have in your oyo state?',
        choice1: '23',
        choice2: '45',
        choice3: '33',
        choice4: '34',
        answer:  4
    },
    {
        question: 'The three state of matter include the following except?',
        choice1: 'solid',
        choice2: 'liquid',
        choice3: 'freezing',
        choice4: 'gas',
        answer:  3,
        
    },
    
    {
        question: 'The first nigeria millitary head of state was?' ,
        choice1: 'Aguyi Ironsi',
        choice2: 'Olusegun Obasanjo',
        choice3: 'Muritala Muhammed',
        choice4: 'Ibrahim Babagida',
        answer:  1,
    },
    {
        question: 'How many days do we have in a year?' ,
        choice1: '360',
        choice2: '366',
        choice3: '365',
        choice4: '356',
        answer:  3,
    },
    {
        question: 'In the book of Acts of the Apostles Jesus call Paul to be his?' ,
        choice1: 'Sharpen Instrument',
        choice2: 'Powerful instrument',
        choice3: 'Anoited instrument',
        choice4: 'Chosen   instrument',
        answer:  4,
    },
    {
        question: 'Nigeria gain her independence on?' ,
        choice1: '1st octobar 1960',
        choice2: '1st octobef 1960',
        choice3: '1st octoder 1960' ,
        choice4: '1st october 1960',
        answer:  4,
    },
    {
        question: 'The first woman to enter space is?' ,
        choice1: 'Alan shepard',
        choice2: 'Yuri Gagarin',
        choice3: 'Valentina Tereshkova' ,
        choice4: 'Hillary Clinton',
        answer:  3,
    }
]
 let numberOfQuestions = 10
const constantTime = 1
let totalCurrentTime = constantTime * 60

startTest = () => {
    setInterval(updateTime, 1000)
     questionNumber = 0;
     givenQuestions = [...arrayQuestion]
     getQuestion()
    }
    const updateTime = () =>{
        let  minute = Math.floor(totalCurrentTime/60)
         let seconds = totalCurrentTime%60
         if (minute != seconds){
             countTime.innerHTML =  `TIME ${minute} : ${seconds}`
             totalCurrentTime-- 
         }else if(minute == 0 && seconds == 0){
             countTime.innerHTML =  `TIME ${minute} : ${seconds}`
             localStorage.setItem('recentScore', mark.innerText)            
             return  window.location.assign('end.html') 
             }
             console.log(totalCurrentTime, minute)
     }
validateScore = () =>{
        let scoring
        scoring = eval(mark.innerText) + score  
        mark.innerText = scoring
       }

 getQuestion = () => {
    if ( questionNumber+1 > numberOfQuestions || givenQuestions.length == 0 ) { 
        localStorage.setItem('recentScore', mark.innerText)            
        return  window.location.assign('end.html') 
         }
        questionNumber++
        
    capusleProgression.style.width = `${(questionNumber/numberOfQuestions) * 100}%`  
    QuestionInfo.innerText = `Question ${questionNumber} of ${numberOfQuestions}`      
    const questionIndex = Math.floor(Math.random() * givenQuestions.length)
    currentQuestion = givenQuestions[questionIndex]
    console.log(questionIndex)
    //arrayQuestion[questionIndex].question
    Questions.innerText = currentQuestion.question    
//    Another way to get index of an array using for loop without change the text
//    for (let index = 0; index < arrayQuestion.length; index++) {
//     pre = arrayQuestion[index].question
//     // pre = pr.question
//     console.log(pre) 
// setTimeout(()=>{
// getQuestion()
// }, 1000)
// let res = optionText.forEach(val => {
//     val
//     console.log(val.replaceWith(`${arrayQuestion[questionIndex].choice1}`,`${arrayQuestion[questionIndex].choice2}`))
//     // val = givenQuestions
//     console.log(val.append(`${givenQuestions[questionIndex].choice1}`))
//     // console.log(val.appendChild(`{arrayQuestion}`))
// });
// let res = optionText.forEach(val=> {
//     console.log(val.getAttributeNames('data-number'))
// //   console.log(val.getSelection('data-number'))
//     console.log(val.getAttribute('class'))
//     let y = val.getAttribute('data-number') 
//    let i = val.replaceChildren(y)
//    console.log(i)
    
//     })
// console.log(val.ownerDocument) is use to check object property
// optionText.map(val=>{
//     val 
//     console.log(val.ownerDocument)
// })
optionText.forEach(val => {
    const eachOption = val.dataset['number']
    val.innerText = currentQuestion[`choice${eachOption}`] 
})
 givenQuestions.splice(questionIndex,1) 
    acceptingAnswer = true
         }
   optionText.forEach(optionValue => {
    optionValue.addEventListener('click', event =>{
        acceptingAnswer = false
        const chosenOption = event.target
        const chosenAnswer = chosenOption.dataset['number']
        let showAnwswer = currentQuestion.answer == chosenAnswer ? 'correct' : 'incorrect'
        console.log(showAnwswer)
        showAnwswer === 'correct' ? validateScore() : 'incorrect'
        chosenOption.parentElement.classList.add(showAnwswer);
        setTimeout(() =>{
            chosenOption.parentElement.classList.remove(showAnwswer)
            getQuestion()
            }, 1000)       
        }) 
   }) 
   startTest()



