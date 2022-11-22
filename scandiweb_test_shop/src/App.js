import Category from "./components/Store/Category";
import PDP from "./components/Store/PDP";
import CartPage from "./components/Store/CartPage";
import Header from "./components/Layout/Header";

import { useState } from "react";

import { Routes, Route, Router } from "react-router-dom";

import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from "@apollo/client";
import { ErrorLink, onError } from "@apollo/client/link/error";
import { GraphQLError } from "graphql";

const errorLink = onError(({ graphqlErrors, networkError }) => {
    if (graphqlErrors) {
        graphqlErrors.map(({ message, location, path }) => {
            alert(`Graphql error ${message}`);
        });
    }
});
const link = from([errorLink, new HttpLink({ uri: "http://localhost:4000" })]);

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
});

function App() {
    const [selected, setSelected] = useState("USD");
    // const [cartItems, setCartItems] = useState([productSelection1, productSelection2]);

    const [activeCategory, setActiveCategory] = useState("all");

    const [cartItems, setCartItems] = useState([]);

    return (
        <>
            <ApolloProvider client={client}>
                <Header selected={selected} setSelected={setSelected} setActiveCategory={setActiveCategory} />
                <Routes>
                    <Route path='/' element={<Category selected={selected} setSelected={setSelected} activeCategory={activeCategory} />} />
                    <Route
                        path='/product/:id'
                        element={<PDP setCartItems={setCartItems} cartItems={cartItems} selected={selected} setSelected={setSelected} />}
                    />
                    <Route path='/cart' element={<CartPage cartItems={cartItems} />} />
                </Routes>
            </ApolloProvider>
        </>
    );
}
export default App;
