const success = data => ({ success: true, ...data });

const error = data => ({ success: false, ...data });

module.exports = { success, error };
