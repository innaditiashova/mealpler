Mealpler.directive('dishBlock', function (MealModel, DishService, IngredientService) {
    const link = (scope, el, attrs, controllers) => {
        const DayCtrl = controllers[1];
        const WeekCtrl = controllers[2];
        const DishCtrl = scope.dishCtrl;
        DishCtrl.deleteDish = (item, mealName, date) => {
            DishService.deleteDish(item, mealName, date);
            WeekCtrl._loadMealsDataForWeekRange();
        };
        DishCtrl.deleteIngredient = (ingredient, itemName, mealName, date) => {
            IngredientService.deleteIngredient(ingredient, itemName, mealName, date);
            WeekCtrl._loadMealsDataForWeekRange();
        };
        DishCtrl.copyDish = (name, food) => {
            DayCtrl.copyFood(name, food);
        };
    };

    return {
        restrict: 'E',
        transclude: true,
        scope: {
            dish: '=',
            mealName: '=',
            date: '='
        },
        controller: 'DishCtrl',
        controllerAs: 'dishCtrl',
        require: ['^^mealManager', '^^dayManager', '^^weekManager'],
        templateUrl: 'scripts/components/dish/dish.tmpl.html',
        link: link
    };
});