// Copy over your step2.js code to step3.js.
// Add a feature where, on the command line, you can optionally provide an argument to output to a file instead of printing to the console. The argument should look like this: --out output-filename.txt readfile-or-url.
// Current features should still work the same:

// Notes Step 3 Answer!



// We need to require/import axios to use as a package!

const { default: axios } = require("axios");
const { error } = require("console");

// We need to require/import filesystem to read files!
const fs=require("fs")

// we save the value of argV in order to get the value of cmd line arguments we pass. In this case, we need to pass the path of the file OR a URL
const argv=process.argv;
console.log(` now printing argv-----------> ${argv}`)

// Before proceeding, we should verify that the proper arguments have been added. There should be 3 minimum! the path to node, path to js file, and path to read the file!
if (!argv[2]) {
    console.error('Please provide a local file path as an argument OR a valid URL!!!');
    process.exit(1);
}

// function cat()! takes in path as argument which we will be taking from argV passed from cmd line. We then within cat, run fs.readFile(), passing the path, encoding, and error/success data
function cat(path,output){
    // pass the path from cat's argument, coding, and callback to fs! It is async by default so we don't need to await this.
    fs.readFile(`${path}`,'utf8',(err,data) =>{
        // if error, error handling comes in via console.logs
        if(err){
            console.log(`Error reading file ${path}!`);
            console.log(`Reporting the error object... ${err}`,"an error has occured");
            console.log("printing console.error on the next line");
            console.error(err);
            process.exit(1);
            
        }
        // if write output is detected we return the results and do not log.
        if (output){
            fileData=data
            console.log(`this is fileData being set by cat() ----------> ${fileData}`)
        }
        else{
            // if write output is not detected and things work we log the results.
            console.log("Your file has been successfully opened!!!")
            console.log(`the file data is ------> ${data}`)

        }
        
       
        
    })
}

// doesn't work because fs.writeFile never waits for the completion of cat! and file data isn't updated in time! rewriting this to work with promiseCat()
function catWrite(readPath,writePath){
    cat(readPath,writeOutput);
    console.log(`this is fileData after cat! ----------> ${fileData}`);
    fs.writeFile(`${writePath}`,`${fileData}`,"utf8", function(err){
        if (err){
            console.error(error);
            process.exit(1)
        }
        else{
            console.log(`this is fileData after write file! ----------> ${fileData}`);
            console.log("success");
        }
    })
}


//using a cat function that returns a promise so that promiseCatWrite await's results properly
function promiseCat(path,output){
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                console.error(`Error reading file ${path}!`);
                console.error(err);
                reject(err); // Reject the promise on error
            } else {
                if (output) {
                    fileData = data; // Set fileData if output is true
                    console.log(`this is fileData being set by cat() ----------> ${fileData}`);
                } else {
                    console.log("Your file has been successfully opened!!!");
                    console.log(`the file data is ------> ${data}`);
                }
                resolve(data); // Resolve with data on success
            }
        });
    });
    
}

async function promiseCatWrite(readPath, writePath){
    try{
        const data=await promiseCat(readPath, writeOutput)
        console.log(`File data after promiseCat(): ${fileData}`);
        fs.writeFile(writePath, fileData, "utf8", (err) =>{
            if (err){
                console.error(err);
                process.exit(1)
            }
            else{
                console.log(`File has been successfully written to ${writePath}`);
            }

        })

    }
    catch(e){
        console.error('Error reading file:', e);
        process.exit(1);
    }
}

function catWrite(readPath,writePath){
    cat(readPath,writeOutput);
    console.log(`this is fileData after cat! ----------> ${fileData}`);
    fs.writeFile(`${writePath}`,`${fileData}`,"utf8", function(err){
        if (err){
            console.error(error);
            process.exit(1)
        }
        else{
            console.log(`this is fileData after write file! ----------> ${fileData}`);
            console.log("success");
        }
    })
}


// here is the function webCat() that is edited for additional use in webCatWrite()! 
// it is an async/await function that makes a GET request to whatever URL is put in the argument (that is taken from argv originally in our case).
// depending on the binary state of output (could prolly name it better) which stands for the variable writeOutput. It will either send request data outside to the variable fileData for later use, OR if no write command is given, log the request data to console.
// EDITED FOR STEP 3  RESPONSE DATA AND NOT LOGGING IT TO THE CONSOLE FOR THIS SCRIPT ONLY
async function webCat(url,output){
    try{
        let response=await axios.get(`${url}`);
        if (output){
            fileData=response.data
            console.log(`this is fileData being set by webCat() ----------> ${fileData}`)
        } 
        else {
            console.log("here is your request data from axios!")
            console.log(response.data)
        }            
}
    catch(err){
        console.log("<-----------------Error Bad Request!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!----------------->");
        console.log(err)
}
}

// webCatWrite() is a function that takes a url and file path and writes the request data to the specified file in the path.
// uses webCat() with a True boolean for writeOutput for the request and then writes using fs.writeFile()

async function webCatWrite(url,fileName){
    await webCat(url,writeOutput)
    fs.writeFile(`${fileName}`,`${fileData}`,"utf8", function(err){
        if (err){
            console.error(error)
            process.exit(1)
        }
        else{
            console.log("success")
        }
    })
}



// isUrl() is a function to determine if a string is a URL. I had an AI write a regular expression to match url patterns in a string and return true or false!
function isUrl(string) {
    // Regular expression to match URLs (http, https, ftp)
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    console.log(`the result of the URL pattern test is -----------------> ${urlPattern.test(string)} `)
    return urlPattern.test(string);
}

//  detectWriteOutput() is meant to detect whether or not the --out is given as an agrv argument!
// I tested for this using length of the argV array/and presence of correct command --out in array position 3 if the length is correct!
// A simpler solution would perhaps be checking membership of "--out" in argv using Array.indexOf(), although it bears noting that if --out is not in array index 3 none of this works so position is critical regardless. 
function detectWriteOutput(arr){
    if (arr.length ===5 && arr[2]==="--out" ){
        return true
    }
    else{
        return false
    }
}

let writeOutput=detectWriteOutput(argv)
let fileData;
console.log("the write output boolean test results are-------->", writeOutput)
console.log(" Here is file data before any functions run!-------->", fileData)

if (writeOutput===true && isUrl(argv[4])===true){
    webCatWrite(argv[4],argv[3])
}

if (writeOutput===false && isUrl(argv[2])===true){
    webCat(argv[2],writeOutput)
}

if (writeOutput===true && isUrl(argv[4])===false){
    promiseCatWrite(argv[4],argv[3])
}

if (writeOutput===false && isUrl(argv[2])===false){
    cat(argv[2],writeOutput)
}

