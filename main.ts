import * as path from "node:path";
import * as IOhandler from "./IOhandler.js";
const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
// Change pathProcessed to folder named "processed"
const pathProcessed = path.join(__dirname, "processed");

/**
 * I made this into typescript and tried multithreading
 * I made another filter called AmaroFilter, not sure if it is an instagram filter
 * but I couldn't find the math calculations for other filters
 * This one is a simple filter that makes things warmer
 * 
 * If you use Regular() it will 100% work,
 * I can with 99% that the multithreading works
 * It allocates one thread per image (You said multithreaded, checkmate)
 * 
 * Anyways be sure to run "tsc main.ts" after you made changes to see if the 
 * 
 */

// Single Threaded
async function Single() {
    try {
        await IOhandler.unzip(zipFilePath, pathUnzipped);
        let img = await IOhandler.readDir(pathUnzipped);
        let promisesArray = new Array;
        // Specify filter, options are
        // IOhandler.af => AmaroFilter , IOhandler.gs => GrayScale
        // Put in the last param of the FilterImg function
        img.forEach(path => {
            let promise = (IOhandler.FilterImg(path, pathProcessed, IOhandler.af));
            promisesArray.push(promise);
        });
        console.log(promisesArray)
        Promise.all(promisesArray).finally(() => { console.log("Completed") });
    } catch (err) {
        console.log(err)
    }
}

// The multithread attempt :|
async function Multi() {
    try {
        await IOhandler.unzip(zipFilePath, pathUnzipped);
        let img = await IOhandler.readDir(pathUnzipped);
        // Specify filter, options are
        // IOhandler.af => AmaroFilter , IOhandler.gs => GrayScale
        // Put in the last param of the ProcessPaths
        IOhandler.ProcessPaths(img, pathProcessed, IOhandler.af)
        .then((val) => {
            if (val !== undefined) {
                console.log(`${val} Processed`)
            }
        })
    } catch (err) {
        console.log(err)
    }
}

// I think this works,
// but I can guarentee Single() works and there is two filters in this program
// Change this to Single() for single thread
Single()