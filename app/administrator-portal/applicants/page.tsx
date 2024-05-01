"use client";

import { useState } from "react";

interface Student {
  id: string;
  name: string;
  age: number;
}

const students: Student[] = [
  { id: "1", name: "John Doe", age: 20 },
  { id: "2", name: "Jane Doe", age: 22 },
  // ... more students
];

const Page = () => {
  const [pickedStudents, setPickedStudents] = useState<Student[]>([]);

  const pickStudent = (student: Student) => {
    if (!pickedStudents.find((s) => s.id === student.id)) {
      setPickedStudents((prev) => [...prev, student]);
    }
  };

  const removeStudent = (student: Student) => {
    setPickedStudents((prev) => prev.filter((s) => s.id !== student.id));
  };

  return (
    <div>
      <h1>Pick a Student</h1>
      {students.map((student) => (
        <button key={student.id} onClick={() => pickStudent(student)}>
          {student.name}
        </button>
      ))}

      <h1>Picked Students</h1>
      {pickedStudents.map((student, index) => (
        <div key={student.id}>
          <p>
            {index + 1}. {student.name} ({student.age})
          </p>
          <button onClick={() => removeStudent(student)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default Page;
