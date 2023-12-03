import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import { calculate, toastError, toastPromise } from '../../GlobalFunctions';
import '../../assets/css/popup.css'

export default function DiscountCalculator({ open, setOpen }) {
  const closeModal = () => setOpen(false);
  const [originalprice, setOriginalPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [calculated, setCalculated] = useState(null);
    

  return (
    <div>
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <h1>Discount Calculator</h1>
        {/* labels for Original Price and Discount */}
        <label for='originalPrice'>Original Price</label>
        <input type='number' id='originalPrice' placeholder='Original Price' value={originalprice} onChange={e => setOriginalPrice(e.target.value)}></input>
        <label for='discount'>Discount</label>
        <input type='number' id='discount' placeholder='Discount' value={discount} onChange={e => setDiscount(e.target.value)}></input>
        <button onClick={() =>
            toastPromise(new Promise(async (resolve, reject) => {
                if (originalprice === 0 || discount === 0) {
                    reject('Please enter a valid price and discount');
                } else {
                    // call calculate func
                    let num = await calculate(originalprice, discount);
                    console.log(num);
                    setCalculated(num);
                    resolve();
                }
            }), 'Discount calculated!')
        }>
            Calculate
        </button>
        {calculated && (
            <p>You would save {calculated}%! 🥳</p>
        )}
      </Popup>
    </div>
  );
};