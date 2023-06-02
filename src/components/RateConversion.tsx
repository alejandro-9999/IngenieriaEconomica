import { Button, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

function RateConversion() {
  const [tasaNominal, setTasaNominal] = useState('');
  const [tasaEfectiva, setTasaEfectiva] = useState('');
  const [periodoNominal, setPeriodoNominal] = useState('');
  const [periodoEfectivo, setPeriodoEfectivo] = useState('');

  const convertirAEfectiva = () => {
    const tasa = parseFloat(tasaNominal);
    const periodoNom = parseInt(periodoNominal);
    const periodoEfec = parseInt(periodoEfectivo);
    const tasaEfec = Math.pow(1 + tasa / periodoNom, periodoNom / periodoEfec) - 1;
    setTasaEfectiva(tasaEfec.toFixed(4));
  };

  const convertirANominal = () => {
    const tasa = parseFloat(tasaEfectiva);
    const periodoNom = parseInt(periodoNominal);
    const periodoEfec = parseInt(periodoEfectivo);
    const tasaNom = (Math.pow(1 + tasa, periodoEfec / periodoNom) - 1) * periodoNom;
    setTasaNominal(tasaNom.toFixed(4));
  };

  return (
    <Grid container>
      <Typography variant="h2" gutterBottom>
        Conversión de tasas
      </Typography>
      <Grid container item spacing={2} alignItems="center">
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
          <TextField
            type="number"
            value={periodoNominal}
            onChange={(e) => setPeriodoNominal(e.target.value)}
          />
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
          <TextField
            type="number"
            value={periodoEfectivo}
            onChange={(e) => setPeriodoEfectivo(e.target.value)}
          />
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
