export type FloorStatus = 'available' | 'unavailable' | 'sold_out';

export interface Floor {
  code: string;
  label: string;
  type: string;
  carpetArea: number;
  askingPrice: string;
  status: FloorStatus;
  builderNote?: string;
  reason?: string;
}

export interface Property {
  id: string;
  name: string;
  locality: string;
  city: string;
  builderName: string;
  accommodation: string;
  constructionStatus: string;
  possession: string;
  plotSize: number;
  coveredArea: number;
  floor: string;
  carParking: number;
  askingPrice: string;
  facing: string;
  propertyFeatures: string[];
  qrToken: string;
  entryCode: string;
  floors: Floor[];
  caretakerName: string;
  caretakerPhone: string;
  builderNote: string;
}

export interface Visit {
  id: string;
  propertyId: string;
  propertyName: string;
  builderName: string;
  status: 'pending' | 'approved' | 'rejected' | 'entered';
  requestedAt: string;
  respondedAt?: string;
  entryCode?: string;
  entryCodeExpiry?: string;
  brokerNote?: string;
  rejectionReason?: string;
  floorsSnapshot?: Floor[];
}

export interface Broker {
  id: string;
  name: string;
  initials: string;
  phone: string;
  email: string;
  company: string;
  officeAddress: string;
  serviceAreas: string[];
  reraNumber: string;
  gstNumber: string;
  visitsCount: number;
  buildersCount: number;
  referencesCount: number;
  status: 'verified' | 'pending' | 'blacklisted';
}

export interface Builder {
  id: string;
  name: string;
  initials: string;
  company: string;
  pendingApprovals: number;
  qrScansToday: number;
  verifiedBrokers: number;
}

export const MOCK_BROKER: Broker = {
  id: 'brkr_arjun_k',
  name: 'Arjun Kapoor',
  initials: 'AK',
  phone: '+91 98••••1247',
  email: 'arjun.k@akrealty.in',
  company: 'AK Realty LLP',
  officeAddress: '301, Lotus Plaza, Lower Parel',
  serviceAreas: ['Worli', 'Lower Parel', 'Prabhadevi'],
  reraNumber: 'A52100000089',
  gstNumber: '',
  visitsCount: 34,
  buildersCount: 12,
  referencesCount: 12,
  status: 'verified',
};

export const MOCK_BUILDER: Builder = {
  id: 'bld_lodha',
  name: 'Rohan Sharma',
  initials: 'RS',
  company: 'Lodha Group',
  pendingApprovals: 7,
  qrScansToday: 28,
  verifiedBrokers: 186,
};

export const MOCK_PROPERTIES: Property[] = [
  {
    id: 'prop_001',
    name: 'B-515, NFC',
    locality: 'New Friends Colony',
    city: 'South Delhi',
    builderName: 'DLF Builders',
    accommodation: '4 BHK',
    constructionStatus: 'Booking',
    possession: 'June 2026',
    plotSize: 500,
    coveredArea: 2700,
    floor: '3rd Floor + Terrace',
    carParking: 5,
    askingPrice: '₹6.25 Cr',
    facing: 'South East',
    propertyFeatures: ['Separate lift', 'Separate driveway', 'Modular kitchen', 'Vastu compliant', 'Servant quarters'],
    qrToken: '7XKQ29',
    entryCode: '482915',
    floors: [
      { code: 'B+G', label: 'Basement + Ground (Triplex)', type: 'Triplex', carpetArea: 1450, askingPrice: '₹3.41 Cr', status: 'available', builderNote: 'Show from EZY' },
      { code: '1F', label: '1st Floor', type: 'Floor', carpetArea: 1180, askingPrice: '₹1.85 Cr', status: 'available' },
      { code: '2F', label: '2nd Floor', type: 'Floor', carpetArea: 1180, askingPrice: '₹1.80 Cr', status: 'unavailable', reason: 'Token received from Mr Khanna' },
      { code: '3T', label: '3rd Floor + Terrace', type: 'Floor+Terrace', carpetArea: 1180, askingPrice: '₹2.20 Cr', status: 'available', builderNote: 'Show from EZY' },
    ],
    caretakerName: 'Ramesh Yadav',
    caretakerPhone: '+91 99••••6321',
    builderNote: 'Show from EZY',
  },
  {
    id: 'prop_002',
    name: 'C-42, GK II',
    locality: 'Greater Kailash II',
    city: 'New Delhi',
    builderName: 'DLF Builders',
    accommodation: '4 BHK',
    constructionStatus: 'Under Construction',
    possession: 'Dec 2026',
    plotSize: 400,
    coveredArea: 2200,
    floor: '2nd Floor',
    carParking: 3,
    askingPrice: '₹5.80 Cr',
    facing: 'North East',
    propertyFeatures: ['Corner property', 'Pooja room', 'Study room', 'Visitor parking', '24x7 security'],
    qrToken: '9PQR15',
    entryCode: '731624',
    floors: [
      { code: 'B+G', label: 'Basement + Ground (Triplex)', type: 'Triplex', carpetArea: 1400, askingPrice: '₹3.10 Cr', status: 'available' },
      { code: '1F', label: '1st Floor', type: 'Floor', carpetArea: 1100, askingPrice: '₹1.75 Cr', status: 'available' },
      { code: '2F', label: '2nd Floor', type: 'Floor', carpetArea: 1100, askingPrice: '₹1.70 Cr', status: 'available' },
      { code: '3T', label: '3rd Floor + Terrace', type: 'Floor+Terrace', carpetArea: 1100, askingPrice: '₹2.10 Cr', status: 'sold_out' },
    ],
    caretakerName: 'Suresh Kumar',
    caretakerPhone: '+91 98••••4412',
    builderNote: '',
  },
  {
    id: 'prop_003',
    name: 'A-17, South Ex',
    locality: 'South Extension Part 2',
    city: 'New Delhi',
    builderName: 'DLF Builders',
    accommodation: '3 BHK',
    constructionStatus: 'Under Construction',
    possession: 'Dec 2024',
    plotSize: 300,
    coveredArea: 1650,
    floor: '1st Floor',
    carParking: 2,
    askingPrice: '₹4.85 Cr',
    facing: 'East',
    propertyFeatures: ['Gated society', 'CCTV', 'Gym in basement', 'Wooden flooring'],
    qrToken: '3ABX77',
    entryCode: '295041',
    floors: [
      { code: 'B+G', label: 'Basement + Ground (Triplex)', type: 'Triplex', carpetArea: 1200, askingPrice: '₹2.90 Cr', status: 'available' },
      { code: '1F', label: '1st Floor', type: 'Floor', carpetArea: 900, askingPrice: '₹1.50 Cr', status: 'available' },
      { code: '2F', label: '2nd Floor', type: 'Floor', carpetArea: 900, askingPrice: '₹1.45 Cr', status: 'unavailable' },
      { code: '3T', label: '3rd Floor + Terrace', type: 'Floor+Terrace', carpetArea: 900, askingPrice: '₹1.75 Cr', status: 'available' },
    ],
    caretakerName: 'Mohan Lal',
    caretakerPhone: '+91 97••••8832',
    builderNote: '',
  },
  {
    id: 'prop_004',
    name: 'D-88, DLF Phase 3',
    locality: 'DLF Phase 3',
    city: 'Gurugram',
    builderName: 'OLF Builders',
    accommodation: '5 BHK',
    constructionStatus: 'Nearing Completion',
    possession: 'Aug 2026',
    plotSize: 450,
    coveredArea: 3100,
    floor: '2nd Floor',
    carParking: 3,
    askingPrice: '₹8.50 Cr',
    facing: 'North West',
    propertyFeatures: ['Private terrace', 'Modular kitchen', 'Italian marble', 'Society maintenance'],
    qrToken: '5DPQ82',
    entryCode: '104857',
    floors: [
      { code: 'B+G', label: 'Basement + Ground (Triplex)', type: 'Triplex', carpetArea: 1800, askingPrice: '₹4.20 Cr', status: 'available', builderNote: 'Show from EZY' },
      { code: '1F', label: '1st Floor', type: 'Floor', carpetArea: 1300, askingPrice: '₹2.10 Cr', status: 'available' },
      { code: '2F', label: '2nd Floor', type: 'Floor', carpetArea: 1300, askingPrice: '₹2.05 Cr', status: 'available' },
      { code: '3T', label: '3rd Floor + Terrace', type: 'Floor+Terrace', carpetArea: 1300, askingPrice: '₹2.60 Cr', status: 'available' },
    ],
    caretakerName: 'Prakash Singh',
    caretakerPhone: '+91 95••••6710',
    builderNote: 'Show from EZY',
  },
  {
    id: 'prop_005',
    name: 'E-204, Vasant Vihar',
    locality: 'Vasant Vihar Block 3',
    city: 'New Delhi',
    builderName: 'Prestigious Estates',
    accommodation: '5 BHK',
    constructionStatus: 'Pre-launch',
    possession: 'Mar 2027',
    plotSize: 350,
    coveredArea: 1950,
    floor: '3rd Floor + Terrace',
    carParking: 2,
    askingPrice: '₹7.20 Cr',
    facing: 'South West',
    propertyFeatures: ['Walk-in wardrobe', 'Study room', 'Stilt parking', 'Corner property'],
    qrToken: '2VWX33',
    entryCode: '671203',
    floors: [
      { code: 'B+G', label: 'Basement + Ground (Triplex)', type: 'Triplex', carpetArea: 1400, askingPrice: '₹3.80 Cr', status: 'available' },
      { code: '1F', label: '1st Floor', type: 'Floor', carpetArea: 1000, askingPrice: '₹1.90 Cr', status: 'unavailable', reason: 'Token issued' },
      { code: '2F', label: '2nd Floor', type: 'Floor', carpetArea: 1000, askingPrice: '₹1.85 Cr', status: 'available' },
      { code: '3T', label: '3rd Floor + Terrace', type: 'Floor+Terrace', carpetArea: 1000, askingPrice: '₹2.20 Cr', status: 'available' },
    ],
    caretakerName: 'Dinesh Patel',
    caretakerPhone: '+91 90••••2215',
    builderNote: '',
  },
];

export const MOCK_VISITS: Visit[] = [
  {
    id: 'visit_001',
    propertyId: 'prop_001',
    propertyName: 'Park Side Tower 4 — 1203',
    builderName: 'Lodha Group',
    status: 'approved',
    requestedAt: '2 days ago',
    respondedAt: '2 days ago',
    entryCode: '482915',
    entryCodeExpiry: '30 MIN',
    brokerNote: 'Bringing buyer from Bangalore for site visit',
    floorsSnapshot: [
      { code: 'B+G', label: 'Basement + Ground', type: 'Triplex', carpetArea: 1450, askingPrice: '₹3.41 Cr', status: 'available' },
      { code: '1F', label: '1st Floor', type: 'Floor', carpetArea: 1180, askingPrice: '₹1.85 Cr', status: 'available' },
    ],
  },
  {
    id: 'visit_002',
    propertyId: 'prop_005',
    propertyName: 'Skyline Heights B 806',
    builderName: 'Lodha Group',
    status: 'approved',
    requestedAt: '4 days ago',
    respondedAt: '4 days ago',
    entryCode: '731624',
    entryCodeExpiry: 'EXPIRED',
    brokerNote: '',
  },
  {
    id: 'visit_003',
    propertyId: 'prop_002',
    propertyName: 'BKC Commercial Plot',
    builderName: 'Lodha Group',
    status: 'rejected',
    requestedAt: '1 week ago',
    respondedAt: '1 week ago',
    rejectionReason: 'The builder for BKC Commercial Plot declined your request. The owner is travelling till 20 May. Please retry after that or contact us directly.',
    brokerNote: '',
  },
  {
    id: 'visit_004',
    propertyId: 'prop_003',
    propertyName: 'Lake View Villa 12',
    builderName: 'Lodha Group',
    status: 'entered',
    requestedAt: '10 May',
    respondedAt: '10 May',
    entryCode: '295041',
    brokerNote: '',
  },
  {
    id: 'visit_005',
    propertyId: 'prop_004',
    propertyName: 'Hillside Estate 8A',
    builderName: 'Lodha Group',
    status: 'entered',
    requestedAt: '3 May',
    respondedAt: '3 May',
    entryCode: '104857',
    brokerNote: '',
  },
  {
    id: 'visit_006',
    propertyId: 'prop_001',
    propertyName: 'B-515, NFC',
    builderName: 'DLF Builders',
    status: 'pending',
    requestedAt: 'just now',
    brokerNote: 'Genuine buyer, ready to close',
  },
];

export const PENDING_APPROVALS = [
  {
    id: 'pa_001',
    brokerName: 'Priya Mehta',
    brokerInitials: 'PM',
    brokerId: 'A52102••••14',
    propertyName: 'Skyline Heights B 806',
    requestedAt: '14 min ago',
    waitingTime: '14 min',
    brokerNote: 'Bringing buyer from Bangalore for site visit on floor 4 and 5',
    floorsAvailable: ['B+G (Triplex)', '1st Floor', '3rd + Terrace'],
    floorsUnavailable: ['2nd Floor'],
    builderNote: 'Show from EZY',
  },
  {
    id: 'pa_002',
    brokerName: 'Vikram Singh',
    brokerInitials: 'VS',
    brokerId: 'A52103••••77',
    propertyName: 'BKC Commercial Plot',
    requestedAt: '1 hour ago',
    waitingTime: '1 hr',
    brokerNote: '',
    floorsAvailable: ['B+G (Triplex)', '2nd Floor'],
    floorsUnavailable: ['1st Floor', '3rd + Terrace'],
    builderNote: '',
  },
  {
    id: 'pa_003',
    brokerName: 'Sneha Nair',
    brokerInitials: 'SN',
    brokerId: '',
    propertyName: 'Riverside Residency 502',
    requestedAt: '2 hours ago',
    waitingTime: '2 hr',
    brokerNote: 'First-time buyer from Mumbai',
    floorsAvailable: ['B+G (Triplex)', '1st Floor', '2nd Floor'],
    floorsUnavailable: [],
    builderNote: '',
  },
];

export const REFERENCES = [
  {
    id: 'ref_001',
    builderName: 'Raheja Corp',
    personName: 'Manish Trivedi',
    company: 'Godrej Properties',
    status: 'approved',
    comment: 'Reliable and solid. Closes three deals in 2 months.',
  },
  {
    id: 'ref_002',
    builderName: 'Lodha Group',
    personName: 'Kavita Iyer',
    company: 'Kavita Realty',
    status: 'approved',
    comment: 'Highly recommended. Brings genuine buyers.',
  },
  {
    id: 'ref_003',
    builderName: '',
    personName: 'Sandeep Mehra',
    phone: '+91 99••••1234',
    status: 'pending',
    comment: 'Link sent via SMS 2 days ago',
  },
];
