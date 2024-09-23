import { useMemo, useState } from "react";
import {
  Record,
  useRecords,
} from "../../contexts/record-context";
import { useTable, Column, CellProps, Row } from "react-table";
import moment, * as moments from 'moment';

interface EditableCellProps extends CellProps<Record> {
  updateRecord: (rowIndex: number, columnId: string, value: any) => void;
  editable: boolean;
}

const EditableCell: React.FC<EditableCellProps> = ({
  value: initialValue,
  row,
  column,
  updateRecord,
  editable,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState( 
    initialValue);

  const onBlur = () => {
    setIsEditing(false);
    const updatedValue = 
      value;
    updateRecord(row.index, column.id, updatedValue);
  };

  return (
    <div
      onClick={() => editable && setIsEditing(true)}
      style={{ cursor: editable ? "pointer" : "default" }}
    >
      {isEditing ? (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
          onBlur={onBlur}
          style={{ width: "100%" }}
        />
      ) 

      
      : typeof value === "string" ? (
        value
      ) : (
        value.toString()
      )}
    </div>
  );
};

export const RecordList = () => {
  const { records, updateRecord, deleteRecord } = useRecords();
  console.log(records);
  const updateCellRecord = (rowIndex: number, columnId: string, value: any) => {
    const id = records[rowIndex]?._id;
    updateRecord(id ?? "", { ...records[rowIndex], [columnId]: value });
  };

  const columns: Array<Column<Record>> = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
        Cell : (props)=>{
          //props.value will contain your date
          //you can convert your date here
          const custom_date = props.value
          console.log(typeof(props.value))
          return <span>{moment(custom_date).format("MM/DD/YYYY")}</span>

        }
      },
      {
        Header: "Company",
        accessor: "company",
        Cell: (props) => (
          <EditableCell
            {...props}
            updateRecord={updateCellRecord}
            editable={true}
          />
        ),
      },
      {
        Header: "Show",
        accessor: "show",
        Cell: (props) => (
          <EditableCell
            
            {...props}
            updateRecord={updateCellRecord}
            editable={true}
          />
        ),
      },
      {
        Header: "Match",
        accessor: "match",
        Cell: (props) => (
          <EditableCell
            {...props}
            updateRecord={updateCellRecord}
            editable={true}
          />
        ),
      },
      {
        Header: "Match Type",
        accessor: "matchType",
        Cell: (props) => (
          <EditableCell
            {...props}
            updateRecord={updateCellRecord}
            editable={true}
          />
        ),
      },
      {
        Header: "Stars",
        accessor: "rating",
        Cell: (props) => (
          <EditableCell
            {...props}
            updateRecord={updateCellRecord}
            editable={true}
          />
        ),
      },
      {
        Header: "Delete",
        id: "delete",
        Cell: ({ row }) => (
          <button
            onClick={() => deleteRecord(row.original._id ?? "")}
            className="button"
          >
            Delete
          </button>
        ),
      },
    ],
    [records]
  );
  console.log("Columns:", columns);
console.log("Records:", records);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: records,
    });
  return (
    <div className="table-container">
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((hg) => (
            <tr {...hg.getHeaderGroupProps()}>
              {hg.headers.map((column) => (
                <th {...column.getHeaderProps()}> {column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, idx) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};