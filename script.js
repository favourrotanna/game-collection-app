var addbutton = document.querySelector(".addgame");
var removebutton = document.querySelector(".removegame");
var gameinput = document.querySelector(".gameinput");
var gameList = document.querySelector(".gameList");
var confirmbox = document.querySelector(".confirmbox");
var confirmDelete = document.querySelector(".confirmDelete");
var cancelDelete = document.querySelector(".cancelDelete");
var gametoDelete = null;
var confirmMassage = document.querySelector(".confirmMassage");
var gamecount = document.querySelector(".gamecount");

addbutton.addEventListener("click", function(){

var gamename = gameinput.value.trim();

if(gamename !== "") {
  addGame(gamename);

  gameinput.value = "";
}

});

gameinput.addEventListener("keydown", function(event){
if (event.key === "Enter") {
  //console.log("ENTER ")
  event.preventDefault();

  var gamename = gameinput.value.trim();

  if (gamename !== "") {
   addGame(gamename);

 gameinput.value = "";

  }
 
}

});

function addGame(gamename){
  var newgame = document.createElement("li");
  newgame.textContent = gamename;

   var deletebutton = document.createElement("button");
  deletebutton.textContent = "delete";
  deletebutton.className = "deletebutton";

  deletebutton.addEventListener("click", function(){

     gametoDelete = newgame;
    confirmMassage.textContent = "are you sure you want to delete " + gamename + "";
    confirmbox.style.display = "block";

     });

      newgame.appendChild(deletebutton);
  gameList.appendChild(newgame);

  updategamecount();
  savegame();

}

removebutton.addEventListener("click", function(){
  if(gameList.lastElementChild) {
    gameList.removeChild(gameList.lastElementChild);
    updategamecount();
    savegame();
  }
});

confirmDelete.addEventListener("click", function(){
  if(gametoDelete !== null){
    gametoDelete.remove();
    gametoDelete = null;

    updategamecount();
    savegame();

  }

  confirmbox.style.display = "none";

});

cancelDelete.addEventListener("click", function(){
  gametoDelete = null;
  confirmbox.style.display = "none";
});

function updategamecount() {
  gamecount.textContent = "Games in collection: " + gameList.children.length;
}


function savegame(){
  var gamesArray = [];

  for (var i = 0; i < gameList.children.length; i++) {
    var gamename = gameList.children[i].firstChild.textContent.trim();
    gamesArray.push(gamename);
  }

  localStorage.setItem("myGames", JSON.stringify(gamesArray));
}

function loadgame() {
  var savegame = localStorage.getItem("myGames");

  if (savegame !== null) {
    var gamesArray = JSON.parse(savegame);
    console.log(gamesArray)

    gamesArray.forEach(function(gamename) {
      var newgame = document.createElement("li");
      newgame.textContent = gamename;

      var deletebutton = document.createElement("button");
      deletebutton.textContent = "delete";
      deletebutton.className = "deletebutton";

      deletebutton.addEventListener("click", function(){
        gametoDelete = newgame;
        confirmMassage.textContent = "Are you sure you want to delete " + gamename + "?";
        confirmbox.style.display ="block";
      });

      newgame.appendChild(deletebutton);
      gameList.appendChild(newgame);

    });

  }

  updategamecount();

}

loadgame();
