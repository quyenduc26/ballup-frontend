export const convertToTimestamp = ( selectedDate: Date, time: string) => {
    const [hours, minutes] = time.split(":").map(Number);

    return selectedDate
      ? new Date(selectedDate.setHours(hours, minutes, 0, 0)).getTime()
      : null;
  };