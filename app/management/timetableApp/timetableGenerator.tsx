"use client";

import { Button } from "@/components/ui/button";
import { useState, Fragment } from "react";
import shuffle from "lodash/shuffle"; // Import lodash shuffle function for randomization

interface Zone {
  name: string;
}

interface Classroom {
  name: string;
  seats: number;
  available: boolean;
  features: string[];
  zone: Zone;
}

interface Course {
  name: string;
  sockets: { span: number; requirements: string[] }[]; // Array of sockets with duration (span)
}

interface CourseInstance {
  programmeName: string;
  students: number;
  allowedZones: Zone[];
  courseName: string;
  span: number;
  startTime: number;
  requirements: string[];
}

interface UnscheduleReason {
  courseInstance: CourseInstance;
  reason: string;
}

interface Programme {
  name: string;
  students: number;
  allowedZones: Zone[];
  courses: Course[];
}

enum PeriodType {
  Breakfast = "breakfast",
  Socket = "s",
  Break = "break",
  Lunch = "lunch",
}

interface DayStructure {
  type: PeriodType;
  duration: number;
}

interface ScheduledPeriod {
  span: number;
  event: PeriodType;
  startingTime: number;
  courses: CourseInstance[];
  classroom?: Classroom;
  weekday?: string;
}

let daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

type Timetable = ScheduledPeriod[][][];

const TimetableGenerator = () => {
  const [showUnscheduled, setShowUnscheduled] = useState(false);

  const startTime = 8.5; // Start time in hours (e.g., 8:30 AM)

  const zones: Zone[] = [
    {
      name: "wing A",
    },
    {
      name: "wing B",
    },
    {
      name: "wing C",
    },
    {
      name: "wing D",
    },
  ];

  const classrooms: Classroom[] = [
    {
      name: "Classroom 1",
      seats: 30,
      available: true,
      features: ["computers", "projector"],
      zone: zones[0],
    },
    {
      name: "Classroom 2",
      seats: 25,
      available: true,
      features: ["computers"],
      zone: zones[1],
    },
    {
      name: "Classroom 3",
      seats: 25,
      available: true,
      features: ["computers", "laboratory"],
      zone: zones[0],
    },
  ];

  const programmes: Programme[] = [
    {
      name: "Mathematics",
      students: 25,
      allowedZones: [zones[0], zones[1], zones[2]], // Algebra allowed in wing A, B, C
      courses: [
        {
          name: "Algebra",
          sockets: [
            { span: 2, requirements: ["computers"] },
            { span: 2, requirements: ["computers"] },
            { span: 2, requirements: ["computers"] },
            { span: 2, requirements: ["computers"] },
            { span: 2, requirements: ["computers"] },
            { span: 2, requirements: ["computers"] },
          ],
        },
        {
          name: "Calculus asssssssss",
          sockets: [
            { span: 2, requirements: ["computers"] },
            { span: 2, requirements: ["computers"] },
            { span: 2, requirements: ["computers"] },
            { span: 2, requirements: ["computers"] },
            { span: 2, requirements: ["computers"] },
            { span: 2, requirements: ["computers"] },
            { span: 2, requirements: ["computers"] },
          ],
        },
        // Add more courses with allowedZones
      ],
    },
    {
      name: "Physics",
      students: 25,
      allowedZones: [zones[0], zones[1], zones[2]], // Algebra allowed in wing A, B, C
      courses: [
        {
          name: "Mechanics",
          sockets: [
            { span: 2, requirements: ["laboratory"] },
            { span: 2, requirements: ["laboratory"] },
          ],
        },
        {
          name: "Electricity",
          sockets: [
            { span: 3, requirements: ["laboratory"] },
            { span: 2, requirements: ["laboratory"] },
            { span: 1, requirements: ["laboratory"] },
            { span: 1, requirements: ["laboratory"] },
          ],
        },
        // Add more courses with allowedZones
      ],
    },
    {
      name: "chem",
      students: 25,
      allowedZones: [zones[0], zones[1], zones[2]], // Algebra allowed in wing A, B, C
      courses: [
        {
          name: "Chem2",
          sockets: [
            { span: 2, requirements: ["computers"] },
            { span: 2, requirements: ["computers"] },
            { span: 2, requirements: ["computers"] },
            { span: 2, requirements: ["computers"] },
          ],
        },
        {
          name: "Chem1",
          sockets: [
            { span: 3, requirements: ["computers"] },
            { span: 2, requirements: ["computers"] },
            { span: 1, requirements: ["computers"] },
            { span: 1, requirements: ["computers"] },
          ],
        },
        // Add more courses with allowedZones
      ],
    },
    // Add more programmes with courses
  ];

  const dayStructure: DayStructure[] = [
    { type: PeriodType.Breakfast, duration: 2.5 },
    { type: PeriodType.Socket, duration: 2 },
    { type: PeriodType.Break, duration: 1 },
    { type: PeriodType.Socket, duration: 4 },
    { type: PeriodType.Lunch, duration: 1 },
    { type: PeriodType.Socket, duration: 2 },
  ];

  function createEmptyTimetable(
    classrooms: Classroom[],
    daysOfWeek: string[],
    dayStructure: DayStructure[],
    startTime: number,
  ): Timetable {
    let timetable: Timetable = [];

    for (let i = 0; i < classrooms.length; i++) {
      if (classrooms[i].available) {
        let classroomTimetable: ScheduledPeriod[][] = [];
        for (let j = 0; j < daysOfWeek.length; j++) {
          let dayTimetable: ScheduledPeriod[] = [];
          let currentTime = startTime; // Reset the current time for each new day
          for (let period of dayStructure) {
            let scheduledPeriod: ScheduledPeriod = {
              span: period.duration,
              event: period.type,
              startingTime: currentTime,
              courses: [],
              weekday: daysOfWeek[j],
              classroom: classrooms[i],
            };
            dayTimetable.push(scheduledPeriod);
            currentTime += period.duration;
          }
          classroomTimetable.push(dayTimetable);
        }
        timetable.push(classroomTimetable);
      }
    }

    return timetable;
  }

  function createCourseInstances(programmes: Programme[]): CourseInstance[] {
    let courseInstances: CourseInstance[] = [];

    for (let programme of programmes) {
      for (let course of programme.courses) {
        for (let socket of course.sockets) {
          let courseInstance: CourseInstance = {
            programmeName: programme.name,
            students: programme.students,
            allowedZones: programme.allowedZones,
            courseName: course.name,
            span: socket.span,
            startTime: 0,
            requirements: socket.requirements,
          };
          courseInstances.push(courseInstance);
        }
      }
    }

    return shuffle(courseInstances);
  }

  // function fillTimetableWithCourses(
  //   timetable: Timetable,
  //   courseInstances: CourseInstance[],
  // ) {
  //   courseInstances.sort((a, b) => b.span - a.span);
  //   // const shuffledCourseInstances = shuffle(courseInstances);
  //   let sortedSlots = timetable
  //     .flat(2)
  //     .filter((period) => period.event === PeriodType.Socket)
  //     .sort((a, b) => b.span - a.span);

  //   let unscheduled: UnscheduleReason[] = [];

  //   for (let socket of courseInstances) {
  //     let scheduled = false;
  //     for (let slot of sortedSlots) {
  //       if (socket.span <= slot.span && slot.classroom) {
  //         const { classroom } = slot;
  //         if (
  //           socket.requirements.every((req) =>
  //             classroom.features.includes(req),
  //           ) &&
  //           socket.allowedZones.includes(classroom.zone) &&
  //           socket.students <= slot.classroom.seats
  //         ) {
  //           socket.startTime =
  //             slot.startingTime +
  //             (slot.courses.length > 0
  //               ? slot.courses[slot.courses.length - 1].span
  //               : 0);
  //           slot.courses.push(socket);
  //           slot.span -= socket.span;
  //           scheduled = true;
  //           break;
  //         }
  //       }
  //     }
  //     if (!scheduled) {
  //       unscheduled.push({
  //         courseInstance: socket,
  //         reason: `No suitable slot found.`,
  //       });
  //     }
  //   }

  //   return { timetable, unscheduled };
  // }

  function fillTimetableWithCourses(
    timetable: Timetable,
    courseInstances: CourseInstance[],
  ) {
    courseInstances.sort((a, b) => b.span - a.span);

    // Track scheduled programmes
    let scheduledProgrammes: Set<string> = new Set();

    let unscheduled: UnscheduleReason[] = [];

    for (let socket of courseInstances) {
      let scheduled = false;

      for (let classroomTimetable of timetable) {
        for (let dayTimetable of classroomTimetable) {
          let sortedSlots = dayTimetable
            .flat()
            .filter((period) => period.event === PeriodType.Socket)
            .sort((a, b) => b.span - a.span);
          for (let slot of sortedSlots) {
            if (socket.span <= slot.span && slot.classroom) {
              const { classroom } = slot;

              // Check if this programme has already been scheduled in this time slot
              const programmeKey = `${socket.programmeName}-${slot.weekday}-${slot.startingTime}`;
              console.log("key", programmeKey);
              if (
                !scheduledProgrammes.has(programmeKey) &&
                socket.requirements.every((req) =>
                  classroom.features.includes(req),
                ) &&
                socket.allowedZones.includes(classroom.zone) &&
                socket.students <= classroom.seats
              ) {
                // Mark this programme as scheduled for this time slot
                scheduledProgrammes.add(programmeKey);

                // Assign start time and add course to the slot
                socket.startTime =
                  slot.startingTime +
                  (slot.courses.length > 0
                    ? slot.courses[slot.courses.length - 1].span
                    : 0);
                slot.courses.push(socket);
                slot.span -= socket.span;
                scheduled = true;
                break; // Break out of inner loops once scheduled
              }
            }
          }
          if (scheduled) break; // Break out of dayTimetable loop once scheduled
        }
        if (scheduled) break; // Break out of classroomTimetable loop once scheduled
      }

      if (!scheduled) {
        unscheduled.push({
          courseInstance: socket,
          reason: `No suitable slot found.`,
        });
      }
    }

    console.log("timetable", timetable);

    return { timetable, unscheduled };
  }

  const { timetable, unscheduled } = fillTimetableWithCourses(
    createEmptyTimetable(classrooms, daysOfWeek, dayStructure, startTime),
    createCourseInstances(programmes),
  );

  // 24 hours time format
  const timeFormat = (hour: number) => {
    const formattedHour = Math.floor(hour); // Get the integer part (hours)
    const minutes = (hour - formattedHour) * 60; // Calculate remaining minutes

    const formattedMinutes = Math.floor(minutes);
    const formattedMinutesString =
      formattedMinutes < 10 ? `0${formattedMinutes}` : formattedMinutes;

    return `${formattedHour}:${formattedMinutesString}`;
  };

  // 12 hours time format
  // const timeFormat = (hour: number) => {
  //   const meridiem = hour >= 12 ? "PM" : "AM";
  //   const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  //   return `${formattedHour}:00 ${meridiem}`;
  // };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-3xl font-bold">Classroom Timetables</h1>

      {/* Classroom Selector */}
      <div className="mb-4">
        <label htmlFor="classroomSelect" className="mr-2">
          Select Classroom:
        </label>
        <select
          id="classroomSelect"
          className="rounded border border-gray-300 px-2 py-1"
        >
          {classrooms.map((classroom, index) => (
            <option key={index} value={index}>
              {classroom.name}
            </option>
          ))}
        </select>
      </div>

      {/* Timetable Display */}
      {timetable.map((classroomTimetable, classroomIndex) => (
        <Fragment key={classroomIndex}>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">{`Classroom: ${classrooms[classroomIndex].name}`}</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2">Day</th>
                    {dayStructure.map((period, index) => (
                      <th key={index} className="px-4 py-2">
                        {`${period.type} (${period.duration} hours)`}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {classroomTimetable.map((dayTimetable, dayIndex) => {
                    let currentTime = startTime;
                    return (
                      <tr key={dayIndex}>
                        <td className="whitespace-nowrap px-4 py-2">
                          {daysOfWeek[dayIndex]}
                        </td>
                        {dayTimetable.map((period, periodIndex) => {
                          const periodStart = currentTime;
                          const periodEnd =
                            currentTime + dayStructure[periodIndex].duration;
                          currentTime = periodEnd; // Update current time for next period
                          return (
                            <td
                              key={periodIndex}
                              className="whitespace-nowrap px-4 py-2"
                            >
                              {period.courses.length == 0 && (
                                <div className="font-medium">
                                  {`${timeFormat(periodStart)} - ${timeFormat(
                                    periodEnd,
                                  )}`}
                                </div>
                              )}
                              <div>
                                {period.event != "s" ? (
                                  <>{period.event}</>
                                ) : (
                                  <>
                                    {period.courses.length > 0 ? (
                                      period.courses.map(
                                        (course, courseIndex) => {
                                          return (
                                            <div key={courseIndex}>
                                              {/* {`${course.courseName} (${course.programmeName})`} */}
                                              {course.courseName}
                                              <br />
                                              {`${timeFormat(
                                                course.startTime,
                                              )} - ${timeFormat(
                                                course.startTime + course.span,
                                              )}`}
                                            </div>
                                          );
                                        },
                                      )
                                    ) : (
                                      <div>Free Period</div>
                                    )}
                                  </>
                                )}
                              </div>

                              {/* {period.courses.map((course, courseIndex) => (
                                <div key={courseIndex}>
                                  {`${course.courseName} (${course.programmeName})`}
                                </div>
                              ))} */}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </Fragment>
      ))}

      {/* Show/Hide Unscheduled Courses */}
      <div className="mt-8">
        <Button onClick={() => setShowUnscheduled(!showUnscheduled)}>
          {showUnscheduled
            ? "Hide Unscheduled Courses"
            : "Show Unscheduled Courses"}
        </Button>
        {showUnscheduled && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Unscheduled Courses</h2>
            {unscheduled.length === 0 ? (
              <p>All courses scheduled successfully!</p>
            ) : (
              <ul className="list-disc pl-4">
                {unscheduled.map((item, index) => (
                  <li key={index}>
                    {`Course: ${item.courseInstance.courseName}, Reason: ${item.reason}`}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TimetableGenerator;
