const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  countryCode: {
    type: String,
    default: '+1'
  },
  mobileNumber: {
    type: String,
    required: true
  },
  sameForWhatsApp: {
    type: Boolean,
    default: true
  },
  whatsAppCountryCode: {
    type: String,
    default: '+1'
  },
  whatsAppNumber: {
    type: String
  },
  userType: {
    type: String,
    enum: ['standard', 'candidate', 'recruiter', 'employee'],
    default: 'standard'
  },
  // Candidate-specific fields
  visaInfo: {
    type: String
  },
  highestDegree: {
    type: String
  },
  universityName: {
    type: String
  },
  passedOutYear: {
    type: String
  },
  // Recruiter-specific fields
  yearsOfExp: {
    type: Number
  },
  pastCompany: {
    type: String
  },
  // Employee-specific fields
  companyName: {
    type: String
  },
  position: {
    type: String
  },
  startDate: {
    type: Date
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('user', UserSchema);