// Test example 
const test_place = {
    key: "6e935c4f58a845a0ca914ff0710cc1dc",
    lat: 51.759048,
    lon: 19.458599
}

function testGetData() {
    /*
    TEST FUNCTION
    FULL DESCRIPTION IS PROVIDED BELOW
    */
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${test_place.lat}&lon=${test_place.lon}&appid=${test_place.key}`;
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            console.log(calculateCelsius(data.main.temp_max))
        });
}
// End of test example

// Constant elements of website and API key.
const wallet_adress = document.getElementById("Wallet")
const u_lat = document.getElementById("Lat")
const u_lon = document.getElementById("Lon")
const submit_butt = document.getElementById("Sub")
const KEY = "6e935c4f58a845a0ca914ff0710cc1dc"
const cardTitle = document.getElementById("cardTitle")
const cardText = document.getElementById("cardText")
const register_butt = document.getElementById("Register")

function getData(lat, lot) {
    /*
    Function that allows to collect data from weather api.
    It takes 3 parameters:
    Wallet adress - It will be checked in smart contract if the user is already signed up.
    2 Geographical parameters:
    Lanitude
    Lonitude
    The must be provided in order to use and collect data for specific place.
    */
    if(lat == "" || lot == ""){
        returnError()
        return
    }
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lot}&appid=${KEY}`;
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            console.log(calculateCelsius(data.main.temp_max),
                console.log(data.name))
            if (data.name == "") {
                cardTitle.innerText = "Empty place"
                cardText.innerText = formatText("Empty place", calculateCelsius(data.main.temp_max), data.wind.speed)
            } else {
                cardTitle.innerText = data.name
                cardText.innerText = formatText(data.name, calculateCelsius(data.main.temp_max), data.wind.speed)
            }


        });
}

function calculateCelsius(temp) {
    /*
    Function that converts Kelvins into Celsius and round the number to 2 decimal places after colon.
    */
    return (temp - 273.15).toFixed(2)
}

function fetchData() {
    /*
    This functions has 3 functionalities.
    1. Read user input (wallet, latitude, longtitude).
    2. Check on Etherheum test network if wallet adress is arleady signed up for weather programm. Return True/False.
    3. If Flase display error message / Else return proper data.
    */
   try{
    getData(u_lat.value, u_lon.value)
   }
    catch{
        returnError()
    }
}

function formatText(city_name, celsius_temp, speed_of_wind) {
    /*
    Function that returns formatted string for card in html.
    */
    return `Welcome, we found that your city is: ${city_name}\nThe currently temperature in Celsius mantain: ${celsius_temp}\nSpeed of the wind mantains: ${speed_of_wind}`
}

submit_butt.addEventListener("click", submit)
register_butt.addEventListener("click", registerUser)

// Ethers config
const provider = new ethers.providers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com/")
var private_key = "07265bb211e887adb7da587959f8f1508bd648e6f82b64aae85b8435b29f8976"
var signer = new ethers.Wallet(private_key, provider)
var adress = "0x854E0B2731A97BA5Ee4cd6b045f87Bc41D149CDF"
var abi = [{
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "showList",
        "outputs": [{
            "internalType": "address[]",
            "name": "",
            "type": "address[]"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "address",
            "name": "_user",
            "type": "address"
        }],
        "name": "signUp",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "payable",
        "type": "function"
    }
]

const ContractOwner = new ethers.Contract(adress, abi, signer)
const ContractGuest = new ethers.Contract(adress, abi, provider)

// Web3 Functions
let in_list = false

function checkList(ls) {
    /*
    Function that checks if the user is already registered in smart contract.
    */
    for (var i = 0; i < ls.length; i++) {
        if (ls[i] == wallet_adress.value) {
            console.log("success")
            in_list = true
            break
        } else {
            console.log("fail")
        }
    }
    return in_list
}

function returnData(){
    if(in_list == true){
        fetchData()
    }else{
        returnError()
    }
}

function returnError(){
    /*
    Returns error info.
    */
    cardTitle.innerText = "Error"
    cardText.innerText = "Hi!\nYou need to sign up/ provide all values."
}

function returnSign(){
    /*
    Returns signing info.
    */
    cardTitle.innerText = "Information"
    cardText.innerText = "Hi!\nYou have had successfully signed up!"
}

async function submit() {
    /*
    Whole functionality of website.
    */
    await console.log("wallet adress")
    await ContractOwner.showList().then((result) => {
        checkList(result)
    })
    await returnData()
}

function registerUser(){
    ContractOwner.signUp(wallet_adress.value).then((result) => console.log(result))
    returnSign()
}