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


  // var updateButton = $("<button>");
  // updateButton.attr("type", "submit");
  // updateButton.addClass("btn btn-success uButton");
  // updateButton.attr("data-name", trainName);

  // var removeButton = $("<button>");
  // removeButton.attr("type", "submit");
  // removeButton.addClass("btn btn-success rButton");
  // removeButton.attr("data-name", trainName);

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

	alert("Train succesfully added");

	$('#tName').val("");
	$('#tDestination').val("");
	$('#tFirstTime').val("");
	$('#tFrequency').val("");			
  	
  	return false;
  });

  database.ref().on("child_added", function(snapshot, prevChildKey){
  	// console.log(snapshot.val());
  	
  	var trainName = snapshot.val().trainName;
  	var trainDest = snapshot.val().trainDest;
  	var trainFirstTime = snapshot.val().trainFirst;
  	var trainFreq = snapshot.val().trainFreq;

  	// console.log(trainName);
  	var removeButton = $("<button>");
  	removeButton.attr("type", "submit");
  	removeButton.addClass("btn btn-success rButton");
  	removeButton.attr("data-name", trainName);
  	// removeButton.attr("id", "rButton");
  	// removeButton.text('Remove');

  	var updateButton = $("<button>");
  	updateButton.attr("type", "submit");
  	updateButton.addClass("btn btn-success uButton");
  	updateButton.attr("data-name", trainName);
  	// updateButton.attr('id', 'uButton');
  	// updateButton.text('Update');

    // var updateButton = $('<button>', {
    //   text: 'Update',
    //   id: 'uButton',
    //   type: 'submit',
    //   class: 'btn btn-success',
    //   data-name: trainName

    // });
  	var diffTime  = moment().diff(moment(trainFirstTime), "minutes");
  	
  	var tRemainder = diffTime % trainFreq;

  	var tMinutesTillTrain = trainFreq - tRemainder;

  	var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  	
  	var displayNextTrain = moment(nextTrain).format("hh:mm");
  	
  	$("#trainDisplay > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + displayNextTrain + "</td><td>" + tMinutesTillTrain + "</td><td>"+ updateButton + "</td><td>"+ removeButton + "</td></tr>");
	
  });

});