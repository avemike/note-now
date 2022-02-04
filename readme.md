## Note now - django project

### jak wystartować?
  - Server (API)
    1. python3 -m venv env
    2. `source ./env/bin/activate`
    3. `pip install -r requirements.txt`
    4. Utworzyć plik `.env` w folderze `noteNow` i uzupełnić wzorując się na `.example.env`
    5. `./manage.py runserver`
  - Frontend (UI) - potrzebny yarn lub npm
    1. `cd client`
    2. `yarn` lub `npm install`
    3. `yarn start` lub `npm run start`

### automatycznie generowana dokumentacja:
  1. `./manage.py createsuperuser` -> tworzymy admina
  2. `./manage.py runserver`
  3. Na stronie `http://localhost:8000/admin/doc/` znajduje się automatycznie generowana dokumentacja przez django.
  - Dokumentacja ta gdzieniegdzie jest wypełniana również moimi komentarzami np. http://localhost:8000/admin/doc/models/base.note/

### testy jednostkowe
  1. `./manage.py test`

### interfejs użytkownika
  - webowy, napisany w React'cie i TypeScript'cie

### trwale przechowywane dane
  - `./manage.py seed` i `./manage.py seed --mode clear`
  - tworzy użytkownika `user@user.com`|`Password12!` z wypełnionymi przykładowymi danymi

