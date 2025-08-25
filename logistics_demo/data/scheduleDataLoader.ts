import scheduleDataJson from './scheduleData.json';
import { Personnel, Appointment } from '../types';

export interface ScheduleDay {
  date: string;
  appointments: Appointment[];
}

export interface ScheduleData {
  personnel: Personnel[];
  schedules: ScheduleDay[];
}

// Type the imported JSON data
const scheduleData = scheduleDataJson as ScheduleData;

export function getPersonnelData(): Personnel[] {
  return scheduleData.personnel;
}

export function getAppointmentsForDate(date: string): Appointment[] {
  const schedule = scheduleData.schedules.find(s => s.date === date);
  return schedule ? schedule.appointments : [];
}

export function getAllDates(): string[] {
  return scheduleData.schedules.map(s => s.date);
}

export default scheduleData;
