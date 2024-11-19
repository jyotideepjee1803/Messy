/**
 * Generates a reset password email template with a hyperlink.
 * 
 * @param {string} name - The name of the recipient.
 * @param {string} link - The reset password link.
 * @returns {string} - The email HTML content.
 */

const resetTemplate = (name, link) => `
  <p>Hi ${name},</p>
  
  <p>We received a request to reset your password. You can reset your password by clicking the button below:</p>
  
  <p><a href="${link}" style="display: inline-block; padding: 10px 20px; background-color: #007BFF; color: #ffffff; text-decoration: none; border-radius: 5px;">Reset Password</a></p>
  
  <p>If you did not request a password reset, please ignore this email or contact support if you have concerns.</p>
  
  <p>This link will expire in 10 mins.</p>
  
  <p>Thank you,</p>
  <p>Messy Team</p>
`;

export {resetTemplate};