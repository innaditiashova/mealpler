Mealpler.component('dishBlock', {
    bindings: {
        dish: '<',
        mealType: '<',
        day: '<'
    },
    require: {},
    transclude: true,
    controller: 'DishCtrl',
    templateUrl: 'scripts/components/dish/dish.tmpl.html',
});