const vehicle = ({ platNumber, entryTime }) => {
  return { platNumber, entryTime, leaveTime: null };
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
      throw new Error("Please create parking before parking lot first");
    }
  };

  return {
    createParkingLot,
    handleParkCar,
  };
};

export default parkingLotFactory;
