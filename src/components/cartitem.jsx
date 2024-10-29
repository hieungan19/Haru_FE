/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { ShopContext } from './shopcontext';
import React, { useContext, useState, useEffect } from 'react';
import { RiDeleteBack2Line } from 'react-icons/ri';
import '../styles/cartitems.scss';

const CartItem = (props) => {
  const [showDiv, setShowDiv] = useState(true);
  const {
    id,
    name,
    price,
    image,
    brand,
    user_id,
    quantity,
    inventory_quantity,
  } = props.data;
  const [quantity_state, setQuantity] = useState(quantity);
  const shopcontext = useContext(ShopContext);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    if (event.target.checked) {
      console.log('choose ', id);
      shopcontext.addToProductsChoosed(id, price, quantity_state);
    } else {
      console.log('not choose ', id);
      shopcontext.removeFromProductsChoosed(id, price, quantity_state);
    }
  };

  const handleIncreaseNumber = () => {
    const newQuantity = Number(quantity_state + 1);
    if (newQuantity <= inventory_quantity) {
      shopcontext.updateCartItemCount(Number(quantity_state + 1), id, user_id);
      setQuantity(quantity_state + 1);
    }
  };

  const handleDecreaseNumber = () => {
    const newQuantity = Number(quantity_state - 1);
    if (newQuantity > 0) {
      setQuantity(newQuantity);
      shopcontext.updateCartItemCount(Number(quantity_state - 1), id, user_id);
    }
  };

  const handleUpdateNumber = (e) => {
    const newQuantity = Number(e.target.value);
    if (newQuantity > 0 && newQuantity <= inventory_quantity) {
      setQuantity(newQuantity);
      shopcontext.updateCartItemCount(newQuantity, id, user_id);
    }
  };

  const handleRemoveToCart = () => {
    shopcontext.removeToCart(id, user_id);
    setShowDiv(false);
  };

  return (
    <>
      {showDiv && (
        <div className='container card my-3'>
          <div className='row g-3'>
            <div className='cart-container col-12 col-md-5'>
              <div className='p-3'>
                <div className='item-container'>
                  <div className='checkbox-container'>
                    <input
                      type='checkbox'
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                      className='checkbox'
                    />
                  </div>
                  <div className='cart-item-image m-auto'>
                    <img
                      src={image}
                      className='card-img-top img-fluid'
                      alt='...'
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='cart-container col-12 col-md-7 d-flex align-items-center justify-content-center'>
              <div className='p-3'>
                <h2>{name}</h2>
                <p className='cart-item-id'>
                  Thương hiệu: <b className='text-center mb-1'>{brand}</b>
                </p>
                <p className='cart-item-id'>
                  Giá bán: <b className='text-center mb-1'>{price} đ</b>
                </p>
                <p className='cart-item-id'>
                  Mã sản phẩm: <b className='text-center mb-3'>{id}</b>
                </p>
                <p className='cart-item-id'>
                  Lượng sản phẩm trong kho:{' '}
                  <b className='text-danger'>{inventory_quantity}</b>
                </p>

                <div className='p-3 d-flex justify-content-between align-items-center'>
                  <div className='count-handler'>
                    <button
                      className='btn btn-outline-secondary'
                      onClick={handleDecreaseNumber}
                    >
                      -
                    </button>
                    <input
                      className='text-danger fs-4 form-control'
                      type='number'
                      min='1'
                      value={quantity_state}
                      onChange={handleUpdateNumber}
                      style={{ width: '100px' }}
                    />
                    <button
                      className='btn btn-outline-secondary'
                      onClick={handleIncreaseNumber}
                    >
                      +
                    </button>
                  </div>
                  <div className='btn-cart'>
                    <button
                      className='btn btn-outline-danger '
                      onClick={handleRemoveToCart}
                    >
                      <RiDeleteBack2Line />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartItem;
