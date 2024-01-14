//Get variable from highscores.html
var highscores = document.getElementById('highscores');
var clear = document.getElementById('clear');
UserScore = JSON.parse(localStorage.getItem("score"));
const li = document.createElement("li");
li.textContent = UserScore[0] + ' - ' + UserScore[1];
highscores.appendChild(li);

clear.addEventListener("click", function() {
    highscores.removeChild(li);
    localStorage.setItem("score","");
});