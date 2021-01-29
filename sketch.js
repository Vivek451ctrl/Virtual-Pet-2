var dog,dogi, happydogi;
var database, foodS, foodStock;
var feed, addFood;
var fedTime, lastFeed;
var foodObj;

function preload()
{
  dogi = loadImage("Dog.png");
  happydogi = loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
	createCanvas(800, 800);
  dog = createSprite(200, 200);
  dog.addImage(dogi);
  dog.scale=0.15;
  foodStock.database.ref('food');
  foodStock.on("value",readStock);

  foodObj = new Food(200, 200);

  feed = createButton("feed the dog");
  feed.position(700, 95);
  feed.mousePressed(FeedDog)

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

}


function draw() {  
  background(46, 139, 87);
  display();

  fedTime = database('feedTime');
  fedTime.on("value", function(data){
     lastFeed = data.val();
  });
  if(isButtonPressed(feed)){
    dog.velocityY = 3;
  }
  drawSprites();

  fill(255, 255, 254);
  textSize(15);
  if(lastFeed >= 12){
    text("lastFeed:"+ lastFeed%12 + "PM", 350, 30);
  }else if(lastFeed==0){
    text("lastFeed : 12AM", 350, 30);
  }else{
    text("lastFeed:"+ lastFeed + "AM", 350, 30);
  }
}
function FeedDog(){
  dog.addImage(happydogi);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    food: foodObj.getFoodStock(),
    fedTime:hour()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
  food:foodS
  })
}
function readStock(){
foodS = data.val();
}
function writeStock(){
database.ref('/').update({
 food:x
})}




