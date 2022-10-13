import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

function Users(props) {

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Showing { from } to { to } of { size } Results
    </span>
  );

  const columns = [{
    dataField: 'loginId',
    text: 'Login ID'
  }, {
    dataField: 'firstName',
    text: 'First Name'
  }, {
    dataField: 'lastName',
    text: 'LastName'
  }, {
    dataField: 'email',
    text: 'Email ID'
  }, {
    dataField: 'contactNumber',
    text: 'Contact Number'
  }];
  
  const options = {
    paginationSize: 4,
    pageStartIndex: 0,
    firstPageText: 'First',
    prePageText: 'Back',
    nextPageText: 'Next',
    lastPageText: 'Last',
    nextPageTitle: 'First page',
    prePageTitle: 'Pre page',
    firstPageTitle: 'Next page',
    lastPageTitle: 'Last page',
    showTotal: true,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    sizePerPageList: [{
      text: '5', value: 5
    }, {
      text: '10', value: 10
    }, {
      text: 'All', value: props.usersList && props.usersList.length
    }]
  };

  return (
    <div class="container"> 
<BootstrapTable keyField='id' data={ props.usersList } columns={ columns } pagination={ paginationFactory(options) } />
    </div>
  );
}

export default Users