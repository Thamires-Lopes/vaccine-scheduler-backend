const calculateAge = (date) => {
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth() + 1;
    const todayDay = today.getDate();

    const birthdate = new Date(date);
    const birthdateYear = birthdate.getFullYear();
    const birthdateMonth = birthdate.getMonth() + 1;
    const birthdateDay = birthdate.getDate();

    let result = todayYear - birthdateYear;
    if (todayMonth === birthdateMonth) {
        if (todayDay < birthdateDay) {
            result -= 1;
        }
    } else if (todayMonth < birthdateMonth) {
        result -= 1;
    }

    return result;
};

module.exports = calculateAge;