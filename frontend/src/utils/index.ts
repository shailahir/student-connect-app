export const getStatusName = (statusId: string) => {
  switch (`${statusId}`) {
    case "1":
      return "New";
    case "2":
      return "Pending";
    case "3":
      return "In Progress";
    case "4":
      return "Completed";
    case "5":
      return "Failed";
    default:
      return "";
  }
};
