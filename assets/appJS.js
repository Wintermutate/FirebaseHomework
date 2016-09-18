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

  	console.log(trainName);
  	console.log(trainDest);
  	console.log(trainFirstTime);
  	console.log(trainFreq);

  	return false;
  })

})