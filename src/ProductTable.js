import React, { Component } from 'react'
import ProductRow from './ProductRow'

class ProductTable extends Component {
    constructor(props) {
        super(props)
        this.handleDestroy = this.handleDestroy.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
    }

    handleDestroy(id) {
        this.props.onDestroy(id)
    }

    handleEdit(id) {
        this.props.onEdit(id)
    }
    
    render () {
        let productsArray = Object.keys(this.props.products).map((pid) => this.props.products[pid])
        let rows = []

        console.log(productsArray);

        productsArray.forEach((product) => {
            if (product.name.indexOf(this.props.filterText) === -1) {
                return
            }
            rows.push (
                <ProductRow 
                    product={product} 
                    key={product.productid}
                    onEdit={this.handleEdit}
                    onDestroy={this.handleDestroy}></ProductRow>
            )
        })

        return (
            <div>
                <table class="table table-striped table-sm">
                    <thead class="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>In Stock</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ProductTable