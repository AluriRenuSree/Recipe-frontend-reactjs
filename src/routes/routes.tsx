
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom"
import React, { Suspense } from "react";
const RenderIndex = React.lazy(() => import("../Recipe/Index"));
const RenderRecipeList = React.lazy(() => import("../Recipe/RecipeList"));
const RecipeDetails = React.lazy(() => import("../Recipe/RecipeDetails"));

const Routing = () => {
    return (
            <Suspense>
                <Routes>
                    <Route path={'/'} element={<Navigate to='recipeform' />} />
                    <Route path={'/recipeform'} element={< RenderIndex/>} />
                    <Route path={'/receipe-list'} element={<RenderRecipeList />} />
                    <Route path={'recipe-details'} element={<RecipeDetails />} />

                </Routes>
            </Suspense>
    )
}
export default Routing;
