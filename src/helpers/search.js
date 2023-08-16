export const findSearch = (allTrainings, search) => {
  let response = [];
  allTrainings.forEach((training) => {
    for (const val in training) {
      if (typeof training[val] === "string") {
        if (training[val].toLowerCase().includes(search.toLowerCase())) {
          response.push(training);
          break;
        }
      }
      if (typeof training[val] === "object") {
        for (const val2 in training[val]) {
          if (typeof training[val][val2] === "string") {
            if (
              training[val][val2].toLowerCase().includes(search.toLowerCase())
            ) {
              response.push(training);
              break;
            }
          }
        }
      }
      // console.log(typeof training[val]);
    }
  });
  if (search != "") {
    console.log("resp:", response);
    return response;
  } else {
    return null;
  }
};
