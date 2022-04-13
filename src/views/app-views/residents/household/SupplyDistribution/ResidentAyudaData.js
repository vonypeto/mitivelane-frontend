import { tSTypeAliasDeclaration } from "@babel/types";
import { COLORS } from "constants/ChartConstant";

//Needs to be in individual array for DonutChartWidget to work
export const resident_ayuda_color = [COLORS[0], COLORS[3]];
export const resident_ayuda_name = ["Recieved", "Pending"];
export const resident_ayuda_amount = [40, 13];

//Needs to be in individual array for DonutChartWidget to work
export const joinResidentAyuda = () => {
  let arr = [];
  for (let i = 0; i < resident_ayuda_color.length; i++) {
    const color = resident_ayuda_color[i];
    const name = resident_ayuda_name[i];
    const amount = resident_ayuda_amount[i];
    arr = [
      ...arr,
      {
        color: color,
        name: name,
        amount: amount,
      },
    ];
  }
  return arr;
};

export const resident_ayudas = joinResidentAyuda();

const series = [
  {
    name: "Net Profit",
    data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
  },
  {
    name: "Revenue",
    data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
  },
  {
    name: "Free Cash Flow",
    data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
  },
];

export const AyudaChartData = {
  series: [
    {
      name: "Supply Distributed",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 12, 15, 66],
    },
    {
      name: "Supply Stock",
      data: [14, 31, 45, 61, 57, 68, 75, 11, 88, 55, 61, 23],
    },
  ],

  options: {
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    colors: [COLORS[0], COLORS[1]],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    fill: {
      opacity: 1,
    },
  },
};

export const HouseholdTableData = [
  {
    household_id: "1",
    household_number: "4",
    househole_name: "Smiths",
    purok: "San Juan",
    house_status: "Rented",
    family_planning: "None",
    ayuda: "to be updated",
    water_source: "pipe",
    toilet_type: "sealed",
    waste_management: "collect",
    household_member_id: ["1", "2"],
  },
  {
    household_id: "2",
    household_number: "2",
    househole_name: "Buenaventuras",
    purok: "Caniogan",
    house_status: "Owned",
    family_planning: "None",
    ayuda: "to be updated",
    water_source: "pipe",
    toilet_type: "sealed",
    waste_management: "collect",
    household_member_id: ["3"],
  },
  {
    household_id: "3",
    household_number: "3",
    househole_name: "Aralars",
    purok: "San Guillermo",
    house_status: "Owned",
    family_planning: "None",
    ayuda: "to be updated",
    water_source: "pipe",
    toilet_type: "sealed",
    waste_management: "collect",
    household_member_id: ["4"],
  },
];

export const ResidentTableData = [
  {
    id: "1",
    name: "John Smith",
    birthday: "12-30-1957",
    age: "69",
    sex: "Male",
    blood_type: "B",
    civil_status: "Married",
    educational_attainment: "High School Grad.",
    occupation: "n/a",
    ofw: "no",
    illness: "none",
  },
  {
    id: "2",
    name: "Michael Myers",
    birthday: "12-30-1980",
    age: "41",
    sex: "Male",
    blood_type: "A",
    civil_status: "Single",
    educational_attainment: "College Grad.",
    occupation: "n/a",
    ofw: "no",
    illness: "none",
  },
  {
    id: "3",
    name: "Juan Dela Cruz",
    birthday: "12-30-1990",
    age: "31",
    sex: "Male",
    blood_type: "0",
    civil_status: "Married",
    educational_attainment: "College Grad.",
    occupation: "Computer Engineer",
    ofw: "Japan",
    illness: "none",
  },
  {
    id: "4",
    name: "James Robles",
    birthday: "12-30-1960",
    age: "61",
    sex: "Male",
    blood_type: "AB",
    civil_status: "Married",
    educational_attainment: "Elementary School Grad.",
    occupation: "Freelance",
    ofw: "no",
    illness: "none",
  },
];


export const ResidentTableColumns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Birthday",
    dataIndex: "birthday",
    key: "birthday",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Blood type",
    dataIndex: "blood_type",
    key: "blood_type",
  },
  {
    title: "Civil Status",
    dataIndex: "civil_status",
    key: "civil_status",
  },
  {
    title: "Educational Attainment",
    dataIndex: "educational_attainment",
    key: "educational_attainment",
  },
  {
    title: "Occupation",
    dataIndex: "occupation",
    key: "occupation",
  },
  {
    title: "OFW",
    dataIndex: "ofw",
    key: "ofw",
  },
  {
    title: "Illness",
    dataIndex: "illness",
    key: "illness",
  },
];
