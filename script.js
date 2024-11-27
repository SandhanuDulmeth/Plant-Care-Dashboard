
//////////////////////////////////////Year_Fertilizer//////////////////////
function Year_Fertilizer() {

    document.getElementById("main").innerHTML = '';

    Swal.fire({
        position: "center",
        icon: "success",
        title: "Successfully load the data set",
        showConfirmButton: false,
        timer: 1500
    });

    const xlabels = [];
    const ytemps = [];

    setTimeout(() => {
        chartYear_Fertilizer();
    }, 1000);

    async function chartYear_Fertilizer() {

        await getdataYear_Fertilizer();
        const ctx = document.getElementById('myChart');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: xlabels,
                datasets: [{
                    label: 'Crop yield(Year Fertilizer)',
                    data: ytemps,
                    borderWidth: 1,
                    backgroundColor: [
                        "rgba(7, 85, 193, 0.92)",
                        "rgba(109, 85, 193, 0.92)",
                        "rgba(26, 167, 35, 0.92)"
                    ],
                }]
            },
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Year'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Fertilizer'
                        }
                    }
                }
            }
        });
    }

    async function getdataYear_Fertilizer() {
        const res = await fetch('crop_yield.csv');
        const list = await res.text();

        const table = list.split('\n').slice(1);
        table.forEach(row => {
            const columns = row.split(",");
            const year = columns[1];
            xlabels.push(year)
            const Production = columns[7];
            ytemps.push(Production);
        });




    }
}







////////////////////////////Year_Annual_Rainfall/////////////////////////////////////
function Year_Annual_Rainfall() {

    document.getElementById("main").innerHTML = '';

    Swal.fire({
        position: "center",
        icon: "success",
        title: "Successfully load the data set",
        showConfirmButton: false,
        timer: 1500
    });

    const xlabels = [];
    const ytemps = [];

    setTimeout(() => {
        chartYear_Annual_Rainfall();
    }, 1000);

    async function chartYear_Annual_Rainfall() {

        await getdataYear_Annual_Rainfall();
        const ctx = document.getElementById('myChart');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: xlabels,
                datasets: [{
                    label: 'Crop yield(Year & Annual Rainfall)',
                    data: ytemps,
                    borderWidth: 1,
                    backgroundColor: [
                        "rgba(7, 85, 193, 0.92)",
                        "rgba(109, 85, 193, 0.92)",
                        "rgba(26, 167, 35, 0.92)"
                    ],
                }]
            },
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Year'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Annual Rainfall'
                        }
                    }
                }
            }
        });
    }

    async function getdataYear_Annual_Rainfall() {
        const res = await fetch('crop_yield.csv');
        const list = await res.text();

        const table = list.split('\n').slice(1);
        table.forEach(row => {
            const columns = row.split(",");
            const year = columns[1];
            xlabels.push(year)
            const Production = columns[6];
            ytemps.push(Production);
        });




    }
}


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


////////////////////////////////////////////////////////////

function dataSetLink() {
    document.getElementById("main").innerHTML = `<a class="icon-link icon-link-hover" href="https://www.kaggle.com/datasets/patelris/crop-yield-prediction-dataset">
  Click me to copy link
  <svg class="bi" aria-hidden="true"><use xlink:href="#arrow-right"></use></svg>
</a>`;

}



