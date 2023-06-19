import { db } from "../db/db";
import axios from "axios";

const temp = [];

export async function handleStarWarsTableData(data) {
  const keysToFetch = getKeysWithUrl(data);
  const refinedData = await Promise.all(
    data.map(async (d) => {
      await fetchCaching(d, keysToFetch);
    })
  );
  data.map((d) => {
    populateData(d, keysToFetch);
  });

  return refinedData;
}

function getKeysWithUrl(data) {
  const keysToFetch = [];
  for (let keys in data[0]) {
    if (keys === "url") continue;
    if (
      (!db.starWarsFetchCache[keys] &&
        data[0][keys].includes("https://swapi")) ||
      typeof data[0][keys] === "object"
    ) {
      db.starWarsFetchCache[keys] = {};
      keysToFetch.push(keys);
    }
  }
  return keysToFetch;
}

async function fetchCaching(data, keys) {
  await Promise.all(
    keys.map(async (key) => {
      if (typeof data[key] === "string") {
        temp.push(data[key]);
        const response = await axios.get(data[key]);
        db.starWarsFetchCache[key][data[key]] =
          response.data.name || response.data.title;
      } else {
        await Promise.all(
          data[key].map(async (d) => {
            if (!temp.includes(d)) {
              temp.push(d);
              const response = await axios.get(d);
              db.starWarsFetchCache[key][d] =
                response.data.name || response.data.title;
            }
          })
        );
      }
    })
  );
}

function populateData(data, keys) {
  keys.map((key) => {
    if (typeof data[key] === "string") {
      data[key] = db.starWarsFetchCache[key][data[key]];
    } else {
      data[key].map((d, idx) => {
        data[key][idx] = db.starWarsFetchCache[key][d];
      });
    }
  });
  db.starWarsTableCache.push(data);
}
