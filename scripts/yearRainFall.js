document.addEventListener('DOMContentLoaded', () => {
    Year_Annual_Rainfall();
});



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
