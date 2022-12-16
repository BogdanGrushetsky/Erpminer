import React, { useState } from 'react';

import './table.scss';
import data from "./../../data.json";
import Input from '../Input/Input';

type Props = {}

interface ISearchFilter {
  customer_code: string,
  customer_name: string,
  invoice_number: string,
  amount: string
}

const Table = (props: Props) => {
  const TABLE_VIEW = 0;
  const TABLE_SET_CRITERIA = 1;

  const defaultSearchFilter = {
    customer_code: '',
    customer_name: '',
    invoice_number: '',
    amount: ''
  };

  const [ typeTable, setTypeTable ] = useState<number>(TABLE_VIEW);
  const [ searchFilter, setSearchFilter ] = useState<ISearchFilter>(defaultSearchFilter);

  const [activeData, setActiveData] = useState(data);

  const filterData = (el1: string, el2: string) => {
    return el1.toUpperCase().indexOf(el2.toUpperCase()) > -1
  }

  const filteredData = data.filter(el => 
    filterData(el.customer_code, searchFilter.customer_code)
    &&
    filterData(el.customer_name, searchFilter.customer_name)
    &&
    filterData(el.invoice_number, searchFilter.invoice_number)
    &&
    filterData(el.amount, searchFilter.amount)
    );

  const checkTypeTable = () => {
    if(typeTable === TABLE_VIEW) {
      setTypeTable(TABLE_SET_CRITERIA)
    }
    if(typeTable === TABLE_SET_CRITERIA) {
      if(JSON.stringify(activeData) === JSON.stringify(filteredData)) {
        setTypeTable(TABLE_VIEW)
      } else {
        setActiveData(filteredData);
      }
    }
  }

  const rmFilter = () => {
    setActiveData(data);
    setSearchFilter(defaultSearchFilter);
  }

  return (
    <div className="table">
          <div className={typeTable === TABLE_VIEW ? 'table_btn' : 'table_btn table_btn_active'} onClick={checkTypeTable}>Search</div>
        {
          typeTable === TABLE_VIEW && 
            <div className="table_header">
            <div>Customer Code</div>
            <div>Customer Name</div>
            <div>Invoice Number</div>
            <div>Amount</div>
            </div>
        }
        {
          typeTable === TABLE_SET_CRITERIA &&
          <div className="table_header">
          <Input type='Customer Code' value={searchFilter.customer_code} changeValue={(e: string) => {setSearchFilter({...searchFilter, customer_code: e})}}/>
          <Input type="Customer Name" value={searchFilter.customer_name} changeValue={(e: string) => {setSearchFilter({...searchFilter,customer_name: e})}}/>
          <Input type="Invoice Number" value={searchFilter.invoice_number} changeValue={(e: string) => {setSearchFilter({...searchFilter, invoice_number: e})}}/>
          <Input type="Amount" value={searchFilter.amount} changeValue={(e: string) => {setSearchFilter({...searchFilter, amount: e})}}/>
          </div>
        }
        {
        activeData.map(el => 
        <div className='table_row' key={el.id}>
          <div>{el.customer_code}</div>
          <div>{el.customer_name}</div>
          <div>{el.invoice_number}</div>
          <div>{el.amount}</div>
        </div>)
        }
          {
            typeTable === TABLE_SET_CRITERIA &&
            <div className='table_btn table_btn_bottom' onClick={rmFilter}>Clear filter</div>
          }

    </div>
  )
}

export default Table