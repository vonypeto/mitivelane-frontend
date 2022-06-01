
import { Input, Space, Button, InputNumber, DatePicker  } from "antd";

const { RangePicker } = DatePicker;
import moment from "moment";
import { SearchOutlined } from "@ant-design/icons";

//Total Function
export const getTotalPage = (total, pageSize) => {
  var page = 1;
  while (total > pageSize) {
    total -= pageSize;
    page++;
  }
  return page;
};

export const searchBar = ({ setSelectedKeys, selectedKeys, confirm, clearFilters}) => {
  return (
    <div style={{ padding: 8 }}>
      <Input
        placeholder={`Type text here`}
        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        value={selectedKeys}
        style={{ marginBottom: 8, display: 'block' }}
      />
      <Space>
        <Button
          type="primary"
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 100 }}
          onClick={() => confirm()}
        >
          Search
        </Button>
        <Button size="small" style={{ width: 90 }} onClick={() => { clearFilters() }}>
          Reset
        </Button>
      </Space>
    </div>
  )
}

export const searchBarNumber = ({ setSelectedKeys, selectedKeys, confirm, clearFilters}) => {
  return (
    <div style={{ padding: 8 }}>
      <InputNumber
        className="w-100"
        controls={false}
        placeholder={`Type text here`}
        onChange={value => setSelectedKeys(value ? [value] : [])}
        value={selectedKeys}
        style={{ marginBottom: 8, display: 'block' }}
      />
      <Space>
        <Button
          type="primary"
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 100 }}
          onClick={() => confirm()}
        >
          Search
        </Button>
        <Button size="small" style={{ width: 90 }} onClick={() => { clearFilters() }}>
          Reset
        </Button>
      </Space>
    </div>
  )
}

export const searchBarDate = ({ setSelectedKeys, selectedKeys, confirm, clearFilters}) => {
  var length = selectedKeys.length
  return (
    <div style={{ padding: 8 }}>
      <DatePicker
        className="w-100"
        onChange={value => {
          console.log("value", value)
          if (value == null) {
            setSelectedKeys([])
          }
          else {
            setSelectedKeys(value ? [value] : [])
          }
        }}
        style={{ marginBottom: 8, display: 'block' }}
      />
      <Space>
        <Button
          type="primary"
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 100 }}
          disabled={length <= 0}
          onClick={() => confirm()}
        >
          Search
        </Button>
        <Button size="small" style={{ width: 90 }} onClick={() => { clearFilters() 

        }}>
          Reset
        </Button>
      </Space>
    </div>
  )
}

export const searchIcon = () => {
  return(<SearchOutlined/>)
}

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
      setCurrentPage(currentPage - 1);
    }
  }

  if (currentPage != lastPage) {
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

  // for (var i = 0; i < filters.length; i++) {
  //   query.where(filters[i].fieldName).equals(filters[i].value)
  // }

  setListState([])

  if (sorter.order != null) {
    setTableScreenState({ sorter, filter })
  }

  if (sorter.order == null) {
    setTableScreenState({ filter })
  }

}

export const handlePageChange = async (page, setCurrentPageState) => {
  if (page != null) {
    setCurrentPageState(page);
  }
}
