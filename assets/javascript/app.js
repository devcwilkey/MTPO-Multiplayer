var that = this;
var gameSettings = {
    charName : "",
    loadLocalStorage : function(){
        var localMTPO = JSON.parse(localStorage.getItem("MTPOGame"))
        if(localMTPO){
            $("#formCharacterName").attr("value",localMTPO.localCharacterName)
            return localMTPO;
        } else {
            return false;     
        }
    }
}

var chatFeature = {
    chatSettings : {
        enableChat : false,
        numofPrevMsg : 0
    },
    printChat : function (){
        console.log("printChat")
    },
    sendMessage : function(){
        console.log("sendMessage")

    },
    setChatButton : function (){
        var buttonMsg = $("<span>");
        var theChatButton = $("#theChatButton");
        if(this.chatSettings.enableChat){
            theChatButton.attr("class","btn btn-danger ml-2 text-white");
            buttonMsg.text("Disable Chat");
            $("#inGameChat").show();
            this.chatSettings.enableChat = false;
        } else {
            theChatButton.attr("class","btn btn-warning ml-2 text-white align-self-end");
            buttonMsg.text("Enable Chat");
            $("#inGameChat").hide();6
            this.chatSettings.enableChat = true;
        }
        theChatButton.empty();
        theChatButton.append(buttonMsg);
    }
}

// Same thing as $(documnet).ready(function(){}); ----- Shorthand version $(function(){})
$(function(){
    // Initialize the FirebaseUI Widget using Firebase.
    $("#gameArea").hide()
    ///PERFORM EVALS
    var localMTPOGame = that.gameSettings.loadLocalStorage()
    if(localMTPOGame){
        console.log("Pre-Loaded Content")
    }
    $("#inGameChat").hide()
    $("#characterCard").hide()
    that.chatFeature.chatSettings.numofPrevMsg = $(this).val()
    that.chatFeature.setChatButton()
    $("#gameArea").show()
});


$("#setName").on("click", function(){
    if($("#formCharacterName").val().trim() !== ""){
        connectionsRef.once("value").then(function(snapshot){
            console.log(snapshot.val())
        })
        localCharacterObj = {localCharacterName : $("#formCharacterName").val().trim()}
        localCharacterObj = JSON.stringify(localCharacterObj)
        localStorage.setItem("MTPOGame",localCharacterObj)
        var userLoggedIn = true
    }

    if(userLoggedIn){
        $("#actualName").text($("#formCharacterName").val().trim())
        $("#formCharacter").hide()
        $("#characterCard").show()

    }
    
})

$("#sendMessage").on("click",function(){
    console.log($("#formChatMessage").val().trim());
    $("#formChatMessage").val('')
})

$("#numofChatMessages").on("change",function(){
    that.chatFeature.chatSettings.numofPrevMsg = $(this).val()
    console.log($(this).val());
})

$(document).on("click","#theChatButton",function(){
    that.chatFeature.setChatButton()
})


$("#login").on("click",function(){
    // The start method will wait until the DOM is loaded.
    $("#gameArea").hide()
    ui.start('#firebaseui-auth-container', uiConfig);

})
