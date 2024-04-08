"use client";

import { Button } from "@/components/ui/button";
import { useState, Fragment } from "react";

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
  sockets: { span: number }[]; // Array of sockets with duration (span)
  requirements: string[];
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
      seats: 20,
      available: true,
      features: ["computers"],
      zone: zones[1],
    },
    {
      name: "Classroom 3",
      seats: 20,
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
          sockets: [{ span: 2 }, { span: 3 }],
          requirements: ["laboratory", "computers"],
        },
        {
          name: "Calculus",
          sockets: [{ span: 3 }, { span: 2 }, { span: 1 }, { span: 1 }],
          requirements: ["computers"],
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
          sockets: [{ span: 2 }, { span: 2 }],
          requirements: ["laboratory"],
        },
        {
          name: "Electricity",
          sockets: [{ span: 3 }, { span: 2 }, { span: 1 }, { span: 1 }],
          requirements: ["laboratory"],
        },
        // Add more courses with allowedZones
      ],
    },
    // Add more programmes with courses
  ];

  const dayStructure: DayStructure[] = [
    { type: PeriodType.Breakfast, duration: 2 },
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
            requirements: course.requirements,
          };
          courseInstances.push(courseInstance);
        }
      }
    }

    return courseInstances;
  }

  function fillTimetableWithCourses(
    timetable: Timetable,
    courseInstances: CourseInstance[],
  ) {
    courseInstances.sort((a, b) => b.span - a.span);
    let sortedSlots = timetable
      .flat(2)
      .filter((period) => period.event === PeriodType.Socket)
      .sort((a, b) => b.span - a.span);

    let unscheduled: UnscheduleReason[] = [];

    for (let socket of courseInstances) {
      let scheduled = false;
      for (let slot of sortedSlots) {
        if (socket.span <= slot.span && slot.classroom) {
          const { classroom } = slot;
          if (
            socket.requirements.every((req) =>
              classroom.features.includes(req),
            ) &&
            socket.allowedZones.includes(classroom.zone)
          ) {
            socket.startTime =
              slot.startingTime +
              (slot.courses.length > 0
                ? slot.courses[slot.courses.length - 1].span
                : 0);
            slot.courses.push(socket);
            slot.span -= socket.span;
            scheduled = true;
            break;
          }
        }
      }
      if (!scheduled) {
        unscheduled.push({
          courseInstance: socket,
          reason: "No suitable slot found",
        });
      }
    }

    console.log("Timetable - ", timetable);
    console.log("Unscheduled - ", unscheduled);

    // return { timetable, unscheduled };
    return timetable;
  }

  return (
    <div>
      {/* TimetableGenerator */}
      <Button
        onClick={() =>
          createEmptyTimetable(classrooms, daysOfWeek, dayStructure, 8)
        }
      >
        Generate
      </Button>
      <Button onClick={() => createCourseInstances(programmes)}>
        Create course instances
      </Button>
      <Button
        onClick={() =>
          fillTimetableWithCourses(
            createEmptyTimetable(classrooms, daysOfWeek, dayStructure, 8),
            createCourseInstances(programmes),
          )
        }
      >
        Create Table
      </Button>
    </div>
  );
};

export default TimetableGenerator;
