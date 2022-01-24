const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Placed letters? (- for unknown) ", function (placedLetters) {
  if (placedLetters.length !== 5) {
    console.log("Input must be 5 characters long.");
    rl.close();
  }

  rl.question("Known good? ", function (knownGood) {
    rl.question("Known bad? ", function (knownBad) {
      fs.readFile("words.txt", "utf8", (_err, file) => {
        const words = file.split("\n").map((w) => w.toUpperCase());

        console.log(
          words
            .filter(
              (word) =>
                placedLetters
                  .toUpperCase()
                  .split("")
                  .filter((l, i) => l === "-" || word[i] === l).length ===
                word.length
            )
            .filter(
              (word) =>
                knownGood.length < 1 ||
                knownGood
                  .toUpperCase()
                  .split("")
                  .filter((l) => word.includes(l)).length === knownGood.length
            )
            .filter(
              (word) =>
                knownBad.length < 1 ||
                knownBad
                  .toUpperCase()
                  .split("")
                  .filter((l) => !word.includes(l)).length === knownBad.length
            )
        );
        console.log("Thanks for playing!");
        rl.close();
      });
    });
  });
});

rl.on("close", function () {
  process.exit(0);
});
