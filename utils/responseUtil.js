
const generateErrorResponse = (error) => {
    let errorMessage = 'Internal server error';

    if (error.errors && error.errors.length > 0) {
        errorMessage = error.errors.map(err => err.message).join('. ');
    } else if (error.message) {
        errorMessage = error.message;
    }

    return { error: errorMessage };
};

module.exports = { generateErrorResponse };
