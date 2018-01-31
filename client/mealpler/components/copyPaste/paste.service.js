class PasteService {
    constructor (DayService, StorageService, NotifyService, Local) {
        Object.assign(this, {DayService, StorageService, NotifyService, Local});
    }

    /**
     *
     * @param {number} mealNo
     * @param {Moment} date
     * @return {Promise<void>}
     */
    pasteMeal(mealNo, date) {
        const stored = this.Local.getLocalStorageData('meal');
        if (stored === null) {
            return this.showPasteError();
        } else {
            return this.DayService.updateDayInfo(stored, date, 'stored', mealNo);
        }
    };

    /**
     *
     * @param {Moment} date
     * @return {Promise<void>}
     */
    pasteDay(date) {
        const stored = this.Local.getLocalStorageData("day");
        if (stored === null) {
            return this.showPasteError();
        } else {
            const fullDateName = date.format("YYYY-M-D");
            const dayNewContent = new Day(date);
            dayNewContent.meals = stored.slice();
            return this.DayService.cleanAndSetDayMealsList(fullDateName, dayNewContent);
        }
    }

    /**
     *
     * @return {Promise<void>}
     */
    showPasteError() {
        this.NotifyService.show('Nothing to paste. Copy something.', 'error');
        return Promise.reject(new Error('PasteError: Nothing to paste!'));
    }

}

Mealpler.service('PasteService', PasteService);