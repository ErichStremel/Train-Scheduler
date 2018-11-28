
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCjymyMD6AM6eOyCRMKdkF8Y7jAMRJCTZw",
    authDomain: "train-scheduler1-e3956.firebaseapp.com",
    databaseURL: "https://train-scheduler1-e3956.firebaseio.com",
    projectId: "train-scheduler1-e3956",
    storageBucket: "train-scheduler1-e3956.appspot.com",
    messagingSenderId: "761061767804"
};
firebase.initializeApp(config);

var database = firebase.database();

// on click button that adds the Train
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // grabs the user input
    var trainName = $("#train-name-input").val().trim();
    var desName = $("#destination-input").val().trim();
    var trainTime = $("#time-input").val().trim(); // attach a specified format?
    var trainFreq = $("#frequency-input").val().trim(); // attach a specified format?

    //create a local "temporary" object for holding employee data

    var newTrain = {
        name: trainName,
        destination: desName,
        time: trainTime,
        frequency: trainFreq,
    };

    //uploads employee data to the database
    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);

    alert("New destination added.")

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");


})

// on click button that adds the Train
$("#add-train-button").on("click", function (event) {
    event.preventDefault();

    // grabs the user input
    var trainName = $("#train-name-input").val().trim();
    var desName = $("#destination-input").val().trim();
    var trainTime = moment($("#time-input").val().trim(), "HH:mm").subtract(10,"years").format("X"); // attach a specified format?
    var trainFreq = $("#frequency-input").val().trim(); // attach a specified format?

    console.log(trainTime);
    //create a local "temporary" object for holding employee data

    var newTrain = {
        name: trainName,
        destination: desName,
        time: trainTime,
        frequency: trainFreq,
    };

    //uploads employee data to the database
    database.ref().push(newTrain);

    // console.log(newtrain.name);
    // console.log(newTrain.destination);
    // console.log(newtrain.time);
    // console.log(newTrain.frequency);

    alert("New destination added.")

    // clears text boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
});

// Create Firebade event for adding train to the database and a new row in the html 
database.ref().on("child_added", function (childSnapshot) {
    // console.log(childSnapshot.val());

    // store variables
    var trainName = childSnapshot.val().name;
    var desName = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFreq = childSnapshot.val().frequency;

    // console.log(trainName);
    // console.log(desName);
    // console.log(trainTime);
    // console.log(trainFreq);


    // calculations for train times******

    // var = 

    // var = 

  // new row creation

    $("#schedule-table > tbody").append($("<tr>")
    .append($("<td>").text(trainName),
    $("<td>").text(desName),
    $("<td>").text("TBD"),
    $("<td>").text("TBD"),
    $("<td>").text("TBD")));


    //append the new row to the table
   
});