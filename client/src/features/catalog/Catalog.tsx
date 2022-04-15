import { useEffect } from "react";
import { useDispatch } from "react-redux";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";
import ProductList from "./ProductList";


export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll);
    const { productsLoaded, status } = useAppSelector(state => state.catalog);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch]);

    if (status.includes('pending')) return <LoadingComponent message="Loading products..." />

    return (
        <>
            <ProductList products={products} />
        </>
    )
}