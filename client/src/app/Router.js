import {
    BrowserRouter, 
    Switch,
    Route
} from 'react-router-dom';

import {
    HomePage,
    CommentPage
} from './pages';

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route 
                    path="/"
                    component={HomePage}
                    exact
                />
                <Route 
                    path="/comment"
                    component={CommentPage}
                    exact
                />
            </Switch>
        </BrowserRouter>
    );
};

export default Router;