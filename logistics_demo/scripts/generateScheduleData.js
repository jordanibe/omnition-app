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

// Patient data with names and unique IDs
const patients = [
  { name: 'John Anderson', id: 'Z001234' },
  { name: 'Mary Johnson', id: 'Z001235' },
  { name: 'Robert Wilson', id: 'Z001236' },
  { name: 'Patricia Brown', id: 'Z001237' },
  { name: 'Jennifer Davis', id: 'Z001238' },
  { name: 'Michael Miller', id: 'Z001239' },
  { name: 'Linda Wilson', id: 'Z001240' },
  { name: 'William Moore', id: 'Z001241' },
  { name: 'Elizabeth Taylor', id: 'Z001242' },
  { name: 'David Anderson', id: 'Z001243' },
  { name: 'Barbara Thomas', id: 'Z001244' },
  { name: 'Richard Jackson', id: 'Z001245' },
  { name: 'Susan White', id: 'Z001246' },
  { name: 'Joseph Harris', id: 'Z001247' },
  { name: 'Jessica Martin', id: 'Z001248' },
  { name: 'Thomas Thompson', id: 'Z001249' },
  { name: 'Sarah Garcia', id: 'Z001250' },
  { name: 'Christopher Martinez', id: 'Z001251' },
  { name: 'Nancy Robinson', id: 'Z001252' },
  { name: 'Daniel Clark', id: 'Z001253' },
  { name: 'Lisa Rodriguez', id: 'Z001254' },
  { name: 'Matthew Lewis', id: 'Z001255' },
  { name: 'Helen Lee', id: 'Z001256' },
  { name: 'Anthony Walker', id: 'Z001257' },
  { name: 'Betty Hall', id: 'Z001258' },
  { name: 'Mark Allen', id: 'Z001259' },
  { name: 'Dorothy Young', id: 'Z001260' },
  { name: 'Donald Hernandez', id: 'Z001261' },
  { name: 'Sandra King', id: 'Z001262' },
  { name: 'Steven Wright', id: 'Z001263' },
  { name: 'Donna Lopez', id: 'Z001264' },
  { name: 'Kenneth Hill', id: 'Z001265' },
  { name: 'Carol Scott', id: 'Z001266' },
  { name: 'Joshua Green', id: 'Z001267' },
  { name: 'Ruth Adams', id: 'Z001268' },
  { name: 'Brian Baker', id: 'Z001269' },
  { name: 'Sharon Gonzalez', id: 'Z001270' },
  { name: 'Kevin Nelson', id: 'Z001271' },
  { name: 'Michelle Carter', id: 'Z001272' },
  { name: 'Edward Mitchell', id: 'Z001273' }
];

// Appointment descriptions (~50 options)
const appointmentDescriptions = [
  'Initial nursing assessment and care plan development',
  'Medication administration and monitoring',
  'Wound care dressing change and assessment',
  'Physical therapy evaluation and treatment',
  'Occupational therapy session for daily living skills',
  'Blood pressure monitoring and medication review',
  'Diabetes management and glucose testing',
  'Post-surgical follow-up and incision care',
  'Pain management consultation and treatment plan',
  'Respiratory therapy and breathing exercises',
  'Cardiac rehabilitation and monitoring',
  'Mental health assessment and counseling',
  'Nutrition counseling and dietary planning',
  'Fall risk assessment and safety planning',
  'Medication reconciliation and education',
  'Chronic disease management consultation',
  'Home safety evaluation and recommendations',
  'Caregiver training and support',
  'Discharge planning and coordination',
  'Insurance authorization and documentation',
  'Laboratory specimen collection',
  'Vital signs monitoring and documentation',
  'Mobility assessment and assistive device training',
  'Skin integrity assessment and prevention care',
  'Cognitive assessment and memory care planning',
  'Infection control and prevention education',
  'Equipment setup and maintenance',
  'Emergency response plan development',
  'Medication compliance assessment',
  'Social services consultation',
  'Hospice care coordination',
  'Palliative care consultation',
  'Rehabilitation progress evaluation',
  'Care plan review and updates',
  'Family conference and education',
  'Telehealth consultation setup',
  'Specialty referral coordination',
  'Insurance benefits verification',
  'Medical equipment delivery and setup',
  'Home modification assessment',
  'Transportation coordination',
  'Prescription pickup and delivery',
  'Emergency contact information update',
  'Advance directive discussion',
  'Quality of life assessment',
  'Symptom management and comfort care',
  'Behavioral intervention planning',
  'Environmental safety assessment',
  'Community resource coordination',
  'Transitional care planning'
];

// Patient addresses (~50 options)
const patientAddresses = [
  '1245 Maple Street',
  '892 Oak Avenue',
  '3456 Pine Road',
  '789 Elm Drive',
  '2134 Cedar Lane',
  '5678 Birch Boulevard',
  '901 Willow Way',
  '4321 Ash Street',
  '6789 Spruce Court',
  '1357 Poplar Place',
  '2468 Hickory Hill',
  '8642 Walnut Street',
  '9753 Chestnut Avenue',
  '1590 Sycamore Drive',
  '7531 Magnolia Road',
  '4682 Dogwood Lane',
  '3579 Redwood Circle',
  '8024 Cypress Street',
  '6157 Palm Avenue',
  '2840 Orange Boulevard',
  '9371 Peach Street',
  '5926 Apple Drive',
  '1483 Cherry Lane',
  '7062 Plum Road',
  '4815 Grape Court',
  '3704 Berry Place',
  '8259 Lemon Street',
  '6148 Lime Avenue',
  '2937 Mint Drive',
  '5720 Rose Boulevard',
  '1065 Violet Lane',
  '8413 Lily Road',
  '7286 Daisy Street',
  '4059 Tulip Avenue',
  '9642 Iris Drive',
  '3175 Orchid Court',
  '6528 Jasmine Place',
  '2901 Gardenia Street',
  '7354 Azalea Boulevard',
  '5083 Camellia Lane',
  '8716 Peony Road',
  '4297 Sunflower Drive',
  '1640 Lavender Avenue',
  '9185 Rosemary Street',
  '6472 Sage Court',
  '3805 Thyme Place',
  '7938 Basil Boulevard',
  '2561 Parsley Lane',
  '8394 Cilantro Road',
  '5127 Dill Street'
];

// Possible appointment durations (in minutes)
const durations = [60, 90];

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
          const selectedPatient = getRandomElement(patients);
          const appointment = {
            id: `${personnelId}_${date}_${appointments.length + 1}`,
            patientName: selectedPatient.name,
            patientId: selectedPatient.id,
            startTime: formatTime(currentHour, currentMinute),
            endTime: formatTime(endHour, endMinute),
            personnelId: personnelId,
            description: getRandomElement(appointmentDescriptions),
            address: getRandomElement(patientAddresses),
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

function generateOptimizationMetrics() {
  // Generate realistic optimization metrics
  const baselineMetrics = {
    appointmentVolume: Math.floor(Math.random() * 30) + 50, // 50-80
    travelEfficiency: Math.floor(Math.random() * 20) + 40,  // 40-60
    continuityOfCare: Math.floor(Math.random() * 30) + 55,  // 55-85
    workloadBalance: Math.floor(Math.random() * 25) + 50,   // 50-75
  };

  const recommendedMetrics = {
    appointmentVolume: Math.min(100, baselineMetrics.appointmentVolume + Math.floor(Math.random() * 20) + 10), // +10-30
    travelEfficiency: Math.min(100, baselineMetrics.travelEfficiency + Math.floor(Math.random() * 25) + 15),   // +15-40
    continuityOfCare: Math.min(100, baselineMetrics.continuityOfCare + Math.floor(Math.random() * 20) + 5),    // +5-25
    workloadBalance: Math.min(100, baselineMetrics.workloadBalance + Math.floor(Math.random() * 20) + 10),     // +10-30
  };

  return {
    baseline: baselineMetrics,
    recommended: recommendedMetrics
  };
}

function generateMetricCards(optimizationData) {
  // Calculate improvements for metric cards
  const appointmentImprovement = ((optimizationData.recommended.appointmentVolume - optimizationData.baseline.appointmentVolume) / optimizationData.baseline.appointmentVolume * 100).toFixed(1);
  const travelTimeReduction = Math.floor(Math.random() * 200) + 100; // 100-300 minutes saved
  const workloadImprovement = ((optimizationData.recommended.workloadBalance - optimizationData.baseline.workloadBalance) / optimizationData.baseline.workloadBalance * 100).toFixed(1);
  const continuityImprovement = ((optimizationData.recommended.continuityOfCare - optimizationData.baseline.continuityOfCare) / optimizationData.baseline.continuityOfCare * 100).toFixed(1);

  return {
    appointmentsScheduled: {
      value: Math.floor(Math.random() * 30) + 60, // 60-90 appointments
      change: `+${appointmentImprovement}%`,
      changeType: 'positive',
      label: 'Appointments Scheduled'
    },
    totalTravelTime: {
      value: `${Math.floor(Math.random() * 200) + 500} min`, // 500-700 minutes
      change: `-${travelTimeReduction} min`,
      changeType: 'positive',
      label: 'Total Travel Time'
    },
    workloadBalance: {
      value: `${optimizationData.recommended.workloadBalance}%`,
      change: `+${workloadImprovement}%`,
      changeType: 'positive',
      label: 'Workload Balance'
    },
    continuityOfCare: {
      value: `${optimizationData.recommended.continuityOfCare}%`,
      change: `+${continuityImprovement}%`,
      changeType: 'positive',
      label: 'Continuity of Care'
    }
  };
}

function generateWeekSchedule() {
  // Generate optimization data
  const optimizationData = generateOptimizationMetrics();
  const metricCards = generateMetricCards(optimizationData);

  const scheduleData = {
    personnel: personnel,
    schedules: [],
    optimizationData: optimizationData,
    metricCards: metricCards
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

function createEditedVersion(originalData) {
  // Deep clone the original data
  const editedData = JSON.parse(JSON.stringify(originalData));
  
  // Replace Tara Meka with Jordan Ibe
  const taraIndex = editedData.personnel.findIndex(p => p.name === 'Tara Meka');
  if (taraIndex !== -1) {
    editedData.personnel[taraIndex] = {
      ...editedData.personnel[taraIndex],
      name: 'Jordan Ibe',
      role: 'Temp. Nurse'
    };
  }
  
  // Remove Jared Black completely
  editedData.personnel = editedData.personnel.filter(p => p.name !== 'Jared Black');
  
  // Remove Jared's appointments from all schedules
  editedData.schedules.forEach(schedule => {
    schedule.appointments = schedule.appointments.filter(apt => {
      const personnel = editedData.personnel.find(p => p.id === apt.personnelId);
      return personnel && personnel.name !== 'Jared Black';
    });
  });
  
  // Slightly reduce the number of appointments by removing some random ones
  editedData.schedules.forEach(schedule => {
    const reductionCount = Math.floor(schedule.appointments.length * 0.15); // Remove ~15% of appointments
    for (let i = 0; i < reductionCount; i++) {
      if (schedule.appointments.length > 0) {
        const randomIndex = Math.floor(Math.random() * schedule.appointments.length);
        schedule.appointments.splice(randomIndex, 1);
      }
    }
  });
  
  // Regenerate optimization data and metric cards for the edited version
  editedData.optimizationData = generateOptimizationMetrics();
  editedData.metricCards = generateMetricCards(editedData.optimizationData);
  
  return editedData;
}

// Generate the data
console.log('Generating schedule data...');
const scheduleData = generateWeekSchedule();

// Create the edited version
const editedScheduleData = createEditedVersion(scheduleData);

// Create output directory if it doesn't exist
const outputDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Save both files
const outputPath = path.join(outputDir, 'scheduleData.json');
const editedOutputPath = path.join(outputDir, 'scheduleDataEdited.json');

fs.writeFileSync(outputPath, JSON.stringify(scheduleData, null, 2));
fs.writeFileSync(editedOutputPath, JSON.stringify(editedScheduleData, null, 2));

console.log(`Original schedule data generated and saved to: ${outputPath}`);
console.log(`Edited schedule data generated and saved to: ${editedOutputPath}`);
console.log(`Generated schedules for ${scheduleData.schedules.length} days`);
console.log(`Total personnel: ${scheduleData.personnel.length}`);

// Print summary
scheduleData.schedules.forEach(schedule => {
  const appointmentCount = schedule.appointments.length;
  const totalMinutes = schedule.appointments.reduce((sum, apt) => sum + apt.duration, 0);
  console.log(`${schedule.date}: ${appointmentCount} appointments, ${totalMinutes} total minutes`);
});

console.log('\nEdited version changes:');
console.log('- Tara Meka (Nurse) → Jordan Ibe (Temp. Nurse)');
console.log('- Jared Black (Therapist) removed');
console.log('- Reduced appointment count (~15% reduction)');
