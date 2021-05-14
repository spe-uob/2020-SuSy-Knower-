package com.SuSyKnower.CustomizedException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.http.ResponseStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
/*import org.springframework.http.HttpEntity;
import java.lang.Object.StringUtils;
import java.lang.Object.ExceptionUtils;*/

@ControllerAdvice
public class CustomizedExceptionHandler {

    @ExceptionHandler(IncorrectArgumentException.class)
    public ResponseEntity<String> handleIncorrectArgumentExceptions( IncorrectArgumentException exception) {
        String response = new String();
        response = "The argument doesn't exist";
        ResponseEntity<String> entity = new ResponseEntity<>(response,HttpStatus.NOT_FOUND);
        return entity;
    }

    @ExceptionHandler(NoArgumentException.class)
    public ResponseEntity<String> handleNoArgumentExceptions( NoArgumentException exception) {
        String response = new String();
        response = "You provided no argument";
        ResponseEntity<String> entity = new ResponseEntity<>(response,HttpStatus.NOT_FOUND);
        return entity;
    }

}