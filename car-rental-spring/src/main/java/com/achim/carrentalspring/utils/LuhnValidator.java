package com.achim.carrentalspring.utils;
import org.springframework.stereotype.Component;
@Component
public class LuhnValidator {
   /**
         *  Algoritmul Luhn – verifică dacă un șir de cifre este
         *  un posibil număr de card valabil.
         */
        public boolean isValid(String digits) {

            if (digits == null || !digits.matches("\\d+")) {
                return false;
            }

            int sum = 0;
            boolean even = false;

            for (int i = digits.length() - 1; i >= 0; i--) {
                int n = digits.charAt(i) - '0';
                if (even) {
                    n *= 2;
                    if (n > 9) n -= 9;
                }
                sum += n;
                even = !even;
            }
            return sum % 10 == 0;
        }
}
