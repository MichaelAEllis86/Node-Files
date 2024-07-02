// In step1.js, write a function, cat.
// It should take one argument, path, and it should read the file with that path, and print the contents of that file.
// Then, write some code that calls that function, allowing you to specify the path argument via the command line.


// Notes Step 1 Answer!


//We need to require/import filesystem to read files!
const fs=require("fs")
const process=require("process")

// we save the value of argV in order to get the value of cmd line arguments we pass. In this case, we need to pass the path of the file
const argv=process.argv;


// Before proceeding, we should verify that the proper arguments have been added. There should be 3! path to node, path to js file, and path to read the file! If no argument is provided we exit!
if (!argv[2]) {
    console.error('Please provide a file path as an argument');
    process.exit(1);
}


// function takes in path as argument which we will be taking from argV passed from cmd line. We then within cat, run fs.readFile(), passing the path, encoding, and error/success data
function cat(path){
    // pass the path from cat's argument, coding, and callback to fs!
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


// invoking the function here to run the file! For now we hardcoded the path as the 3rd index in argv! Therefore, it is essential that the path argument is in the 3rd postion in the argv array!
cat(argv[2])