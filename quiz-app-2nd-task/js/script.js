// REQUIRED ELEMENTS
const start_btn = document.querySelector('.start-btn');
const info_box = document.querySelector('.info-box');
const exit_btn = info_box.querySelector('.buttons .quit');
const continue_btn = info_box.querySelector('.buttons .restart');
const quiz_box = document.querySelector('.quiz-box');
const result_box = document.querySelector('.result-box')
const option_list = document.querySelector('.option-list');
const timeText = document.querySelector('.timer .time-left-text');
const timeCount = document.querySelector('.timer .timer-sec');
const next_btn = document.querySelector('footer .next-btn');
const bottom_question_number = document.querySelector('footer .total-que .ques-number');
const time_line = document.querySelector('header .time-line')
const restart_quiz = document.querySelector('.button .restart');
const quit_quiz = document.querySelector('.button .quit')

// REQUIRED VARIABLES
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter = 0;
let timeValue = 15;
let counterLine;


// IF STARTQUIZ BUTTON CLICKED
start_btn.onclick = function(){
  info_box.classList.add('activeInfo');
  start_btn.classList.add('hide');
};

// IF EXITQUIZ BUTTON CLICKED
exit_btn.onclick = function(){
  info_box.classList.remove('activeInfo');
  start_btn.classList.remove('hide');
};

// IF CONTINUE QUIZ BUTTON CLICKED
continue_btn.onclick = function(){
  info_box.classList.remove('activeInfo'); //hide info box
  quiz_box.classList.add('activeQuiz'); //show quiz box
  showQuestions(0); //calling this function
  queCounter(1); //passing 1 because question number counter starts with 1
  startTimer(15); // Calling start timer function
  startTimerLine(0);
  next_btn.classList.remove('show');
};


// GETTING QUESTION AND OPTION FROM THE ARRAY
function showQuestions(index){
  const que_text = document.querySelector('.que-text');
  let que_tag = '<span>'+questions[index].numb+". "+questions[index].question+'</span>';
  let option_tag = '<div class="option">'+questions[index].options[0]+'</div>'
                  +'<div class="option">'+questions[index].options[1]+'</div>'
                  +'<div class="option">'+questions[index].options[2]+'</div>'
                  +'<div class="option">'+questions[index].options[3]+'</div>';

  que_text.innerHTML = que_tag;
  option_list.innerHTML = option_tag;
  const option = option_list.querySelectorAll('.option'); // Return Nodelist 

  // SETTING ONCLICK ATTRIBUTE TO A AVAILABLE OPTION
  for(let i=0; i<option.length; i++){
    option[i].setAttribute('onclick', 'optionSelected(this)');
  }
};


// creating the new div tags for our right/wrong svg's
let tickIconTag = '<div class="icon"><svg class="icon icon-tick" http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="#046404f9"  d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.959 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591z"/></svg></div>';
let crossIconTag = '<div class="icon"><svg class="" http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48"><path fill="#f44336" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#fff" d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"></path><path fill="#fff" d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"></path></svg></div>';


// WHEN USER IS CLICKING TO THE OPTION 
function optionSelected(answer){
  clearInterval(counter); //stopping timer when user clicks on the option
  clearInterval(counterLine);
  let userAns = answer.textContent; //User selected option will come here 
  let correctAns = questions[que_count].answer; //The correct ans defined in the array
  const allOptions = option_list.children.length; //getting all option items

  // USER SELECTS THE CORRECT OPTION
  if(userAns === correctAns){
    userScore += 1;
    answer.classList.add('correct');  //adding green color to correct option
    answer.insertAdjacentHTML('beforeend', tickIconTag);  //adding tick icon to correct option
  }
  else{
    answer.classList.add('incorrect');
    answer.insertAdjacentHTML('beforeend', crossIconTag);

    // SHOWING THE CORRECT ANSWER AFTER USER CHOOSE THE WRONG OPTION
    for(let i=0; i<allOptions; i++){
      if(option_list.children[i].textContent === correctAns){
        option_list.children[i].setAttribute('class', 'option correct');
        option_list.children[i].insertAdjacentHTML('beforeend', tickIconTag);
      }
    }
  };
  // DISABLING POINTER EVENTS AFTER USER SELECT OPTION
  for(let i=0; i<allOptions; i++){
    option_list.children[i].classList.add("disabled"); // once user selects option then afterthat all options will get disabled.
  }
  // SHOWING NEXT BUTTON ONLY WHEN USER CLICKS ON OPTION
  next_btn.classList.add('show');
};


// DISPLAYING QUESTION COUNTER
function queCounter(index){
  let totalQuestionTag = '<span class="cur-ques">'+index+'</span>' 
                        +'<span class="all-ques">/'+questions.length+'</span>'
                        +'<span class="ques-text">Questions</span>'
  bottom_question_number.innerHTML = totalQuestionTag;
}


// TIMER FUNCTIONALITY
function startTimer(time){
  counter = setInterval(timer, 1000);
  function timer(){
    timeCount.textContent = time;
    time--;
    if(time<9){
      timeCount.textContent = '0' + timeCount.textContent;
    }
    if(time<0){
      clearInterval(counter);
      timeText.textContent = 'Time Over';
      const allOptions = option_list.children.length;
      let correctAns = questions[que_count].answer;

      for(let i=0; i<allOptions; i++){
        if(option_list.children[i].textContent === correctAns){
          option_list.children[i].setAttribute('class', 'option correct');
          option_list.children[i].insertAdjacentHTML('beforeend', tickIconTag);
        }
      }
      for(let i=0; i<allOptions; i++){
        option_list.children[i].classList.add("disabled"); // once user selects option then afterthat all options will get disabled.
      }
      next_btn.classList.add('show');
    }
  };
};


// FUNCTION FOR TIME LINE
function startTimerLine(time){
  counterLine = setInterval(timer, 20);
  function timer(){
    time += 1;
    time_line.style.width = time+'px';
    if(time > 800){
      clearInterval(counterLine);
    }
  }
};


// NEXT BUTTON FUNCTIONALITY
next_btn.onclick = ()=>{
  if(que_count < questions.length-1){
    que_count++;
    que_numb++
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);
    startTimerLine(0)
    timeText.textContent = 'Time Left';  //change timetext 
    next_btn.classList.remove('show')  //removing next-button after clicking on it
  }else{
    // console.log('Congrats!! question completed');
    clearInterval(counter);
    clearInterval(counterLine);
    showResult();
  }
};


// SHOWING RESULT FUNCTION
function showResult(){
  info_box.classList.remove('activeInfo');
  quiz_box.classList.remove('activeQuiz');
  result_box.classList.add('activeResult');
  const score_text = document.querySelector('.score-text');
  let scoreTag = '';

  if(userScore >= 3){
    scoreTag = '<span>and congrats, You got ' +userScore+ ' out of '+questions.length+'</span>';
  }else if(userScore > 1){
    scoreTag = '<span>and nice, You got ' +userScore+ ' out of '+questions.length+'</span>';
  }else{
    scoreTag = '<span>and sorry, You got ' +userScore+ ' out of '+questions.length+'</span>';
  }
  score_text.innerHTML = scoreTag;
}

// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
  quiz_box.classList.add("activeQuiz"); //show quiz box
  result_box.classList.remove("activeResult"); //hide result box
  timeValue = 15; 
  que_count = 0;
  que_numb = 1;
  userScore = 0;
  widthValue = 0;
  showQuestions(que_count); //calling showQestions function
  queCounter(que_numb); //passing que_numb value to queCounter
  clearInterval(counter); //clear counter
  clearInterval(counterLine); //clear counterLine
  startTimer(timeValue); //calling startTimer function
  startTimerLine(widthValue); //calling startTimerLine function
  timeText.textContent = "Time Left"; //change the text of timeText to Time Left
  next_btn.classList.remove("show"); //hide the next button
}

// if quitQuiz button clicked
quit_quiz.onclick = ()=>{
  window.location.reload(); //reload the current window
}


