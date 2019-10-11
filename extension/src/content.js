//Public variables and functions declared here
const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

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
        document.querySelector("#iframe_1").src = `http://winweb.cleanharbors.com/Vehicle/UnifiedDVIREntry.aspx?InspectionLogID=${dvirArray[i]}`;
}).then(() => {
        delay(1500).then(() => {
        if(document.querySelector(`#iframe_1`).contentWindow.document.querySelector("#txtInspDt")){
        console.log(document.querySelector(`#iframe_1`).contentWindow.document.querySelector("#txtInspDt"));
        delay(1500).then(() => {
            fetch("http://localhost:3000/api/htmltopdf",{
            method:"post",
                headers: { 'Content-Type': 'application/json' },
            mode: 'no-cors',
                body: JSON.stringify({
                htmlContent: {
                    htmlHeadContent: document.querySelector(`#iframe_1`).contentWindow.document.head.outerHTML,
                    htmlBodyContent: document.querySelector(`#iframe_1`).contentWindow.document.body.outerHTML,
                    logNumber: dvirArray[i],
                    dvirType: document.querySelector(`#iframe_1`).contentWindow.document.querySelector("#optTrip_0").checked,
                    dvirDate: document.querySelector(`#iframe_1`).contentWindow.document.querySelector("#txtInspDt").value
                }
            })
        });
    }).then(() => {
            document.querySelector("#informationDisplayDiv").innerHTML = `Working~</br>loaded log: ${dvirArray[i]}`;
        cycleDVIR(false, false, dvirArray, ++i);
    });
    }else{
        delay(3000).then(() => {
            console.log("Warning! Slow internet deteced, skipping current DVIR.");
        fetch("http://localhost:3000/api/htmltopdf",{
            method:"post",
            headers: { 'Content-Type': 'application/json' },
            mode: 'no-cors',
            body: JSON.stringify({
                htmlContent: {
                    htmlHeadContent: document.querySelector(`#iframe_1`).contentWindow.document.head.outerHTML,
                    htmlBodyContent: document.querySelector(`#iframe_1`).contentWindow.document.body.outerHTML,
                    logNumber: dvirArray[i],
                    dvirType: document.querySelector(`#iframe_1`).contentWindow.document.querySelector("#optTrip_0").checked,
                    dvirDate: document.querySelector(`#iframe_1`).contentWindow.document.querySelector("#txtInspDt").value
                }
            })
        });
    }).then(() => {
            document.querySelector("#informationDisplayDiv").innerHTML = `Working~</br>loaded log: ${dvirArray[i]}`;
        cycleDVIR(false, false, dvirArray, ++i);
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
    iframeObj.hidden = true;
    document.body.appendChild(iframeObj);
}
dvirArray.unshift(0,0,0);
if(cycleDVIR(false, false, dvirArray, 0)){
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
fetch("http://localhost:3000/api/htmltopdf", {
    method:"post",
    headers: { 'Content-Type': 'application/json' },
    mode: 'no-cors',
    body: JSON.stringify({finished: true})
});
delay(500).then(() => {
    window.open("http://localhost:3000/api/download", "_blank");
});
});
})
})
})
);