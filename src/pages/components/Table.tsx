import React, { FC } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Paper,
} from "@material-ui/core";
import styled from "styled-components";

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";

interface TableProps {
	data: any[];
	columns: ColumnDef<any>[];
}

const StyledTable = styled(Table)`
	min-width: 650px;
`;

const StyledTableBody = styled(TableRow)`
	&:nth-of-type(odd) {
		background-color: #e6e8eb;
	}
`;

export const ReusableTable: FC<TableProps> = ({ data, columns }) => {
	const { getHeaderGroups, getRowModel } = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<Paper elevation={2} style={{ padding: "1rem 0px" }}>
			<StyledTable aria-label='customized table'>
				<TableHead>
					{getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableCell key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext()
										  )}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableHead>
				<TableBody>
					{getRowModel().rows.map((row) => (
						<StyledTableBody key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<TableCell key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</TableCell>
							))}
						</StyledTableBody>
					))}
				</TableBody>
			</StyledTable>
		</Paper>
	);
};
