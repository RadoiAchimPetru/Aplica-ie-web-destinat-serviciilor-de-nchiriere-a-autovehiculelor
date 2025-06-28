# Aplicație web destinată serviciilor de închiriere a autovehiculelor
##Descriere generală

Acest proiect constă în implementarea unei aplicații complete de management al închirierilor auto, care permite clienților să caute, să rezerve și să plătească pentru mașini, iar administratorilor să gestioneze flota și rezervările. Proiectul este dezvoltat în două componente principale:

- **Backend** realizat cu **Spring Boot**
- **Frontend** realizat cu **Angular**

---

## Repository Git

Codul sursă complet este disponibil la adresa:  
[https://github.com/RadoiAchimPetru/CarRentalApp.git](https://github.com/RadoiAchimPetru/CarRentalApp.git)



## Livrabilele proiectului

Structura principală a repository-ului este următoarea:
- Director `car-rental-spring` – cod sursă backend Spring Boot
- Director `car-rental-angular` – cod sursă frontend Angular
- Fișier `README.md` – instrucțiuni detaliate de compilare, instalare și rulare

---

## Pașii de compilare, instalare și rulare

### Backend (Spring Boot)

1. Se descarcă și se instalează **Java JDK 17** (sau versiunea compatibilă).
2. Se deschide proiectul din directorul `car-rental-spring` într-un IDE (IntelliJ IDEA, Eclipse sau VSCode).
3. Se verifică fișierul `application.properties` pentru configurarea bazei de date și a portului serverului.
4. Se execută următoarele comenzi Maven în terminal:
   ./mvnw clean install
   sau, dacă Maven este instalat global:
   mvn clean install
5. După compilare, aplicația se pornește cu:
   ./mvnw spring-boot:run
   sau direct din IDE rulând clasa principală `Application.java`.

- Backend-ul va rula pe adresa:
  http://localhost:8080

---

### Frontend (Angular)

1. Se instalează **Node.js** (versiune LTS) și **npm**.
2. Se deschide un terminal și se navighează în directorul `car-rental-angular`:
   cd car-rental-angular
3. Se instalează toate pachetele necesare:
   npm install
4. După instalare, aplicația se pornește local cu:
   ng serve --open
   Browserul se va deschide automat la:
   http://localhost:4200

---

### Recomandări finale

- Se asigură că **backend-ul** și **frontend-ul** rulează simultan.
- Dacă este necesar,se modifică fișierele de configurare `application.properties` (backend) și `environment.ts` (frontend) pentru a seta corect URL-urile API și conexiunea la baza de date.
- Codul sursă nu include directoarele generate automat (`/target` pentru backend, `/dist` pentru frontend).

---

## Contact

Autor: **Radoi Achim Petru**
GitHub: [https://github.com/RadoiAchimPetru](https://github.com/RadoiAchimPetru)
