import React, { Component } from 'react'

class ProductRow extends Component {
    constructor(props) {
        super(props)
        this.destroy = this.destroy.bind(this)
        this.edit = this.edit.bind(this)
    }

    destroy() {
        this.props.onDestroy(this.props.product.productid);
    }

    edit() {
        this.props.onEdit(this.props.product.productid);
    }

    render () {
        return (
            <tr>
                <td>{this.props.product.name}</td>
                <td>{this.props.product.category}</td>
                <td>{this.props.product.price}</td>
                <td> {this.props.product.instock ? "YES" : "NO"} </td>
                <td class="text-right"><button onClick={this.edit} class="btn btn-info">Edit</button></td>
                <td class="text-right"><button onClick={this.destroy} class="btn btn-info">Delete</button></td>
            </tr>
        )
    }
}

export default ProductRow