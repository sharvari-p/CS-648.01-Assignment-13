import React, { Component } from 'react'
import Filters from './Filters'
import ProductTable from './ProductTable'
import ProductForm from './ProductForm'

//let PRODUCTS = {};

class Products extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filterText: '',
            products: {},
            formData: null
        }
        this.handleFilter = this.handleFilter.bind(this)
        this.handleDestroy = this.handleDestroy.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
    }

    componentDidMount() {
        fetch('http://localhost:3000/products/get')
        .then(response => response.json())
        .then(json => this.setState({products: json}))
        .catch(error => console.log(error))
    }

    handleFilter(filterInput) {
        this.setState(filterInput)
    }

    handleSave(product) {
        if (!product.productid) {
            product.productid = new Date().getTime()
            fetch('http://localhost:3000/products/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            })
            .then(() => {
                this.setState((prevState) => {
                    let products = prevState.products
                    products[product.productid] = product
                    return { products }
                })
            })
            .catch(error => console.log(error))
        }
        else {
            fetch(`http://localhost:3000/products/update/${product.productid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            })
            .then(() => {
                this.setState((prevState) => {
                    let products = prevState.products
                    const pId = Object.entries(products).find(([key, prod]) => prod.productid === product.productid)[0]
                    products[pId] = product
                    let formData = prevState.formData
                    formData = null
                    return { products, formData }
                })
            })
            .catch(error => console.log(error))
        }
    }

    handleDestroy(productId) {
        //window.console.log('In handle destroy ' + productId)
        fetch(`http://localhost:3000/products/delete/${productId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: productId})
        })
        .then(() => {
            this.setState((prevState) => {
                let products = prevState.products
                delete products[productId]
                return { products }
            });
        })
        .catch(error => console.log(error))
    }

    handleEdit(productId) {
        this.setState({
            formData: this.state.products[productId]
        });
    }

    render () {
        return (
            <div>
                <h1>My Inventory</h1>
                <Filters 
                    onFilter={this.handleFilter}></Filters>
                <ProductTable 
                    products={this.state.products}
                    filterText={this.state.filterText}
                    onEdit={this.handleEdit}
                    onDestroy={this.handleDestroy}></ProductTable>
                <ProductForm
                    key={JSON.stringify(this.state.formData)} formInput={this.state.formData} onSave={this.handleSave}></ProductForm>
            </div>
        )
    }
}

export default Products