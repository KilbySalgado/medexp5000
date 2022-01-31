const express = require('express');
const router = express.Router();

const Expedientes = new require('../../../../dao/expedientes/expedientes.model');
const expedienteModel = new Expedientes();

router.get('/', (req, res) => {
    res.status(200).json(
        {
            endpoint: 'Expedientes',
            updates: new Date(2022,0,31,13,21,00)
        }
        );
}); //Get /

router.post('/new', async (req, res) => {
    const { identidad, fecha, descripcion, observaciones, registros, ultimoActualizacion } = req.body;
    try {
      rslt = await expedienteModel.new(identidad, fecha, descripcion, observaciones, registros, ultimoActualizacion);
      res.status(200).json(
        {
          status: 'ok',
          result: rslt
        });
    } catch (ex) {
      console.log(ex);
      res.status(500).json(
        {
          status: 'failed',
          result: {}
        });
    }
  }); //POST /new


module.exports = router;