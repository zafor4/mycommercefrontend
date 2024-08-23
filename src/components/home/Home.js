import { useState, useEffect } from 'react';
import Layout from '../Layout';
import Card from './Card';
import CheckBox from './Checkbox'
import { showError, showSuccess } from '../../utils/messages';
import { getCategories,getProducts,getProductDetails,getFilteredProducts } from '../api/ApiProduct'
import RadioBox from './RadioBox'
import { prices } from '../../utils/Prices'
import { isAuthenticated, userInfo } from '../../utils/auth';
import { addToCart } from '../api/ApiOrder';



const Home = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [limit, setLimit] = useState(30);
    const [skip, setSkip] = useState(0);
    const [order, setOrder] = useState('desc');
    const [sortBy, setSortBy] = useState('createdAt');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [filters, setFilters] = useState({
        category: [],
        price: []
    })

    useEffect(() => {
        getProducts(sortBy, order, limit)
            .then(response => setProducts(response.data))
            .catch(err => setError("Failed to load products!"));

        getCategories()
            .then(response => setCategories(response.data))
            .catch(err => setError("Failed to load categories!"));
    }, [])



    const handleAddToCart=product=>()=>{
        if (isAuthenticated()){
            setError(false)
            setSuccess(false)
            const user=userInfo();
            const cartItem={
                user:user._id,
                product:product._id,
                price:product.price
            }
            addToCart(user.token,cartItem)
            .then(response=>setSuccess(true))
            .catch(err=>{
                if(err.response) setError(err.response.data)
                    else setError('adding to cart failed')
            })
        }
        else {
            setSuccess(false)
            setError('Please Log in first')
        }
    }

    const handleFilters = (myfilters, filterBy) => {
        const newFilters = { ...filters };
        if (filterBy === 'category') {
            newFilters[filterBy] = myfilters
        }
        if (filterBy==='price'){
            const data=prices
            let arr=[]
            for (let i in data){
                if (data[i].id===parseInt(myfilters)){
                    arr=data[i].arr
                }
            }
            newFilters[filterBy]=arr
        }
        setFilters(newFilters);
        getFilteredProducts(skip, limit, newFilters, order, sortBy)
            .then(response => setProducts(response.data))
            .catch(err => setError("Failed to load products!"));
    }

    const showFilters = () => {
        return (
            <>
                <div className="row">
                    <div className="col-sm-3">
                        <h5>Filter By Categories:</h5>
                        <ul>
                            <CheckBox
                                categories={categories}
                                handleFilters={myfilters => handleFilters(myfilters, 'category')}
                            />
                        </ul>
                    </div>
                    <div className='col-sm-5'>
                        <h5>Filter By Price</h5>
                        <div className='row'>
                            <RadioBox prices={prices} handleFilters={myfilters=>handleFilters(myfilters,'price')}/>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <Layout title="Home Page" className="container-fluid">
            {showFilters()}
            <div style={{ width: "100%" }}>
                {showError(error, error)}
                {showSuccess(success, "Added to cart successfully!")}
            </div>
            <div className="row">
                {products && products.map(product => <Card product={product} key={product._id} handleAddToCart={handleAddToCart(product)}/>)}
            </div>
        </Layout>
    )
}

export default Home;