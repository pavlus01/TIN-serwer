function validateForm(){
    const klientInput = document.getElementById('klient');
    const autoInput = document.getElementById('auto');
    const data_wypoInput = document.getElementById('data_wypozyczenia');
    const data_zwroInput = document.getElementById('data_zwrotu');

    const errorKlient = document.getElementById('errorKlient');
    const errorAuto = document.getElementById('errorAuto');
    const errorData_wypo = document.getElementById('errorData_wypozyczenia');
    const errorData_zwrotu = document.getElementById('errorData_zwrotu');
    const errorSummary = document.getElementById('errorSummary');

    const reqMessage_obligator = document.getElementById('errorMessage-obligator').innerText;
    const reqMessage_date = document.getElementById('errorMessage-date').innerText;
    const reqMessage_date_past = document.getElementById('errorMessage-date_past').innerText;
    const reqMessage_date_after = document.getElementById('errorMessage-date_after').innerText;

    resetErrors ([klientInput, autoInput, data_wypoInput, data_zwroInput], [errorKlient, errorAuto, errorData_wypo, errorData_zwrotu], errorSummary)
    let valid = true;

    if (!checkRequired(klientInput.value)) {
        valid = false;
        klientInput.classList.add("error-input");
        errorKlient.innerText = reqMessage_obligator;
    } 
    if (!checkRequired(autoInput.value)) {
        valid = false;
        autoInput.classList.add("error-input");
        errorAuto.innerText = reqMessage_obligator;
    }

    let nowDate = new Date(),
    month = '' + (nowDate.getMonth() + 1),
    day = '' + nowDate.getDate() ,
    year = nowDate.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
        
    const nowString = [year, month, day].join('-');

    if (!checkRequired(data_wypoInput.value)) {
        valid = false;
        data_wypoInput.classList.add("error-input");
        errorData_wypo.innerText = reqMessage_obligator;
    } else if (!checkDate(data_wypoInput.value)) {
        valid = false;
        data_wypoInput.classList.add("error-input");
        errorData_wypo.innerText = reqMessage_date;
    } else if (!checkDateIfAfter(data_wypoInput.value, nowString)) {
        valid = false;
        data_wypoInput.classList.add("error-input");
        errorData_wypo.innerText = reqMessage_date_past;
    }

    if (data_zwroInput.value){
     if (!checkDate(data_zwroInput.value)) {
        valid = false;
        data_zwroInput.classList.add("error-input");
        errorData_zwrotu.innerText = reqMessage_date;
    } else if (!checkDateIfAfter(data_wypoInput.value, data_zwroInput.value)) {
        valid = false;
        data_zwroInput.classList.add("error-input");
        errorData_zwrotu.innerText = reqMessage_date_after;
    } else if (!checkDateIfAfter(data_zwroInput.value, nowString)) {
        valid = false;
        data_zwroInput.classList.add("error-input");
        errorData_zwrotu.innerText = reqMessage_date_past;
    }}

    return valid;
}