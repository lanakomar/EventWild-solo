import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {Redirect, Route, Switch } from "react-router-dom";

import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import EventForm from "./components/EventForm";
import EventPage from "./components/EventPage";
import PageNotFound from "./components/PageNotFound";
import MyTicketsPage from "./components/MyTicketsPage";
import MyEventsPage from "./components/MyEventsPage";
import { getEvents } from './store/event';


function App() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    useEffect(() => {
        dispatch(getEvents());
    }, [dispatch]);

    return (
        <>
            <Navigation isLoaded={isLoaded} />
            <Switch>
                <Route path={["/", "/events"]} exact>
                    <HomePage />
                </Route>
                <Route exact path="/events/new">
                    <EventForm />
                </Route>
                <Route exact path="/events/:eventId">
                    <EventPage />
                </Route>
                <Route path="/:userId/events">
                    <MyEventsPage />
                </Route>
                <Route path="/:userId/tickets">
                    <MyTicketsPage />
                </Route>
                <Route path="/404" component={PageNotFound} />
                <Redirect to="/404" />
            </Switch>
            <Footer />
        </>
    );
}

export default App;
