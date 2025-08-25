const fs = require('fs');
const path = require('path');

// Personnel data
const personnel = [
  { id: '1', name: 'Rebecca Anderson', role: 'Nurse', type: 'nurse' },
  { id: '2', name: 'Tara Meka', role: 'Nurse', type: 'nurse' },
  { id: '3', name: 'Sophia Perez', role: 'Therapist', type: 'other' },
  { id: '4', name: 'Jared Black', role: 'Therapist', type: 'other' },
  { id: '5', name: 'Greg Smith', role: 'Therapist', type: 'other' },
  { id: '6', name: 'Amanda McCrowley', role: 'Nurse', type: 'nurse' },
  { id: '7', name: 'Lindsey Majors', role: 'Nurse', type: 'nurse' },
  { id: '8', name: 'Patrick Qi', role: 'Nurse', type: 'nurse' },
  { id: '9', name: 'Jada Brown', role: 'Therapist', type: 'other' },
  { id: '10', name: 'Justine Kleinberg', role: 'Therapist', type: 'other' },
  { id: '11', name: 'Stephanie Messinger', role: 'Nurse', type: 'nurse' }
];

// Patient names for appointments
const patientNames = [
  'John Anderson', 'Mary Johnson', 'Robert Wilson', 'Patricia Brown', 'Jennifer Davis',
  'Michael Miller', 'Linda Wilson', 'William Moore', 'Elizabeth Taylor', 'David Anderson',
  'Barbara Thomas', 'Richard Jackson', 'Susan White', 'Joseph Harris', 'Jessica Martin',
  'Thomas Thompson', 'Sarah Garcia', 'Christopher Martinez', 'Nancy Robinson', 'Daniel Clark',
  'Lisa Rodriguez', 'Matthew Lewis', 'Helen Lee', 'Anthony Walker', 'Betty Hall',
  'Mark Allen', 'Dorothy Young', 'Donald Hernandez', 'Sandra King', 'Steven Wright',
  'Donna Lopez', 'Kenneth Hill', 'Carol Scott', 'Joshua Green', 'Ruth Adams',
  'Brian Baker', 'Sharon Gonzalez', 'Kevin Nelson', 'Michelle Carter', 'Edward Mitchell'
];

// Appointment types
const appointmentTypes = [
  'Initial Assessment', 'Follow-up', 'Therapy Session', 'Medication Review',
  'Wound Care', 'Physical Therapy', 'Occupational Therapy', 'Care Coordination',
  'Health Monitoring', 'Discharge Planning', 'Family Meeting', 'Pain Management'
];

// Possible appointment durations (in minutes)
const durations = [30, 60, 90];

// Work hours: 5am to 9pm (5:00 to 21:00)
const START_HOUR = 5;
const END_HOUR = 21;
const MAX_DAILY_MINUTES = 600;

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function formatTime(hour, minute = 0) {
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
}

function generateDaySchedule(personnelId, date) {
  const appointments = [];
  let totalMinutes = 0;
  let currentHour = START_HOUR;
  let currentMinute = 0;

  while (currentHour < END_HOUR && totalMinutes < MAX_DAILY_MINUTES) {
    // Randomly decide if this time slot should have an appointment (70% chance)
    if (Math.random() < 0.7) {
      const duration = getRandomElement(durations);
      
      // Check if appointment would exceed daily limit or go past end hour
      if (totalMinutes + duration <= MAX_DAILY_MINUTES) {
        const endHour = currentHour + Math.floor((currentMinute + duration) / 60);
        const endMinute = (currentMinute + duration) % 60;
        
        if (endHour < END_HOUR || (endHour === END_HOUR && endMinute === 0)) {
          const appointment = {
            id: `${personnelId}_${date}_${appointments.length + 1}`,
            patientName: getRandomElement(patientNames),
            startTime: formatTime(currentHour, currentMinute),
            endTime: formatTime(endHour, endMinute),
            personnelId: personnelId,
            type: getRandomElement(appointmentTypes),
            duration: duration
          };
          
          appointments.push(appointment);
          totalMinutes += duration;
          
          // Move to end of current appointment
          currentHour = endHour;
          currentMinute = endMinute;
        }
      }
    }
    
    // Add random gap between appointments (15-60 minutes)
    const gap = 15 + Math.floor(Math.random() * 46); // 15-60 minutes
    currentMinute += gap;
    
    // Handle minute overflow
    if (currentMinute >= 60) {
      currentHour += Math.floor(currentMinute / 60);
      currentMinute = currentMinute % 60;
    }
  }
  
  return appointments;
}

function generateWeekSchedule() {
  const scheduleData = {
    personnel: personnel,
    schedules: []
  };

  // Generate schedules for Monday, September 1st, 2025 through Friday, September 5th, 2025
  const dates = [
    '2025-09-01', // Monday
    '2025-09-02', // Tuesday
    '2025-09-03', // Wednesday
    '2025-09-04', // Thursday
    '2025-09-05'  // Friday
  ];

  dates.forEach(date => {
    const dayAppointments = [];
    
    personnel.forEach(person => {
      const appointments = generateDaySchedule(person.id, date);
      dayAppointments.push(...appointments);
    });

    scheduleData.schedules.push({
      date: date,
      appointments: dayAppointments
    });
  });

  return scheduleData;
}

// Generate the data
console.log('Generating schedule data...');
const scheduleData = generateWeekSchedule();

// Create output directory if it doesn't exist
const outputDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Save to file
const outputPath = path.join(outputDir, 'scheduleData.json');
fs.writeFileSync(outputPath, JSON.stringify(scheduleData, null, 2));

console.log(`Schedule data generated and saved to: ${outputPath}`);
console.log(`Generated schedules for ${scheduleData.schedules.length} days`);
console.log(`Total personnel: ${scheduleData.personnel.length}`);

// Print summary
scheduleData.schedules.forEach(schedule => {
  const appointmentCount = schedule.appointments.length;
  const totalMinutes = schedule.appointments.reduce((sum, apt) => sum + apt.duration, 0);
  console.log(`${schedule.date}: ${appointmentCount} appointments, ${totalMinutes} total minutes`);
});
