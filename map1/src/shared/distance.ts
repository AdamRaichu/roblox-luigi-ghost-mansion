export function calculate2dDistance(p1: Vector3, p2: Vector3): number {
  return math.sqrt((p1.X - p2.X) ** 2 + (p1.Z - p2.Z) ** 2);
}
