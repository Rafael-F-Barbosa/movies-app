
exports.getIndex = (req, res, next)=>{
    res.render('index', {pageTitle: 'Inventory App'});
}