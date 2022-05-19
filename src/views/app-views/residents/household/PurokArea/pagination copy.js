      //Pagination State
      const [tableScreen, setTableScreen] = useState({})
      const [currentPage, setCurrentPage] = useState(1)
      const [total, setTotal]  = useState(0)
      const [pageSize, setPageSize] = useState(4)
      
      //Total Function
      const getTotalPage = (val) => {
        var total = val;
        var page = 1;
        while (total > pageSize) {
          total -= pageSize;
          page++;
        }
        return page;
      };

        //For adding additional
        var newTotal = total + 1;
        setTotal(newTotal);

        if (ListState.length < pageSize) {
        ListState([...supplyGivenList, newSupplyGiven]);
        }

        if (ListState.length == pageSize) {
        setCurrentPage(getTotalPage(newTotal));
        }

        //For deleting additional
        var newTotal = total - 1
        setTotal(newTotal);

        if (ListState.length == 1 && total > 1) {
            setCurrentPage(currentPage - 1);
          }

        //For deleting multiple
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

      //Onchange
      const handlePageSizeChange = (size) => {
      //set state list to []
      setPageSize(size)
      }

      const handleTableChange = (pagination, filters, sorter) => {
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
      
      const handlePageChange = async (page) => {
      if (page != null) {
          setCurrentPage(page);
      }
    
      pagination={{
      current: currentPage,
      total: total,
      pageSize: pageSize,
      showSizeChanger: true,
      defaultPageSize: pageSize,
      pageSizeOptions: [pageSize, 10, 20, 50, 100],
      onShowSizeChange: (current, size) => {
        handlePageSizeChange(size)
      },
      onChange: (page) => handlePageChange(page)
      }}