import Category from "./components/Store/Category";
import PDP from "./components/Store/PDP";
import CartPage from "./components/Store/CartPage";

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
    return (
        <ApolloProvider client={client}>
            <Routes>
                <Route path='/' element={<Category />} />
                <Route path='cart' element={<CartPage />} />
                <Route path='/product/:id' element={<PDP />} />
            </Routes>
        </ApolloProvider>
    );
}
export default App;
