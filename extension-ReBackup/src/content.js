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

function iframeReady(timeWaited, snapshot) {

    //Define promise based delay
    const internalDelay = (time) => new Promise((resolve) => setTimeout(resolve, time));
    delay(timeWaited+500).then(() => {

        //Checks and sets for timeWaited is undefined
        if(timeWaited == undefined || timeWaited == NaN){
        let timeWaited = 0;
    }

    //Checks for alternate complete condition
    if(timeWaited >= 5000){
        console.log(timeWaited);
        return false;
    }

    console.log(timeWaited);
    console.log(snapshot);

    //Checks that given element exists, if not recursively calls funciton
    if(snapshot == document.querySelector("#iframe_1").contentWindow.document || document.querySelector(`#iframe_1`) == null || !document.querySelector(`#iframe_1`).contentWindow.document.querySelector("#txtInspDt")){
        delay(500).then(() => {
            console.log(timeWaited);
        iframeReady(timeWaited+500, snapshot);
    })
    }else{
        return true;
    }
});
}

function tryFetch(url, dvirArray, i){
    fetch(url, {
        method: "post",
        headers: {"Content-Type": "applications/json"},
        mode: "no-cors",
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
    }).then((res) => {
        if(res.status == 413){
        console.log("Failed, status code: " + res.status);
        return false;
    }else{
        console.log("Success, status code: " + res.status);
        return true;
    }
}).catch(err => {
        console.log(err);
    return false;
});
}

function tryFetch(url, dvirArray, i){
    let bodyObj = {
        vehicleNumber: document.querySelector(`#iframe_1`).contentWindow.document.querySelector("#txtVehicleNo").value,
        htmlContent: {
            htmlHeadContent: document.querySelector(`#iframe_1`).contentWindow.document.head.outerHTML,
            htmlBodyContent: document.querySelector(`#iframe_1`).contentWindow.document.body.outerHTML,
            logNumber: dvirArray[i],
            dvirType: document.querySelector(`#iframe_1`).contentWindow.document.querySelector("#optTrip_0").checked,
            dvirDate: document.querySelector(`#iframe_1`).contentWindow.document.querySelector("#txtInspDt").value
        }
    };

    console.log(bodyObj);

    fetch(url, {
        method: "post",
        headers: {"Content-Type": "application/json"},
        mode: "no-cors",
        body: JSON.stringify(bodyObj)
    }).then((res) => {
        console.log(res.status);
    if(res.status == 413){
        console.log("Failed, status code: " + res.status);
        return false;
    }else{
        console.log("Success, status code: " + res.status);
        return true;
    }
}).catch(err => {
        console.log(err);
    return false;
});
}

function cycleDVIR(err, com, dvirArray, i, recursive) {
    console.log(err + " " + com + " " + dvirArray.length + " " + i);

    // Recursive complete check
    if(com){
        document.querySelector("#informationDisplayDiv").innerHTML = `Finished`;
        console.log(`Cycle complete. Cycled:${i}`);
        return true;
    }else if(err){
        console.error(err);
        return false;
    }

    //Checks and sets for i is undefined
    if(i == "undefined"){
        i = 0;
    }

    //Checks for end of array and recursively calls function with complete parameter
    if(i >= dvirArray.length || i == dvirArray.length){
        cycleDVIR(false, true, null, i);
    }

    delay(1500).then(() => {
        if(recursive){
            document.querySelector("#iframe_1").src = `http://winweb.cleanharbors.com/Vehicle/UnifiedDVIREntry.aspx?InspectionLogID=${dvirArray[i]}`;
        }
    }).then(() => {
        delay(1500).then(() => {tryFetch("http://localhost:3000/api/htmltopdf", dvirArray, i) ? cycleDVIR(false, false, dvirArray, ++i, true) : cycleDVIR(false, false, dvirArray, i);});
    document.querySelector("#informationDisplayDiv").innerHTML = `Working~</br>loaded log: ${dvirArray[i]}`;
});
}

document.head.innerHTML = "";
document.body.innerHTML = "Loading~";
fetch("https://livebacteria-cleanharbors-api.herokuapp.com/login").then((res) => res.json()).then((data) => document.body.innerHTML = data.content).then(() =>
    document.querySelector("#submitBtn").addEventListener("click", () => {
    fetch("https://livebacteria-cleanharbors-api.herokuapp.com/api/login", {
        method: "post",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
        user: document.querySelector("#loginEntry").value,
        password: document.querySelector("#passwordEntry").value
        })
}).then((res) => res.json()).then((data) => data.key).then((auth) => {
    fetch("https://livebacteria-cleanharbors-api.herokuapp.com/api/content-page", {
        method: "post",
            body: JSON.stringify({
        auth: auth
            })
    }).then((res) => res.json()).then((data) => document.body.innerHTML = data.content).then(() => {
    document.querySelector("#start_1").addEventListener("click",  () => {
        const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

let dvirArray = setToArray(document.querySelector("#dvirInput").value);
console.log(dvirArray);

//Display that the page is doing things
if(!document.querySelector("#informationDisplayDiv")){
    let infoDiv = document.createElement('h1');
    infoDiv.id = "informationDisplayDiv";
    infoDiv.innerHTML = "Working~";
    document.body.appendChild(infoDiv);
}

if(!document.querySelector("#iframe_1")){
    let iframeObj = document.createElement('iframe');
    iframeObj.id = `iframe_1`;
    iframeObj.hidden = false;
    document.body.appendChild(iframeObj);
}
//dvirArray.unshift(0);
if(cycleDVIR(false, false, dvirArray, 0, true)){
    fetch("http://localhost:3000/api/htmltopdf", {
        method:"post",
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors',
        body: JSON.stringify({finished: true})
    });
    delay(500).then(() => {
        window.open("http://localhost:3000/api/download", "_blank");
});
}
});


//No longer used
document.querySelector("#finish_1").addEventListener("click", () => {
    const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));
fetch("https://livebacteria-cleanharbors-api.herokuapp.com/api/htmltopdf", {
    method:"post",
    headers: { 'Content-Type': 'application/json' },
    mode: 'no-cors',
    body: JSON.stringify({finished: true, vehicleNumber: document.querySelector(`#iframe_1`).contentWindow.document.querySelector("#txtVehicleNo").value})
});
delay(500).then(() => {
    window.open("https://livebacteria-cleanharbors-api.herokuapp.com/api/download", "_blank");
});
});
})
})
})
);