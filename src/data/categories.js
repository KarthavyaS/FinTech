export const iconSVG = {
  savings: `<path stroke-linecap="round" stroke-linejoin="round" d="M12 20s8-4.5 8-10V6l-8-3-8 3v4c0 5.5 8 10 8 10z"/>`,
  credit: `<path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>`,
  insurance: `<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>`,
  pension: `<path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>`,
  social: `<path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>`,
};

export const CATEGORIES = [
  {
    id: 'savings', name: 'Savings Services', desc: 'FDs, RDs, ELSS, and SIPs', path: iconSVG.savings,
    schemes: [
      { id: 'fd_rd', name: 'High Return FDs and RDs', fields: [{ n: 'depositType', l: 'Deposit Type', t: 'select', o: ['Fixed Deposit', 'Recurring Deposit'] }, { n: 'accNo', l: 'Bank Account Number', t: 'text' }, { n: 'ifsc', l: 'Branch IFSC Code', t: 'text' }, { n: 'amount', l: 'Amount (₹)', t: 'number' }, { n: 'tenure', l: 'Tenure (Months)', t: 'number' }, { n: 'nomineeName', l: 'Nominee Name', t: 'text' }, { n: 'nomineeRel', l: 'Nominee Relationship', t: 'text' }] },
      { id: 'sgb', name: 'SGB Related Saving Schemes', fields: [{ n: 'dematAcc', l: 'Demat Account Number', t: 'text' }, { n: 'dpId', l: 'Depository Participant ID', t: 'text' }, { n: 'amount', l: 'Investment Amount (₹)', t: 'number' }, { n: 'units', l: 'Units/Grams', t: 'number' }, { n: 'nomineeName', l: 'Nominee Name', t: 'text' }] },
      { id: 'elss', name: 'Equity Linked Savings (ELSS)', fields: [{ n: 'pan', l: 'PAN Number', t: 'text' }, { n: 'dematAcc', l: 'Demat Account Number', t: 'text' }, { n: 'amount', l: 'Investment Amount (₹)', t: 'number' }, { n: 'risk', l: 'Risk Tolerance', t: 'select', o: ['Low', 'Medium', 'High'] }, { n: 'folio', l: 'Existing Folio No (Optional)', t: 'text' }] },
      { id: 'sip', name: 'Systematic Investment Plans', fields: [{ n: 'bankAcc', l: 'Bank Account Number', t: 'text' }, { n: 'ifsc', l: 'Branch IFSC Code', t: 'text' }, { n: 'monthlyAmt', l: 'Monthly Installment (₹)', t: 'number' }, { n: 'tenure', l: 'Duration (Years)', t: 'number' }, { n: 'mandate', l: 'Auto Debit Mandate', t: 'select', o: ['Yes', 'No'] }] },
    ],
  },
  {
    id: 'credit', name: 'Credit Services', desc: 'Loans and micro-credit solutions', path: iconSVG.credit,
    schemes: [
      { id: 'micro_gold', name: 'Micro Credit / Gold Loans', fields: [{ n: 'goldWeight', l: 'Gold Weight (grams)', t: 'number' }, { n: 'loanAmt', l: 'Required Amount (₹)', t: 'number' }, { n: 'purpose', l: 'Purpose of Loan', t: 'text' }, { n: 'existingDebt', l: 'Existing Debt', t: 'select', o: ['Yes', 'No'] }] },
      { id: 'livelihood', name: 'Livelihood Support Loans', fields: [{ n: 'businessType', l: 'Business Type', t: 'text' }, { n: 'tradeLicense', l: 'Trade License Reg. No', t: 'text' }, { n: 'monthlyRev', l: 'Avg Monthly Revenue (₹)', t: 'number' }, { n: 'loanAmt', l: 'Required Amount (₹)', t: 'number' }, { n: 'guarantor', l: 'Guarantor Name', t: 'text' }] },
      { id: 'msme', name: 'MSME Loans with Subsidy', fields: [{ n: 'msmeReg', l: 'MSME Reg. No. (Udyam)', t: 'text' }, { n: 'gstin', l: 'GSTIN', t: 'text' }, { n: 'vintage', l: 'Business Vintage (Years)', t: 'number' }, { n: 'turnover', l: 'Annual Turnover (₹)', t: 'number' }, { n: 'loanAmt', l: 'Required Amount (₹)', t: 'number' }, { n: 'purpose', l: 'Purpose', t: 'text' }] },
      { id: 'home_vehicle', name: 'Home / Vehicle Loans', fields: [{ n: 'loanType', l: 'Loan Type', t: 'select', o: ['Home Loan', 'Vehicle Loan'] }, { n: 'propVal', l: 'Property/Vehicle Value (₹)', t: 'number' }, { n: 'loanAmt', l: 'Required Amount (₹)', t: 'number' }, { n: 'empStatus', l: 'Employment Status', t: 'select', o: ['Salaried', 'Self-Employed'] }, { n: 'coApplicant', l: 'Co-Applicant Name', t: 'text' }] },
    ],
  },
  {
    id: 'insurance', name: 'Insurance Services', desc: 'Life, Medical, Auto, and Agri', path: iconSVG.insurance,
    schemes: [
      { id: 'life', name: 'Life Insurance (PMJJBY/PMSBY)', fields: [{ n: 'coverage', l: 'Desired Coverage', t: 'select', o: ['PMJJBY (Life)', 'PMSBY (Accidental)', 'Both'] }, { n: 'nomineeName', l: 'Nominee Name', t: 'text' }, { n: 'nomineeRel', l: 'Nominee Relationship', t: 'text' }, { n: 'bankDebit', l: 'Auto-Debit Bank Acc No', t: 'text' }, { n: 'medHistory', l: 'Pre-existing Medical History', t: 'select', o: ['No', 'Yes'] }] },
      { id: 'medical', name: 'Medical Insurance', fields: [{ n: 'coverageAmt', l: 'Coverage Amount (₹)', t: 'number' }, { n: 'familySize', l: 'Family Size', t: 'number' }, { n: 'primaryAge', l: 'Primary Insured Age', t: 'number' }, { n: 'preExisting', l: 'Pre-existing Diseases Details', t: 'text' }, { n: 'cashless', l: 'Needs Cashless Network', t: 'select', o: ['Yes', 'No'] }] },
      { id: 'vehicle', name: 'Vehicle Insurance', fields: [{ n: 'regNo', l: 'Vehicle Registration', t: 'text' }, { n: 'vehType', l: 'Vehicle Type', t: 'select', o: ['2-Wheeler', '4-Wheeler', 'Commercial'] }, { n: 'makeModel', l: 'Make & Model', t: 'text' }, { n: 'mfgYear', l: 'Year of Manufacture', t: 'number' }, { n: 'idv', l: 'Current IDV (Expected)', t: 'number' }] },
      { id: 'agri', name: 'Agri Insurance', fields: [{ n: 'cropName', l: 'Crop Details', t: 'text' }, { n: 'area', l: 'Land Area (Acres)', t: 'number' }, { n: 'soilType', l: 'Soil Type', t: 'text' }, { n: 'yield', l: 'Expected Yield (Quintals)', t: 'number' }, { n: 'khataNo', l: 'Survey / Khata Number', t: 'text' }] },
    ],
  },
  {
    id: 'pension', name: 'Pension Services', desc: 'Retirement and monthly income', path: iconSVG.pension,
    schemes: [
      { id: 'apy', name: 'Atal Pension Yojana', fields: [{ n: 'pensionAmt', l: 'Desired Pension', t: 'select', o: ['1000', '2000', '3000', '4000', '5000'] }, { n: 'bankAcc', l: 'Savings Bank Acc No', t: 'text' }, { n: 'ifsc', l: 'Branch IFSC', t: 'text' }, { n: 'nomineeName', l: 'Nominee Name', t: 'text' }] },
      { id: 'pmsym', name: 'PM-SYM / PM-KMY', fields: [{ n: 'schemeType', l: 'Scheme Type', t: 'select', o: ['PM-SYM', 'PM-KMY'] }, { n: 'cscId', l: 'CSC / VLE ID (If any)', t: 'text' }, { n: 'avgIncome', l: 'Avg Monthly Income (₹)', t: 'number' }, { n: 'spouseName', l: 'Spouse Name (For Joint)', t: 'text' }] },
      { id: 'nps', name: 'NPS – Lite', fields: [{ n: 'pran', l: 'PRAN (If registered)', t: 'text' }, { n: 'contrib', l: 'Monthly Contribution (₹)', t: 'number' }, { n: 'investPattern', l: 'Investment Pattern', t: 'select', o: ['Auto Choice', 'Active Choice'] }, { n: 'subType', l: 'Subscriber Type', t: 'select', o: ['Govt Sector', 'All Citizens', 'Corporate'] }] },
    ],
  },
  {
    id: 'social', name: 'Social Security Services', desc: 'Welfare boards and E-SHRAM', path: iconSVG.social,
    schemes: [
      { id: 'tnuwwb', name: 'TNUWWB', fields: [{ n: 'workerType', l: 'Worker Category', t: 'text' }, { n: 'district', l: 'District', t: 'text' }, { n: 'taluk', l: 'Taluk', t: 'text' }, { n: 'experience', l: 'Years of Experience', t: 'number' }, { n: 'dependentCount', l: 'Dependent Count', t: 'number' }] },
      { id: 'tncwwb', name: 'TNCWWB', fields: [{ n: 'workType', l: 'Construction Work Type', t: 'text' }, { n: 'skillLevel', l: 'Skill Level', t: 'select', o: ['Unskilled', 'Semi-Skilled', 'Skilled'] }, { n: 'unionReg', l: 'Union Reg No (If any)', t: 'text' }, { n: 'siteAddress', l: 'Current Site Address', t: 'text' }] },
      { id: 'eshram', name: 'E-SHRAM', fields: [{ n: 'occupation', l: 'Current Occupation (NCO)', t: 'text' }, { n: 'skillCert', l: 'Skill Certificate', t: 'select', o: ['None', 'NSQF Registered'] }, { n: 'bloodGroup', l: 'Blood Group', t: 'select', o: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] }, { n: 'bankLinked', l: 'Bank Account Linked', t: 'select', o: ['Yes', 'No'] }] },
    ],
  },
];
