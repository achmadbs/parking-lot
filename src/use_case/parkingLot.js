const parkingLotFactory = () => {
  let TOTAL_PARKING_SLOT = 0;
  let parkingSlot = [];

  const createParkingLot = (command) => {
    const inputNumber = parseInt(command.split(" ")[1]);
    TOTAL_PARKING_SLOT = inputNumber;
    if (TOTAL_PARKING_SLOT <= 0) {
      throw new Error("Parking slot cannot less than 0");
    }
    parkingSlot = new Array(TOTAL_PARKING_SLOT).fill(null);
    return TOTAL_PARKING_SLOT;
  };

  return {
    createParkingLot,
  };
};

export default parkingLotFactory;
