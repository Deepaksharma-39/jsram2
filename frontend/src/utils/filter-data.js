export const overallData = (data) => {
  const cityCounts = {};
  // Iterate through the array of objects and count the occurrences of each city
  data?.forEach((obj) => {
    const city = obj.CITY?.toUpperCase(); // Ensure case-insensitivity
    if (city) {
      cityCounts[city] = (cityCounts[city] || 0) + 1;
    }
  });

  return cityCounts;
};

export const filterDataByStatus = (data, key, status) => {
  return data?.filter((item) => {
    const value = item[key];

    if (status === "USED") {
      return value === "USED";
    } else if (status === "UNUSED") {
      return value !== "USED";
    } else {
      return value !== "USED" && value !== "UNUSED";
    }
  });
};

export const filterDataByBank = (
  data,
  firstConditionKey,
  firstConditionValue,
  secondConditionKey,
  secondConditionValue
) => {
  const newArr = data?.filter(
    (obj) =>
      obj[firstConditionKey]?.toUpperCase() === firstConditionValue.toUpperCase() &&
      obj[secondConditionKey]?.toUpperCase() === secondConditionValue.toUpperCase()
  );

  return newArr;
};
