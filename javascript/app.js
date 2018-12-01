
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
    database.ref().push({
        train: trainName,
        where: desName,
        start: trainTime,
        often: trainFreq
    });
    //uploads employee data to the database

    alert("New destination added.")

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");


});

// Create Firebade event for adding train to the database and a new row in the html 
database.ref().on("child_added", function (childSnapshot) {
    // console.log(childSnapshot.val());

    // store variables/ do calculations
    var startConverted = moment(childSnapshot.val().start, "HH:mm").subtract(1, "days");
    var diffTime = moment().diff(moment(startConverted), "minutes");
    var tFrequency = childSnapshot.val().often;
    var tRemainder = diffTime % tFrequency;
    var minsAway = tFrequency - tRemainder;

    console.log("diffTime: " + diffTime)
    var nextArrival = moment().add(minsAway, "minutes").format("hh:mm");


    // append the row to the table
    $("tbody").append("<tr><td>" + childSnapshot.val().train + "</td><td>" + childSnapshot.val().where + "<td>" + childSnapshot.val().often + "<td>" + nextArrival + "<td>" + minsAway);

    //append the new row to the table

});