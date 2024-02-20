

import * as fs from "fs";
import * as path from "path";
import { PNG } from "pngjs";
import * as yauzl from "yauzl-promise"
import { pipeline } from "stream/promises"
import { workerData, isMainThread, Worker } from "worker_threads";

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
export async function unzip(pathIn: string, pathOut: string): Promise<void> {
    // No existsDir async, if the folder was already done, just skip
    const zip = await yauzl.open(pathIn);
    try {
      for await (const entry of zip) {
        if (entry.filename.endsWith('/')) {
          await fs.promises.mkdir(`${path.join(pathOut, entry.filename)}`, {recursive:true});
        } else {
          const readStream = await entry.openReadStream();
          const writeStream = fs.createWriteStream(
            `${path.join(pathOut, entry.filename)}`
          );
          await pipeline(readStream, writeStream);
        }
      }
    } finally {
      await zip.close();
      // console.log("Extraction operation complete")
    }
  };

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
export async function readDir(dir: string): Promise<any[]> {
    const files = await fs.promises.readdir(dir)
    let images = new Array
    for (let i = 0; files.length > i ; ++i) {
      if ((path.extname(files[i])) === '.png') {
        images.push(path.join(dir, files[i]))
      }
    }
    return images
};

// FilterImg Function
export async function FilterImg(pathIn: string, pathOut: string, filter: (this: PNG, data: Buffer) => void) {
  
    const readableStream = fs.createReadStream(pathIn)
  
    const writeableStream = fs.createWriteStream(`${path.join(pathOut, path.basename(pathIn))}`)
  
    const streamPNG = new PNG({
      filterType: 4,
    })

    try {
        pipeline(
            readableStream,
            streamPNG.on("parsed", filter),
            writeableStream,
        )
    } catch (err) {
        console.log(`Error ${err}`)
        process.exit(1)
    }
};

// MultiThreading I think
// I'm not really sure actually, but I take doing this in typescript as a win
export async function ProcessPaths(array: string[], pathOut: String, filter: (this: PNG, data: Buffer) => void) {
    const Threads = array.length
    let workers = new Array;
    if (isMainThread) {
        for (let i = 0; i < Threads; ++i) {
        const worker = new Worker("./main.js", {
            workerData: { threadId: i, chunk: array[i], output: pathOut }
        })
        workers.push(worker)
        worker.on('online', () => {
            console.log(`Thread ${i} Online`);
            });
        worker.on('exit', () => {
            console.log(`Thread ${i} Done `);
            });
        }
    } else {
        await FilterImg(workerData.chunk, workerData.output, filter)
        return (path.basename(workerData.chunk))
    }
}

/**
 * Gray Scale
 * 
 * @param {PNG} this
 * @param {Buffer} data
 * @return {void}
 */
export function gs(this: PNG, data: Buffer): void {
    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        var idx = (this.width * y + x) << 2;
        var avg = (this.data[idx] + this.data[idx + 1] + this.data[idx + 2]) / 3;
        this.data[idx] = avg;
        this.data[idx + 1] = avg;
        this.data[idx + 2] = avg;
      }
    }
    this.pack()
};

/**
 * AmaroFilter
 * 
 * @param {PNG} this
 * @param {Buffer} data
 * @return {void}
 */
export function af(this: PNG, data: Buffer): void {
    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        var idx = (this.width * y + x) << 2;

        this.data[idx] = (Math.min(255, Math.floor(this.data[idx] * 1.2)));
        this.data[idx + 1] =  (Math.min(255, Math.floor(this.data[idx + 1] * 1.1)));
        this.data[idx + 2] = (Math.min(255, Math.floor(this.data[idx + 2] * 0.9)));
      }
    }
    this.pack()
};

