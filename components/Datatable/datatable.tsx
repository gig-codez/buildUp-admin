"use client"
import {Fragment, ReactNode, useEffect} from "react";
import $ from "jquery";
import "datatables.net";
import "./datatable.css";

export default function CustomDataTable({ title, columns, rows, actionComponent }: { title?: string, columns?: any[], rows: any[], actionComponent?: ReactNode }) {
    useEffect(() => {
        const table = ($("#example") as any).DataTable({
            fixedColumns: true,
            scrollCollapse: true,
            scrollY: 500
        });

        return () => {
            table.destroy();
        };

    }, [rows]);


    // function to check if the provided string if a file path
    function isFilePath(str: string): boolean {
        // Use a regular expression to match common file path patterns
        const filePattern = /^(\/|\w:\\)?\/?([^\/\\]+[\/\\])*[^\/\\]+\.[^\/\\]+$/;
        return filePattern.test(str);
    }
    // function to handle navigation
    function handleNavigation(url: string) {
        window.location.href = url;
    }
    return (
        <div className="container bg-white rounded-lg mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-row justify-between items-center ">
                <h1 className="text-2xl font-bold mb-4">{title}</h1>
                {actionComponent && (
                    <Fragment>
                        {(actionComponent)}
                    </Fragment>
                )}
            </div>
            <table id="example" className="display">
                <thead>
                <tr>
                    {
                        columns?.map((column, index) => (
                            <th key={index} className="px-4 py-2">{column.headerName}</th>
                        ))
                    }
                </tr>
                </thead>
                <tbody>
                {
                    rows?.map((row, index) => {
                        const getCellData = (field: string): string => {
                            if(!field.includes('.')){
                                return row[field];
                            }
                            let obj = {...row}
                            field.split('.').forEach((str)=>{
                                obj = obj[str]
                            })
                            return obj;
                        }

                        return <tr key={index}>
                            {
                                columns?.map((cell: any, ind: number) => {
                                    return <td key={ind}
                                               className="object-center px-4 py-2">{cell.hasOwnProperty("renderCell") ? cell.renderCell({row}) : getCellData(cell.field)}</td>
                                    // return <td key={index} className="border object-center px-4 py-2">{isFilePath(str) ? (<Image src={str} alt={str} width={30} height={30} />) : (str)}</td>
                                })
                            }
                        </tr>
                    })
                }
                {/* Add more rows as needed */}
                </tbody>
                <tfoot>
                <tr>
                    {
                        columns?.map((column, index) => (
                            <th key={index} className="px-4 py-2">{column.headerName}</th>
                        ))
                    }
                </tr>
                </tfoot>
            </table>
        </div>
    );
}