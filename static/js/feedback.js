const feedbackForm = document.getElementById("feedbackForm");
const feedbackSuccess = document.getElementById("feedbackSuccess");

feedbackForm.addEventListener("submit", function (event) {

  event.preventDefault();

  feedbackSuccess.classList.add("active");

  feedbackForm.reset();

});
