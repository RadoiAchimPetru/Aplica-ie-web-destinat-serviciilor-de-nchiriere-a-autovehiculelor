package com.achim.carrentalspring.utils;

public final class CardUtils {

    private CardUtils() {}

    /** Returnează true dacă numărul de card trece testul Luhn */
    public static boolean isValidLuhn(String number) {
        int sum = 0, alt = 0;
        for (int i = number.length() - 1; i >= 0; --i) {
            int d = number.charAt(i) - '0';
            sum += ((alt ^= 1) == 1)
                    ? d
                    : ((d <<= 1) > 9 ? d - 9 : d);
        }
        return sum % 10 == 0;
    }
}