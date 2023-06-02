import { Button, FormControlLabel, Grid, Switch, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import React, { useState } from 'react';

interface FormValues {
    futureValue: number;
    interestRate: number;
    time: number;
    periods: number;
}

interface CapitalizationTable {
    period: number,
    balance: number,
    interest: number,
    payment: number,
    increment: number
}

const AmortizationView: React.FC = () => {

    const [anticipada, setAnticipada] = useState(false);

    const [formValues, setFormValues] = useState<FormValues>({
        futureValue: 0,
        interestRate: 0,
        time: 0,
        periods: 0,
    });
    const [CapitalizationTable, setCapitalizationTable] = useState<CapitalizationTable[]>([]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: parseFloat(value) });
    };

    const calculateCapitalizationTable = () => {
        const { futureValue, interestRate, time, periods } = formValues;
        const n = periods > 0 ? periods : time * 12;
        const r = time > 0 ? (interestRate / 100) / 12 : (interestRate / 100);

        let payment = (futureValue * r) / (Math.pow(1 + r, n) - 1);

        if (anticipada) {
            payment = (futureValue * r) / ((Math.pow(1 + r, n) - 1) * (1 + r));
        }


        let balance = 0;
        const table: CapitalizationTable[] = [];

        for (let i = 1; i <= n; i++) {
            const interest = balance * r;
            const increment = interest  + payment;


            balance += increment;

            table.push({
                period: i,
                balance,
                interest,
                payment,
                increment
            });
        }


        
        setCapitalizationTable(table);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnticipada(event.target.checked);
    };


    return (
        <div>
            <h1>Capitalizacion</h1>
            <form>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={anticipada}
                                    onChange={handleChange}
                                    name="anticipada"
                                    inputProps={{ 'aria-label': 'Anticipada' }}
                                />}
                            label="Anticipada"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Valor Futuro"
                            type="number"
                            name="futureValue"
                            value={formValues.futureValue}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Interes"
                            type="number"
                            name="interestRate"
                            value={formValues.interestRate}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField label="Años" type="number" name="time" value={formValues.time} onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={4}>

                        <TextField label="Periodos" type="number" name="periods" value={formValues.periods} onChange={handleInputChange} />
                    </Grid>
                 
                </Grid>
                <Grid mt={2}>
                        <Button variant="contained" color="primary" onClick={calculateCapitalizationTable}>
                            Calcular
                        </Button>
                    </Grid>
            </form>
            {CapitalizationTable.length > 0 && (
                <div>
                    <h2>Cuota: {CapitalizationTable[0].payment.toFixed(2)}</h2>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Periodo</TableCell>
                                <TableCell>Saldo</TableCell>
                                <TableCell>Interes</TableCell>
                                <TableCell>Cuota</TableCell>
                                <TableCell>Incremento</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {CapitalizationTable.map((row) => (
                                <TableRow key={row.period}>
                                    <TableCell>{row.period}</TableCell>
                                    <TableCell>{row.balance.toFixed(2)}</TableCell>
                                    <TableCell>{row.interest.toFixed(2)}</TableCell>
                                    <TableCell>{row.payment.toFixed(2)}</TableCell>
                                    <TableCell>{row.increment.toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
};

export default AmortizationView;
