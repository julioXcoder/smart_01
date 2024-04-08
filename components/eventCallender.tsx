"use client";

import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";

import FullCalendar from "@fullcalendar/react";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import rrulePlugin from "@fullcalendar/rrule";
import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addWeeks,
  subWeeks,
  isSameDay,
  parseISO,
} from "date-fns";
import { useState, useRef } from "react";
import { EventContentArg, EventInput } from "@fullcalendar/common";

function EventCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const calendarRef = useRef<FullCalendar>(null);

  const events = [
    {
      title: "Data Structures",
      extendedProps: {
        color: "red",
        venue: "Lab 1",
      },
      start: "09:00",
      duration: "02:00",
      rrule: {
        freq: "weekly",
        byweekday: ["mo", "we", "fr"],
        dtstart: "2023-07-19T09:00:00",
      },
    },
    {
      title: "Algorithms",
      start: "11:00",
      duration: "02:00",
      extendedProps: {
        color: "blue",
        venue: "room 4",
      },
      rrule: {
        freq: "weekly",
        byweekday: ["tu", "th"],
        dtstart: "2023-07-20T11:00:00",
      },
    },
    {
      title: "Computer Networks",
      start: "14:00",
      duration: "02:00",
      extendedProps: {
        color: "green",
        venue: "Room 2",
      },
      rrule: {
        freq: "weekly",
        byweekday: ["mo", "we"],
        dtstart: "2023-07-19T14:00:00",
      },
    },
  ];

  const handleNextWeek = () => {
    setCurrentDate((prevDate) => {
      const nextWeek = addWeeks(prevDate, 1);
      const nextMonday = startOfWeek(nextWeek, { weekStartsOn: 1 });
      if (calendarRef.current) {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.gotoDate(nextMonday);
      }
      return nextWeek;
    });
  };

  const handlePrevWeek = () => {
    setCurrentDate((prevDate) => {
      const prevWeek = subWeeks(prevDate, 1);
      const prevMonday = startOfWeek(prevWeek, { weekStartsOn: 1 });
      if (calendarRef.current) {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.gotoDate(prevMonday);
      }
      return prevWeek;
    });
  };
  const handleToday = () => {
    setCurrentDate(new Date());
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.today();
    }
  };

  const handleEventContent = (arg: EventContentArg) => {
    let arrayOfDomNodes = [];

    let colorBar = document.createElement("div");
    colorBar.style.backgroundColor = arg.event.extendedProps.color;
    colorBar.style.width = "5px";
    colorBar.style.height = "0.8rem";
    arrayOfDomNodes.push(colorBar);

    // let desc = document.createElement("div");
    // desc.innerHTML = "lol";

    // arrayOfDomNodes.push(desc);

    let title = document.createElement("div");
    title.innerHTML = arg.event.title;
    arrayOfDomNodes.push(title);

    return { domNodes: arrayOfDomNodes };
  };

  return (
    <div className="h-[22rem] w-full rounded-lg border border-gray-300 shadow-lg dark:border-gray-900">
      <div className="flex h-[10%] items-center justify-between rounded-t-lg border-b border-gray-300 px-2 py-4 dark:border-gray-900">
        <span className="text-large font-bold text-blue-500">
          {format(currentDate, "MMMM yyyy")}
        </span>
        <div className="flex items-center justify-center gap-x-2">
          <button
            className="inline-flex items-center justify-center text-sm font-semibold text-blue-500 transition-all hover:text-blue-700"
            onClick={handlePrevWeek}
          >
            <MdOutlineNavigateBefore size={20} />
          </button>
          <button
            className="inline-flex items-center justify-center text-sm font-semibold text-blue-500  transition-all hover:text-blue-700"
            onClick={handleToday}
          >
            Today
          </button>
          <button
            className="inline-flex items-center justify-center text-sm font-semibold text-blue-500  transition-all hover:text-blue-700"
            onClick={handleNextWeek}
          >
            <MdOutlineNavigateNext size={20} />
          </button>
        </div>
      </div>
      <div className="h-[90%] w-full">
        <FullCalendar
          ref={calendarRef}
          plugins={[rrulePlugin, dayGridPlugin, bootstrapPlugin]}
          initialView="dayGrid"
          events={events}
          // slotMinTime="07:00:00"
          // slotMaxTime="18:00:00"
          height="100%"
          slotLabelContent={false}
          headerToolbar={false}
          eventTimeFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }}
          dayHeaders={true}
          eventContent={(args) => {
            return (
              <div className="mx-0.5 my-1 flex w-full items-center rounded-lg bg-gray-100 px-1 py-2 shadow-lg hover:bg-gray-50 dark:bg-gray-900 dark:shadow-gray-900 dark:hover:bg-gray-950">
                <div
                  className="h-9 w-[0.3rem] rounded-sm"
                  style={{ backgroundColor: args.event.extendedProps.color }}
                ></div>
                <div className="ml-2 w-[calc(100%-0.375rem)]">
                  <div className="flex">
                    <b className="max-w-[60%] truncate">{args.event.title}</b>
                    <b className="mx-2">-</b>
                    <p className="max-w-[35%] truncate text-sm text-gray-500">
                      {args.event.extendedProps.venue}
                    </p>
                  </div>
                  <p className="text-xs text-gray-400">
                    {args.event.start && args.event.end
                      ? // Use the format function to show the start and end times
                        `${format(args.event.start, "HH:mm")} - ${format(
                          args.event.end,
                          "HH:mm",
                        )}`
                      : // Show a default message if the start and end properties are null
                        "No time available"}
                  </p>
                </div>
              </div>
            );
          }}
          dayHeaderContent={(args) => {
            // Get the start and end dates of the current week
            const start = startOfWeek(currentDate, { weekStartsOn: 1 });
            const end = endOfWeek(currentDate, { weekStartsOn: 1 });
            // Loop through the dates and create an array of elements
            const days = eachDayOfInterval({ start, end }).map((date, i) => {
              // Check if there are any events on the current date

              return (
                <div
                  key={i}
                  className="group mx-0 my-2 flex flex-col items-center justify-center gap-y-2"
                >
                  <span className="flex text-xs">{format(date, "E")}</span>
                  <div
                    className={`text-small flex  h-6 w-6  cursor-pointer items-center justify-center rounded-full group-hover:bg-blue-300 ${
                      format(date, "yyyy-MM-dd") ===
                      format(args.date, "yyyy-MM-dd")
                        ? "bg-blue-400 text-xs text-white"
                        : "bg-none text-slate-900 dark:text-slate-100"
                    }`}
                    // Add an onClick handler to set the current date and go to the clicked date
                    onClick={() => {
                      setCurrentDate(date);
                      args.view.calendar.gotoDate(date);
                    }}
                  >
                    {format(date, "d")}
                  </div>
                </div>
              );
            });
            // Return a JSX element with the days array
            return <div className="flex gap-x-6">{days}</div>;
          }}
        />
      </div>
    </div>
  );
}

export default EventCalendar;
