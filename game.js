var userClickedPattern=[]
var gamePattern =[];
var buttonColours = ["green","red","yellow","blue"];
var level=0;
var foo = true;


function nextSequence()
{
	// random number genration from 0 to 3
	var randomNumber =Math.floor( Math.random()*4);

	// random color genration 
	var randomChosenColour =buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);

	// adding animation 	
	setTimeout(function(){$("#"+randomChosenColour).fadeOut(100).fadeIn(100);},1000);
  
  setTimeout(function(){myFunction1()},1000)
	level++;
	$("h1").text("Level "+level);
}

function reset(){
    level =0;
    gamePattern=[];
    userClickedPattern=[];
    foo = true;

    myFunction()

    $("body").addClass("game-over")
    setTimeout(function(){$("body").removeClass("game-over")},200)
    $("body").keydown(function(event){
    	if(foo===true){
	  	nextSequence();
	  	foo=false
	    }
    })
}

function checkAnswer(){
	for(var i=0;i<userClickedPattern.length;i++){
	    if(userClickedPattern[i]===gamePattern[i]){
	    	console.log("Sucsess");
	    	console.log(i)

	        if(userClickedPattern.length===gamePattern.length){
	        	if(userClickedPattern[userClickedPattern.length-1]===gamePattern[gamePattern.length-1]){
	        	console.log("yes")
	        	nextSequence();
	        	userClickedPattern=[]
	        	break;
                }
                else{
                	console.log("wrong");
	    	        $("h1").text("Game Over, Press Any Key To Restart");
	    	        reset();
	    	        break;
	            }
            }
	    }    
	    else  {
	    	console.log("wrong");
	    	$("h1").text("Game Over, Press Any Key To Restart");
	    	reset();
	    	break;
	    }
    }
}

$("body").keydown(function(event){
	var keyEntered =event.key;
	if(keyEntered==='a'||keyEntered==='A'& foo===true){
		nextSequence();
		foo=false		
	}
})

// even listner to  button
$(".btn").click(function()
{
	// getting the id of the clciked button
	var userChosenColour = $(this).attr("id");
	
	// storing id name inside userClickedPattern array
	userClickedPattern.push(userChosenColour);
	
	// adding sound to clicked button
	var audio = new Audio("sounds/"+userChosenColour+".mp3");
	audio.play();

	// adding css class to make animation for preesed button
	$("."+userChosenColour).addClass("pressed");
	setTimeout(function(){ $("."+userChosenColour).removeClass("pressed");} , 300);
    
    // callng checkAnswer Function
	checkAnswer()
	
})

function play(audio) {
    audio.play();
    return new Promise(function(resolve, reject) {
        audio.addEventListener('ended', resolve);
    });
}

function myFunction() {
    var audio1 = new Audio('sounds/wrong.mp3');
    audio1.play()

    // play(audio1)
}
function myFunction1() {
    var audio2 = new Audio("sounds/"+gamePattern[gamePattern.length-1]+".mp3");
    audio2.play()
    
    // play(audio2)
}
