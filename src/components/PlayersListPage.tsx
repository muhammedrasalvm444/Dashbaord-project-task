import { useState, useMemo, useRef, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { FaEdit, FaEllipsisV, FaTrash } from "react-icons/fa";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  setMode,
  setSingleItemData,
  getPlayersList,
  getActiveMode,
  deletePlayer,
} from "../redux/playersSlice";
import PlayersAddEditForm from "./PlayersAddEditForm";
import TextBox from "./Fields/Textbox";
import Button from "./Fields/Button";
import { toast } from "sonner";

const PlayersList = () => {
  const [searchValue, setSearchValue] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [menuOpenRowId, setMenuOpenRowId] = useState<number | null>(null);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const players = useSelector(getPlayersList);
  const mode = useSelector(getActiveMode);

  const toggleMenu = (rowId: number) => {
    setMenuOpenRowId((prev) => (prev === rowId ? null : rowId));
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpenRowId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const columns = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }: any) => (
          <input
            type="checkbox"
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }: any) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
        size: 50,
      },
      { header: "Player", accessorKey: "user" },
      { header: "Age", accessorKey: "age" },
      {
        header: "Leagues",
        accessorKey: "leagues",
        cell: ({ row }: any) => (
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {row.original.leagues.map((item: string, index: number) => (
              <span
                key={index}
                style={{
                  color: "black",
                  backgroundColor: "#fff",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  fontSize: "0.75rem",
                  border: "1px solid #3a3535",
                  textAlign: "center",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        ),
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }: any) => (
          <span
            style={{
              backgroundColor:
                row.original.status !== "Retired" ? "#00e600" : "#ff6600",
              color: "white",
              padding: "6px 8px",
              borderRadius: "10px",
              fontSize: "0.75rem",
            }}
          >
            {row.original.status}
          </span>
        ),
      },
      { header: "Height", accessorKey: "height" },
      { header: "Position", accessorKey: "position" },
      {
        id: "options",
        header: "",
        cell: ({ row }: any) => (
          <MenuButton ref={menuRef}>
            <FaEllipsisV
              onClick={(e) => {
                e.stopPropagation();
                toggleMenu(row.id);
                dispatch(setSingleItemData(row?.original));
              }}
            />
            {/* {menuOpenRowId === row.id && (
              <EditDeleteMenus row={row?.original} />
            )} */}
          </MenuButton>
        ),
      },
      {
        id: "options",
        header: "",
        cell: ({ row }: any) => (
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <div style={{ cursor: "pointer" }}>
              <FaEdit
                onClick={() => {
                  dispatch(setSingleItemData(row?.original));
                  dispatch(setMode("modify"));
                }}
              />
            </div>
            <div style={{ cursor: "pointer" }}>
              <FaTrash
                onClick={() => {
                  dispatch(deletePlayer(row?.original?.id));
                  toast.success("Deleted successfully");
                }}
              />
            </div>
          </div>
        ),
      },
    ],
    [menuOpenRowId]
  );
  const filteredPlayers = useMemo(
    () =>
      players.filter((player) => {
        const searchLower = searchValue.toLowerCase();
        return (
          player.user.toLowerCase().includes(searchLower) ||
          player.age.toString().includes(searchValue) ||
          player.status.toString().includes(searchValue) ||
          player.position.toString().includes(searchValue) ||
          player.height.toString().includes(searchValue) ||
          player.leagues.some((league) =>
            league.toLowerCase().includes(searchLower)
          )
        );
      }),
    [players, searchValue]
  );

  const table = useReactTable({
    data: filteredPlayers,
    columns,
    state: { rowSelection, pagination },
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: Math.ceil(players.length / pagination.pageSize),
  });

  return (
    <Container>
      <Header>
        {mode == "view"
          ? "User Information Form"
          : mode == "add"
          ? "Add player detail"
          : "Modify player detail"}
      </Header>
      {mode === "view" ? (
        <div>
          <Controls>
            <TextBox
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e?.target?.value);
              }}
              label="Search"
              placeholder="Search by name"
            />
            <Button
              label="New"
              onClick={() => {
                dispatch(setMode("add"));
              }}
            />
          </Controls>
          <TableWrapper>
            <Table>
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableHead>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <StyledTableRow
                    key={row.id}
                    $isSelected={row.getIsSelected()}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </StyledTableRow>
                ))}
              </tbody>
            </Table>
            <PaginationControls>
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                {"<"}
              </button>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                {">"}
              </button>
              <span>
                Page {pagination.pageIndex + 1} of {table.getPageCount()}
              </span>
            </PaginationControls>
          </TableWrapper>
        </div>
      ) : (
        <PlayersAddEditForm />
      )}
    </Container>
  );
};

export default PlayersList;

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.h2`
  font-size: 2rem;
  font-weight: normal;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 3rem;
`;

const TableWrapper = styled.div`
  margin-top: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;

const TableHead = styled.th`
  border-bottom: 0.0625rem solid #ddd;
  padding: 0.625rem;
  text-align: left;
  background-color: #f9f9f9;
`;

const StyledTableRow = styled.tr<{ $isSelected?: boolean }>`
  background-color: ${({ $isSelected }) => ($isSelected ? "#f0f8ff" : "white")};
  border-bottom: 0.0625rem solid #ddd;
  &:hover {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 0.625rem;
  text-align: left;
`;

const MenuButton = styled.div`
  cursor: pointer;
  position: relative;
`;

const PaginationControls = styled.div`
  margin-top: 20px;
`;
