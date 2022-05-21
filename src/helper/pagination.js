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
export const handleDeletePages = (arrayIdList, total, setTotal, pageSize, currentPage, setCurrentPage, listState, getPage) => {
  var length = listState.length;
  var deleteLength = arrayIdList.length; // Arrays of id to delete
  var lastPage = getTotalPage(total, pageSize)
  var newTotal = total - deleteLength;
  setTotal(newTotal);
  
  // setGivenSelectedRowKeys(0); tba dis is for checkbox
  console.log(length)
  console.log(deleteLength
    )
    
  if (length == deleteLength && total > 1) {

    if (currentPage != 1 && currentPage == lastPage) {
      console.log("minus 1 page")
      setCurrentPage(currentPage - 1);
    }
  }

  if (currentPage != lastPage) {
    console.log("getting page")
    getPage()
  }
}

//Onchange
export const handlePageSizeChange = (size, setListState, setPageSizeState) => {
  setListState([])
  setPageSizeState(size)
}

export const handleTableChange = (sorter, filter, setListState, setTableScreenState) => {
  var sorter = {
    field: sorter.field,
    order: sorter.order
  }

  console.log("sorter", sorter)
  console.log("filter", filter)

  if (sorter.order != null) {
    setListState([])
    setTableScreenState({ sorter })
  }

  if (sorter.order == null) {
    setTableScreenState({})
  }

}

export const handlePageChange = async (page, setCurrentPageState) => {
  if (page != null) {
    setCurrentPageState(page);
  }
}