const fs = require("fs");
const readline = require("readline");

const csvFilePath = "./csvdirectory/file.csv";
const txtFilePath = "./csvdirectory/output.txt";

const readStream = fs.createReadStream(csvFilePath);
const writeStream = fs.createWriteStream(txtFilePath);

const rl = readline.createInterface({
  input: readStream,
  crlfDelay: Infinity,
});

const processLine = (line) => {
  try {
    const [book, author, amount, price] = line.split(";");

    if (book && author && amount && price) {
      const jsonObject = {
        book: book.trim(),
        author: author.trim(),
        amount: parseInt(amount.trim(), 10),
        price: parseFloat(price.replace(",", ".").trim()),
      };
      const jsonString = JSON.stringify(jsonObject) + "\n";
      writeStream.write(jsonString);
    } else {
      console.error("Invalid line format:", line);
    }
  } catch (error) {
    console.error("Error processing line:", error);
  }
};

rl.on("line", processLine);

rl.on("close", () => {
  console.log("Conversion completed successfully.");
  writeStream.end();
});

readStream.on("error", (error) => {
  console.error("Error reading CSV file:", error);
});

writeStream.on("error", (error) => {
  console.error("Error writing to output file:", error);
});
