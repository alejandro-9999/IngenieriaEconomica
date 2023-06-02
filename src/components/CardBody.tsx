import { useState } from "react";
import { Card, CardContent, FormControl, Grid, MenuItem, Select, Typography } from "@mui/material";
import RateConversion from "./RateConversion";
import CompoundInterest from "./CompoundInterest";
import AmortizationView from "./MortgageCalculator";
import CapitalizationCalculator from "./CapitalizationCalculator";
import SimpleInterest from "./SimpleInterest";
import VPVanual from "./VPVanual";
import VFVanual from "./VFVanual";
import VPAanual from "./VPAanual";
import VFAanual from "./VFAanual";

const CardBody = () => {
    const options = [
        { option: 'Conversión de tasas', component: <RateConversion /> },
        { option: 'Interés Simple', component: <SimpleInterest /> },
        { option: 'Interés compuesto', component: <CompoundInterest /> },
        { option: 'Amortizacion', component: <AmortizationView /> },
        { option: 'Capitalizacion', component: <CapitalizationCalculator />},
        { option: 'Anualidad Vencida - Valor Presente', component: <VPVanual />},
        { option: 'Anualidad Vencida - Valor Futuro', component: <VFVanual />},
        { option: 'Anualidad Anticipada - Valor Presente', component: <VPAanual />},
        { option: 'Anualidad Anticipada - Valor Futuro', component: <VFAanual />},


    ];
    const [option, setOption] = useState(options[0].option);

    const changeOption = (e: any) => {
        setOption(e.target.value);
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">OPERACIONES</Typography>
                        <FormControl fullWidth>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={option}
                                onChange={changeOption}
                            >
                                {options.map((element, index) => (
                                    <MenuItem key={index} value={element.option}>{element.option}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={9}>
                <Card>
                    <CardContent>
                        {options.map(
                            (element) =>
                                element.option === option && <div key={element.option}>{element.component}</div>
                        )}
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default CardBody;
