import { Button, Divider, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

function RateConversion() {
  const [tasaNominal, setTasaNominal] = useState('');
  const [tasaEfectiva, setTasaEfectiva] = useState('');
  const [periodoNominal, setPeriodoNominal] = useState('12');
  const [periodoEfectivo, setPeriodoEfectivo] = useState('12');

  const convertirAEfectiva = () => {
    console.log(tasaNominal, periodoNominal, periodoEfectivo);


    const tasa = parseFloat(tasaNominal);
    const periodoNom = parseInt(periodoNominal);
    const periodoEfec = parseInt(periodoEfectivo);
    const conversion_efectiva = (tasa / 100) / periodoNom;
    const tasaEfec = (Math.pow(1 + conversion_efectiva, periodoNom / periodoEfec) - 1) * 100;
    setTasaEfectiva(tasaEfec.toFixed(4));
  };

  const convertirANominal = () => {
    const tasa = parseFloat(tasaEfectiva);
    const periodoNom = parseInt(periodoNominal);
    const periodoEfec = parseInt(periodoEfectivo);
    const tasaNom = ((Math.pow(1 + (tasa / 100), periodoEfec / periodoNom) - 1) * periodoNom) * 100;
    setTasaNominal(tasaNom.toFixed(4));
  };

  return (
    <Grid container>
      <Typography variant="h2" gutterBottom>
        Conversión de tasas
      </Typography>
      <Grid spacing={2}>
        <Grid container item spacing={2} mb={2} alignItems="center">
          <Grid item>
            <Typography>Tasa nominal:</Typography>
          </Grid>
          <Grid item>
            <TextField
              type="number"
              value={tasaNominal}
              onChange={(e) => setTasaNominal(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Typography>Periodo nominal:</Typography>
          </Grid>
          <Grid item>
            {/* <TextField
              type="number"
              value={periodoNominal}
              onChange={(e) => setPeriodoNominal(e.target.value)}
            /> */}


            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={periodoNominal}
              label="Age"
              onChange={(e) => setPeriodoNominal(e.target.value)}
            >
              <MenuItem value={12}>Mensual</MenuItem>
              <MenuItem value={6}>Bimestral</MenuItem>
              <MenuItem value={4}>Trimestral</MenuItem>
              <MenuItem value={3}>Cuatrimestral</MenuItem>
              <MenuItem value={2}>Semestral</MenuItem>
              <MenuItem value={1}>Anual</MenuItem>
            </Select>
          </Grid>
        </Grid>

        <Grid container item spacing={2} alignItems="center">
          <Grid item>
            <Typography>Tasa efectiva:</Typography>
          </Grid>
          <Grid item>
            <TextField
              type="number"
              value={tasaEfectiva}
              onChange={(e) => setTasaEfectiva(e.target.value)}
            />

          </Grid>
          <Grid item>
            <Typography>Periodo efectivo:</Typography>
          </Grid>
          <Grid item>
            {/* <TextField
            type="number"
            value={periodoEfectivo}
            onChange={(e) => setPeriodoEfectivo(e.target.value)}
          /> */}
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={periodoEfectivo}
              label="Age"
              onChange={(e) => setPeriodoEfectivo(e.target.value)}
            >
              <MenuItem value={12}>Mensual</MenuItem>
              <MenuItem value={6}>Bimestral</MenuItem>
              <MenuItem value={4}>Trimestral</MenuItem>
              <MenuItem value={3}>Cuatrimestral</MenuItem>
              <MenuItem value={2}>Semestral</MenuItem>
              <MenuItem value={1}>Anual</MenuItem>
            </Select>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item spacing={2} alignItems="center" mt={2}>
        <Grid item>
          <Button variant="contained" onClick={convertirAEfectiva}>
            Convertir a tasa efectiva
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={convertirANominal}>
            Convertir a tasa nominal
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default RateConversion;
