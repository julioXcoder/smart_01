"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";

interface Classroom {
  name: string;
  seats: number;
  available: boolean;
  features: string[];
}

interface Course {
  name: string;
  sockets: number;
  requirements: string[];
}

interface Programme {
  name: string;
  students: number;
  courses: Course[];
}

interface DayStructure {
  type: string;
  duration: number;
}

interface ScheduledPeriod {
  time: string;
  event: string;
  classroom?: string;
}

let daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Friday"];

const TimetablePage = () => {
  const [classrooms, setClassrooms] = useState<Classroom[]>([
    {
      name: "Classroom 1",
      seats: 30,
      available: true,
      features: ["computers", "projector", "laboratory"],
    },
    {
      name: "Classroom 2",
      seats: 12,
      available: true,
      features: ["computers"],
    },
    {
      name: "Classroom 3",
      seats: 30,
      available: true,
      features: ["laboratory"],
    },
  ]);

  const [programmes, setProgrammes] = useState<Programme[]>([
    {
      name: "Mathematics",
      students: 25,
      courses: [
        { name: "Algebra", sockets: 2, requirements: ["computers"] },
        { name: "Calculus", sockets: 1, requirements: ["computers"] },
        {
          name: "Geometry",
          sockets: 3,
          requirements: ["computers"],
        },
      ],
    },
    {
      name: "Mathematics 2",
      students: 25,
      courses: [
        { name: "Algebra 2", sockets: 2, requirements: ["computers"] },
        { name: "Calculus 2", sockets: 1, requirements: ["computers"] },
        {
          name: "Geometry 2",
          sockets: 3,
          requirements: ["computers"],
        },
      ],
    },
    {
      name: "Physics",
      students: 20,
      courses: [
        { name: "Mechanics", sockets: 1, requirements: ["laboratory"] },
        { name: "Electricity", sockets: 1, requirements: ["laboratory"] },
        { name: "Optics", sockets: 1, requirements: ["laboratory"] },
      ],
    },
  ]);

  const [dayStructure, setDayStructure] = useState<DayStructure[]>([
    { type: "breakfast", duration: 2 },
    { type: "s", duration: 2 },
    { type: "s", duration: 2 },
    { type: "break", duration: 1 },
    { type: "s", duration: 2 },
    { type: "lunch", duration: 1 },
    { type: "s", duration: 2 },
  ]);

  const [timetable, setTimetable] = useState<Array<Array<ScheduledPeriod[]>>>(
    Array.from({ length: daysOfWeek.length }, () =>
      Array.from({ length: classrooms.length }, () => []),
    ),
  );

  const [unscheduledCourses, setUnscheduledCourses] = useState<string[]>([]);

  const shuffleTimetableDays = useCallback(
    (timetable: ScheduledPeriod[][][]): ScheduledPeriod[][][] => {
      // Create a copy of the timetable to avoid mutating the original
      const shuffledTimetable: ScheduledPeriod[][][] = JSON.parse(
        JSON.stringify(timetable),
      );

      // For each classroom
      for (
        let classroomIndex = 0;
        classroomIndex < shuffledTimetable[0].length;
        classroomIndex++
      ) {
        // Collect all 's' type periods for this classroom across all days
        let allPeriods: ScheduledPeriod[] = [];
        for (
          let dayIndex = 0;
          dayIndex < shuffledTimetable.length;
          dayIndex++
        ) {
          allPeriods = allPeriods.concat(
            shuffledTimetable[dayIndex][classroomIndex].filter(
              (_, i) => dayStructure[i].type === "s",
            ),
          );
        }

        // Shuffle all 's' type periods
        allPeriods = shuffleArray(allPeriods);

        // Distribute the shuffled periods back to the days according to the dayStructure
        for (
          let dayIndex = 0;
          dayIndex < shuffledTimetable.length;
          dayIndex++
        ) {
          let periodIndex = 0;
          for (
            let structureIndex = 0;
            structureIndex < dayStructure.length;
            structureIndex++
          ) {
            if (dayStructure[structureIndex].type === "s") {
              const period = allPeriods.shift();
              if (period) {
                shuffledTimetable[dayIndex][classroomIndex][structureIndex] =
                  period;
                periodIndex += dayStructure[structureIndex].duration;
              }
            }
          }
        }
      }

      return shuffledTimetable;
    },
    [dayStructure],
  );

  function shuffleArray<T>(array: T[]): T[] {
    let currentIndex = array.length;
    let temporaryValue: T;
    let randomIndex: number;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  const getDuration = useCallback(
    (index: number): number => {
      const period = dayStructure[index];
      return period ? period.duration : 0;
    },
    [dayStructure],
  );

  const startingTime = useMemo(() => 8.5 * 60, []);

  const correctTimes = useCallback(
    (
      shuffledTimetable: Array<Array<ScheduledPeriod[]>>,
    ): Array<Array<ScheduledPeriod[]>> => {
      return shuffledTimetable.map((day: ScheduledPeriod[][]) =>
        day.map((classroom: ScheduledPeriod[]) => {
          let currentTime = startingTime;
          return classroom.map((period: ScheduledPeriod, index) => {
            const duration = getDuration(index);
            const startTime = currentTime;
            currentTime += duration * 60;
            const endTime = currentTime;
            return {
              ...period,
              time: `${Math.floor(startTime / 60)}:${(startTime % 60)
                .toString()
                .padStart(2, "0")} - ${Math.floor(endTime / 60)}:${(
                endTime % 60
              )
                .toString()
                .padStart(2, "0")}`,
            };
          });
        }),
      );
    },
    [getDuration, startingTime],
  );

  useEffect(() => {
    let programmesCopy = shuffleCourses(JSON.parse(JSON.stringify(programmes)));

    let updatedTimetable: Array<Array<ScheduledPeriod[]>> = Array.from(
      { length: daysOfWeek.length },
      () => Array.from({ length: classrooms.length }, () => []),
    );

    let classroomIndex = 0; // Track the current classroom index
    for (let dayIndex = 0; dayIndex < daysOfWeek.length; dayIndex++) {
      let currentTime = startingTime;

      for (
        let periodIndex = 0;
        periodIndex < dayStructure.length;
        periodIndex++
      ) {
        const period = dayStructure[periodIndex];
        const { type, duration } = period;
        const startTime = currentTime;
        currentTime += duration * 60;
        const endTime = currentTime;

        for (let cIndex = 0; cIndex < classrooms.length; cIndex++) {
          let classroom = classrooms[classroomIndex];

          if (type === "s") {
            let scheduled = false;

            for (
              let programmeIndex = 0;
              programmeIndex < programmesCopy.length;
              programmeIndex++
            ) {
              let programme = programmesCopy[programmeIndex];

              if (
                programme.courses.length > 0 &&
                programme.courses[0].sockets > 0
              ) {
                if (
                  classroom.seats >= programme.students &&
                  programme.courses[0].requirements.every((req: string) =>
                    classroom.features.includes(req),
                  )
                ) {
                  updatedTimetable[dayIndex][classroomIndex].push({
                    time: `${startTime / 60}:${(startTime % 60)
                      .toString()
                      .padStart(2, "0")} - ${endTime / 60}:${(endTime % 60)
                      .toString()
                      .padStart(2, "0")}`,
                    event: `${programme.name}, ${programme.courses[0].name}`,
                    classroom: classroom.name,
                  });

                  programme.courses[0].sockets--;

                  if (programme.courses[0].sockets === 0) {
                    programme.courses.shift();
                  }

                  scheduled = true;
                  break;
                }
              }
            }

            if (!scheduled) {
              updatedTimetable[dayIndex][classroomIndex].push({
                time: `${startTime / 60}:${(startTime % 60)
                  .toString()
                  .padStart(2, "0")} - ${endTime / 60}:${(endTime % 60)
                  .toString()
                  .padStart(2, "0")}`,
                event: "Free",
              });
            }
          } else {
            updatedTimetable[dayIndex][classroomIndex].push({
              time: `${startTime / 60}:${(startTime % 60)
                .toString()
                .padStart(2, "0")} - ${endTime / 60}:${(endTime % 60)
                .toString()
                .padStart(2, "0")}`,
              event: period.type,
            });
          }

          classroomIndex = (classroomIndex + 1) % classrooms.length; // Move to the next classroom index in a circular manner
        }
      }
    }
    let shuffledTimetable = shuffleTimetableDays(updatedTimetable);
    let correctedTimetable = correctTimes(shuffledTimetable);

    setTimetable(correctedTimetable);

    const unscheduled = programmesCopy.reduce(
      (unscheduledCourses: string[], programme: Programme) => {
        if (programme.courses.length > 0) {
          unscheduledCourses.push(
            ...programme.courses.map(
              (course) => `${programme.name}, ${course.name}`,
            ),
          );
        }
        return unscheduledCourses;
      },
      [],
    );

    setUnscheduledCourses(unscheduled);
  }, [
    classrooms,
    programmes,
    dayStructure,
    shuffleTimetableDays,
    correctTimes,
    startingTime,
  ]);

  function shuffleCourses(programmes: Programme[]): Programme[] {
    return programmes.map((programme) => {
      let courses = [...programme.courses];

      // Shuffle the courses
      for (let i = courses.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [courses[i], courses[j]] = [courses[j], courses[i]];
      }

      // Sort the courses by the number of requirements
      courses.sort((a, b) => a.requirements.length - b.requirements.length);

      return { ...programme, courses };
    });
  }

  return (
    <div>
      <div className="flex flex-col">
        {timetable.map((day, dayIndex) => (
          <div key={dayIndex} className="mb-4">
            <h2 className="mb-2 text-2xl font-bold">{`${daysOfWeek[dayIndex]}`}</h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="font-semibold">Time</div>
              {day.map((_, classroomIndex) => (
                <div key={classroomIndex} className="font-semibold">
                  {`${classrooms[classroomIndex].name}`}
                </div>
              ))}
              {day[0].map((period, periodIndex) => (
                <React.Fragment key={periodIndex}>
                  <div
                    className={`p-2 ${
                      periodIndex % 2 === 0 ? "bg-blue-100" : "bg-green-100"
                    }`}
                  >
                    {`${period.time}`}
                  </div>
                  {day.map((classroom, classroomIndex) => (
                    <div
                      key={classroomIndex}
                      className={`p-2 ${
                        periodIndex % 2 === 0 ? "bg-blue-100" : "bg-green-100"
                      }`}
                    >
                      {`${classroom[periodIndex].event}${
                        classroom[periodIndex].classroom
                          ? ", " + classroom[periodIndex].classroom
                          : ""
                      }`}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div>
        <h2>Unscheduled Courses</h2>
        {unscheduledCourses.map((course, index) => (
          <p key={index}>{course}</p>
        ))}
      </div>
    </div>
  );
};

export default TimetablePage;
