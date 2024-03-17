type Room = {
  name: string;
  type: "SINGLE" | "SELF";
  rent: number;
  status: "PENDING" | "OPEN" | "BOOKED";
};
