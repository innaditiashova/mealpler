Mealpler.controller('WeekCtrl', function (WeekModel, MealModel) {
    let week = this;
    week.range = []; //dates for 7 days
    week.day = {};

    const datePicker = $('input[name="daterange"]');
    const defaultMeal = {
        /*"id": Math.random(),*/
        "name": "",
        "type": "product",
        "quantity": 1,
        "hasIngredients": false
    };

    /*week.daysList = WeekModel.weekDays();*/
    //settings for Date Range Picker
    datePicker.daterangepicker({
        "dateLimit": {
            "days": 7
        },
        "startDate": new Date()
    }, function(start, end, label) {

    });
    datePicker.on('apply.daterangepicker', function (e, picker) {
        const startDate = picker.startDate._d.getDay();
        week.viewDate = new Date(startDate);
    });
    //moment
    week.firstDayOfWeek = moment(); //today


    //day settings
    week.day.setCurrentMeal = function (meal, date) {
        week.currentMeal = angular.copy(meal);
        week.currentDate = moment(date);
        week.day.createNewMealItem(week.currentMeal);
    };

    week.day.saveMeal = function (meal,date) {
        MealModel.updateMealInfo(meal,date);
        week.day.refreshCurrentMeal();
        loadMealsDataForWeek();
    };

    week.day.createNewMealItem = function (forMeal) {
        forMeal.mealList.push(angular.copy(defaultMeal));
    };

    week.day.refreshCurrentMeal = function () {
        week.currentMeal = {}; week.currentDate = '';
    };

    week.init = function () {
        calculateWeekRange();
        //get meal's list for each day of week range
        loadMealsDataForWeek();
    };

    week.init();

    function calculateWeekRange() {
        for (let i = 0; i < 7; i++) {
            let nextDay = moment().add(i, 'day');
            nextDay.id = i;
            week.range.push(nextDay);
        }
        week.range.map(function(d) {
            d.dayName = moment(d).format('dddd');
            d.shortDate = moment(d).format('dddd, Do');
            d.fullDate = moment(d).format('YYYY-M-D')});
    }

    function loadMealsDataForWeek() {
        week.range.map(function (d) {
            d.mealsList = angular.copy(MealModel.findMealList(d.fullDate));
            /*let availableMeals = angular.copy(MealModel.findMealList(d.fullDate));
            let empty = MealModel.emptyMealsList();
            empty.forEach(function(a) {
                if (availableMeals === undefined) {
                    d.mealsList.push(a)
                } else {
                    if (availableMeals)
                    availableMeals.forEach(function (b) {
                        if (b.mealName === a.mealName) {
                            d.mealsList.push(b);
                        } else d.mealsList.push(a);
                    })
                }
            });*/
            /*availableMeals.forEach(function(a) {
                MealModel.emptyMealsList().map(function(b) {
                    if (a.mealName === b.mealName) {
                        d.mealsList.push(a);
                    } else {
                        d.mealsList.push(b);
                    }
                })
            });*/
        });
        /*console.log(week.range);*/
    }
});

