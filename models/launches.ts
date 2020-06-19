import * as log from "https://deno.land/std/log/mod.ts";
import _ from "https://deno.land/x/deno_lodash/mod.ts";

await log.setup({
  handlers: {
    console: new log.handlers.ConsoleHandler("DEBUG"),
  },
  loggers: {
    default: {
      level: "DEBUG",
      handlers: ["console"],
    },
  }
});

interface Launch {
  flightNumber: number;
  mission: string;
  rocket: string;
  customers: string[];
  launchDate: number;
  upcoming: boolean;
  success?: boolean;
  target?: string;
}

const launches = new Map<number, Launch>();

async function downloadLaunchData() {
  log.info('Downloading Launch Data...');
  const response = await fetch('https://api.spacexdata.com/v3/launches');
  const data = await response.json();

  for (const launch of data) {
    const customers = _.flatMap(launch['rocket']['second_stage']['payloads'],
      (payload: { customers: [] }) => payload.customers);

    const flightData = {
      flightNumber: launch['flight_number'],
      mission: launch['mission_name'],
      rocket: launch['rocket']['rocket_name'],
      launchDate: launch['launch_date_unix'],
      upcoming: launch['upcoming'],
      success: launch['launch_success'],
      customers,
    };

    launches.set(flightData.flightNumber, flightData);

    if (import.meta.main) log.info(JSON.stringify(flightData));
  }
}

await downloadLaunchData();

export const getAll = () => Array.from(launches.values());

export const getById = (id: number) => launches.has(id) ? launches.get(id) : null;

export const addOne = (launch: Launch) => launches.set(launch.flightNumber, { ...launch, upcoming: true, customers: ['ZTM', 'NASA'] });

export const removeOne = (id: number) => {
  const aborted = launches.get(id);

  if (aborted) {
    aborted.upcoming = false;
    aborted.success = false;
  }

  return aborted;
}