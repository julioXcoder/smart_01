type options = (
  | ProgramMinimumStandards
  | ProgramSelectionCriteria
  | SubjectMinimumStandards
  | SubjectSelectionCriteria
)[];

type EvaluationSystem = "GPA" | "grade";
type Level = "CSEE" | "ACSEE";

interface Result {
  id: number;
  subject: string;
  grade: string; // Assuming grades are represented as strings ('A', 'B', 'C', etc.)
}

interface ProgrammeResult extends Programme {
  evaluationSystem: EvaluationSystem;
  grade: string;
}

interface Programme {
  id: string;
  programName: string;
  maximumStudents: number;
  //requirement options
}

interface StudentApplication {
  CSEEResults: Result[];
  ACSEEResults: Result[];
  programList: (GpaBasedProgram | GradeBasedProgram)[];
  // programme priorities
}

interface GpaBasedProgram extends Programme {
  minimumGPA: number;
}

interface GradeBasedProgram extends Programme {
  minimumGrade: string;
}

interface Subject {
  id: string;
  programName: string;
  gradeMinimum: string;
  level: Level;
}

// This interface ensures all programs meet a minimum standard.
interface ProgramMinimumStandards {
  minimumRequirement: number;
  evaluationSystem: EvaluationSystem;
  programList: (GpaBasedProgram | GradeBasedProgram)[];
}

interface SubjectMinimumStandards {
  minimumRequirement: number;
  level: Level;
  subjectList: Subject[];
}

// This interface verifies a certain number of programs meet a minimum standard.
interface ProgramSelectionCriteria {
  requiredProgramsCount: number;
  minimumStandard: number;
  evaluationSystem: EvaluationSystem;
  programList: (GpaBasedProgram | GradeBasedProgram)[];
}

interface SubjectSelectionCriteria {
  requiredSubjectsCount: number;
  minimumStandard: number;
  level: Level;
  subjectList: Subject[];
}

function handleGpaMinimumStandards(
  student: StudentApplication,
  requirement: ProgramMinimumStandards,
) {
  // Your logic here...
}

function handleSubjectMinimumStandards(
  student: StudentApplication,
  requirement: SubjectMinimumStandards,
) {
  // Your logic here...
}

function handleGradeMinimumStandards(
  student: StudentApplication,
  requirement: ProgramMinimumStandards,
) {
  // Your logic here...
}

function handleGpaSelectionCriteria(
  student: StudentApplication,
  requirement: ProgramSelectionCriteria,
) {
  // Your logic here...
}

function handleSubjectSelectionCriteria(
  student: StudentApplication,
  requirement: SubjectSelectionCriteria,
) {
  // Your logic here...
}

function handleGradeSelectionCriteria(
  student: StudentApplication,
  requirement: ProgramSelectionCriteria,
) {
  // Your logic here...
}

function handleOptions(
  options: (
    | ProgramMinimumStandards
    | ProgramSelectionCriteria
    | SubjectMinimumStandards
    | SubjectSelectionCriteria
  )[],
  student: StudentApplication,
) {
  options.forEach((option) => {
    if (
      "requiredProgramsCount" in option ||
      "requiredSubjectsCount" in option
    ) {
      // This is a SelectionCriteria
      if ("evaluationSystem" in option) {
        // This is a ProgramSelectionCriteria
        if (option.evaluationSystem === "GPA") {
          handleGpaSelectionCriteria(student, option);
        } else if (option.evaluationSystem === "grade") {
          handleGradeSelectionCriteria(student, option);
        }
      } else {
        // This is a SubjectSelectionCriteria
        handleSubjectSelectionCriteria(student, option);
      }
    } else {
      // This is a MinimumStandards
      if ("evaluationSystem" in option) {
        // This is a ProgramMinimumStandards
        if (option.evaluationSystem === "GPA") {
          handleGpaMinimumStandards(student, option);
        } else if (option.evaluationSystem === "grade") {
          handleGradeMinimumStandards(student, option);
        }
      } else {
        // This is a SubjectMinimumStandards
        handleSubjectMinimumStandards(student, option);
      }
    }
  });
}
