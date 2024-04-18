import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Pagination,Tooltip } from '@mui/material';
import axios from 'axios';
import './index.css';
import {useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const RenderRecipeList = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const recipesPerPage = 10; 
    const navigate = useNavigate()

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('http://localhost:8080/getRecipeList')
            .then((response) => {
                console.log("res", response);
                setData(response?.data?.data);
            })
            .catch((error) => {
                console.log("error submit", error);
            });
    };

    const getCurrentRecipes = () => {
        const startIndex = (page - 1) * recipesPerPage;
        const endIndex = startIndex + recipesPerPage;
        return data.slice(startIndex, endIndex);
    };

    const handlePageChange = (event:any, value:any) => {
        setPage(value);
    };

    const handleRecipeClick = (recipeName:string) => {
        navigate('/recipe-details',{state:recipeName})
        
    };

    return (
        <div className="recipe-list">
            {loading && <CircularProgress style={{ marginTop: '10px' }} />}
        <Grid container spacing={3}>
            {getCurrentRecipes().map((recipe:any) => (
                <Grid item key={recipe?.id} xs={12} sm={6} md={4} lg={3} >
                    <Card className="recipe-card" onClick={() => handleRecipeClick(recipe?.name)}>
                        <img src="http://farm8.staticflickr.com/7161/6707502479_0c4744e812_b.jpg" alt={recipe?.name} className="recipe-image" />
                        <CardContent>
                        <Tooltip title={recipe.name} arrow>
                            <Typography variant="h6" component="h2" className="recipe-title">
                                {`${recipe?.name?.slice(0,20)}...`}
                            </Typography>
                            </Tooltip>
                            
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
        <div className="pagination-container">
             <Pagination
                count={Math.ceil(data.length / recipesPerPage)}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
                className="pagination"
            />
            </div>
    </div>
    );
};

export default RenderRecipeList;

