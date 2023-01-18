/* Global Variables */
/*web api with fetch demo */
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
let apiKey = "e76f873cf2da2eafc80d1df756f4813a";
// Getting a listener
document.getElementById("generate").addEventListener("click", performAction);
// Take action when pressing the button
function performAction(e) {
    // Get zip code and check user input
    const zipCode = document.getElementById("zip").value; 
    if (!zipCode)
    {
        alert("Enter zip code")
        return 1;
    }
    // User input obtained and evidence compiled, used and sent to server
    const usrRes = document.getElementById("feelings").value;
    getTemp(apiUrl, zipCode, apiKey).then((temp) => {
        postData("/addData", {
            temperature: temp,
            date: newDate,
            userResponse: usrRes,
        }).then(updateUi);
    });
}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 + "." + d.getDate() + "." + d.getFullYear();
// get data from api
const getTemp = async (apiUrl, zipCode, apiKey) => {
    const url = apiUrl + zipCode + "&appid=" + apiKey + "&units=metric";
    const res = await fetch(url);

    try {
        const data = await res.json();
        const temp = data.main.temp
        console.log(temp);
        return temp
    } catch (error) {
        console.log("error", error);
    }
};
// post data for our server
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        return newData
    } catch (error) {
        console.log('error', error);
    }
}
// gate data from server and update UI
const updateUi = async () => {
    const con = await fetch('/getData');
    try{
        const allData = await con.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('content').innerHTML = allData.userResponse;
    }catch(error){
        console.log("error", error);
    }
}




