import React from "react";

export const createActionType = (type, entity = "App") => ({
  START: `@@[${entity}] ${type}`,
  SUCCESS: `@@[${entity}] ${type}_SUCCESS`,
  ERROR: `@@[${entity}] ${type}_ERROR`,
  END: `@@[${entity}] ${type}_END`
});

export const createActionString = (type, entity = "App") =>
  `[${entity}] ${type}`;

export const capitalizeFirstLetter = (firstName = "") => {
  const splitFirstName = firstName.split(" ");
  var fstName = "";
  for (const value of splitFirstName) {
    fstName +=
      " " +
      value
        .charAt(0)
        .toUpperCase()
        .concat(value.slice(1));
  }

  return fstName;
};
