import { Divider, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Latex from 'react-latex-next';

function VFAanual() {

    const formula = `VP = A \\cdot \\left[  \\frac{(1 + i)^n - 1}{i} \\right]\\left( 1 + i \\right)`;



    const [principal, setPrincipal] = useState<number>(0);
    const [interestRate, setInterestRate] = useState<number>(0);
    const [compoundingPeriods, setCompoundingPeriods] = useState<number>(0);
    // const [timePeriod, setTimePeriod] = useState<number>(0);
    const [result, setResult] = useState<number>(0);
    const [out_formule, setOutForm] = useState<string>(formula);



    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        calculate();
    }

    const calculate = () => {
        const decimalInterestRate = interestRate / 100;
        const A = ((principal * (Math.pow(1 + decimalInterestRate, compoundingPeriods) - 1)) / decimalInterestRate)*(1 + decimalInterestRate);
        setResult(parseFloat(A.toFixed(2)));
    }


    const fomuleValidator = (value: any, symbol: string) => {
        if (isNaN(value) || value === 0 || value === "") return symbol;
        return `${value} `;
    }

    useEffect(() => {
      
        const new_formule = `${fomuleValidator(result,'VP')} = ${fomuleValidator(principal,'A')} \\cdot \\left[  \\frac{(1 + ${fomuleValidator(interestRate/100,'i')})^{${fomuleValidator(compoundingPeriods,'n')}} - 1}{${fomuleValidator(interestRate/100,'i')}} \\right]\\left( 1 + ${fomuleValidator(interestRate/100,'i')} \\right)`;

        setOutForm(new_formule);
    }, [compoundingPeriods, interestRate, principal, result, ]);



    useEffect(() => {
        const decimalInterestRate = interestRate / 100;

        const A = ((principal * (Math.pow(1 + decimalInterestRate, compoundingPeriods) - 1)) / decimalInterestRate)*(1 + decimalInterestRate);

        setResult(parseFloat(A.toFixed(2)));
    }, [compoundingPeriods, interestRate, principal]);



    const changeValues = (value: any, hook: any) => {
        if (isNaN(value)) hook(0);
        else {
            hook(value);
        }
    };


    return (
        <div>
            <Grid container alignItems="center" justifyContent="center">
                <Typography variant="h3" gutterBottom>
                    <Latex macros={{ "\\f": "#2f(#4)" }}>{`$${formula}$`}</Latex>
                </Typography>
            </Grid>
            <Grid container alignItems="center" justifyContent="center">
                <Typography variant="h3" gutterBottom>
                    <Latex macros={{ "\\f": "#2f(#4)" }}>{`$${out_formule}$`}</Latex>
                </Typography>
            </Grid>
            <Divider/>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} alignItems="center" justifyContent="center" mt={4}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            id="principal"
                            label="Monto(A)"
                            type="number"
                            value={principal}
                            onChange={(event) => changeValues(event.target.value, setPrincipal)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            id="interestRate"
                            label="Interes(i)"
                            type="number"
                            value={interestRate}
                            onChange={(event) => changeValues(event.target.value, setInterestRate)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            id="compoundingPeriods"
                            label="Periodos(n)"
                            type="number"
                            value={compoundingPeriods}
                            onChange={(event) => changeValues(event.target.value, setCompoundingPeriods)}
                            fullWidth
                        />
                    </Grid>
                    {/* <Grid item xs={12} md={6}>
                        <TextField
                            id="timePeriod"
                            label="Tiempo (Años t)"
                            type="number"
                            value={timePeriod}
                            onChange={(event) => changeValues(event.target.value, setTimePeriod)}
                            fullWidth
                        />
                    </Grid> */}
                </Grid>
            </form>           
        </div >
    );
}

export default VFAanual;
