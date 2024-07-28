import readline from "readline";
import parkingLotFactory from "./use_case/parkingLot.js";

const handleRunConsole = () => {
  const prompt = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  prompt.question("Enter commands: ", (commands) => {
    handleRunCommands(commands);
  });
};

const handleRunCommands = (commands) => {
  const parkingLotFn = parkingLotFactory();
  const commandType = commands.split(" ")[0];
  switch (commandType) {
    case "create_parking_lot":
      parkingLotFn.createParkingLot(commands);
      break;
    case "park":
      parkingLotFn.handleParkCar(commands);
      break;
    case "leave":
      parkingLotFn.handleRemoveCar(commands);
    case "status":
      parkingLotFn.handlePrintStatus(commands);
    default:
      `${commandType} is not available`;
      break;
  }
};

handleRunConsole();
