import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Activate } from "../pages/activate";
import { Home } from "../pages/home";
import { TeamPage } from "../pages/team";
import { ReviewSection } from "../pages/review";



const Router = () => {
    return (<BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/activate" element={<Activate />}> </Route>
            <Route exact path="/team" element={<TeamPage />}> </Route> 
            <Route exact path="/review" element={<ReviewSection />}> </Route> 
        </Routes>
    </BrowserRouter>);
}
    ;
export default Router;