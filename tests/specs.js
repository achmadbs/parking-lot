import { assert } from "chai";
import fs from "fs";
import parkingLotFactory from "../src/use_case/parkingLot.js";

let commands = [];
let totalParkingSpace;

describe("Test for reading file_input", () => {
  it("reading file_input.txt", (done) => {
    fs.readFile("./file_input.txt", "utf-8", function (err, data) {
      if (err) {
        throw "An error occurred while reading file_input.txt, error: " + err;
      }
      commands = JSON.parse(JSON.stringify(data)).split("\n");
      done();
    });
  });

  it("checking commands", (done) => {
    assert.equal(commands[0].split(" ")[0], "create_parking_lot");
    assert.equal(commands[1].split(" ")[0], "park");
    assert.equal(commands[7].split(" ")[0], "leave");
    assert.equal(commands[8], "status");
    done();
  });
});

describe("Test parking lot factor function", () => {
  const parkingLotFn = parkingLotFactory();
  it("should create parking lot with given input number within command", (done) => {
    totalParkingSpace = parkingLotFn.createParkingLot(commands[0]);
    assert.equal(totalParkingSpace, 6);
    done();
  });
});
