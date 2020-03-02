import { Injectable } from "@angular/core";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { DatePipe, DecimalPipe } from "@angular/common";
const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";

@Injectable()
export class ExcelService {
  constructor(private datePipe: DatePipe, private decimalPipe: DecimalPipe) {}

  public exportAsExcelFile(json: any[], excelFileName: string, options?): void {
    // if (options) {
    //   options.campos_fechas.forEach(element => {});
    // }

    json.forEach(element => {
      element["fecha_ejecucion"] = this.datePipe.transform(
        element["fecha_ejecucion"],
        "yyyy-MM-dd"
      );
      element["error_q3"] = this.decimalPipe.transform(
        element["error_q3"],
        ".2"
      );
      element["error_q2"] = this.decimalPipe.transform(
        element["error_q2"],
        ".2"
      );
      element["error_q1"] = this.decimalPipe.transform(
        element["error_q1"],
        ".2"
      );
      element["q1"] = this.decimalPipe.transform(element["q1"], ".2");
      element["q2"] = this.decimalPipe.transform(element["q2"], ".2");
      element["q3"] = this.decimalPipe.transform(element["q3"], ".2");
    });

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ["data"]
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(
      data,
      fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
    );
  }
}
