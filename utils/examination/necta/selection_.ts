export type SelectionOptions =
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
  programmeRequirements: SelectionOptions[];
  maximumIntake: number;
  currentIntake: number;
}

interface ProgrammePriority extends Programme {
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

// function handleOptions(
//   options: SelectionOptions[],
//   student: StudentApplication,
// ): boolean {
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

// Type guard for ProgrammeSelectionCriteria
function isProgrammeSelectionCriteria(
  option: SelectionOptions,
): option is ProgrammeSelectionCriteria {
  return (
    (option as ProgrammeSelectionCriteria).requiredProgrammeCount !== undefined
  );
}

// Type guard for SubjectSelectionCriteria
function isSubjectSelectionCriteria(
  option: SelectionOptions,
): option is SubjectSelectionCriteria {
  return (
    (option as SubjectSelectionCriteria).requiredSubjectCount !== undefined
  );
}

// Type guard for ProgrammeMinimumStandards
function isProgrammeMinimumStandards(
  option: SelectionOptions,
): option is ProgrammeMinimumStandards {
  return (option as ProgrammeMinimumStandards).programmeList !== undefined;
}

// Type guard for SubjectMinimumStandards
function isSubjectMinimumStandards(
  option: SelectionOptions,
): option is SubjectMinimumStandards {
  return (option as SubjectMinimumStandards).subjectList !== undefined;
}

function handleOptions(
  options: SelectionOptions[],
  student: StudentApplication,
): boolean {
  const allSubjectResults = [
    ...student.oLevelResults,
    ...student.aLevelResults,
  ];
  const allProgrammeResults = student.programmeResults;

  for (let option of options) {
    if (isProgrammeSelectionCriteria(option)) {
      if (!meetsProgrammeSelectionCriteria(allProgrammeResults, option)) {
        throw new Error("Failed to meet programme selection criteria");
      }
    } else if (isSubjectSelectionCriteria(option)) {
      if (!meetsSubjectSelectionCriteria(allSubjectResults, option)) {
        throw new Error("Failed to meet subject selection criteria");
      }
    } else if (isProgrammeMinimumStandards(option)) {
      if (!meetsProgrammeMinimumStandards(allProgrammeResults, option)) {
        throw new Error("Failed to meet programme minimum standards");
      }
    } else if (isSubjectMinimumStandards(option)) {
      if (!meetsSubjectMinimumStandards(allSubjectResults, option)) {
        throw new Error("Failed to meet subject minimum standards");
      }
    }
  }

  return true;
}

function processStudentApplications(
  students: StudentApplication[],
  programmes: Programme[],
): void {
  students.forEach((student) => {
    let isAccepted = false;

    // Iterate over the student's top 3 programmes
    for (let programme of student.programmePriorities) {
      // Check if the programme can take any more students
      const programmeData = programmes.find(
        (p) => p.programmeId === programme.programmeId,
      );
      if (
        programmeData &&
        programmeData.currentIntake < programmeData.maximumIntake
      ) {
        // Check the programme's options
        for (let option of programmeData.programmeRequirements) {
          if (handleOptions([option], student)) {
            // The student meets the requirement, accept them to the programme
            isAccepted = true;
            programmeData.currentIntake++;
            console.log(
              `Student ${student.applicantId} has been accepted to programme ${programme.programmeId}`,
            );
            break;
          }
        }
      }

      if (isAccepted) {
        break;
      }
    }

    if (!isAccepted) {
      console.log(
        `Student ${student.applicantId} has been rejected from all programmes`,
      );
    }
  });
}
