function getLatitude(x: number, y: number, z: number) {
  return Math.asin(z / Math.sqrt(x ** 2 + y ** 2 + z ** 2));
}

function getLongitude(x: number, y: number) {
  return Math.atan(y, x);
}
