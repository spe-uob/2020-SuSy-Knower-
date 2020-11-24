package com.spe.Susy_Knower;

//import org.apache.poi.openxml4j.exceptions.InvalidFormatException;

import org.apache.poi.*;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import java.io.*;
import java.util.Iterator;


public class XLSXreader {
    public static final String XLSX_FILE_PATH = "./courses2.xlsx";

    public static void main(String[] args) {
        FileInputStream excelFile = new FileInputStream(new File(XLSX_FILE_PATH));
        Workbook workbook = new XSSFWorkbook(excelFile);
    }
}
