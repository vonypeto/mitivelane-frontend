export const exportColor = (action) => {
    action = action.toLowerCase()
    if (action == "create") {
      return "#00A36C";
    }
    if (action == "update") {
      return "#0047AB";
    }
    if (action == "delete") {
      return "#FF0000";
    }
  };