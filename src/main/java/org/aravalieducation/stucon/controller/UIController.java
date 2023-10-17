package org.aravalieducation.stucon.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class UIController {

    @RequestMapping(value = {"/", "/{x:[\\w\\-]+}", "/{x:^(?!api$).*$}/*/{y:[\\w\\-]+}", "/error", "/{x:^(?!login$).*$}/*/{y:[\\w\\-]+}", "/{x:^(?!logout$).*$}/*/{y:[\\w\\-]+}"})
    public String getIndex(HttpServletRequest request) {
        return "/index.html";
    }
}
