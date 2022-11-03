function newgame() {
  randomAttack();
  $("button")[0].style.display = "none";
}
var health = 100;

function livingEnemies() {
  return $(".enemy:not(.dead)");
}

function randomAttack() {
  if (health > 0) {
    if (livingEnemies) {
      var enemyNumber = Math.floor(Math.random() * livingEnemies().length);
      var randomEnemy = $("#" + livingEnemies()[enemyNumber].id);
      var randomDelay = Math.floor(Math.random() * 2000) + 500;
      setTimeout(() => {
        enemyAttack(randomEnemy);
        randomAttack();
      }, randomDelay);
    }
  }
}

function enemyAttack(enemy) {
  enemy.addClass("showing");
  setTimeout(function () {
    if (!enemy.hasClass("dead")) {
      enemy.addClass("shooting");
      updateHealth(health - 20);
      setTimeout(function () {
        enemy.removeClass("shooting");
        setTimeout(function () {
          enemy.removeClass("showing");
        }, 150);
      }, 200);
    }
  }, 1000);
}

$(".enemy").click(function () {
  var enemyClicked = $("#" + this.id);
  enemyClicked.addClass("dead");
  if (!livingEnemies().length) {
    alert("WIN");
    window.location.reload();
  }
});

function updateHealth(points) {
  health = points;
  var healthBar = $("#healthbar")[0]; //this returnins an array so we cant change width of element which is residing at 0 index but we can addclass/delete easily without any problem
  healthBar.style.width = points + "%";

  if (health < 1) {
    health = 0;
    var healthBar = $("#healthbar")[0];
    healthBar.style.width = points + "%";
    setTimeout(function () {
      if (livingEnemies().length) {
        alert("GAME OVER");
        window.location.reload();
      }
    }, 500);
  }
}
