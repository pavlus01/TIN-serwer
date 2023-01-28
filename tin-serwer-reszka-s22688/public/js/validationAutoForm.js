function validateForm(){
    const producentInput = document.getElementById('producent');
    const modelInput = document.getElementById('model');
    const rokInput = document.getElementById('rok_produkcji');
    const kolorInput = document.getElementById('kolor');
    const mocInput = document.getElementById('moc_silnika');

    const errorProducent = document.getElementById('errorProducent');
    const errorModel = document.getElementById('errorModel');
    const errorRok_produkcji = document.getElementById('errorRok_produkcji');
    const errorKolor = document.getElementById('errorKolor');
    const errorMoc_silnika = document.getElementById('errorMoc_silnika');
    const errorSummary = document.getElementById('errorSummary');

    const reqMessage_obligator = document.getElementById('errorMessage-obligator').innerText;
    const reqMessage_chara2_20 = document.getElementById('errorMessage-chara2-20').innerText;
    const reqMessage_whole = document.getElementById('errorMessage-whole').innerText;
    const reqMessage_1800 = document.getElementById('errorMessage-1800+').innerText;
    const reqMessage_chara3_25 = document.getElementById('errorMessage-chara3-25').innerText;
    const reqMessage_100_999 = document.getElementById('errorMessage-100-999').innerText;

    resetErrors ([producentInput, modelInput, rokInput, kolorInput, mocInput], [errorProducent, errorModel, errorRok_produkcji, errorKolor, errorMoc_silnika], errorSummary)
    let valid = true;

    if (!checkRequired(producentInput.value)) {
        valid = false;
        producentInput.classList.add("error-input");
        errorProducent.innerText = reqMessage_obligator;
    } else if (!checkTextLengthRange(producentInput.value, 3, 25)) {
        valid = false;
        producentInput.classList.add("error-input");
        errorProducent.innerText = reqMessage_chara3_25;
    }

    if (!checkRequired(modelInput.value)) {
        valid = false;
        modelInput.classList.add("error-input");
        errorModel.innerText = reqMessage_obligator;
    } else if (!checkTextLengthRange(modelInput.value, 2, 20)) {
        valid = false;
        modelInput.classList.add("error-input");
        errorModel.innerText = reqMessage_chara2_20;
    }

    if (!checkRequired(rokInput.value)) {
        valid = false;
        rokInput.classList.add("error-input");
        errorRok_produkcji.innerText = reqMessage_obligator;
    } else if (!checkNumber(rokInput.value)) {
        valid = false;
        rokInput.classList.add("error-input");
        errorRok_produkcji.innerText = reqMessage_whole;
    } else if (!checkNumberRange(rokInput.value, 1800, new Date().getFullYear())) {
        valid = false;
        rokInput.classList.add("error-input");
        errorRok_produkcji.innerText = reqMessage_1800;
    }

    if (!checkRequired(kolorInput.value)) {
        valid = false;
        kolorInput.classList.add("error-input");
        errorKolor.innerText = reqMessage_obligator;
    } else if (!checkTextLengthRange(kolorInput.value, 3, 25)) {
        valid = false;
        kolorInput.classList.add("error-input");
        errorKolor.innerText = reqMessage_chara3_25;
    }

    if (!checkRequired(mocInput.value)) {
        valid = false;
        mocInput.classList.add("error-input");
        errorMoc_silnika.innerText = reqMessage_obligator;
    } else if (!checkNumber(mocInput.value)) {
        valid = false;
        mocInput.classList.add("error-input");
        errorMoc_silnika.innerText = reqMessage_whole;
    } else if (!checkNumberRange(mocInput.value, 100, 999)) {
        valid = false;
        mocInput.classList.add("error-input");
        errorMoc_silnika.innerText = reqMessage_100_999;
    }

    return valid;
}