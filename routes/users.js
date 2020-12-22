let nedb = require('nedb');
let db = new nedb({
    filename: 'userd.db',
    autoload: true
});

module.exports = (app) => {

    //let route = app.route('/users');

    app.get('/users/:id', (req, res) => {
        db.findOne({_id:req.params.id}).exec((err, user) => {
            if (err){
                app.utils.error.send(err, req, res, 400);
            } else {
                res.status(200).json({user});
            }           
        })
    });   

    app.get('/users', (req, res) => {
        db.find({}).sort({name: 1}).exec((err, users) => {
            if (err){
                app.utils.error.send(err, req, res, 400);
            } else {
                res.json({users: users});
            }
        })
    });

    app.post('/users', (req, res) => {
        
        //req.assert('name', 'O nome eh obrigatorio').notEmpty();
        //req.assert('email', 'O email esta invalido').notEmpty().isEmail();
        //let erros = req.validationErrors();

        //if (erros){
            //app.utils.error.send(erros, req, res, 400);
        //    return false;
        //}
                
        db.insert(req.body, (err, user) => {
            if (err){
                app.utils.error.send(err, req, res, 400);
            } else {
                res.status(200).json({user});
            }
        });
    });

    app.put('/users/:id', (req, res) => {
        db.update({_id:req.params.id}, req.body, err => {
            if (err){
                app.utils.error.send(err, req, res, 400);
            } else {
                res.status(200).json(Object.assign(req.body, req.params.id));
            }           
        })
    });

    app.delete('/users/:id', (req, res) => {
        db.remove({_id:req.params.id}, {}, err => {
            if (err){
                app.utils.error.send(err, req, res, 400);
            } else {
                res.status(200).json(req.params.id);
            }
        })
    });
}