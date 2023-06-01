import { useState } from "react";
import { Card, CardContent, FormControl, Grid,  MenuItem, Select, Typography } from "@mui/material";
import RateConversion from "./RateConversion";


const CardBody = () => {

    const options = [
        { option: 'Conversión de tasas', component: <RateConversion/> }
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
                      
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default CardBody;