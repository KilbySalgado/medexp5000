const getDb = require('../db');
let db = null;

class Expedientes{

    constructor(){
        getDb()
        .then( (database) =>{
            db = database;
            if (process.env.MIGRATE === 'true') {
                const createStatement = 'CREATE TABLE IF NOT EXISTS expedientes (id INTEGER PRIMARY KEY AUTOINCREMENT, identidad TEXT, fecha TEXT, descripcion TEXT, observaciones TEXT, registros INTEGER, ultimoActualizacion TEXT);';
                db.run(createStatement);
            }
        })
        .catch((err)=> {console.error(err)});
    }
//Nuevo Registro en la db
    new ( identidad, fecha, descripcion, observaciones, registros, ultimoActualizacion){
        return new Promise( (accept, reject) => {
            db.run(
                'INSERT INTO expedientes (identidad, fecha, descripcion, observaciones, registros, ultimoActualizacion) VALUES (?, ?, ?, ?, ?, ?);',
                [identidad, fecha, descripcion, observaciones, registros, ultimoActualizacion],
                (err, rslt) => {
                    if(err){
                        console.error(err);
                        reject(err);
                    }
                    accept(rslt);
                }
            );
        });
    }

}

module.exports = Expedientes;