const mysql = require('mysql');

    // Connection pool
    const pool = mysql.createPool({
        connectionLimit: 100,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    });
    

//view users
exports.view = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err; // Not connected
        console.log('Connected as ID ' + connection.threadId);
        //Use the connection
        connection.query('SELECT * FROM user', (err, rows) => {
            //when done with connection
            connection.release();
            if(!err){
                let removedUser = req.query.removed;
                res.render('home', { rows, removedUser });
            } else{
                console.log(err);
            }
        });
    });
}

// Find user by search
exports.find = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err; // Not connected
        console.log('Connected as ID ' + connection.threadId);

        let searchTerm = req.body.search;
        console.log(searchTerm);
        //Use the connection
        connection.query('SELECT * FROM user WHERE First_name LIKE ? OR last_name LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
            //when done with connection
            connection.release();
            if(!err){
                res.render('home', { rows });
            } else{
                console.log(err);
            }
        });
    });
}

exports.form = (req, res) => {
    res.render('add-user');
}


// Add new user
exports.create = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err; // Not connected
        console.log('Connected as ID ' + connection.threadId);
        const { first_name, last_name, email, phone, comments } = req.body;
        let searchTerm = req.body.search;

        // User the connection
        connection.query('INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?', [first_name, last_name, email, phone, comments], (err, rows) => {
            if (!err) {
                res.render('add-user',{alert: 'User added successfully.'});
            } else {
                console.log(err);
            }
        });
    });
}


// Edit user
exports.edit = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err; // Not connected
        console.log('Connected as ID ' + connection.threadId);
        //Use the connection
        connection.query('SELECT * FROM user WHERE id = ?',[req.params.id], (err, rows) => {
            //when done with connection
            connection.release();
            if(!err){
                res.render('edit-user', { rows });
            } else{
                console.log(err);
            }
        });
    });
}

// Update user
exports.update = (req, res) => {
    const { first_name, last_name, email, phone, comments } = req.body;

    pool.getConnection((err, connection) => {
        if(err) throw err; // Not connected
        console.log('Connected as ID ' + connection.threadId);
        //Use the connection
        connection.query('UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?', [first_name, last_name, email, phone, comments, req.params.id], (err, rows) => {
            //when done with connection
            connection.release();
            if(!err){
                pool.getConnection((err, connection) => {
                    if(err) throw err; // Not connected
                    console.log('Connected as ID ' + connection.threadId);
                    //Use the connection
                    connection.query('SELECT * FROM user WHERE id = ?',[req.params.id], (err, rows) => {
                        //when done with connection
                        connection.release();
                        if(!err){
                            res.render('edit-user', { rows, alert: `${first_name} has been updated.` });
                        } else{
                            console.log(err);
                        }
                    });
                });
            } else{
                console.log(err);
            }
        });
    });
}

// Delete user
exports.delete = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err; // Not connected
        console.log('Connected as ID ' + connection.threadId);
        //Use the connection
            connection.query('DELETE FROM user WHERE id = ?', [req.params.id], (err, rows) => {
            //when done with connection
            connection.release();
            if(!err){
                let removedUser = encodeURIComponent('User successfully removed');
                res.redirect('/?removed=' + removedUser);
            } else{
                console.log(err);
            }
        });
    });
}

exports.viewall = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err; // Not connected
        console.log('Connected as ID ' + connection.threadId);
        //Use the connection
        connection.query('SELECT * FROM user where id = ?', [req.params.id], (err, rows) => {
            //when done with connection
            connection.release();
            if(!err){
                res.render('view-user', { rows });
            } else{
                console.log(err);
            }
        });
    });
}