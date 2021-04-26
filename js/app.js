import Question from "./Question.js"
import Quiz  from "./Quiz.js"


const App = (() => {
    //caching the DOM
    const quizEl = document.querySelector(".quiz");
    const quizQuestionEl = document.querySelector(".question");
    const trackerEl = document.querySelector(".tracker");
    const taglineEl = document.querySelector(".tagline")
    const choicesEl = document.querySelector(".choices")
    const progressInnerEl = document.querySelector(".progress__bar")
    const nxtButtonEl = document.querySelector(".next__btn")
    const rstrtButtonEl = document.querySelector(".restart__btn")

    const q1 = new Question(
        "Who is the owner of Lyrical Lemonade",
        ["Daniel James","Cole Benett","Tayler Holder","Jake Paul"],
        1
    )
    const q2 = new Question(
        "What year did Kanye release The Life Of Pablo",
        ["2021","2014","2019","2016"],
        3
    )
    const q3 = new Question(
        "Who is the CEO of The Boring Company",
        ["Elon Musk","Ray Charles","J Cole","Steph Curry"],
        0
    )
    const q4 = new Question(
        "Who knocked out Basketball vet Nate Robinson",
        ["Mike Majlak","Lana Rhoades","Jake Paul","Logan Paul"],
        2
    )
    const q5 = new Question(
        "Who is the president of Real Madrid",
        ["Stan Kroenke","Joel Glazer","Florentino Perez","Vinicius Jnr"],
        2
    )

    const myQuiz = new Quiz([q1,q2,q3,q4,q5])

    const renderHtml = (elem,variable) => {
        elem.innerHTML = variable
    }

    const renderQuestion = _ =>{
        let currentQuestion = myQuiz.getCurrentQuestion().question
        renderHtml(quizQuestionEl,currentQuestion)
    }
    renderQuestion()

    const renderTracker = _ => {
        let tracker = ` ${myQuiz.currentIndex + 1} of ${myQuiz.questions.length}`
        renderHtml(trackerEl,tracker)
    }

    const renderChoices = _ => {
        let markUp= "";
        let currentChoices = myQuiz.getCurrentQuestion().choices;
        currentChoices.forEach((elem,index) => {
            markUp += `
            <li class="choice">
            <input type="radio" name="choice" class="input" data-order="${index}" id="choice${index}"> 
            <label for="choice${index}" class="label" id="choice${index}">
                <i></i>
                <span>${elem}<span>
            </label>
        </li>
            `
        })
        renderHtml(choicesEl,markUp)
    }

    const getPercentage = (num1, num2) => {
        return Math.round((num1/num2)*100);
    }

    const launch = (width, maxPercent) => {
        let loadingBar = setInterval(function(){
            if(width > maxPercent){
                clearInterval(loadingBar)
            }else{
                ++width
                progressInnerEl.style.width = width +"%"
               
            }
            
        }, 3)
    }
    
    
    const renderProgress = _ => {
        const currentWidth = getPercentage(myQuiz.currentIndex,myQuiz.questions.length)
        launch(0,currentWidth)
    }

    const renderEndScreen = _ => {
        renderHtml(quizQuestionEl,"Great Job!")
        renderHtml(taglineEl,"Complete")
        renderHtml(trackerEl,`Your score: ${myQuiz.score} of ${myQuiz.questions.length} `)
        nxtButtonEl.style.opacity = 0;
        renderProgress()
    }
    
    const listeners = _ => {
    nxtButtonEl.addEventListener("click",function(){
    const selectRadioEl = document.querySelector('input[name="choice"]:checked')
    if(!selectRadioEl){
        alert("select an answer")
    }else{
        const key = +selectRadioEl.getAttribute("data-order")
        myQuiz.guess(key);
        renderAll()
    }
    
    }) 
    rstrtButtonEl.addEventListener("click",function(){
         myQuiz.reset();
         
         renderAll()

         nxtButtonEl.style.opacity = 1;

         renderHtml(taglineEl,"Pick an option below")
    })

}
    
    
    const renderAll = _ => {
        if(myQuiz.hasEnded()){
            //renderEndScreen
            renderEndScreen()
        }else{
             //Render Questions
        renderQuestion()
        //Render Tracker
        renderTracker()
        //Render Choices
        renderChoices()
        //Render Progress
        renderProgress()
        }


    }
    
    return {
        renderAll:renderAll,
        listeners:listeners
    }

    
})();
App.renderAll()
App.listeners()

