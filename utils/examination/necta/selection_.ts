type SelectionOptions =
  | ProgrammeMinimumStandards
  | ProgrammeSelectionCriteria
  | SubjectMinimumStandards
  | SubjectSelectionCriteria;

type Grade = "A" | "B" | "C" | "D" | "E" | "F";

const gradeValues: { [grade in Grade]: number } = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
  E: 1,
  F: 0,
};

interface Programme {
  programmeId: string;
  programmeName: string;
  programmeRequirement: SelectionOptions[];
}

interface ProgrammePriority {
  priorityRank: number;
}

interface Subject {
  subjectId: string;
  subjectName: string;
}

interface SecondaryEducationResult extends Subject {
  grade: Grade; // Grades are represented as strings ('A', 'B', 'C', etc.)
}

interface ProgrammeResult extends Programme {
  gpa: number; // GPA is represented as a number (4.5, 3, 2.5, etc.)
}

interface StudentApplication {
  applicantId: string;
  oLevelResults: SecondaryEducationResult[];
  aLevelResults: SecondaryEducationResult[];
  programmeResults: ProgrammeResult[];
  programmePriorities: ProgrammePriority[];
}

interface ProgrammeMinimumRequirements extends Programme {
  minimumGPA: number;
}

interface SubjectMinimumRequirements extends Subject {
  minimumGrade: Grade;
}

interface ProgrammeMinimumStandards {
  programmeList: ProgrammeMinimumRequirements[];
}

interface SubjectMinimumStandards {
  subjectList: SubjectMinimumRequirements[];
}

interface ProgrammeSelectionCriteria {
  requiredProgrammeCount: number;
  programmeSelectionList: ProgrammeMinimumRequirements[];
}

interface SubjectSelectionCriteria {
  requiredSubjectCount: number;
  subjectSelectionList: SubjectMinimumRequirements[];
}

function meetsProgrammeMinimumStandards(
  studentProgrammeResults: ProgrammeResult[],
  requirement: ProgrammeMinimumStandards,
): boolean {
  // Check if the student has all the programmes in the requirement
  for (let programme of requirement.programmeList) {
    const studentProgramme = studentProgrammeResults.find(
      (result) => result.programmeId === programme.programmeId,
    );

    // If the student does not have this programme, return false
    if (!studentProgramme) {
      return false;
    }

    // If the student's GPA for this programme is less than the minimum required GPA, return false
    if (studentProgramme.gpa < programme.minimumGPA) {
      return false;
    }
  }

  // If the student has all the required programmes and meets the minimum GPA for each, return true
  return true;
}

function meetsSubjectMinimumStandards(
  studentSecondaryEducationResults: SecondaryEducationResult[],
  requirement: SubjectMinimumStandards,
): boolean {
  // Check if the student has all the subjects in the requirement
  for (let subject of requirement.subjectList) {
    const studentSubject = studentSecondaryEducationResults.find(
      (result) => result.subjectId === subject.subjectId,
    );

    // If the student does not have this subject, return false
    if (!studentSubject) {
      return false;
    }

    // If the student's grade for this subject is less than the minimum required grade, return false
    if (gradeValues[studentSubject.grade] < gradeValues[subject.minimumGrade]) {
      return false;
    }
  }

  // If the student has all the required subjects and meets the minimum grade for each, return true
  return true;
}

function meetsProgrammeSelectionCriteria(
  studentProgrammeResults: ProgrammeResult[],
  requirement: ProgrammeSelectionCriteria,
): boolean {
  let passedProgrammesCount = 0;

  // Check each programme in the requirement
  for (let programme of requirement.programmeSelectionList) {
    const studentProgramme = studentProgrammeResults.find(
      (result) => result.programmeId === programme.programmeId,
    );

    // If the student has this programme and the GPA is greater than or equal to the minimum required GPA, increment the count
    if (studentProgramme && studentProgramme.gpa >= programme.minimumGPA) {
      passedProgrammesCount++;
    }
  }

  // Check if the number of passed programmes is less than the required count
  if (passedProgrammesCount < requirement.requiredProgrammeCount) {
    return false;
  }

  return true;
}

function meetsSubjectSelectionCriteria(
  studentSecondaryEducationResults: SecondaryEducationResult[],
  requirement: SubjectSelectionCriteria,
): boolean {
  let passedSubjectsCount = 0;

  // Check each subject in the requirement
  for (let subject of requirement.subjectSelectionList) {
    const studentSubject = studentSecondaryEducationResults.find(
      (result) => result.subjectId === subject.subjectId,
    );

    // If the student has this subject and the grade is greater than or equal to the minimum required grade, increment the count
    if (
      studentSubject &&
      gradeValues[studentSubject.grade] >= gradeValues[subject.minimumGrade]
    ) {
      passedSubjectsCount++;
    }
  }

  // Check if the number of passed subjects is less than the required count
  if (passedSubjectsCount < requirement.requiredSubjectCount) {
    return false;
  }

  return true;
}

function handleOptions(programme: Programme, student: StudentApplication) {
  const options = programme.programmeRequirement;
  const allSubjectResults = [
    ...student.oLevelResults,
    ...student.aLevelResults,
  ];
  const allProgrammeResults = student.programmeResults;

  options.forEach((option) => {
    if ("requiredProgrammeCount" in option) {
      meetsProgrammeSelectionCriteria(allProgrammeResults, option);
    } else if ("requiredSubjectCount" in option) {
      meetsSubjectSelectionCriteria(allSubjectResults, option);
    } else if ("subjectList" in option) {
      meetsSubjectMinimumStandards(allSubjectResults, option);
    } else {
      meetsProgrammeMinimumStandards(allProgrammeResults, option);
    }
  });
}

//TODO: use this
// function handleOptions(programme: Programme, student: StudentApplication): boolean {
//   const options = programme.programmeRequirement;
//   const allSubjectResults = [
//     ...student.oLevelResults,
//     ...student.aLevelResults,
//   ];
//   const allProgrammeResults = student.programmeResults;

//   for (let option of options) {
//     if ("requiredProgrammeCount" in option) {
//       if (!meetsProgrammeSelectionCriteria(allProgrammeResults, option)) {
//         return false;
//       }
//     } else if ("requiredSubjectCount" in option) {
//       if (!meetsSubjectSelectionCriteria(allSubjectResults, option)) {
//         return false;
//       }
//     } else if ("subjectList" in option) {
//       if (!meetsSubjectMinimumStandards(allSubjectResults, option)) {
//         return false;
//       }
//     } else {
//       if (!meetsProgrammeMinimumStandards(allProgrammeResults, option)) {
//         return false;
//       }
//     }
//   }

//   return true;
// }
