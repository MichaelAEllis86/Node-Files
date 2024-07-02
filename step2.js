// Step 2
// Copy over your step1.js code to step2.js
// Add a new function, webCat. This should take a URL and, using axios, should read the content of that URL and print it to the console.
// Modify the code that invoked cat so that, based on the command-line args, it decides whether the argument is a file path or a URL and calls either cat or webCat, respectively.

// Notes Step 2 Answer!




const process=require("process")

// We need to require/import axios to use as a package!
const { default: axios } = require("axios");

// We need to require/import filesystem to read files!
const fs=require("fs")

// we save the value of argV in order to get the value of cmd line arguments we pass. In this case, we need to pass the path of the file OR a URL
const argv=process.argv;

// Before proceeding, we should verify that the proper arguments have been added. There should be 3! path to node, path to js file, and path to read the file! If no argument is provided we exit!
if (!argv[2]) {
    console.error('Please provide a local file path as an argument OR a valid URL!!!');
    process.exit(1);
}

// function cat()! takes in path as argument which we will be taking from argV passed from cmd line. We then within cat, run fs.readFile(), passing the path, encoding, and error/success data
function cat(path){
    // pass the path from cat's argument, coding, and callback to fs! It is async by default so we don't need to await this.
    fs.readFile(`${path}`,'utf8',(err,data) =>{
        // if error, error handling comes in via console.logs
        if(err){
            console.log(`Error reading file ${path}!`)
            console.log(`Reporting the error object... ${err}`,"an error has occured")
            console.log("printing console.error on the next line")
            console.error(err)
            process.exit(1)
            
        }
        // if things work we log the results.
        console.log("Your file has been successfully opened!!!")
        console.log(`the file data is ------> ${data}`)
    })

}

// here is the function webCat()! it is a basic async/await function that makes a GET request to whatever URL we add. Very simple with try/catch error handling logging to console.
async function webCat(url){
    try{
    let response=await axios.get(`${url}`)
    console.log("here is your request data from axios!")
    console.log(response.data)
}
    catch(err){
        console.log("<-----------------Error Bad Request!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!----------------->");
        console.log(err)
        process.exit(1)
}
}


// this is a function to determine if a string is a URL. I had an AI write a regular expression to match url patterns in a string and return true or false! We invoke this using what we pass to argv.
function isUrl(string) {
    // Regular expression to match URLs (http, https, ftp)
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    console.log(`the result of the URL pattern test is -----------------> ${urlPattern.test(string)} `)
    return urlPattern.test(string);
}

// if the 3rd index of argv or argv[2] is a url as detected by isUrl(), then we invoke webcat(). If it is not we call cat to read a local file.
if (isUrl(argv[2])){
    webCat(argv[2])
}
else{
    cat(argv[2])
}


