
function crop() {
    let main =document.getElementById("main")
main.innerHTML='';
    const xlabels = [];
    const ytemps = [];


    chart();

    async function chart() {
        await getdata();
        const ctx = document.getElementById('myChart');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: xlabels,
                datasets: [{
                    label: 'Crop yield(Annual Rainfall)',
                    data: ytemps,
                    //data: [dataArry[0]],
                    borderWidth: 1,
                    backgroundColor: [
                        "rgba(7, 85, 193, 0.92)",
                        "rgba(109, 85, 193, 0.92)",
                        "rgba(26, 167, 35, 0.92)"
                    ],
                    // borderColor: "rgba(75, 192, 192, 1)",
                    //fill: true
                }]
            },
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Year' // Label for X-axis
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Annual Rainfall' // Label for Y-axis
                        }
                    }
                }
            }
        });
    }





    async function getdata() {
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

function homePage() {
    document.body.innerHTML = '';
    document.body.innerHTML=`<nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <img src="images/_78b3614e-0c2b-40b6-b913-5570eda6806b.jpg" alt="" class="imgDashBoard">
                Plant Care Dashboard
            </a><br>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon "></span>
            </button> 
            <div class="collapse navbar-collapse" id="navbarNav">
                <!-- Add navigation items -->
                <a class="btn btn-primary" href="index.html" role="button" onclick="homePage()"><i class="bi bi-send"></i>&nbsp;
                    Home </a>
                <a class="btn btn-primary" href="#" role="button" onclick="crop()"><i class="bi bi-send"></i>&nbsp;
                    Primary Link</a>
                <a class="btn btn-primary" href="#" role="button" onclick=""><i class="bi bi-send"></i>&nbsp;
                    Primary Link</a>
                <a class="btn btn-primary" href="#" role="button" onclick=""><i class="bi bi-send"></i>&nbsp;
                    Primary Link</a>
            </div>
        </div>
    </nav>;`
}

