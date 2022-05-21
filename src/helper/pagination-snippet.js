//Import Statement
import { handleTableChange, handlePageSizeChange, handlePageChange } from "helper/pagination";
//Pagination State
const [tableScreen, setTableScreen] = useState({})
const [currentPage, setCurrentPage] = useState(1)
const [total, setTotal]  = useState(0)
const [pageSize, setPageSize] = useState(4)

//Checkbox State
const [selectedArray, setSelectedArray] = useState([])

//Table

//Table Checkbox
rowSelection={tableRowSelection}

//Table pagination
pagination={{
current: currentPage,
total: total,
pageSize: pageSize,
showSizeChanger: true,
defaultPageSize: pageSize,
pageSizeOptions: [pageSize, 10, 20, 50, 100],
onShowSizeChange: (current, size) => {
handlePageSizeChange(size, setListState, setPageSizeState)
},
onChange: (page) => handlePageChange(page, setCurrentPageState)
}}

//Table onChange
onChange = {(sorter) => handleTableChange(sorter, setListState, tableScreenState)}

//Component for checkbox
const tableRowSelection = {
  selectedArray,
  onChange: (selectedRowKeys, selectedRows) => {
    onSelectChange(selectedRowKeys, selectedRows);
  },
};

//OnChange checkbox
const onSelectChange = (selectedRowKeys, selectedRows) => {
  if (selectedRows.length > 0) {
    let tempSelectedRows = [];

    selectedRows.map((row) => {
      tempSelectedRows.push(row.id_name);
    });

    console.log(tempSelectedRows);
    setSelectedArray(tempSelectedRows);
  }
};



//Things to do
//Create useEffect for tableScreen
//Create backend for getPage
//Import function from pagination.js after crud operation


//UseEffect
useEffect(() => {
    getStateTotal();
}, []);

useEffect(() => {
    getPage();
}, [currentPage, pageSize, tableScreen]);

//if stateList has a date column
useEffect(() => {
    var length = Object.keys(supplyGivenList).length
    if (length > 0) {
        supplyGivenList.map((data) => {
            data.date = moment(new Date(data.date));
        });
    }
}, [supplyGivenList]);

//Axios Table
const getStateTotal = async () => {
    try {
        await axios
            .post(
                "/api/link/getTotal",
                { organization_id },
                generateToken()[1],
                { cancelToken }
            )
            .then((res) => {
                setTotal(res.data);
            });
    } catch (error) {
        console.log(error);
        message.error("Error in database connection!!");
    }
};

const getPage = async () => {
    setloading(true);

    try {
        await axios
            .post(
                "/api/link/getPage",
                { organization_id: organization_id, page: currentPage, tableScreen, pageSize },
                generateToken()[1],
                { cancelToken }
            )
            .then((res) => {
                var data = res.data;
                setStateList(data);
            });
    } catch (error) {
        console.log(error);
        message.error("Error in database connection!!");
    }

    setloading(false);
};

//backend

exports.getResidentTotal = async (req, res) => {
    try {
      var organization_id = req.params.organization_id;
      organization_id = mongoose.Types.ObjectId(organization_id);
  
      await Resident.countDocuments({ organization_id }).then((result) => {
          res.json(result);
        }
      );
  
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "error" });
    }
  };
  
  exports.getResidentPage = async (req, res) => {
    try {
      console.log("req.body", req.body)
      var tableScreen = req.body.tableScreen
      var tableScreenLength = Object.keys(tableScreen).length
      var page = parseInt(req.body.page) - 1;
      var pageSize = parseInt(req.body.pageSize);
      var organization_id = req.body.organization_id;
      organization_id = mongoose.Types.ObjectId(organization_id);
  
      if (tableScreenLength > 0) {
        console.log("has filter")
        var sorter = tableScreen.sorter
        var order = sorter.order + "ing" // either ascend or descend, ing is need for mongoose
        var field = sorter.field
  
        await Resident.find({ organization_id })
        .skip(page * pageSize)
        .limit(pageSize)
        .sort({[field]: order})
        .then((result) => {
          res.status(200).send(result);
        })
      }
  
      if (tableScreenLength <= 0) {
        console.log("no filter")
        await Resident.find({ organization_id })
        .skip(page * pageSize)
        .limit(pageSize)
        .then((result) => {
          res.status(200).send(result);
        })
      }
  
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "error" });
    }
  };