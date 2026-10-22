// Validates attendance counts and calculates the percentage on the server.
export function normalizeAttendanceInput(input = {}, { required = false } = {}) {
  const hasAttended = Object.prototype.hasOwnProperty.call(input, 'classesAttended');
  const hasTotal = Object.prototype.hasOwnProperty.call(input, 'totalClasses');
  const badRequest = (message) => {
    const error = new Error(message);
    error.statusCode = 400;
    return error;
  };

  if (!hasAttended && !hasTotal) {
    if (input.attendancePercentage !== undefined) {
      if (
        input.attendancePercentage === '' ||
        input.attendancePercentage === null ||
        (typeof input.attendancePercentage === 'string' && input.attendancePercentage.trim() === '') ||
        !Number.isFinite(Number(input.attendancePercentage)) ||
        Number(input.attendancePercentage) < 0 ||
        Number(input.attendancePercentage) > 100
      ) {
        throw badRequest('Attendance percentage must be a number between 0 and 100');
      }
      return { attendancePercentage: Number(input.attendancePercentage) };
    }
    if (required) throw badRequest('Enter classes attended and total classes');
    return {};
  }

  if (
    !hasAttended ||
    !hasTotal ||
    input.classesAttended === null ||
    input.totalClasses === null ||
    (typeof input.classesAttended !== 'number' && typeof input.classesAttended !== 'string') ||
    (typeof input.totalClasses !== 'number' && typeof input.totalClasses !== 'string') ||
    String(input.classesAttended).trim() === '' ||
    String(input.totalClasses).trim() === ''
  ) {
    throw badRequest('Enter both classes attended and total classes');
  }

  const classesAttended = Number(input.classesAttended);
  const totalClasses = Number(input.totalClasses);
  if (!Number.isInteger(classesAttended) || !Number.isInteger(totalClasses)) {
    throw badRequest('Attendance counts must be whole numbers');
  }
  if (totalClasses < 1) throw badRequest('Total classes must be at least 1');
  if (classesAttended < 0 || classesAttended > totalClasses) {
    throw badRequest('Classes attended must be between 0 and total classes');
  }

  return {
    classesAttended,
    totalClasses,
    attendancePercentage: Math.round((classesAttended / totalClasses) * 10000) / 100,
  };
}
