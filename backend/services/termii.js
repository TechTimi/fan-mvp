const axios = require('axios');

const TERMII_BASE_URL = 'https://api.ng.termii.com/api';

const sendSMS = async (to, message) => {
  try {
    const response = await axios.post(`${TERMII_BASE_URL}/sms/send`, {
      to,
      from: process.env.TERMII_SENDER_ID || 'FAN',
      sms: message,
      type: 'plain',
      api_key: process.env.TERMII_API_KEY,
      channel: 'generic'
    });

    return response.data;
  } catch (error) {
    console.error('Termii SMS error:', error.response?.data || error.message);
    throw new Error('Failed to send SMS');
  }
};

const sendOTP = async (phoneNumber) => {
  try {
    const response = await axios.post(`${TERMII_BASE_URL}/sms/otp/send`, {
      api_key: process.env.TERMII_API_KEY,
      message_type: 'NUMERIC',
      to: phoneNumber,
      from: process.env.TERMII_SENDER_ID || 'FAN',
      channel: 'generic',
      pin_attempts: 3,
      pin_time_to_live: 5,
      pin_length: 4,
      pin_placeholder: '< 1234 >',
      message_text: 'Your FAN verification code is < 1234 >. Valid for 5 minutes.',
      pin_type: 'NUMERIC'
    });

    return response.data;
  } catch (error) {
    console.error('Termii OTP error:', error.response?.data || error.message);
    throw new Error('Failed to send OTP');
  }
};

const verifyOTP = async (pinId, pin) => {
  try {
    const response = await axios.post(`${TERMII_BASE_URL}/sms/otp/verify`, {
      api_key: process.env.TERMII_API_KEY,
      pin_id: pinId,
      pin
    });

    return response.data;
  } catch (error) {
    console.error('Termii OTP verification error:', error.response?.data || error.message);
    throw new Error('Failed to verify OTP');
  }
};

module.exports = {
  sendSMS,
  sendOTP,
  verifyOTP
};
