var ObjectID = require('mongodb').ObjectId;

module.exports = function(app, db){
    
    //C=Create
    app.post('/notes', (req, res) => {

        const myDB = db.db('notesdb');
        //myDB.collection('notes');

        const note = {text: req.body.body, title: req.body.title };
        myDB.collection('notes').insert(note, (err, result) => {
            if (err){
                res.send({'error' : 'An error has occured :('});
            }
            else{
                res.send(result.ops[0]);
            }
        });
        console.log(req.body); //{ title: xxx body: xxx}
        //res.send('Hello From Post!');
    });

    //R=Read
    app.get('/notes/:id', (req, res) => {

        const myDB = db.db('notesdb');

        const id = req.params.id;

        const details = {'_id' : new ObjectId(id)};
        myDB.collection('notes').findOne(details, (err, item) => {
            if(err){
                res.send({'error' : 'An error again :(('});
            }
            else{
                res.send(item);
            }
        })

        console.log('Asking for a note :o')
        //res.send('This should be a returned note');
    });

    //U=Update

    app.put('/notes/:id', (req, res) => {

        const myDB = db.db('notesdb');

        const id = req.params.id;

        const details = {'_id' : new ObjectId(Id)};
        const note = {text: req.body.body, title: req.body.title};

        myDB.collection('notes').update(details, note, (err, result) => {
            if(err){
                res.send({'error' : '): ...ERROR... :('});
            }
            else{
                res.send('note');
            }
        });
    });


    //D=Delete

    app.delete('/notes/:id', (req, res) => {

        const myDB = db.db('notesdb');
        
        const id = req.params.id;

        const details = {'_id' : new ObjectId(id)};

        myDB.collection('notes').remove(details, (err, result) => {
            if(err){
                res.send({'error' : 'Error deleteting...'});
            }
            else{
                res.send('Note ' + id + ' is deleted!');
            }
        });
    });

};