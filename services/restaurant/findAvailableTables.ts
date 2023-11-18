import { PrismaClient } from "@prisma/client";
import { NextApiResponse } from "next";
import { times } from "../../data";

type Table = {
  id: number;
  seats: number;
  restaurant_id: number | null;
  created_at: Date;
  updated_at: Date;
};

const prisma = new PrismaClient();

export const findAvailableTables = async ({
  restaurant,
  day,
  time,
  res,
}: {
  restaurant: {
    tables: Table[];
    open_time: string;
    close_time: string;
},
  day: string,
  time: string,
  res: NextApiResponse,
}) => {
  const searchTimes = times.find(t => {
    return t.time === time
  })?.searchTimes;

  if (!searchTimes) {
    return res.status(400).json({
      errorMessage: "Invalid data provided"
    });
  }

  const bookings = await prisma.booking.findMany({
    where: {
      booking_time: {
        gte: new Date(`${day}T${searchTimes[0]}`),
        lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`),
      }
    },
    select: {
      number_of_people: true,
      booking_time: true,
      tables: true,
    }
  });

  const bookingTables: { [key: string]: {[key: number]: true} } = {};

  bookings.forEach(booking => {
    bookingTables[booking.booking_time.toISOString()] = booking.tables.reduce((obj, table) => {
      return {
        ...obj,
        [table.table_id]: true,
      }
    }, {});
  });

  const tables = restaurant.tables;

  const searchTimesWithTables = searchTimes.map(searchTime => {
    return {
      date: new Date(`${day}T${searchTime}`),
      time: searchTime,
      tables,
    }
  });

  searchTimesWithTables.forEach(t => {
    t.tables = t.tables.filter(table => {
      if (bookingTables[t.date.toISOString()]) {
        if (bookingTables[t.date.toISOString()][table.id]) {
          return false;
        } else {
          return true;
        }
      }
    });
  });

  return searchTimesWithTables;
}