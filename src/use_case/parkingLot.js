import {
  logingFromInputNumber,
  handleCalculateParkingFee,
} from "../utils/mixins.js";

const vehicle = ({ platNumber, entryTime }) => {
  return { platNumber, entryTime };
};

const parkingLotFactory = () => {
  let TOTAL_PARKING_LOT = 0;
  let parkingSlot = [];

  const createParkingLot = (command) => {
    const inputNumber = parseInt(command.split(" ")[1]);
    TOTAL_PARKING_LOT = inputNumber;
    if (TOTAL_PARKING_LOT <= 0) {
      throw new Error("Parking slot cannot less than 0");
    }
    parkingSlot = new Array(TOTAL_PARKING_LOT).fill(null);

    const logValue = logingFromInputNumber(inputNumber);
    console.log(logValue);
    return TOTAL_PARKING_LOT;
  };

  const handleParkCar = (command) => {
    if (!!TOTAL_PARKING_LOT) {
      const isParkingSlotAvailable = parkingSlot.some((slot) => slot === null);
      if (!isParkingSlotAvailable)
        throw new Error("Sorry parking slot is full");
      const platNumber = command.split(" ")[1];
      for (let i = 0; i < parkingSlot.length; i++) {
        if (parkingSlot[i] === null) {
          parkingSlot[i] = vehicle({ platNumber, entryTime: new Date() });
          return platNumber;
        }
      }
    } else {
      throw new Error("Please create parking lot first");
    }
  };

  const handleRemoveCar = (command) => {
    if (!!TOTAL_PARKING_LOT) {
      const platNumber = command.split(" ")[1];
      const isVehicleWithGivenPlatNumberExist = parkingSlot.findIndex(
        (slot) => slot?.platNumber === platNumber
      );
      if (isVehicleWithGivenPlatNumberExist < 0)
        throw new Error(`Registration number ${platNumber} not found`);

      const removedVehicle = parkingSlot.splice(
        isVehicleWithGivenPlatNumberExist,
        1
      );
      const totalParkingFees = handleCalculateParkingFee(
        removedVehicle[0]?.entryTime
      );
      console.log(
        `Registration number ${platNumber} with Slot Number ${
          isVehicleWithGivenPlatNumberExist + 1
        } is free with Charge ${totalParkingFees}`
      );
      return removedVehicle[0];
    } else {
      throw new Error("Please create parking lot first");
    }
  };

  const handlePrintStatus = () => {
    const isParkingSlotEmpty = parkingSlot.every((slot) => slot === null);
    if (isParkingSlotEmpty) {
      return null;
    } else {
      let baseLog = "Slot No. Registration No.\n";
      parkingSlot.forEach((slot, idx) => {
        baseLog += `${idx + 1} ${slot?.platNumber}\n`;
      });
      console.log(baseLog);
    }
  };

  return {
    createParkingLot,
    handleParkCar,
    handleRemoveCar,
    handlePrintStatus,
  };
};

export default parkingLotFactory;
