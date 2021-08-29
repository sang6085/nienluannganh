import MUIDataTable, { MUIDataTableTextLabels } from 'mui-datatables';
import React from 'react';
interface MUIDataTableComponentProps {
	title?: string;
	columns: Array<any>;
	data: any[];
	options?: {
		sort?: boolean;
		onColumnSortChange?: (changedColumn: string, direction: string) => void;
		filter?: boolean;
		filterType?: 'checkbox' | 'dropdown' | 'multiselect' | 'textField' | 'custom';
		fixedHeader?: boolean;
		rowsPerPage?: number;
		rowsPerPageOption?: Array<number>;
		count?: number;
		page?: number;
		pagination?: boolean;
		onChangePage?: (currentPage: number) => void;
		onChangeRowsPerPage?: (numberOfRows: number) => void;
		onSearchChange?: (searchText: string | null) => void;
		jumpToPage?: boolean;
		download?: boolean;
		print?: boolean;
		responsive?: 'vertical' | 'standard' | 'simple';
		fixedSelectColumn?: boolean;
		viewColumns?: boolean;
		search?: boolean;
		searchPlaceholder?: string;
		selectableRows?: 'multiple' | 'single' | 'none';
		customToolbarSelect?: any;
		textLabels?: Partial<MUIDataTableTextLabels> | undefined;
	};
}
const MUIDataTableComponent: React.FC<MUIDataTableComponentProps> = (props) => {
	return (
		<MUIDataTable
			title={props.title}
			columns={props.columns}
			data={props.data}
			options={{
				sort: props.options?.sort || true,
				onColumnSortChange: props.options?.onColumnSortChange,

				filter: props.options?.filter,
				filterType: props.options?.filterType || 'checkbox',
				fixedHeader: props.options?.fixedHeader || true,

				rowsPerPage: props.options?.rowsPerPage || 2,
				rowsPerPageOptions: props.options?.rowsPerPageOption,
				page: props.options?.page,
				count: props.options?.count,
				pagination: props.options?.pagination,
				onChangePage: props.options?.onChangePage,
				onChangeRowsPerPage: props.options?.onChangeRowsPerPage,
				onSearchChange: props.options?.onSearchChange,

				jumpToPage: props.options?.jumpToPage,
				download: props.options?.download,
				print: props.options?.print,
				responsive: props.options?.responsive || 'vertical',
				fixedSelectColumn: props.options?.fixedSelectColumn || true,
				viewColumns: props.options?.viewColumns,
				search: props.options?.search,
				searchPlaceholder: props.options?.searchPlaceholder || 'typing....',
				selectableRows: props.options?.selectableRows || 'multiple',
				customToolbarSelect: props.options?.customToolbarSelect,
				textLabels: props.options?.textLabels,
			}}
		></MUIDataTable>
	);
};
export default MUIDataTableComponent;
