//event listeners

function eventListeners() {
  const showBtn = document.getElementById("show-btn");
  const questionCard = document.querySelector(".question-card");
  const closeBtn = document.querySelector(".close-btn");
  const form = document.getElementById("question-form");
  const feedback = document.querySelector(".feedback");
  const questionInput = document.getElementById("question-input");
  const answerInput = document.getElementById("answer-input");
  const questionList = document.getElementById("questions-list");
  let data = [];
  let id = 1;

  //new UI instance
  const ui = new UI();
  //show Questions Form
  showBtn.addEventListener("click", function() {
    ui.showQuestion(questionCard);
  });

  //hide Questions Form
  closeBtn.addEventListener("click", function() {
    ui.hideQuestion(questionCard);
  });

  //Add Question Form
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    const questionValue = questionInput.value;
    const answerValue = answerInput.value;

    if (questionValue === "" || answerValue === "") {
      feedback.classList.add("showItem", "alert-danger");
      feedback.textContent = "cannot ad empty values";
      setTimeout(() => {
        feedback.classList.remove("showItem", "alert-danger");
      }, 4000);
    } else {
      const question = new Question(id, questionValue, answerValue);
      data.push(question);
      id++;
      ui.addQuestion(questionList, question);
      ui.clearFields(questionInput, answerInput);
    }
  });

  //Work With a Question
  questionList.addEventListener("click", function(event) {
    event.preventDefault();
    if (event.target.classList.contains("delete-flashcard")) {
      let id = event.target.dataset.id;

      questionList.removeChild(
        event.target.parentElement.parentElement.parentElement
      );
      let tempData = data.filter(item => {
        return item.id !== parseInt(id);
      });
      data = tempData;
    } else if (event.target.classList.contains("show-answer")) {
      event.target.nextElementSibling.classList.toggle("showItem");
    } else if (event.target.classList.contains("edit-flashcard")) {
      let id = event.target.dataset.id;
      //delete question from DOM
      questionList.removeChild(
        event.target.parentElement.parentElement.parentElement
      );
      //show question card
      ui.showQuestion(questionCard);
      //specific question
      const tempQuestion = data.filter(item => {
        return item.id === parseInt(id);
      });
      //rest of the data
      let tempData = data.filter(item => {
        return item.id !== parseInt(id);
      });
      data = tempData;
      questionInput.value = tempQuestion[0].title;
      answerInput.value = tempQuestion[0].answer;
    }
  });
}

//UI constructor
function UI() {}
//show Question Card
UI.prototype.showQuestion = function(element) {
  element.classList.add("showItem");
};

//Hide Question Card
UI.prototype.hideQuestion = function(element) {
  element.classList.remove("showItem");
};

//Add Question
UI.prototype.addQuestion = function(element, question) {
  const div = document.createElement("div");
  div.classList.add("col-md-4");
  div.innerHTML = `
    <div class="card card-body flashcard my-3">
    <h4 class="text-capitalize">${question.title}</h4>
    <a href="#" class="text-capitalize my-3 show-answer">show/hide answer</a>
    <h5 class="answer mb-3">${question.answer}</h5>
    <div class="flashcard-btn d-flex justify-content-between">
    <a href="#" id="edit-flashcard" class=" btn my-1 edit-flashcard text-uppercase" data-id="${
      question.id
    }">edit</a>
    <a href="#" id="delete-flashcard" class=" btn my-1 delete-flashcard text-uppercase"
    data-id="${question.id}">delete</a>
    </div>
    </div>`;
  element.appendChild(div);
};

//clear Fields
UI.prototype.clearFields = function(question, answer) {
  question.value = "";
  answer.value = "";
};

//question constructor
function Question(id, title, answer) {
  this.id = id;
  this.title = title;
  this.answer = answer;
}

//DOM Event Listener

document.addEventListener("DOMContentLoaded", function() {
  eventListeners();
});
