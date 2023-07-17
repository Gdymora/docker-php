function log<T>(obj: T): T {
  return obj;
}

log<number>(404);

interface Timestamp {
  stamp: number;
}

function logTimeStamp<T extends Timestamp>(num: T): T {
  let b = num.stamp;
  return num;
}
