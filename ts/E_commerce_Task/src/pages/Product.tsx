import React, { useEffect } from 'react';
import '../styles/product.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/features/productSlice';
import { addToCart } from '../redux/features/cartSlice';
import { useAuth } from '../context/AuthContext';
import { AppDispatch, RootState } from '../redux/app/store';
import { ProductType } from '../types/product';


// ✅ Component
const Product: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { user } = useAuth();

    // ✅ Typed selector
    const { data: product, loading ,error} = useSelector(
        (state: RootState) => state.products
    );

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // ✅ Typed function
    const addToCartHandler = (product: ProductType) => {
        if (!user) {
            alert("Please login first");
            return;
        }

        dispatch(
            addToCart({
                productId: product.id,
                userId: user?.id,
            })
        );

        alert("Added to cart ✅");
    };

    if (loading) return <h2>Loading...</h2>;
    if (error) return <h2>Error: {error}</h2>;

    return (
        <>
            <div className="products-container">
                {product.map((pro) => (
                    <div className="product" key={pro.id}>

                        <div className="product-header">
                            <h1>{pro.title}</h1>
                        </div>

                        <div className="product-body">
                            <img src={pro.image || "https://via.placeholder.com/150"} alt={pro.title} />

                            <div className="product-body-content">
                                <h4>Cate : {pro.category}</h4>
                                <h4> ${pro.price}</h4>
                                <p>{pro.description}</p>
                            </div>
                        </div>

                        <div className="product-footer">
                            <div className="action-buttons">
                                <button>Edit</button>
                                <button>Delete</button>
                                <button>Read</button>
                                <button onClick={() => addToCartHandler(pro)}>
                                    AddToCart
                                </button>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </>
    );
};

export default Product;