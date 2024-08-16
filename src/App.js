import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Fragment } from 'react';

import { publicPage } from '~/routes';
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';

function App() {
    const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated);
    //   return isAuthenticated ? children : <Navigate to="/login" />;

    console.log(isAuthenticated);

    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    {publicPage.map((item, index) => {
                        const Page = item.component;
                        let Layout = DefaultLayout;
                        if (item.layout) {
                            Layout = item.layout;
                        } else if (item.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={item.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
