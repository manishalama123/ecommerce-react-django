import React from 'react'
import { useLocation } from 'react-router-dom'
const EsewaForm = () => {
    const location = useLocation();
    console.log(location);
    const esewaData = location?.state?.esewaData
    if(!esewaData) return <p>No esewa data</p>
  return (
    <div>
      <form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" className='my-30' method="POST">
        <input type="text" id="amount" name="amount" value={esewaData.amount} required/>
        <input type="text" id="tax_amount" name="tax_amount" value={esewaData.tax_amount} required/>
        <input type="text" id="total_amount" name="total_amount" value={esewaData.total_amount} required/>
        <input type="text" id="transaction_uuid" name="transaction_uuid" value={esewaData.transaction_uuid} required/>
        <input type="text" id="product_code" name="product_code" value ="EPAYTEST" required/>
        <input type="text" id="product_service_charge" name="product_service_charge" value={esewaData.product_service_charge} required/>
        <input type="text" id="product_delivery_charge" name="product_delivery_charge" value={esewaData.product_delivery_charge} required/>
        <input type="text" id="success_url" name="success_url" value="https://developer.esewa.com.np/success" required/>
        <input type="text" id="failure_url" name="failure_url" value="https://developer.esewa.com.np/failure" required/>
        <input type="text" id="signed_field_names" name="signed_field_names" value="total_amount,transaction_uuid,product_code" required/>
        <input type="text" id="signature" name="signature" value={esewaData.signature} required/>
        <input value="Submit" type="submit"/>
    </form>
    </div>
  )
}

export default EsewaForm
