import scheduleDataJson from './scheduleData.json';
import { Personnel, Appointment } from '../types';

export interface ScheduleDay {
  date: string;
  appointments: Appointment[];
}

export interface OptimizationMetrics {
  appointmentVolume: number;
  providerBalance: number;
  travelEfficiency: number;
  continuityOfCare: number;
  workloadBalance: number;
}

export interface OptimizationData {
  baseline: OptimizationMetrics;
  recommended: OptimizationMetrics;
}

export interface MetricCard {
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative';
  label: string;
}

export interface MetricCards {
  appointmentsScheduled: MetricCard;
  totalTravelTime: MetricCard;
  workloadBalance: MetricCard;
  continuityOfCare: MetricCard;
}

export interface ScheduleData {
  personnel: Personnel[];
  schedules: ScheduleDay[];
  optimizationData: OptimizationData;
  metricCards: MetricCards;
}

// Type the imported JSON data
const scheduleData = scheduleDataJson as ScheduleData;

// Import the edited version (will be created when script runs)
let scheduleDataEdited: ScheduleData | null = null;

try {
  const scheduleDataEditedJson = require('./scheduleDataEdited.json');
  scheduleDataEdited = scheduleDataEditedJson as ScheduleData;
} catch (error) {
  console.warn('Edited schedule data not found, using original data');
}

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

export function getOptimizationData(): OptimizationData {
  return scheduleData.optimizationData;
}

export function getMetricCards(): MetricCards {
  return scheduleData.metricCards;
}

// Functions to get edited data
export function getEditedPersonnelData(): Personnel[] {
  return scheduleDataEdited?.personnel || scheduleData.personnel;
}

export function getEditedAppointmentsForDate(date: string): Appointment[] {
  if (!scheduleDataEdited) return getAppointmentsForDate(date);
  const schedule = scheduleDataEdited.schedules.find(s => s.date === date);
  return schedule ? schedule.appointments : [];
}

export function getEditedOptimizationData(): OptimizationData {
  return scheduleDataEdited?.optimizationData || scheduleData.optimizationData;
}

export function getEditedMetricCards(): MetricCards {
  return scheduleDataEdited?.metricCards || scheduleData.metricCards;
}

// Function to check if edited data is available
export function hasEditedData(): boolean {
  return scheduleDataEdited !== null;
}

export default scheduleData;
