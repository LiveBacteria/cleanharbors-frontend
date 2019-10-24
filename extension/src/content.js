//Public variables and functions declared here
const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

//const serverChoice = ping("http://172.24.19.105/").then(found = => {found ? return "http://livebacteria-cleanharbors-api.herokuapp.com/" : return "http://172.24.19.105/"});

function setToArray(str) {
    if (str === "" || str === "Log Numbers") {
        if (typeof str != "number") {
            alert("Log input cannot be blank!\nLog Input should not contain letters. ");
        } else {
            alert("Log input cannot be blank! ");
        }
        exit = true;
        return;
    } else {
        dvirLogArray = JSON.parse("[" + str + "]");
    }
    return JSON.parse("[" + str + "]");
}

function tryDVIRFetch(y, dvirArray){
    console.log("tryDvirFetch i is: " + y);
    let iframeString = `#iframe_${y}`;
    console.log(iframeString);
    let target = document.querySelector(`#iframe_${y}`).contentWindow.document;
    if(!!document.querySelector(`#iframe_${y}`).contentWindow){
        fetch("http://localhost:3000/api/htmltopdf",{
            method:"post",
            headers: { 'Content-Type': 'application/json' },
            mode: 'no-cors',
            body: JSON.stringify({
                vehicleNumber: target.querySelector("#txtVehicleNo").value,
                htmlContent: {
                    htmlHeadContent: target.head.outerHTML,
                    htmlBodyContent: target.body.outerHTML,
                    logNumber: dvirArray[y],
                    dvirType: target.querySelector("#optTrip_0").checked,
                    dvirDate: target.querySelector("#txtInspDt").value
                }
            })
        }).then((res) => {console.log(res)});

    }else{
        delay(3000).then(() => {
            fetch("http://localhost:3000/api/htmltopdf",{
            method:"post",
                headers: { 'Content-Type': 'application/json' },
            mode: 'no-cors',
                body: JSON.stringify({
                vehicleNumber: document.querySelector(`#iframe_${y}`).contentWindow.document.querySelector("#txtVehicleNo").value,
                htmlContent: {
                    htmlHeadContent: document.querySelector(`#iframe_${y}`).contentWindow.document.head.outerHTML,
                    htmlBodyContent: document.querySelector(`#iframe_${y}`).contentWindow.document.body.outerHTML,
                    logNumber: dvirArray[y],
                    dvirType: document.querySelector(`#iframe_${y}`).contentWindow.document.querySelector("#optTrip_0").checked,
                    dvirDate: document.querySelector(`#iframe_${y}`).contentWindow.document.querySelector("#txtInspDt").value
                }
            })
        })
        })
    }
}

function newCycleDVIR(err, com, dvirArray, i){

    for(let x = 0; x < dvirArray.length; x++){
        let iframeObj = document.createElement('iframe');
        iframeObj.id = `iframe_${x}`;
        iframeObj.hidden = true;
        iframeObj.src = `http://winweb.cleanharbors.com/Vehicle/UnifiedDVIREntry.aspx?InspectionLogID=${dvirArray[x]}`;
        iframeObj.onload = () => {
            console.log(`newCycleDVIR i is: ${x}`);
            tryDVIRFetch(x, dvirArray);
        };
        document.body.appendChild(iframeObj);
    }
}

function cycleDVIR(err, com, dvirArray, i){
    console.log(err + " " + com + " " + dvirArray.length + " " + i);
    if(com){
        document.querySelector("#informationDisplayDiv").innerHTML = `Finished`;
        console.log(`Cycle complete. Cycled:${i}`);
        return true;
    }else if(err){
        console.error(err);
        return false;
    }

    if(i == "undefined"){
        i = 0;
    }
    if(i >= dvirArray.length || i == dvirArray.length){
        cycleDVIR(false, true, null, i);
    }

    delay(500).then(() => {
        if(i == 0){document.querySelector("#iframe_1").src = `http://winweb.cleanharbors.com/Vehicle/UnifiedDVIREntry.aspx?InspectionLogID=${dvirArray[i]}`;}
}).then(() => {
        delay(1500).then(() => {
        if(document.querySelector(`#iframe_1`).contentWindow.document.querySelector("#txtInspDt")){
        console.log(document.querySelector(`#iframe_1`).contentWindow.document.querySelector("#txtInspDt"));
        delay(50).then(() => {
            fetch("http://localhost:3000/api/htmltopdf",{
            method:"post",
                headers: { 'Content-Type': 'application/json' },
            mode: 'no-cors',
                body: JSON.stringify({
                vehicleNumber: document.querySelector(`#iframe_1`).contentWindow.document.querySelector("#txtVehicleNo").value,
                htmlContent: {
                    htmlHeadContent: document.querySelector(`#iframe_1`).contentWindow.document.head.outerHTML,
                    htmlBodyContent: document.querySelector(`#iframe_1`).contentWindow.document.body.outerHTML,
                    logNumber: dvirArray[i],
                    dvirType: document.querySelector(`#iframe_1`).contentWindow.document.querySelector("#optTrip_0").checked,
                    dvirDate: document.querySelector(`#iframe_1`).contentWindow.document.querySelector("#txtInspDt").value
                }
            })
        }).then(() => {
            document.querySelector("#iframe_1").src = `http://winweb.cleanharbors.com/Vehicle/UnifiedDVIREntry.aspx?InspectionLogID=${dvirArray[i]}`;
        });
    }).then(() => {
            document.querySelector("#informationDisplayDiv").innerHTML = `Working~</br>loaded log: ${dvirArray[i]}`;
        delay(500).then(() => cycleDVIR(false, false, dvirArray, ++i));
    });
    }else{
        console.log("Warning! Slow internet deteced, delaying.");
        delay(5000).then(() => {
        fetch("http://localhost:3000/api/htmltopdf",{
            method:"post",
            headers: { 'Content-Type': 'application/json' },
            mode: 'no-cors',
            body: JSON.stringify({
                vehicleNumber: document.querySelector(`#iframe_1`).contentWindow.document.querySelector("#txtVehicleNo").value,
                htmlContent: {
                    htmlHeadContent: document.querySelector(`#iframe_1`).contentWindow.document.head.outerHTML,
                    htmlBodyContent: document.querySelector(`#iframe_1`).contentWindow.document.body.outerHTML,
                    logNumber: dvirArray[i],
                    dvirType: document.querySelector(`#iframe_1`).contentWindow.document.querySelector("#optTrip_0").checked,
                    dvirDate: document.querySelector(`#iframe_1`).contentWindow.document.querySelector("#txtInspDt").value
                }
            })
        }).then(() => {
            document.querySelector("#iframe_1").src = `http://winweb.cleanharbors.com/Vehicle/UnifiedDVIREntry.aspx?InspectionLogID=${dvirArray[i]}`;
        });
    }).then(() => {
            document.querySelector("#informationDisplayDiv").innerHTML = `Working~</br>loaded log: ${dvirArray[i]}`;
        delay(500).then(() => cycleDVIR(false, false, dvirArray, ++i));
    });
    }
});
});
}

document.head.innerHTML = "";
document.body.innerHTML = "Loading~";
fetch("http://localhost:3000/login").then((res) => res.json()).then((data) => document.body.innerHTML = data.content).then(() =>
    document.querySelector("#submitBtn").addEventListener("click", () => {
    fetch("http://localhost:3000/api/login", {
        method: "post",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
        user: document.querySelector("#loginEntry").value,
        password: document.querySelector("#passwordEntry").value
        })
}).then((res) => res.json()).then((data) => data.key).then((auth) => {
    fetch("http://localhost:3000/api/content-page", {
        method: "post",
            body: JSON.stringify({
        auth: auth
            })
    }).then((res) => res.json()).then((data) => document.body.innerHTML = data.content).then(() => {
        document.querySelector("#start_1").addEventListener("click",  () => {
            const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));
            let dvirArray = setToArray(document.querySelector("#dvirInput").value);
            newCycleDVIR(false, false, dvirArray, 0);
        });
//No longer used
document.querySelector("#finish_1").addEventListener("click", () => {
    const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));
fetch("http://localhost:3000/htmltopdf", {
    method:"post",
    headers: { 'Content-Type': 'application/json' },
    mode: 'no-cors',
    body: JSON.stringify({
        finished: true, vehicleNumber: document.querySelector(`#iframe_1`).contentWindow.document.querySelector("#txtVehicleNo").value})
});
delay(500).then(() => {
    window.open(`http://localhost:3000/api/download/${document.querySelector(`#iframe_1`).contentWindow.document.querySelector("#txtVehicleNo").value}`, "_blank");
});
});
});
})
})
)