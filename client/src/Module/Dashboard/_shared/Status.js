const currentStatus = todo => {
  const status = ["Pending", "Progress", "Completed"].find(
    status => status === (todo && todo.status)
  );
  var statusClassName;
  if (status === "Pending") {
    statusClassName = "warning";
  } else if (status === "Progress") {
    statusClassName = "primary";
  } else if (status === "Completed") {
    statusClassName = "success";
  } else {
    statusClassName = "info";
  }
  return { statusClassName };
};

export default currentStatus;
