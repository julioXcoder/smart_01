interface Subject {
  name: string;
  isReligious: boolean;
  minimumGrade?: string;
  condition: "or" | "and";
}

interface UniversitySelectionCriteria {
  nonReligiousSubjects: number;
  requiredSubjects: Subject[];
  technicalSchool?: boolean;
  tradeTestGradeOne?: boolean;
  nvaLevelThree?: boolean;
}

// Example of a student's eligibility object
// const studentEligibility: UniversitySelectionCriteria = {
//   cseePass: true,
//   nonReligiousSubjects: 4,
//   requiredSubjects: [
//     { name: "Mathematics", isReligious: false, minimumGrade: "D" },
//     { name: "Physics", isReligious: false, minimumGrade: "D" },
//     { name: "Chemistry", isReligious: false, minimumGrade: "D" },
//     {
//       name: "Basic Applied Mathematics",
//       isReligious: false,
//       minimumGrade: "D",
//     },
//   ],
//   technicalSchool: true,
//   tradeTestGradeOne: false,
//   nvaLevelThree: false,
//   additionalSubjects: [{ name: "Architectural Drafting", isReligious: false }],
// };

const csee = [
  {
    code: "021",
    name: "Kiswahili",
    isReligious: false,
  },
  {
    code: "013",
    name: "Geography",
    isReligious: false,
  },
  {
    code: "041",
    name: "Basic Mathematics",
    isReligious: false,
  },
  {
    code: "012",
    name: "History",
    isReligious: false,
  },
  {
    code: "032",
    name: "Chemistry",
    isReligious: false,
  },
  {
    code: "022",
    name: "English Language",
    isReligious: false,
  },
  {
    code: "033",
    name: "Biology",
    isReligious: false,
  },
  {
    code: "011",
    name: "Civics",
    isReligious: false,
  },
  {
    code: "014",
    name: "Bible Knowledge",
    isReligious: true,
  },
  {
    code: "015",
    name: "Elimu ya Dini ya Kiislamu",
    isReligious: true,
  },
];

const acsee = [
  {
    code: "111",
    name: "General Studies",
    isReligious: false,
  },
  {
    code: "112",
    name: "History",
    isReligious: false,
  },
  {
    code: "113",
    name: "Geography",
    isReligious: false,
  },
  {
    code: "114",
    name: "Divinity",
    isReligious: true,
  },
  {
    code: "115",
    name: "Islamic Knowledge",
    isReligious: true,
  },
  {
    code: "121",
    name: "Kiswahili",
    isReligious: false,
  },
  {
    code: "122",
    name: "English Language",
    isReligious: false,
  },
  {
    code: "123",
    name: "French Language",
    isReligious: false,
  },
  {
    code: "131",
    name: "Physics",
    isReligious: false,
  },
  {
    code: "132",
    name: "Chemistry",
    isReligious: false,
  },
  {
    code: "133",
    name: "Biology",
    isReligious: false,
  },
  {
    code: "134",
    name: "Agriculture",
    isReligious: false,
  },
  {
    code: "136",
    name: "Computer Science",
    isReligious: false,
  },
  {
    code: "141",
    name: "Basic Applied Mathematics",
    isReligious: false,
  },
  {
    code: "142",
    name: "Advanced Mathematics",
    isReligious: false,
  },
  {
    code: "151",
    name: "Economics",
    isReligious: false,
  },
  {
    code: "152",
    name: "Commerce",
    isReligious: false,
  },
  {
    code: "153",
    name: "Accountancy",
    isReligious: false,
  },
  {
    code: "155",
    name: "Food and Human Nutrition",
    isReligious: false,
  },
];

const veta = [
  {
    code: "101",
    name: "Mechanical Engineering",
    isReligious: false,
  },
  {
    code: "102",
    name: "Electrical Engineering",
    isReligious: false,
  },
  {
    code: "103",
    name: "Civil and Building Engineering",
    isReligious: false,
  },
  {
    code: "104",
    name: "Automotive Engineering",
    isReligious: false,
  },
  {
    code: "105",
    name: "Commercial Services and Business Support",
    isReligious: false,
  },
  {
    code: "106",
    name: "Clothing and Textile",
    isReligious: false,
  },
  {
    code: "107",
    name: "Transport",
    isReligious: false,
  },
  {
    code: "108",
    name: "Mining",
    isReligious: false,
  },
  {
    code: "109",
    name: "Printing",
    isReligious: false,
  },
  {
    code: "110",
    name: "Cosmetology",
    isReligious: false,
  },
  {
    code: "111",
    name: "Agriculture and Food Processing",
    isReligious: false,
  },
  {
    code: "112",
    name: "Hospitality, Tourism and Travel Agency",
    isReligious: false,
  },
  {
    code: "113",
    name: "Fine and Performing Arts",
    isReligious: false,
  },
];
