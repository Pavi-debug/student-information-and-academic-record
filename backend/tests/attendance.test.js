import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeAttendanceInput } from '../src/utils/attendance.js';

test('calculates attendance percentage from class counts', () => {
  assert.deepEqual(normalizeAttendanceInput({ classesAttended: '12', totalClasses: '15' }), {
    classesAttended: 12,
    totalClasses: 15,
    attendancePercentage: 80,
  });
});

test('rounds to two decimal places', () => {
  assert.equal(
    normalizeAttendanceInput({ classesAttended: 2, totalClasses: 3 }).attendancePercentage,
    66.67
  );
});

test('supports zero attendance and full attendance', () => {
  assert.equal(normalizeAttendanceInput({ classesAttended: 0, totalClasses: 5 }).attendancePercentage, 0);
  assert.equal(normalizeAttendanceInput({ classesAttended: 5, totalClasses: 5 }).attendancePercentage, 100);
});

test('rejects incomplete, fractional, negative, and inconsistent counts', () => {
  const invalidInputs = [
    {},
    { classesAttended: 2 },
    { classesAttended: '', totalClasses: 2 },
    { classesAttended: null, totalClasses: 2 },
    { classesAttended: true, totalClasses: 2 },
    { classesAttended: 1.5, totalClasses: 3 },
    { classesAttended: -1, totalClasses: 3 },
    { classesAttended: 4, totalClasses: 3 },
    { classesAttended: 1, totalClasses: 0 },
  ];

  for (const input of invalidInputs) {
    assert.throws(() => normalizeAttendanceInput(input, { required: true }), { statusCode: 400 });
  }
});

test('accepts legacy percentage requests while enforcing the 0-100 range', () => {
  assert.deepEqual(normalizeAttendanceInput({ attendancePercentage: '72.5' }), {
    attendancePercentage: 72.5,
  });
  assert.deepEqual(normalizeAttendanceInput({}), {});
  assert.throws(() => normalizeAttendanceInput({ attendancePercentage: 101 }), { statusCode: 400 });
  assert.throws(() => normalizeAttendanceInput({ attendancePercentage: ' ' }), { statusCode: 400 });
});
