import { Button, FormControlLabel, Grid, Switch, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import React, { useState } from 'react';

interface FormValues {
    presentValue: number;
    interestRate: number;
    time: number;
    periods: number;
}

interface AmortizationTable {
    period: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
}

const AmortizationView: React.FC = () => {

    const [anticipada, setAnticipada] = useState(false);

    const [formValues, setFormValues] = useState<FormValues>({
        presentValue: 0,
        interestRate: 0,
        time: 0,
        periods: 0,
    });
    const [amortizationTable, setAmortizationTable] = useState<AmortizationTable[]>([]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: parseFloat(value) });
    };

    const calculateAmortizationTable = () => {
        const { presentValue, interestRate, time, periods } = formValues;
        const n = periods > 0 ? periods : time * 12;
        const r = time > 0 ? (interestRate / 100) / 12 : (interestRate / 100);

        let payment = (presentValue * r) / (1 - Math.pow(1 + r, -n));

        if (anticipada) {
            payment = (presentValue * r) / ((1 - Math.pow(1 + r, -n)) * (1 + r));
        }


        let balance = presentValue;
        const table: AmortizationTable[] = [];



        if (anticipada) {
            balance -= payment;

            table.push({
                period: 0,
                payment: payment,
                principal: payment,
                interest: 0,
                balance: balance,
            });

            for (let i = 1; i <= n - 1; i++) {
                const interest = balance * r;
                const principal = payment - interest;
                balance -= principal;
                table.push({
                    period: i,
                    payment,
                    principal,
                    interest,
                    balance,
                });
            }
        } else {
            for (let i = 1; i <= n; i++) {
                const interest = balance * r;
                const principal = payment - interest;
                balance -= principal;
                table.push({
                    period: i,
                    payment,
                    principal,
                    interest,
                    balance,
                });
            }
        }



        setAmortizationTable(table);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnticipada(event.target.checked);
    };


    return (
        <div>
            <h1>Amortizacion</h1>
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
                            label="Valor Presente"
                            type="number"
                            name="presentValue"
                            value={formValues.presentValue}
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
                        <Button variant="contained" color="primary" onClick={calculateAmortizationTable}>
                            Calcular
                        </Button>
                    </Grid>
            </form>
            {amortizationTable.length > 0 && (
                <div>
                    <h2>Cuota: {amortizationTable[0].payment.toFixed(2)}</h2>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Periodo</TableCell>
                                <TableCell>Saldo</TableCell>
                                <TableCell>Interes</TableCell>
                                <TableCell>Cuota</TableCell>
                                <TableCell>Amortizacion</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {amortizationTable.map((row) => (
                                <TableRow key={row.period}>
                                    <TableCell>{row.period}</TableCell>
                                    <TableCell>{row.balance.toFixed(2)}</TableCell>
                                    <TableCell>{row.interest.toFixed(2)}</TableCell>
                                    <TableCell>{row.payment.toFixed(2)}</TableCell>
                                    <TableCell>{row.principal.toFixed(2)}</TableCell>
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
