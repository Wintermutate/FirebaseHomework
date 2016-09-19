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

	alert("Train succesfully added");

	$('#tName').val("");
	$('#tDestination').val("");
	$('#tFirstTime').val("");
	$('#tFrequency').val("");			
  	
  	return false;
  })

})