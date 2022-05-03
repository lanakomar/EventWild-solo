import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import EventForm from "./components/EventForm";
import EventPage from "./components/EventPage";

function App() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
        <>
            <Navigation isLoaded={isLoaded} />
            <Switch>
                <Route exact path="/">
                    <HomePage />
                </Route>
                <Route path="/events/new">
                    <EventForm />
                </Route>
                <Route path="/events/:eventId">
                    <EventPage />
                </Route>
            </Switch>
            <Footer />
        </>
    );
}

export default App;
