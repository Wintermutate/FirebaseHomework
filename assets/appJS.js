var trainKey = "";
var flag = false;
var flag2 = false;  

$(document).ready(function(){

var config = {
    apiKey: "AIzaSyAKIpSUFCYS_MFcamFjo5jBh1m4PxXPuKY",
    authDomain: "homework-941bf.firebaseapp.com",
    databaseURL: "https://homework-941bf.firebaseio.com",
    storageBucket: "homework-941bf.appspot.com",
    messagingSenderId: "1037687740041"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  
  $('#trainInfo').on('click', function(){

	  var trainName = $('#tName').val().trim();
  	var trainDest = $('#tDestination').val().trim();
  	var trainFirstTime = moment($('#tFirstTime').val().trim()).format("HHmm");
  	var trainFreq = $('#tFrequency').val().trim();
// Logging initial variables to make sure of correct values
//   	console.log(trainName);
//   	console.log(trainDest);
//   	console.log(trainFirstTime);
//   	console.log(trainFreq);
	var newTrain = {
		trainName: trainName,
		trainDest: trainDest,
		trainFirst: trainFirstTime,
		trainFreq: trainFreq
	}
// Logging object for testing
// 	console.log(newTrain);
	 database.ref().push(newTrain);
   // console.log(trainKey);

// var ref = database.ref().push();
//   console.log(ref.ref().key());

	alert("Train succesfully added");

	$('#tName').val("");
	$('#tDestination').val("");
	$('#tFirstTime').val("");
	$('#tFrequency').val("");			
  	
  	return false;
  });

database.ref().limitToLast(1).on("child_added", function(snapshot){
  var childKey = snapshot.key;
  // console.log(childKey);
if (flag2 == true){
  
    var trainName = snapshot.val().trainName;
    var trainDest = snapshot.val().trainDest;
    var trainFirstTime = snapshot.val().trainFirst;
    var trainFreq = snapshot.val().trainFreq;

    // console.log(trainName);
    var removeButton = $("<button>");
    removeButton.attr("type", "submit");
    removeButton.addClass("btn btn-success rButton");
    removeButton.attr("data-name", trainName);
    removeButton.attr("data-key", snapshot.key);
    removeButton.text("Remove");

    var updateButton = $("<button>");
    updateButton.attr("type", "submit");
    updateButton.addClass("btn btn-success uButton");
    updateButton.attr("data-name", trainName);
    updateButton.attr("data-key", snapshot.key);
    updateButton.text("Update");

    var diffTime  = moment().diff(moment(trainFirstTime), "minutes");
    
    var tRemainder = diffTime % trainFreq;

    var tMinutesTillTrain = trainFreq - tRemainder;

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    
    var displayNextTrain = moment(nextTrain).format("hh:mm");
    
    $("#trainDisplay > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + displayNextTrain + "</td><td>" + tMinutesTillTrain + "</td><td>"+ updateButton[0].outerHTML + "</td><td>"+ removeButton[0].outerHTML + "</td></tr>");
}
    flag2 = true; 
    console.log("finished");

});

database.ref().once("value", function(snapshot){
  
  if (flag == false){
  
  snapshot.forEach(function(childSnapshot){
    
    console.log(childSnapshot.key)
    var trainName = childSnapshot.val().trainName;
    var trainDest = childSnapshot.val().trainDest;
    var trainFirstTime = childSnapshot.val().trainFirst;
    var trainFreq = childSnapshot.val().trainFreq;

    // console.log(trainName);
    var removeButton = $("<button>");
    removeButton.attr("type", "submit");
    removeButton.addClass("btn btn-success rButton");
    removeButton.attr("data-name", trainName);
    removeButton.attr("data-key", childSnapshot.key);
    removeButton.text("Remove");

    var updateButton = $("<button>");
    updateButton.attr("type", "submit");
    updateButton.addClass("btn btn-success uButton");
    updateButton.attr("data-name", trainName);
    updateButton.attr("data-key", childSnapshot.key);
    updateButton.text("Update");

    var diffTime  = moment().diff(moment(trainFirstTime), "minutes");
    
    var tRemainder = diffTime % trainFreq;

    var tMinutesTillTrain = trainFreq - tRemainder;

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    
    var displayNextTrain = moment(nextTrain).format("hh:mm");
    
    $("#trainDisplay > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFirstTime + "</td><td>" + trainFreq + "</td><td>" + displayNextTrain + "</td><td>" + tMinutesTillTrain + "</td><td>"+ updateButton[0].outerHTML + "</td><td>"+ removeButton[0].outerHTML + "</td></tr>");

    flag = true; 
  });
}

});

  $(document).on("click",".rButton", function(){
    
    var dataKey = $(this).data("key");

    database.ref(dataKey).remove();

    flag2 = false;

    console.log("finished2")

    $(this).parent().parent().remove();

  });

  $(document).on("click", ".uButton", function(){

    var dataKey = $(this).data("key");

    alert("Change the info!!");

   $('#tName').val($(this).data('name'));
   $('#tDestination').val($(this).parent().parent().children("td").eq(1).text());
   $('#tFirstTime').val($(this).parent().parent().children("td").eq(2).text());
   $('#tFrequency').val($(this).parent().parent().children("td").eq(3).text());
   $('#updateTrainInfo').css('display', 'block');
   $('#updateTrainInfo').on('click', function(){
     $(this).css('display', 'none');
   
   var trainName = $('#tName').val().trim();
   var trainDest = $('#tDestination').val().trim();
   var trainFirstTime = $('#tFirstTime').val().trim();
   var trainFreq = $('#tFrequency').val().trim();

     database.ref(dataKey).set({
    trainName: trainName,
    trainDest: trainDest,
    trainFirst: trainFirstTime,
    trainFreq: trainFreq
  })
     
   })

  });

});