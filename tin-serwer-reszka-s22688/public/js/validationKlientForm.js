function validateForm(){
    const imieInput = document.getElementById('imie');
    const nazwiskoInput = document.getElementById('nazwisko');
    const emailInput = document.getElementById('email');
    const uroInput = document.getElementById('data_urodzenia');
    const passwordInput = document.getElementById('password');

    const errorImie = document.getElementById('errorImie');
    const errorNazwisko = document.getElementById('errorNazwisko');
    const errorEmail = document.getElementById('errorEmail');
    const errorUro = document.getElementById('errorData_urodzenia');
    const errorPassword = document.getElementById('errorPassword');
    const errorSummary = document.getElementById('errorSummary');

    const reqMessage_obligator = document.getElementById('errorMessage-obligator').innerText;
    const reqMessage_chara3_25 = document.getElementById('errorMessage-chara3-25').innerText;
    const reqMessage_chara2_45 = document.getElementById('errorMessage-chara2-45').innerText;
    const reqMessage_chara5_60 = document.getElementById('errorMessage-chara5-60').innerText;
    const reqMessage_mail = document.getElementById('errorMessage-mail').innerText;
    const reqMessage_date = document.getElementById('errorMessage-date').innerText;
    const reqMessage_date_past = document.getElementById('errorMessage-date_past').innerText;
    const reqMessage_18 = document.getElementById('errorMessage-18').innerText;
    const reqMessage_chara7_20 = document.getElementById('errorMessage-chara7-20').innerText;

    resetErrors ([imieInput, nazwiskoInput, emailInput, uroInput, passwordInput], [errorImie, errorNazwisko, errorEmail, errorUro, errorPassword], errorSummary)
    let valid = true;

    if (!checkRequired(imieInput.value)) {
        valid = false;
        imieInput.classList.add("error-input");
        errorImie.innerText = reqMessage_obligator;
    } else if (!checkTextLengthRange(imieInput.value, 3, 25)) {
        valid = false;
        imieInput.classList.add("error-input");
        errorImie.innerText = reqMessage_chara3_25;
    }

    if (!checkRequired(nazwiskoInput.value)) {
        valid = false;
        nazwiskoInput.classList.add("error-input");
        errorNazwisko.innerText = reqMessage_obligator;
    } else if (!checkTextLengthRange(nazwiskoInput.value, 2, 45)) {
        valid = false;
        nazwiskoInput.classList.add("error-input");
        errorNazwisko.innerText = reqMessage_chara2_45;
    }

    if (!checkRequired(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = reqMessage_obligator;
    } else if (!checkTextLengthRange(emailInput.value, 5, 60)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = reqMessage_chara5_60;
    } else if (!checkEmail(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = reqMessage_mail;
    }

    let nowDate = new Date(),
    month = '' + (nowDate.getMonth() + 1),
    day = '' + nowDate.getDate(),
    year = nowDate.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
        
    const nowString = [year, month, day].join('-');

    if (!checkRequired(uroInput.value)) {
        valid = false;
        uroInput.classList.add("error-input");
        errorUro.innerText = reqMessage_obligator;
    } else if (!checkDate(uroInput.value)) {
        valid = false;
        uroInput.classList.add("error-input");
        errorUro.innerText = reqMessage_date;
    } else if (!checkDateIfAfter(uroInput.value, nowString)) {
        valid = false;
        uroInput.classList.add("error-input");
        errorUro.innerText = reqMessage_date_past;
    } else if (!checkDateIf18(uroInput.value, nowString)) {
        valid = false;
        uroInput.classList.add("error-input");
        errorUro.innerText = reqMessage_18;
    }

    if (!checkRequired(passwordInput.value)) {
        valid = false;
        passwordInput.classList.add("error-input");
        errorPassword.innerText = reqMessage_obligator;
    } else if (!checkTextLengthRange(passwordInput.value, 7, 20)) {
        valid = false;
        passwordInput.classList.add("error-input");
        errorPassword.innerText = reqMessage_chara7_20;
    }

    return valid;
} 