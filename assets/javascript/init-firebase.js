var that=this;

// TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = {
  apiKey: "AIzaSyAtE1wSDJkOL13BmWnGSNnQXgfIwsbQ-Gg",
  authDomain: "miketysonsrockpaperscissor.firebaseapp.com",
  databaseURL: "https://miketysonsrockpaperscissor.firebaseio.com",
  projectId: "miketysonsrockpaperscissor",
  storageBucket: "",
  messagingSenderId: "72211857076",
  appId: "1:72211857076:web:24a5eabda1f9b415"
};
  
// Initialize Firebase
var defaultApplication = firebase.initializeApp(firebaseConfig);
var database = firebase.database();

// value set when Firebase is Connected
var connectedRef = database.ref(".info/connected");
var connectionsRef = database.ref("/connections");
var usersRef = database.ref("/users")
var fightsRef = database.ref("/fights")


connectedRef.on("value", function(state) {
  if (state.val()) {
    var con = connectionsRef.push(true);
    con.onDisconnect().remove();
    console.log(con.key)
  }
});