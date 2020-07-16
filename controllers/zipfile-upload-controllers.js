

const zipfileUpload = (req, res, next) => {
    console.log('a');
    
    res.json({a:"upload route was established"})
};

exports.zipfileUpload = zipfileUpload;