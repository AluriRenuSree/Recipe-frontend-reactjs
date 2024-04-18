import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { Grid, Typography, Paper, Button, List, ListItem, ListItemText, Box } from '@mui/material';
import './index.css';

const RecipeDetails = () => {
    const location = useLocation();
    console.log("location", location)
    const recipeName = location.state;
    const [data, setData] = useState<any>([]);
    const [showDetail, setShowDetail] = useState(false);
   const[error,setError]=useState(false);
    const toggleDetail = () => {
        setShowDetail(!showDetail);
    };
    useEffect(() => {
        axios.post('http://localhost:8080/getRecipeDetails', { recipeName })
            .then(response => {
                console.log('API response:', response);
                setData(response?.data?.data)
            })
            .catch(error => {
                setError(true);
                console.error('Error while making API call:', error);
            });
    }, [])
    return (
        <>
        {loading && <CircularProgress style={{ marginTop: '10px' }} />}
            <Grid container spacing={3}>
                {data?.length > 0 && data?.map((value: any) => {
                    console.log("val", value)
                    return (
                        value?.name ? (<>
                            <Grid item xs={12}>
                                <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
                                    <Box className="title">
                                        {value?.name}
                                    </Box>
                                    {!showDetail && (
                                        <Button onClick={toggleDetail} variant="contained" color="primary">
                                            Show Details
                                        </Button>
                                    )}
                                    {showDetail && (
                                        <div>
                                            <Typography variant="h5" gutterBottom>
                                                Ingredients:
                            </Typography>
                                            <List>
                                                {value?.ingredients?.map((ingredient: any, index: number) => (
                                                    <ListItem key={index}>
                                                        <ListItemText primary={ingredient} />
                                                    </ListItem>
                                                ))}
                                            </List>
                                            <Typography variant="h5" gutterBottom>
                                                Instructions:
                            </Typography>
                                            <ol>
                                                {value?.instructions?.map((instruction: any, index: number) => (
                                                    <li key={index}>{instruction}</li>
                                                ))}
                                            </ol>
                                            <Button onClick={toggleDetail} variant="contained" color="primary">
                                                Hide Details
                            </Button>
                                        </div>
                                    )}
                                </Paper>
                            </Grid>
                        </>) : <></>
                    )
                })}
            </Grid>
{error ?(
 <Grid
 container
 justifyContent="center"
 alignItems="center"
 style={{ height: '100vh' }}
>
 <Grid item>
     <Typography variant="h5" align="center">
         No Data Found
     </Typography>
 </Grid>
</Grid>
)
:<>  </>}
</>
    )
}
export default RecipeDetails;