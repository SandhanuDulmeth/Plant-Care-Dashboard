





////////////////////////Chat Bot/////////////////////
const chatList = [];

let user = "";



function sendMassage() {
    console.log("Send!!");

    let txtUserInput = document.getElementById("txtUserInput").value;
    let chatBubble = "";

    chatBubble = `<h5 class="text-end  ">${txtUserInput} <i class="bi bi-brilliance"></i></h5>`;


    chatList.push(chatBubble);

    loadChatBox();
    API(txtUserInput);

    console.log(chatList);
}

function loadChatBox() {
    document.getElementById("chatBox").innerHTML = "";
    chatList.forEach(element => {
        document.getElementById("chatBox").innerHTML += element;
    })

}


function API(txtUserInput) {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "contents": [
            {
                "parts": [
                    {
                        "text": `"${txtUserInput}"`
                    }
                ]
            }
        ]
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
    };

    fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAPWUOShLApOHAcV0Oq7YNM16DCyDeuRa4", requestOptions)
        .then((response) => response.json())
        .then((result) => {

            let chatBubble = `<h5 class="text-start  "><i class="bi bi-bullseye"></i> ${result.candidates[0].content.parts[0].text}</h5>`;

            chatList.push(chatBubble);
            document.getElementById("chatBox").innerHTML += `<h5 class="text-start  "><i class="bi bi-bullseye"></i> ${result.candidates[0].content.parts[0].text}</h5>`

        })

        .catch((error) => console.error(error));

}






