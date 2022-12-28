// //Import Statement
// import { handleTableChange, handlePageSizeChange, handlePageChange } from "helper/pagination";
// //Pagination State
// const [tableScreen, setTableScreen] = useState({})
// const [currentPage, setCurrentPage] = useState(1)
// const [total, setTotal]  = useState(0)
// const defaultPageSize = 4
// const [pageSize, setPageSize] = useState(defaultPageSize)

// //Checkbox State
// const [selectedArray, setSelectedArray] = useState([])

// //Table

// //Table Checkbox
// rowSelection={tableRowSelection}

// //Table pagination
// pagination={{
// current: currentPage,
// total: total,
// pageSize: pageSize,
// showSizeChanger: true,
// defaultPageSize: defaultPageSize,
// pageSizeOptions: [defaultPageSize, 10, 20, 50, 100],
// onShowSizeChange: (current, size) => {
// handlePageSizeChange(size, setListState, setPageSizeState)
// },
// onChange: (page) => handlePageChange(page, setCurrentPageState)
// }}

// //Table onChange
// onChange={(pagination, filters, sorter) => handleTableChange(sorter, filters, setPurokList, setTableScreen)}

// //Component for checkbox
// const tableRowSelection = {
//   selectedArray,
//   onChange: (selectedRowKeys, selectedRows) => {
//     onSelectChange(selectedRowKeys, selectedRows);
//   },
// };

// //OnChange checkbox
// const onSelectChange = (selectedRowKeys, selectedRows) => {
//   if (selectedRows.length > 0) {
//     let tempSelectedRows = [];

//     selectedRows.map((row) => {
//       tempSelectedRows.push(row.id_name);
//     });

//     console.log(tempSelectedRows);
//     setSelectedArray(tempSelectedRows);
//   }
// };

// //Things to do
// //Create useEffect for tableScreen
// //Create backend for getPage
// //Import function from pagination.js after crud operation


// //UseEffect
// useEffect(() => {
//     getPage();
// }, [currentPage, pageSize, tableScreen]);

// //if stateList has a date column
// useEffect(() => {
//     var length = Object.keys(supplyGivenList).length
//     if (length > 0) {
//         supplyGivenList.map((data) => {
//             data.date = moment(new Date(data.date));
//         });
//     }
// }, [supplyGivenList]);


// const getPage = async () => {
//     setloading(true);

//     try {
//         await axios
//             .post(
//                 "/api/link/getPage",
//                 { organization_id: organization_id, page: currentPage, tableScreen, pageSize },
//                 generateToken()[1],
//                 { cancelToken }
//             )
//             .then((res) => {
//               var data = res.data
//               setTotal(data.total)
//               setPurokList(data.list)
//             });
//     } catch (error) {
//         console.log(error);
//         message.error("Error in database connection!!");
//     }

//     setloading(false);
// };

// //backend
// exports.getResidentPage = async (req, res) => {
//   try {
//     // console.log("req.body", req.body)
//     var page = parseInt(req.body.page) - 1;
//     var pageSize = parseInt(req.body.pageSize);
//     var organization_id = req.body.organization_id;
//     organization_id = mongoose.Types.ObjectId(organization_id);

//     var tableScreen = req.body.tableScreen
//     var tableScreenLength = Object.keys(tableScreen).length
//     var sorter = null
//     var filter = { organization_id: organization_id }
//     var doesFilterExist = tableScreen.hasOwnProperty("filter")
//     var doesSorterExist = tableScreen.hasOwnProperty("sorter")
//     var numberKeys = [""] // put here keys that are number fields
//     var dateKeys = [""] // put here keys that are date fields

//     if (doesFilterExist != false) {
//       var tempFilter = tableScreen.filter
//       var isKeyNumber = false
//       var isKeyDate = false

//       for (const [key, value] of Object.entries(tempFilter)) {
//         if (value != null) {
//           isKeyNumber = numberKeys.includes(key)
//           isKeyDate = dateKeys.includes(key)

//           if (isKeyNumber == true) {
//             filter = { ...filter, [key]: value }
//           }

//           if (isKeyDate == true) {
//             var today = moment(value[0]).startOf('day')
//             var endDate = moment(value[0]).endOf('day')

//             var dateFilter = {
//               [key]: {
//                 $gte: today,
//                 $lte: endDate
//               }
//             }

//             filter = { ...filter, ...dateFilter}
//           }

//           if (isKeyDate == false && isKeyNumber == false) {
//             filter = { ...filter, [key]: { $regex: value.join("|"), $options: "i" } }
//           }
//         }
//       }
//     }

//     if(doesSorterExist != false) {
//       var tempSorter = tableScreen.sorter
//       var field = tempSorter.field
//       var order = tempSorter.order + 'ing'
//       sorter = { [field]: order }
//     }

//     //console.log("filter", filter)
//     // console.log("sorter", sorter)

//     await DB.find(filter)
//       .skip(page * pageSize)
//       .limit(pageSize)
//       .sort(sorter)
//       .then(async (result) => {
//         var dbList = result
//         await DB.countDocuments(filter)
//           .then((result) => {
//             var total = result
//             res.json({ dbList, total });
//           });
//       })

//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ error: "error" });
//   }
// };

// //filter and sorter
// import { searchBar, searchBarNumber, searchBarDate, searchIcon  } from "helper/pagination";
// import utils from "utils";

// //inside column
// filterDropdown: searchBar,
// filterIcon: searchIcon,
// sorter: (a, b) => utils.antdTableSorter(a, b, "key name")