Mealpler.component('addFood', {
    bindings: {
        date: '=',
        mealNo: '<',
        modalInst: '<'
    },
    require: {},
    transclude: true,
    controller: 'AddMealCtrl',
    templateUrl: 'scripts/components/meal/add/add.modal.html',
});