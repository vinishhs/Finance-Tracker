const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * Verify Google ID token and return user information
 * @param {string} token - Google ID token
 * @returns {Promise<Object|null>} User information or null if verification fails
 */
const verifyGoogleToken = async (token) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    
    return {
      sub: payload.sub, // Google user ID
      email: payload.email,
      email_verified: payload.email_verified,
      name: payload.name,
      given_name: payload.given_name,
      family_name: payload.family_name,
      picture: payload.picture,
      locale: payload.locale,
    };
  } catch (error) {
    console.error('Google token verification error:', error);
    return null;
  }
};

/**
 * Validate Google OAuth configuration
 */
const validateGoogleConfig = () => {
  if (!process.env.GOOGLE_CLIENT_ID) {
    console.warn('GOOGLE_CLIENT_ID is not set. Google OAuth will be disabled.');
    return false;
  }
  return true;
};

module.exports = {
  verifyGoogleToken,
  validateGoogleConfig,
  client,
};