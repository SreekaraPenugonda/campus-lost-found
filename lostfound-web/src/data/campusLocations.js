export const campusLocations = {
  MAIN_GATE: {
    id: 'LOC001',
    name: 'Main Gate',
    category: 'ENTRANCE',
    riskLevel: 'HIGH',
    description: 'Main entrance on Guntur-Tenali Road',
    commonLosses: ['ID cards', 'Bus passes', 'Wallets', 'Earbuds'],
    icon: '🚪'
  },
  LARA_ENTRANCE: {
    id: 'LOC002',
    name: 'Lara Entrance',
    category: 'ENTRANCE',
    riskLevel: 'MEDIUM',
    description: 'Secondary campus entrance',
    commonLosses: ['Bus passes', 'Phones'],
    icon: '🚪'
  },
  ADMIN_BLOCK: {
    id: 'LOC003',
    name: 'Administrative Block (A-Block)',
    category: 'ADMIN',
    riskLevel: 'MEDIUM',
    description: 'VC Office, Registrar, Examination Cell, Student Affairs',
    commonLosses: ['Documents', 'ID cards', 'Pens'],
    icon: '🏛️',
    isRecoveryHub: true
  },
  NTR_LIBRARY: {
    id: 'LOC004',
    name: 'NTR Vignan Library',
    category: 'LIBRARY',
    riskLevel: 'VERY_HIGH',
    description: 'Main library with digital sections and study areas',
    commonLosses: ['Laptops', 'Chargers', 'Books', 'Pendrives', 'Headphones', 'ID cards'],
    icon: '📚',
    isRecoveryHub: true
  },
  VISWESWARAIAH_BLOCK: {
    id: 'LOC005',
    name: 'Visweswaraiah Block',
    category: 'ACADEMIC',
    riskLevel: 'HIGH',
    description: 'Major academic/seminar block',
    commonLosses: ['Notebooks', 'Power banks', 'USB drives'],
    icon: '🏗️'
  },
  ARYABHATTA_BLOCK: {
    id: 'LOC006',
    name: 'Aryabhatta Block',
    category: 'ACADEMIC',
    riskLevel: 'HIGH',
    description: 'Academic block with seminar and gallery halls',
    commonLosses: ['Calculators', 'Lab records', 'Pens'],
    icon: '🏗️'
  },
  CSE_DEPT: {
    id: 'LOC007',
    name: 'CSE Department',
    category: 'DEPARTMENT',
    riskLevel: 'HIGH',
    commonLosses: ['Laptops', 'USB drives', 'Calculators', 'Notebooks'],
    icon: '💻'
  },
  AI_ML_DEPT: {
    id: 'LOC008',
    name: 'AI & ML Department',
    category: 'DEPARTMENT',
    riskLevel: 'HIGH',
    commonLosses: ['Laptops', 'USB drives', 'Notebooks'],
    icon: '🤖'
  },
  IT_DEPT: {
    id: 'LOC009',
    name: 'IT Department',
    category: 'DEPARTMENT',
    riskLevel: 'HIGH',
    commonLosses: ['Laptops', 'USB drives', 'Chargers'],
    icon: '🖥️'
  },
  ECE_DEPT: {
    id: 'LOC010',
    name: 'ECE Department',
    category: 'DEPARTMENT',
    riskLevel: 'MEDIUM',
    commonLosses: ['Calculators', 'Lab records', 'Components'],
    icon: '🔌'
  },
  EEE_DEPT: {
    id: 'LOC011',
    name: 'EEE Department',
    category: 'DEPARTMENT',
    riskLevel: 'MEDIUM',
    commonLosses: ['Calculators', 'Lab equipment', 'Notebooks'],
    icon: '⚡'
  },
  MECHANICAL_DEPT: {
    id: 'LOC012',
    name: 'Mechanical Department',
    category: 'DEPARTMENT',
    riskLevel: 'MEDIUM',
    commonLosses: ['Tools', 'Notebooks', 'Water bottles'],
    icon: '🔧'
  },
  CIVIL_DEPT: {
    id: 'LOC013',
    name: 'Civil Department',
    category: 'DEPARTMENT',
    riskLevel: 'MEDIUM',
    commonLosses: ['Drawing tools', 'Notebooks', 'USBs'],
    icon: '🏗️'
  },
  BOYS_HOSTEL: {
    id: 'LOC014',
    name: 'Boys Hostel',
    category: 'HOSTEL',
    riskLevel: 'VERY_HIGH',
    subZones: ['Hostel Reception', 'Hostel Warden Office', 'Hostel Mess', 'Study Rooms', 'Laundry Areas', 'Common Rooms'],
    commonLosses: ['Keys', 'Chargers', 'Watches', 'Clothes', 'Sports equipment', 'ID cards'],
    icon: '🏠'
  },
  GIRLS_HOSTEL: {
    id: 'LOC015',
    name: 'Girls Hostel',
    category: 'HOSTEL',
    riskLevel: 'VERY_HIGH',
    subZones: ['Hostel Reception', 'Hostel Warden Office', 'Hostel Mess', 'Study Rooms', 'Common Rooms'],
    commonLosses: ['ID cards', 'Books', 'Earphones', 'Water bottles', 'Jewelry'],
    icon: '🏠'
  },
  HOSTEL_MESS: {
    id: 'LOC016',
    name: 'Hostel Mess / Dining Areas',
    category: 'FOOD',
    riskLevel: 'HIGH',
    description: 'Thousands of students cycle through daily',
    commonLosses: ['Wallets', 'Phones', 'ID cards', 'Earbuds', 'Lunch boxes'],
    icon: '🍽️'
  },
  CAFETERIA: {
    id: 'LOC017',
    name: 'Cafeteria / Food Court',
    category: 'FOOD',
    riskLevel: 'HIGH',
    description: 'Multiple canteen and shopping facilities',
    commonLosses: ['Mobile phones', 'Smart watches', 'Cash', 'Bags'],
    icon: '☕'
  },
  PARKING: {
    id: 'LOC018',
    name: 'Parking Areas',
    category: 'TRANSPORT',
    riskLevel: 'MEDIUM',
    description: 'Designated parking spaces across campus',
    commonLosses: ['Vehicle keys', 'Helmets', 'Documents', 'Bike accessories'],
    icon: '🅿️'
  },
  BUS_BAY: {
    id: 'LOC019',
    name: 'Bus Bay / Transport Hub',
    category: 'TRANSPORT',
    riskLevel: 'HIGH',
    description: 'Large transport network serving surrounding areas',
    commonLosses: ['Bus passes', 'Phones', 'Lunch boxes', 'Bags'],
    icon: '🚌'
  },
  SPORTS_GROUND: {
    id: 'LOC020',
    name: 'Sports Ground',
    category: 'SPORTS',
    riskLevel: 'MEDIUM',
    description: 'Cricket, Football, Athletics',
    commonLosses: ['Jerseys', 'Water bottles', 'Smart bands', 'Watches', 'Shoes'],
    icon: '⚽'
  },
  INDOOR_SPORTS: {
    id: 'LOC021',
    name: 'Indoor Sports Complex',
    category: 'SPORTS',
    riskLevel: 'MEDIUM',
    description: 'Basketball, Volleyball, Tennis, Badminton',
    commonLosses: ['Badminton rackets', 'Sports bags', 'Shoes', 'Phones'],
    icon: '🏸'
  },
  AUDITORIUM: {
    id: 'LOC022',
    name: 'Auditorium',
    category: 'EVENT',
    riskLevel: 'HIGH',
    description: 'Large event venue during fests and gatherings',
    commonLosses: ['Phones', 'Wallets', 'Accessories', 'Power banks'],
    icon: '🎭'
  },
  SEMINAR_HALL: {
    id: 'LOC023',
    name: 'Seminar Halls',
    category: 'EVENT',
    riskLevel: 'HIGH',
    description: 'Used for presentations, workshops, and guest lectures',
    commonLosses: ['Power banks', 'Notebooks', 'USB drives', 'Laptops'],
    icon: '📢'
  },
  EXAM_HALLS: {
    id: 'LOC024',
    name: 'Examination Halls',
    category: 'ACADEMIC',
    riskLevel: 'VERY_HIGH',
    description: 'High traffic during exam seasons',
    commonLosses: ['Calculators', 'Hall tickets', 'Pens', 'ID cards', 'Water bottles'],
    icon: '📝'
  },
  HEALTH_CENTER: {
    id: 'LOC025',
    name: 'Health Center',
    category: 'SUPPORT',
    riskLevel: 'LOW',
    description: '24x7 medical facility',
    commonLosses: ['ID cards', 'Insurance cards'],
    icon: '🏥'
  },
  ATM: {
    id: 'LOC026',
    name: 'ATM Area',
    category: 'SUPPORT',
    riskLevel: 'MEDIUM',
    description: 'UCO Bank ATM near Intermediate College',
    commonLosses: ['Cards', 'Wallets', 'Receipts'],
    icon: '🏦'
  }
};

export const getLocationById = (id) => {
  return Object.values(campusLocations).find(loc => loc.id === id);
};

export const getLocationsByCategory = (category) => {
  return Object.values(campusLocations).filter(loc => loc.category === category);
};

export const getHighRiskLocations = () => {
  return Object.values(campusLocations).filter(loc => 
    loc.riskLevel === 'HIGH' || loc.riskLevel === 'VERY_HIGH'
  );
};

export const getRecoveryHubs = () => {
  return Object.values(campusLocations).filter(loc => loc.isRecoveryHub);
};