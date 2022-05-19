//Total Function
export const getTotalPage = (total, pageSize) => {
  var page = 1;
  while (total > pageSize) {
    total -= pageSize;
    page++;
  }
  return page;
};

//For adding additional
export const handleAddPage = (total, setTotal, getPage) => {
  var newTotal = total + 1;
  setTotal(newTotal);
  getPage()
}

//For deleting additional
export const handleDeletePage = (total, setTotal, currentPage, setCurrentPage, pageSize, listState, getPage) => {
  var newTotal = total - 1
  var page = getTotalPage(total, pageSize)
  setTotal(newTotal);


  if (listState.length == 1 && total > 1) {
    setCurrentPage(currentPage - 1);
  }

  if (page > 1) {
    getPage()
  }
}

//For deleting multiple
export const handleDeletePages = () => {
  var length = ListState.length;
  var deleteLength = ArrayID.length; // Arrays of id to delete
  var newTotal = total - deleteLength;
  setTotal(newTotal);
  // setGivenSelectedRowKeys(0); tba dis is for checkbox

  if (length == deleteLength && total > 1) {
    var newPage = currentPage;

    if (newPage == 1) {
      //insert funtion for getting page
    }

    if (newPage > 1) {
      setCurrentPage(newPage - 1);
    }
  }
}

//Onchange
export const handlePageSizeChange = (size) => {
  //set state list to []
  setPageSize(size)
}

export const handleTableChange = (pagination, filters, sorter) => {
  var sorter = {
    field: sorter.field,
    order: sorter.order
  }

  if (sorter.order != null) {
    setSupplyGivenList([])
    setTableScreen({ sorter })
  }

  if (sorter.order == null) {
    setTableScreen({})
  }

}

export const handlePageChange = async (page, setCurrentPage) => {
  if (page != null) {
    setCurrentPage(page);
  }
}
